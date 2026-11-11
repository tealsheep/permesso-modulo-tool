import {
  PDFDocument, PDFOperator, PDFOperatorNames, StandardFonts,
  appendBezierCurve, beginText, closePath, endPath, endText, fill, fillAndStroke,
  lineTo, moveTo, popGraphicsState, pushGraphicsState, setCharacterSqueeze,
  setDashPattern, setFillingRgbColor, setFontAndSize, setLineWidth,
  setStrokingRgbColor, setTextMatrix, showText, stroke,
} from 'pdf-lib'
import type { FormDefinition } from '../data/schemas'
import type { LayoutPath, Modulo2Layout } from '../data/layout-schema'
import type { FieldValues } from '../engine/application'
import { drawFields } from './overlay'

function color(hex: string): [number, number, number] {
  return [parseInt(hex.slice(1, 3), 16) / 255, parseInt(hex.slice(3, 5), 16) / 255, parseInt(hex.slice(5, 7), 16) / 255]
}

/** Numeric operators only; never inject raw path or dash strings into PDF streams. */
export function pathOperators(path: LayoutPath): PDFOperator[] {
  const ops = [pushGraphicsState(), setLineWidth(path.lineWidth)]
  if (path.stroke) ops.push(setStrokingRgbColor(...color(path.stroke)))
  if (path.fill) ops.push(setFillingRgbColor(...color(path.fill)))
  if (path.dashes) {
    const match = /^\[([^\]]*)\]\s*(\d+(?:\.\d+)?)$/.exec(path.dashes)!
    const array = match[1]!.trim().split(/\s+/).filter(Boolean).map(Number)
    if (array.length && !array.some((n) => n > 0)) throw new Error('虚线间隔不能全部为零')
    ops.push(setDashPattern(array, Number(match[2])))
  } else ops.push(setDashPattern([], 0))
  let last: [number, number] | undefined
  for (const item of path.items) {
    if (item[0] === 'qu') {
      ops.push(moveTo(item[1], item[2]), lineTo(item[3], item[4]), lineTo(item[5], item[6]), lineTo(item[7], item[8]), closePath())
      last = undefined
    } else {
      if (!last || last[0] !== item[1] || last[1] !== item[2]) ops.push(moveTo(item[1], item[2]))
      if (item[0] === 'l') {
        ops.push(lineTo(item[3], item[4]))
        last = [item[3], item[4]]
      } else {
        ops.push(appendBezierCurve(item[3], item[4], item[5], item[6], item[7], item[8]))
        last = [item[7], item[8]]
      }
    }
  }
  if (path.closePath) ops.push(closePath())
  if (path.fill && path.stroke) ops.push(path.evenOdd ? PDFOperator.of(PDFOperatorNames.FillEvenOddAndStroke) : fillAndStroke())
  else if (path.fill) ops.push(path.evenOdd ? PDFOperator.of(PDFOperatorNames.FillEvenOdd) : fill())
  else ops.push(path.stroke ? stroke() : endPath())
  ops.push(popGraphicsState())
  return ops
}

/** D35: Creates all pages from JSON. No source-PDF argument, file I/O, or image rendering. */
export async function renderModulo2(layout: Modulo2Layout, definition: FormDefinition, values: FieldValues, fontSize = 12) {
  if (definition.form !== 'modulo2') throw new Error('Modulo 2 渲染器需要 modulo2 字段定义')
  const pdf = await PDFDocument.create()
  const regular = await pdf.embedFont(StandardFonts.Helvetica)
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const labels: { page: number; text: string; x: number; y: number; width: number; horizontalScale: number }[] = []
  for (const spec of layout.pages) {
    const page = pdf.addPage([spec.width, spec.height])
    const keys = {
      regular: page.node.newFontDictionary(regular.name, regular.ref),
      bold: page.node.newFontDictionary(bold.name, bold.ref),
    }
    for (const path of spec.paths) page.pushOperators(...pathOperators(path))
    for (const label of spec.texts) {
      const isBold = label.font.endsWith('bold')
      const font = isBold ? bold : regular
      // Tj does not apply kerning. pdf-lib's whole-string metric does, so sum glyph
      // advances to match the width a PDF viewer actually paints before applying Tz.
      const advance = [...label.text].reduce((sum, char) => sum + font.widthOfTextAtSize(char, label.size), 0)
      const horizontalScale = label.width / advance * 100
      page.pushOperators(
        pushGraphicsState(), beginText(), setFillingRgbColor(...color(label.color)),
        setFontAndSize(isBold ? keys.bold : keys.regular, label.size),
        setCharacterSqueeze(horizontalScale), setTextMatrix(1, 0, 0, 1, label.x, label.y),
        showText(font.encodeText(label.text)), endText(), popGraphicsState(),
      )
      labels.push({ page: spec.page, text: label.text, x: label.x, y: label.y, width: label.width, horizontalScale })
    }
    // spec.omitted describes the emblem area. Deliberately draw nothing there.
  }
  const drawn = await drawFields(pdf, definition, values, fontSize)
  return { bytes: await pdf.save(), ...drawn, labels }
}
