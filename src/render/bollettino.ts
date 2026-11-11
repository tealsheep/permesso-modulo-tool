import { PDFDocument } from 'pdf-lib'
import type { FormDefinition } from '../data/schemas'
import type { FieldValues } from '../engine/application'
import { drawFields } from './overlay'

/** Image pixels map 1:1 to PDF points on a deliberately sized reference page. */
export async function renderBollettino(imageBytes: Uint8Array, definition: FormDefinition, values: FieldValues) {
  if (definition.form !== 'bollettino' || !definition.pageSize) throw new Error('缴费单需要 bollettino 定义和图片 pageSize')
  const pdf = await PDFDocument.create()
  const image = definition.source.endsWith('.png') ? await pdf.embedPng(imageBytes.slice()) : await pdf.embedJpg(imageBytes.slice())
  const { width, height } = definition.pageSize
  if (image.width !== width || image.height !== height) throw new Error('缴费单底图尺寸与 pageSize 不符')
  const page = pdf.addPage([width, height])
  page.drawImage(image, { x: 0, y: 0, width, height })
  const drawn = await drawFields(pdf, definition, values)
  return { bytes: await pdf.save(), ...drawn }
}
