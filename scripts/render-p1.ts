import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createCanvas, DOMMatrix, ImageData, Path2D } from '@napi-rs/canvas'
import { businessData } from '../src/data/business'
import { modulo1, modulo2Layout, bollettino } from '../src/data/catalog'
import { exampleApplication, demoAsOf } from '../src/demo/applications'
import { prepareApplication } from '../src/engine/prepare'
import { renderApplication } from '../src/render/application'

Object.assign(globalThis, { DOMMatrix, ImageData, Path2D })
const { getDocument } = await import('pdfjs-dist/legacy/build/pdf.mjs')
const [modulo1Pdf, bollettinoImage] = await Promise.all([readFile(modulo1.source), readFile(bollettino.source)])
const output = resolve('output/pdf/p1')
await mkdir(output, { recursive: true })
for (const code of ['16', '15', '09', '03'] as const) {
  const kit = prepareApplication(exampleApplication(code), businessData, demoAsOf)
  if (kit.kind !== 'kit') throw new Error(kit.message)
  const result = await renderApplication(kit, { modulo1Pdf, bollettinoImage }, modulo2Layout)
  await writeFile(resolve(output, `application-${code}.pdf`), result.bytes)
  await writeFile(resolve(output, `application-${code}-fields.json`), JSON.stringify({
    forms: kit.forms.map((f) => ({ form: f.definition.form, values: f.values })), bills: kit.bills,
    fees: kit.fees, materials: kit.materials, warnings: kit.warnings,
  }, null, 2) + '\n')
  const task = getDocument({ data: result.bytes.slice(), standardFontDataUrl: resolve('node_modules/pdfjs-dist/standard_fonts') + '/' })
  try {
    const doc = await task.promise
    const billStart = doc.numPages - kit.bills.length + 1
    const selectedPages = new Set([1, 3, ...(kit.forms.length === 2 ? [10] : []),
      ...Array.from({ length: kit.bills.length }, (_, index) => billStart + index)])
    for (const number of selectedPages) {
      const page = await doc.getPage(number), viewport = page.getViewport({ scale: 2 })
      const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height))
      await page.render({ canvas: canvas as unknown as HTMLCanvasElement, viewport }).promise
      await writeFile(resolve(output, `application-${code}-page${number}.png`), canvas.toBuffer('image/png'))
      page.cleanup()
    }
    console.log(`${code}: ${doc.numPages} pages, bills ${kit.bills.map((bill) => bill.amountCents).join(',')}, ${kit.warnings.length} warnings`)
  } finally { await task.destroy() }
}
