import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createCanvas, DOMMatrix, ImageData, Path2D } from '@napi-rs/canvas'
import { demoForm, demoValues } from '../src/demo/modulo1'
import { alignmentValues } from '../src/demo/alignment'
import { overlayPdf } from '../src/render/overlay'

// pdf.js's Node entry needs the native canvas globals before its module is evaluated.
Object.assign(globalThis, { DOMMatrix, ImageData, Path2D })
const { getDocument } = await import('pdfjs-dist/legacy/build/pdf.mjs')
const source = await readFile(resolve(demoForm.source))
const allFields = process.argv.includes('--all-fields')
const basename = allFields ? 'modulo1-alignment' : 'modulo1-demo'
const result = await overlayPdf(source, demoForm, allFields ? alignmentValues : demoValues)
const output = resolve('output/pdf')
await mkdir(output, { recursive: true })
await writeFile(resolve(output, `${basename}.pdf`), result.bytes)
await writeFile(resolve(output, `${basename}-placements.json`), JSON.stringify(result.placements, null, 2) + '\n')
const loading = getDocument({
  data: result.bytes.slice(),
  standardFontDataUrl: resolve('node_modules/pdfjs-dist/standard_fonts') + '/',
})
try {
  const document = await loading.promise
  for (let number = 1; number <= (allFields ? document.numPages : 1); number++) {
    const page = await document.getPage(number)
    const viewport = page.getViewport({ scale: 2 })
    const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height))
    // The canvas implementation is native Node; pdf.js types describe a DOM canvas.
    await page.render({ canvas: canvas as unknown as HTMLCanvasElement, viewport }).promise
    await writeFile(resolve(output, `${basename}-page${number}.png`), canvas.toBuffer('image/png'))
    page.cleanup()
  }
  console.log(`Generated ${document.numPages} pages; ${result.placements.length} glyphs. PDF and PNG: ${output}`)
} finally { await loading.destroy() }
