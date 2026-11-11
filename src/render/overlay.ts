import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import type { PDFFont } from 'pdf-lib'
import type { Boxes, FormDefinition } from '../data/schemas'
import type { FieldValues } from '../engine/application'
import { dateGroups } from '../engine/dates'
import { allowedText } from '../engine/characters'
import { columnName, freetextMinSize } from '../engine/mapping'

export interface Placement {
  fieldId: string; page: number; text: string; x: number; y: number; width: number; height: number; fontSize: number
  bounds: { x: number; y: number; w: number; h: number }
}
export interface RenderWarning {
  code: 'skipped-characters'
  field: string
  page: number
  part?: string
  characters: string[]
  message: string
}

function canDraw(font: PDFFont, text: string, id: string, kind: string, charset?: string): boolean {
  if (!allowedText(text, id, kind, charset)) return false
  try { font.encodeText(text); return true } catch { return false }
}

/** Courier metrics used for vertical centering as well as horizontal centering. */
export function layoutBoxes(id: string, page: number, value: string, boxes: Boxes, font: PDFFont, size: number, align: 'left' | 'right' = 'left', charset?: string): Placement[] {
  const chars = [...value.toUpperCase()]
  if (chars.length > boxes.count) throw new Error(`${id}: 超出 ${boxes.count} 格，预览截断值为 ${chars.slice(0, boxes.count).join('')}`)
  const height = font.heightAtSize(size, { descender: false })
  return chars.flatMap((text, index) => {
    // Preserve the original index: an unsupported glyph leaves this cell blank.
    if (!canDraw(font, text, id, 'boxes', charset)) return []
    const width = font.widthOfTextAtSize(text, size)
    if (width > boxes.w - 2 || height > boxes.h - 2) throw new Error(`${id}: 字体超出格子`)
    const left = boxes.x + (index + (align === 'right' ? boxes.count - chars.length : 0)) * boxes.pitch
    return [{ fieldId: id, page, text, x: left + (boxes.w - width) / 2, y: boxes.y + (boxes.h - height) / 2,
      width, height, fontSize: size, bounds: { x: left, y: boxes.y, w: boxes.w, h: boxes.h } }]
  })
}

function layoutRows(id: string, page: number, value: string, rows: Boxes[], font: PDFFont, size: number, charset?: string): Placement[] {
  const chars = [...value.toUpperCase()]
  const capacity = rows.reduce((sum, row) => sum + row.count, 0)
  if (chars.length > capacity) throw new Error(`${id}: 超出 ${capacity} 格，预览截断值为 ${chars.slice(0, capacity).join('')}`)
  let offset = 0
  return rows.flatMap((row) => {
    const text = chars.slice(offset, offset + row.count).join('')
    offset += row.count
    return layoutBoxes(id, page, text, row, font, size, 'left', charset)
  })
}

/** PDF points, origin bottom-left. The source bytes and definition are never mutated. */
export async function overlayPdf(source: Uint8Array, definition: FormDefinition, values: FieldValues, fontSize = 12) {
  if (definition.form === 'modulo2') throw new Error('D35: Modulo 2 必须从布局数据重画')
  const pdf = await PDFDocument.load(source.slice())
  const drawn = await drawFields(pdf, definition, values, fontSize)
  return { bytes: await pdf.save(), ...drawn }
}

