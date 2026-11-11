import { readFileSync } from 'node:fs'
import { createCanvas, DOMMatrix, ImageData, Path2D } from '@napi-rs/canvas'
import fontkit from '@pdf-lib/fontkit'
import { PDFDocument } from 'pdf-lib'
import { expect, it } from 'vitest'
import { textSheets } from '../src/render/text-sheets'
import { createFontSubsetter } from '../src/render/font-subset'

Object.assign(globalThis, { DOMMatrix, ImageData, Path2D })
const { getDocument } = await import('pdfjs-dist/legacy/build/pdf.mjs')
const fontBytes = readFileSync('public/fonts/ModuloSansSC-Regular.ttf')
const subset = await createFontSubsetter(readFileSync('node_modules/harfbuzzjs/dist/harfbuzz-subset.wasm'))

it('renders ink for every Chinese glyph in the actual subset, not just a ToUnicode map', async () => {
  const text = '参考件填写须知材料清单'
  const pdf = await PDFDocument.create(); pdf.registerFontkit(fontkit)
  const font = await pdf.embedFont(subset(fontBytes, text), { subset: false })
  pdf.addPage([400, 100]).drawText(text, { font, x: 10, y: 50, size: 24 })
  const reader = getDocument({ data: await pdf.save(), disableFontFace: true })
  try {
    const document = await reader.promise, page = await document.getPage(1)
    const canvas = createCanvas(400, 100)
    await page.render({ canvas: canvas as unknown as HTMLCanvasElement, viewport: page.getViewport({ scale: 1 }) }).promise
    for (const [index, char] of [...text].entries()) {
      const pixels = canvas.getContext('2d').getImageData(10 + index * 24, 25, 24, 32).data
      let ink = 0
      for (let i = 0; i < pixels.length; i += 4) if (pixels[i]! < 150 && pixels[i + 3]! > 0) ink++
      expect(ink, char).toBeGreaterThan(15)
    }
  } finally { await reader.destroy() }
})

it('paginates long Chinese paragraphs without losing selectable text', async () => {
  const pdf = await PDFDocument.create(); pdf.registerFontkit(fontkit)
  const paragraphs = Array.from({ length: 45 }, (_, index) => `${index + 1}. 材料要求可能更新，以当地 Questura、Poste Italiane 和 portaleimmigrazione.it 的最新要求为准。`)
  const font = await pdf.embedFont(subset(fontBytes, paragraphs.join('') + '居留填表助手 · 手写参考件填写辅助，不提供法律建议 · 以当地 Questura 最新要求为准'), { subset: false })
  const pages = textSheets(pdf, font, '材料清单', paragraphs)
  expect(pages).toBeGreaterThan(1)
  const bytes = await pdf.save()
  expect(bytes.length).toBeLessThan(fontBytes.length / 4)
  const reader = getDocument({ data: bytes })
  try {
    const document = await reader.promise
    const items = await Promise.all(Array.from({ length: pages }, async (_, index) => (await (await document.getPage(index + 1)).getTextContent()).items.map((item) => 'str' in item ? item.str : '').join('')))
    const text = items.join('').replace(/\s/g, '')
    for (const paragraph of paragraphs) expect(text).toContain(paragraph.replace(/\s/g, ''))
  } finally { await reader.destroy() }
})
