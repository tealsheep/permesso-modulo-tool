import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createCanvas, DOMMatrix, ImageData, Path2D } from '@napi-rs/canvas'
import { bollettino, modulo2, modulo2Layout } from '../src/data/catalog'
import { createAlignmentValues } from '../src/demo/alignment'
import { bollettinoValues } from '../src/demo/additional-forms'
import { renderModulo2 } from '../src/render/modulo2'
import { renderBollettino } from '../src/render/bollettino'

Object.assign(globalThis, { DOMMatrix, ImageData, Path2D })
const { getDocument } = await import('pdfjs-dist/legacy/build/pdf.mjs')
// Only the bollettino image is read here. Modulo 2 is created entirely from layout JSON.
const results = [
  { name: 'modulo2-alignment', ...await renderModulo2(modulo2Layout, modulo2, createAlignmentValues(modulo2)) },
  { name: 'bollettino-demo', ...await renderBollettino(await readFile(bollettino.source), bollettino, bollettinoValues) },
]
const output = resolve('output/pdf')
await mkdir(output, { recursive: true })
for (const result of results) {
  await writeFile(resolve(output, `${result.name}.pdf`), result.bytes)
  await writeFile(resolve(output, `${result.name}-placements.json`), JSON.stringify(result.placements, null, 2) + '\n')
  const task = getDocument({ data: result.bytes.slice(), standardFontDataUrl: resolve('node_modules/pdfjs-dist/standard_fonts') + '/' })
  try {
    const document = await task.promise
    for (let number = 1; number <= document.numPages; number++) {
      const page = await document.getPage(number)
      const viewport = page.getViewport({ scale: 2 })
      const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height))
      await page.render({ canvas: canvas as unknown as HTMLCanvasElement, viewport }).promise
      await writeFile(resolve(output, `${result.name}-page${number}.png`), canvas.toBuffer('image/png'))
      page.cleanup()
    }
    console.log(`${result.name}: ${document.numPages} pages, ${result.placements.length} field placements`)
  } finally { await task.destroy() }
}