/** Shared by PDF overlay, blank-page Modulo 2, and image-backed bollettino. */
export async function drawFields(pdf: PDFDocument, definition: FormDefinition, values: FieldValues, fontSize = 12): Promise<{ placements: Placement[]; warnings: RenderWarning[] }> {
  if (!Number.isFinite(fontSize) || fontSize <= 0) throw new Error('字号必须是正数')
  const font = await pdf.embedFont(StandardFonts.Courier)
  const placements: Placement[] = []
  const warnings: RenderWarning[] = []
  const byId = new Map(definition.fields.map((field) => [field.id, field]))
  const reportText = (value: string, id: string, page: number, kind: string, charset?: string, part?: string) => {
    const characters = [...new Set([...value.toUpperCase()].filter((char) => !canDraw(font, char, id, kind, charset)))]
    if (characters.length) warnings.push({ code: 'skipped-characters', field: id, page, ...(part ? { part } : {}), characters,
      message: `${columnName(byId.get(id)?.labelZh ?? '', id)}：${characters.join(' ')} 无法填写，对应位置已留空，请修改原资料` })
  }
  for (const [id, value] of Object.entries(values)) {
    const field = byId.get(id)
    if (!field) throw new Error(`未知字段: ${id}`)
    if (field.page > pdf.getPageCount()) throw new Error(`${id}: 页码超出源 PDF`)
    if (field.kind === 'checkbox') {
      if (typeof value !== 'boolean') throw new Error(`${id}: 勾选字段需要布尔值`)
      if (value) placements.push(...layoutBoxes(id, field.page, 'X', { ...field.box, count: 1, pitch: field.box.w }, font, fontSize))
    } else if (field.kind === 'parts') {
      if (typeof value !== 'object' || value === null || Array.isArray(value)) throw new Error(`${id}: 分组字段需要按名称提供字符串对象`)
      const names = new Set(field.parts.map((part) => part.name))
      for (const name of Object.keys(value)) if (!names.has(name)) throw new Error(`${id}: 未知分组 ${name}`)
      for (const part of field.parts) {
        const text = value[part.name]
        if (text === undefined) continue // An omitted optional part stays blank.
        if (typeof text !== 'string') throw new Error(`${id}: 分组 ${part.name} 需要字符串`)
        reportText(text, id, field.page, field.kind, field.charset, part.name)
        const encodable = [...text.toUpperCase()].filter((char) => canDraw(font, char, id, field.kind, field.charset)).join('')
        if (part.name === 'euro' && !/^\d*$/.test(encodable)) throw new Error(`${id}: 欧元组只能填写数字`)
        placements.push(...layoutBoxes(id, field.page, text, part.boxes, font, fontSize, part.name === 'euro' ? 'right' : 'left', field.charset ?? undefined))
      }
    } else {
      if (typeof value !== 'string') throw new Error(`${id}: 文本字段需要字符串`)
      reportText(value, id, field.page, field.kind, field.charset)
      if (field.kind === 'boxes') {
        placements.push(...layoutRows(id, field.page, value, [field.boxes, ...(field.moreRows ?? [])], font, fontSize, field.charset))
      } else if (field.kind === 'choice') {
        if (value === '') continue
        const option = field.options.find((option) => option.value === value)
        if (!option) throw new Error(`${id}: 不存在的选项`)
        placements.push(...layoutBoxes(id, field.page, 'X', { ...option.box, count: 1, pitch: option.box.w }, font, fontSize))
      } else if (field.kind === 'date') {
        const groups = dateGroups(value)
        for (const key of ['day', 'month', 'year'] as const) placements.push(...layoutBoxes(id, field.page, groups[key], field.groups[key], font, fontSize))
      } else {
        const text = [...value.toUpperCase()].map((char) => canDraw(font, char, id, 'freetext', field.charset) ? char : ' ').join('')
        if (!text.trim()) continue
        const lineSize = Math.min(fontSize, field.area.h - 2)
        if (lineSize <= 0) throw new Error(`${id}: 自由文本区域高度不足`)
        // A long line shrinks to fit (D58); mapping has already cut what would not fit at the minimum size.
        const textSize = Math.max(Math.min(lineSize, freetextMinSize), Math.min(lineSize, (field.area.w - 2) / font.widthOfTextAtSize(text, 1)))
        const width = font.widthOfTextAtSize(text, textSize)
        const height = font.heightAtSize(textSize, { descender: false })
        if (width > field.area.w - 2 || height > field.area.h - 2) throw new Error(`${field.labelZh}：文字太长，超出表格这一行，请回到问卷缩短`)
        placements.push({ fieldId: id, page: field.page, text, x: field.area.x + 1,
          y: field.area.y + (field.area.h - height) / 2, width, height, fontSize: textSize, bounds: field.area })
      }
    }
  }
  for (const p of placements) {
    const page = pdf.getPage(p.page - 1)
    const { width, height } = page.getSize()
    if (p.bounds.x < 0 || p.bounds.y < 0 || p.bounds.x + p.bounds.w > width || p.bounds.y + p.bounds.h > height) throw new Error(`${p.fieldId}: 格子超出页面`)
    page.drawText(p.text, { x: p.x, y: p.y, size: p.fontSize, font, color: rgb(0, 0, 0) })
  }
  return { placements, warnings }
}
