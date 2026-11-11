import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { DOMMatrix, ImageData, Path2D } from '@napi-rs/canvas'
import { PDFDocument, PDFDict, PDFName } from 'pdf-lib'
import { describe, expect, it } from 'vitest'
import { bollettino, modulo2, modulo2Layout } from '../src/data/catalog'
import { formSchema } from '../src/data/schemas'
import { modulo2LayoutSchema } from '../src/data/layout-schema'
import { createAlignmentValues } from '../src/demo/alignment'
import { bollettinoValues, modulo2Values } from '../src/demo/additional-forms'
import { overlayPdf } from '../src/render/overlay'
import { pathOperators, renderModulo2 } from '../src/render/modulo2'
import { renderBollettino } from '../src/render/bollettino'

Object.assign(globalThis, { DOMMatrix, ImageData, Path2D })
const { getDocument, OPS } = await import('pdfjs-dist/legacy/build/pdf.mjs')

describe('formal Modulo 2 and bollettino data', () => {
  it('loads all fields and preserves the image-pixel page size', () => {
    expect(modulo2.fields).toHaveLength(60)
    expect(bollettino.fields).toHaveLength(14)
    expect(bollettino.pageSize).toEqual({ width: 1024, height: 315, unit: 'image-px' })
    expect(formSchema.safeParse({ ...bollettino, pageSize: undefined }).success).toBe(false)
    expect(formSchema.safeParse({ ...bollettino, pageSize: { width: 0, height: 315, unit: 'image-px' } }).success).toBe(false)
    expect(formSchema.safeParse({ ...bollettino, pageSize: { width: 1024, height: 315, unit: 'pt' } }).success).toBe(false)
  })
  it('validates the 3-page layout, 152 labels and 429 paths without dropping omitted images', () => {
    expect(modulo2Layout.pages).toHaveLength(3)
    expect(modulo2Layout.pages.reduce((n, p) => n + p.texts.length, 0)).toBe(152)
    expect(modulo2Layout.pages.reduce((n, p) => n + p.paths.length, 0)).toBe(429)
    expect(modulo2Layout.pages.every((p) => p.omitted.length === 1)).toBe(true)
    const page = modulo2Layout.pages[0]!
    expect(modulo2LayoutSchema.safeParse({ ...modulo2Layout, pages: [{ ...page, page: 2 }] }).success).toBe(false)
    expect(modulo2LayoutSchema.safeParse({ ...modulo2Layout, pages: [{ ...page, paths: [{ ...page.paths[0], items: [['image', 0, 0]] }] }] }).success).toBe(false)
    expect(modulo2LayoutSchema.safeParse({ ...modulo2Layout, pages: [{ ...page, texts: [{ ...page.texts[0], width: 0 }] }] }).success).toBe(false)
    expect(modulo2LayoutSchema.safeParse({ ...modulo2Layout, pages: [{ ...page, paths: [{ ...page.paths[0], dashes: '[3 2] 0 S' }] }] }).success).toBe(false)
  })
})

