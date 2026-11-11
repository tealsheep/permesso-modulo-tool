import { PDFDocument } from 'pdf-lib'
import type { Modulo2Layout } from '../data/layout-schema'
import type { PreparedKit } from '../engine/prepare'
import { overlayPdf } from './overlay'
import type { Placement, RenderWarning } from './overlay'
import { renderModulo2 } from './modulo2'
import { renderBollettino } from './bollettino'

export interface ReferenceAssets { modulo1Pdf: Uint8Array; bollettinoImage: Uint8Array }

/** Form pages then one bill per applicant/under-14 child. Chinese cover/material pages come later. */
export async function renderApplication(kit: PreparedKit, assets: ReferenceAssets, layout: Modulo2Layout) {
  const pdf = await PDFDocument.create()
  const placements: (Placement & { documentIndex: number })[] = []
  const warnings: (RenderWarning & { documentIndex: number })[] = []
  const documents: { form: string; pages: number; childIndex?: number }[] = []
  for (const item of [...kit.forms, ...kit.bills]) {
    const result = item.definition.form === 'modulo1' ? await overlayPdf(assets.modulo1Pdf, item.definition, item.values) :
      item.definition.form === 'modulo2' ? await renderModulo2(layout, item.definition, item.values) :
        await renderBollettino(assets.bollettinoImage, item.definition, item.values)
    const source = await PDFDocument.load(result.bytes)
    const offset = pdf.getPageCount()
    const pages = await pdf.copyPages(source, source.getPageIndices())
    pages.forEach((page) => pdf.addPage(page))
    placements.push(...result.placements.map((p) => ({ ...p, page: p.page + offset, documentIndex: documents.length })))
    warnings.push(...result.warnings.map((warning) => ({ ...warning, page: warning.page + offset, documentIndex: documents.length })))
    documents.push({ form: item.definition.form, pages: pages.length,
      ...('childIndex' in item && typeof item.childIndex === 'number' ? { childIndex: item.childIndex } : {}) })
  }
  return { bytes: await pdf.save(), placements, documents, warnings }
}
