import { readFile } from 'node:fs/promises'
import { PDFDocument } from 'pdf-lib'
import { describe, expect, it } from 'vitest'
import { demoForm, demoValues } from '../src/demo/modulo1'
import { formSchema } from '../src/data/schemas'
import { overlayPdf } from '../src/render/overlay'
import type { FieldValues } from '../src/engine/application'
import { alignmentValues } from '../src/demo/alignment'

const original = () => readFile(demoForm.source)

describe('PDF coordinate and font integration', () => {
  it('overlays 16 glyphs within three first-page fields and preserves the 8-page original', async () => {
    const source = await original()
    const unchanged = source.slice()
    const result = await overlayPdf(source, demoForm, demoValues)
    const reopened = await PDFDocument.load(result.bytes)
    expect(reopened.getPageCount()).toBe(8)
    expect(reopened.getPage(0).getSize()).toEqual({ width: 595, height: 842 })
    expect(source).toEqual(unchanged)
    expect(result.placements).toHaveLength(16)
    expect(result.placements.map((p) => p.text).join('')).toBe('ESEMPIOFITTIZIOX')
    for (const p of result.placements) {
      expect(p.page).toBe(1)
      expect(p.x).toBeGreaterThan(p.bounds.x)
      expect(p.x + p.width).toBeLessThan(p.bounds.x + p.bounds.w)
      expect(p.y).toBeGreaterThan(p.bounds.y)
      expect(p.y + p.height).toBeLessThan(p.bounds.y + p.bounds.h)
    }
    expect(result.placements[0]?.bounds).toEqual({ x: 45.23, y: 603.02, w: 13.17, h: 18.84 })
    expect(result.placements.at(-1)?.bounds).toEqual({ x: 215.35, y: 383.85, w: 13.17, h: 18.84 })
  })
  it('does not silently truncate, transliterate, or render invalid input', async () => {
    const source = await original()
    await expect(overlayPdf(source, demoForm, { 'M1-003': 'A'.repeat(61) })).rejects.toThrow('超出 60 格，预览截断值')
    const unsupported = await overlayPdf(source, demoForm, { 'M1-003': '测试' })
    expect(unsupported.placements).toHaveLength(0)
    expect(unsupported.warnings).toMatchObject([{ field: 'M1-003', characters: ['测', '试'] }])
    const emailInName = await overlayPdf(source, demoForm, { 'M1-003': 'A@B_+C' })
    expect(emailInName.warnings[0]?.characters).toEqual(['@', '_'])
    expect(emailInName.placements.map((p) => p.text).join('')).toBe('AB+C')
    await expect(overlayPdf(source, demoForm, { 'M1-999': 'A' })).rejects.toThrow('未知字段')
    await expect(overlayPdf(source, demoForm, { 'M1-009': 'X' })).rejects.toThrow('布尔值')
    await expect(overlayPdf(source, demoForm, { 'M1-003': true })).rejects.toThrow('字符串')
    await expect(overlayPdf(source, demoForm, demoValues, 40)).rejects.toThrow('字体超出')
    await expect(overlayPdf(source, demoForm, demoValues, NaN)).rejects.toThrow('字号')
    expect((await overlayPdf(source, demoForm, { 'M1-009': false })).placements).toHaveLength(0)
  })
  it('rejects fields outside the page or nonexistent pages', async () => {
    const source = await original()
    const field = demoForm.fields.find((field) => field.id === 'M1-003')!
    if (field.kind !== 'boxes') throw new Error('fixture')
    await expect(overlayPdf(source, { ...demoForm, fields: [{ ...field, page: 9 }] }, { [field.id]: 'A' })).rejects.toThrow('页码')
    await expect(overlayPdf(source, { ...demoForm, fields: [{ ...field, boxes: { ...field.boxes, x: 590 } }] }, { [field.id]: 'A' })).rejects.toThrow('超出页面')
  })
  it('writes a date as separate day, month, year boxes', async () => {
    const b = { x: 100, y: 100, w: 13, h: 20, count: 2, pitch: 17 }
    const field = { ...demoForm.fields[0], id: 'M1-020', kind: 'date', groups: { day: b, month: { ...b, x: 150 }, year: { ...b, x: 200, count: 4 } } }
    const definition = formSchema.parse({ ...demoForm, fields: [field] })
    const source = await original()
    const result = await overlayPdf(source, definition, { 'M1-020': '2000-02-29' })
    expect(result.placements.map((p) => p.text).join('')).toBe('29022000')
    await expect(overlayPdf(source, definition, { 'M1-020': '2001-02-29' })).rejects.toThrow('日期')
  })
  it.each([30, 31, 60])('continues a %i-character surname into the official second row without losing characters', async (length) => {
    const value = 'A'.repeat(30) + 'B'.repeat(Math.max(0, length - 30))
    const result = await overlayPdf(await original(), demoForm, { 'M1-003': value })
    expect(result.placements.map((p) => p.text).join('')).toBe(value)
    expect(result.placements.filter((p) => p.bounds.y === 603.02)).toHaveLength(30)
    expect(result.placements.filter((p) => p.bounds.y === 579.1)).toHaveLength(length - 30)
    if (length > 30) expect(result.placements[30]?.bounds).toEqual({ x: 45.15, y: 579.1, w: 13.17, h: 18.84 })
  })
  it.each(['SI', 'NO'])('marks only the chosen RIFUGIATO %s option', async (value) => {
    const result = await overlayPdf(await original(), demoForm, { 'M1-037': value })
    expect(result.placements).toHaveLength(1)
    expect(result.placements[0]).toMatchObject({ text: 'X', page: 2, bounds: { x: value === 'SI' ? 505.87 : 539.95, y: 590.52, w: 13.17, h: 18.84 } })
  })
  it('rejects invalid choices and leaves an empty choice blank', async () => {
    const source = await original()
    await expect(overlayPdf(source, demoForm, { 'M1-037': 'MAYBE' })).rejects.toThrow('不存在的选项')
    await expect(overlayPdf(source, demoForm, { 'M1-037': true })).rejects.toThrow('字符串')
    expect((await overlayPdf(source, demoForm, { 'M1-037': '' })).placements).toHaveLength(0)
  })
  it.each(['M1-069', 'M1-081'])('renders %s numero and lettera independently by name', async (id) => {
    const result = await overlayPdf(await original(), demoForm, { [id]: { lettera: 'demo', numero: '00000' } })
    expect(result.placements.map((p) => p.text).join('')).toBe('00000DEMO')
    expect(result.placements[0]?.bounds.x).toBe(132.04)
    expect(result.placements[5]?.bounds.x).toBe(234.08)
    expect(result.placements.every((p) => p.page === 3)).toBe(true)
  })
  it.each(['M1-074', 'M1-075'])('keeps %s telephone prefix and number, including leading zeros', async (id) => {
    const result = await overlayPdf(await original(), demoForm, { [id]: { numero: '000000000000', prefisso: '0000' } })
    expect(result.placements.map((p) => p.text).join('')).toBe('0'.repeat(16))
    const field = demoForm.fields.find((field) => field.id === id)!
    if (field.kind !== 'parts') throw new Error('fixture')
    expect(result.placements[4]?.bounds.x).toBe(field.parts[1]?.boxes.x)
  })
  it('rejects unknown, mistyped and overflowing parts while allowing omitted parts', async () => {
    const source = await original()
    await expect(overlayPdf(source, demoForm, { 'M1-069': '00000' })).rejects.toThrow('字符串对象')
    await expect(overlayPdf(source, demoForm, { 'M1-069': { unknown: 'A' } })).rejects.toThrow('未知分组')
    await expect(overlayPdf(source, demoForm, { 'M1-069': { numero: '000000' } })).rejects.toThrow('超出 5 格')
    await expect(overlayPdf(source, demoForm, { 'M1-069': { numero: 123 } } as unknown as FieldValues)).rejects.toThrow('需要字符串')
    expect((await overlayPdf(source, demoForm, { 'M1-069': { numero: '0' } })).placements).toHaveLength(1)
  })
  it('uses the header box dimensions and renders the Questore freetext line', async () => {
    const source = await original()
    const result = await overlayPdf(source, demoForm, { 'M1-H01': 'esempio', 'M1-H02': 'RM' })
    expect(result.placements[0]).toMatchObject({ text: 'ESEMPIO', bounds: { x: 182.4, y: 777.83, w: 251.6, h: 13.14 } })
    expect(result.placements[1]?.bounds).toEqual({ x: 177.12, y: 754.24, w: 14.16, h: 19.92 })
    expect(result.placements[2]?.bounds.x).toBeCloseTo(194.4)
    for (const p of result.placements) {
      expect(p.x).toBeGreaterThanOrEqual(p.bounds.x)
      expect(p.y).toBeGreaterThanOrEqual(p.bounds.y)
      expect(p.x + p.width).toBeLessThanOrEqual(p.bounds.x + p.bounds.w)
      expect(p.y + p.height).toBeLessThanOrEqual(p.bounds.y + p.bounds.h)
    }
    // D58: a long line shrinks to fit; only text too long for the smallest size is refused here (mapping cuts it first).
    const shrunk = (await overlayPdf(source, demoForm, { 'M1-H01': 'ESEMPIO'.repeat(10) })).placements[0]!
    expect(shrunk.fontSize).toBeLessThan(result.placements[0]!.fontSize)
    expect(shrunk.width).toBeLessThanOrEqual(shrunk.bounds.w - 2 + 1e-6)
    await expect(overlayPdf(source, demoForm, { 'M1-H01': 'ESEMPIO'.repeat(20) })).rejects.toThrow('文字太长，超出表格这一行')
  })
  it('renders all 146 official fields across all 8 pages with every glyph inside its own area', async () => {
    const result = await overlayPdf(await original(), demoForm, alignmentValues)
    expect(new Set(result.placements.map((p) => p.fieldId)).size).toBe(146)
    expect([...new Set(result.placements.map((p) => p.page))].sort()).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
    for (const p of result.placements) {
      expect(p.x).toBeGreaterThanOrEqual(p.bounds.x)
      expect(p.y).toBeGreaterThanOrEqual(p.bounds.y)
      expect(p.x + p.width).toBeLessThanOrEqual(p.bounds.x + p.bounds.w)
      expect(p.y + p.height).toBeLessThanOrEqual(p.bounds.y + p.bounds.h)
    }
    expect((await PDFDocument.load(result.bytes)).getPageCount()).toBe(8)
  })
})