describe('D35 blank-page Modulo 2 renderer', () => {
  it('draws all 60 fields using the supplied page sizes without a source file or images', async () => {
    const result = await renderModulo2(modulo2Layout, { ...modulo2, source: 'official/DO-NOT-READ.pdf' }, createAlignmentValues(modulo2))
    const doc = await PDFDocument.load(result.bytes)
    expect(doc.getPageCount()).toBe(3)
    expect(doc.isEncrypted).toBe(false)
    expect(result.labels).toHaveLength(152)
    expect(new Set(result.placements.map((p) => p.fieldId)).size).toBe(60)
    doc.getPages().forEach((page, index) => {
      expect(page.getSize()).toEqual({ width: modulo2Layout.pages[index]!.width, height: modulo2Layout.pages[index]!.height })
      expect(page.node.Resources()?.lookupMaybe(PDFName.of('XObject'), PDFDict)?.keys().length ?? 0).toBe(0)
    })
    for (const p of result.placements) {
      expect(p.x).toBeGreaterThanOrEqual(p.bounds.x)
      expect(p.y).toBeGreaterThanOrEqual(p.bounds.y)
      expect(p.x + p.width).toBeLessThanOrEqual(p.bounds.x + p.bounds.w)
      expect(p.y + p.height).toBeLessThanOrEqual(p.bounds.y + p.bounds.h)
    }
    await expect(overlayPdf(new Uint8Array(), modulo2, {})).rejects.toThrow('D35')
  })
  it('preserves a curly apostrophe and the original label width in the actual rendered PDF', async () => {
    const result = await renderModulo2(modulo2Layout, modulo2, {})
    const task = getDocument({ data: result.bytes.slice(), standardFontDataUrl: resolve('node_modules/pdfjs-dist/standard_fonts') + '/' })
    try {
      const doc = await task.promise
      const page = await doc.getPage(1)
      const content = await page.getTextContent()
      const header = content.items.find((item) => 'str' in item && item.str === 'MINISTERO DELL’INTERNO')
      if (!header || !('str' in header)) throw new Error('Missing header')
      expect(header.width).toBeCloseTo(151.5, 2)
      expect(header.transform[4]).toBeCloseTo(229.38, 2)
      expect(header.transform[5]).toBeCloseTo(807.56, 2)
      const operators = await page.getOperatorList()
      expect(operators.fnArray).not.toContain(OPS.paintImageXObject)
      expect(operators.fnArray).not.toContain(OPS.paintInlineImageXObject)
      expect(content.items.some((item) => 'str' in item && item.str.includes('/'))).toBe(true)
    } finally { await task.destroy() }
  })
  it.each(['M2-053', 'M2-062'])('right-aligns the euro amount in %s without drawing leading spaces', async (id) => {
    const result = await renderModulo2(modulo2Layout, modulo2, { [id]: { euro: '80', centesimi: '46' } })
    const field = modulo2.fields.find((f) => f.id === id)!
    if (field.kind !== 'parts') throw new Error('fixture')
    const boxes = field.parts[0]!.boxes
    expect(result.placements.map((p) => p.text).join('')).toBe('8046')
    expect(result.placements[0]!.bounds.x).toBeCloseTo(boxes.x + (boxes.count - 2) * boxes.pitch)
    expect(result.placements[1]!.bounds.x).toBeCloseTo(boxes.x + (boxes.count - 1) * boxes.pitch)
  })
  it('renders registration-number parts and adapts the short header line font', async () => {
    const result = await renderModulo2(modulo2Layout, modulo2, modulo2Values)
    const number = result.placements.filter((p) => p.fieldId === 'M2-039')
    expect(number.map((p) => p.text).join('')).toBe('0'.repeat(12))
    expect(number[11]?.bounds.x).toBe(371.2)
    expect(result.placements.find((p) => p.fieldId === 'M2-H01')?.fontSize).toBeCloseTo(8.29)
  })
  it('handles curves, disjoint lines, dash phase and even-odd fill-and-stroke', () => {
    const path = modulo2Layout.pages[0]!.paths[0]!
    const ops = pathOperators({ ...path, fill: '#ffffff', evenOdd: true, closePath: true, dashes: '[3 2] 1', items: [
      ['l', 0, 0, 1, 1], ['l', 2, 2, 3, 3], ['c', 3, 3, 4, 4, 5, 5, 6, 6],
    ] }).map(String).join('\n')
    expect(ops).toContain('[3 2] 1 d')
    expect(ops).toContain('2 2 m')
    expect(ops).toContain('4 4 5 5 6 6 c')
    expect(ops).toContain('B*')
  })
})

describe('image-backed three-part bollettino', () => {
  it('uses a 1024 by 315 image page and fills all 14 fields, keeping the three amounts identical', async () => {
    const image = await readFile(bollettino.source)
    const result = await renderBollettino(image, bollettino, bollettinoValues)
    const pdf = await PDFDocument.load(result.bytes)
    expect(pdf.getPageCount()).toBe(1)
    expect(pdf.getPage(0).getSize()).toEqual({ width: 1024, height: 315 })
    expect(new Set(result.placements.map((p) => p.fieldId)).size).toBe(14)
    for (const copy of [1, 2, 3]) {
      const amount = result.placements.filter((p) => p.fieldId === `B-importo-${copy}`)
      expect(amount.map((p) => p.text).join('')).toBe('8046')
      const field = bollettino.fields.find((f) => f.id === `B-importo-${copy}`)!
      if (field.kind !== 'parts') throw new Error('fixture')
      const boxes = field.parts[0]!.boxes
      expect(amount[0]?.bounds.x).toBeCloseTo(boxes.x + 6 * boxes.pitch)
      const words = result.placements.find((p) => p.fieldId === `B-lettere-${copy}`)!
      expect(words.text).toBe('OTTANTA/46')
      expect(words.fontSize).toBe(9)
      expect(result.placements.filter((p) => p.fieldId === `B-eseguito-${copy}`).map((p) => p.text).join('')).toBe('ESEMPIO FITTIZIO')
    }
    await expect(renderBollettino(image, { ...bollettino, pageSize: { width: 100, height: 100, unit: 'image-px' } }, {})).rejects.toThrow('尺寸')
    await expect(renderBollettino(image, bollettino, { 'B-importo-1': { euro: 'EURO' } })).rejects.toThrow('只能填写数字')
  })
})
