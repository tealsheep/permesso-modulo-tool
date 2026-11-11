import fontkit from '@pdf-lib/fontkit'
import { rgb } from 'pdf-lib'
import type { PDFDocument, PDFFont, PDFPage } from 'pdf-lib'
import { subsetFont } from './font-subset'

const fontPromise = fetch(`${import.meta.env.BASE_URL}fonts/ModuloSansSC-Regular.ttf`).then(async (response) => {
  if (!response.ok) throw new Error('中文字体加载失败，请刷新重试')
  return new Uint8Array(await response.arrayBuffer())
})
void fontPromise.catch(() => undefined)
const banner = '居留填表助手 · 手写参考件'
const footer = '填写辅助，不提供法律建议 · 以当地 Questura 最新要求为准'
export async function referenceFont(pdf: PDFDocument, text: string): Promise<PDFFont> {
  pdf.registerFontkit(fontkit)
  const used = [banner, footer, '填写须知材料清单', text].join('\n')
  // The old fontkit subsetter drops CJK glyphs; HarfBuzz produces the subset.
  // pdf-lib must embed those already-small bytes without subsetting them again.
  const font = await pdf.embedFont(await subsetFont(await fontPromise, used), { subset: false,
    features: { liga: false, clig: false, calt: false, rlig: false, ccmp: false, locl: false, kern: false } })
  const supported = new Set(font.getCharacterSet())
  for (const char of used) if (char !== '\n' && !supported.has(char.codePointAt(0)!)) throw new Error(`中文字体不支持字符：${char}`)
  return font
}

/** Same page, margins and type sizes as the former 794×1123 canvas sheets. */
export function textSheets(pdf: PDFDocument, font: PDFFont, title: string, paragraphs: string[]): number {
  const width = 595.28, height = 841.89, scale = width / 794, padding = 64 * scale
  const ink = rgb(46 / 255, 38 / 255, 33 / 255), accent = rgb(181 / 255, 83 / 255, 42 / 255), muted = rgb(107 / 255, 95 / 255, 87 / 255)
  let page: PDFPage, y = 176 * scale, count = 0
  function start() {
    page = pdf.addPage([width, height]); count++; y = 176 * scale
    page.drawText(banner, { font, x: padding, y: height - 64 * scale, size: 16 * scale, color: accent })
    page.drawText(title, { font, x: padding, y: height - 120 * scale, size: 30 * scale, color: ink })
    page.drawText(footer, { font, x: padding, y: 48 * scale, size: 14 * scale, color: muted })
  }
  start()
  const size = 18 * scale, maxWidth = width - padding * 2
  for (const paragraph of paragraphs) {
    const lines: string[] = []
    for (const part of paragraph.split('\n')) {
      let line = ''
      const fits = (text: string) => font.widthOfTextAtSize(text, size) <= maxWidth
      const pushChars = (text: string) => { for (const char of text) { if (line && !fits(line + char)) { lines.push(line); line = char } else line += char } }
      // Italian words stay whole; Chinese still breaks between characters.
      for (const token of part.match(/[A-Za-z0-9\u00C0-\u024F'’.,;:()/-]+\s*|\s+|./gu) ?? []) {
        if (fits(line + token.trimEnd())) line += token
        else if (fits(token.trimEnd())) { lines.push(line.trimEnd()); line = token }
        else pushChars(token)
      }
      lines.push(line.trimEnd())
    }
    for (const line of lines) {
      if (y > height - 100 * scale) start()
      page!.drawText(line, { font, x: padding, y: height - y, size, color: ink }); y += 30 * scale
    }
    y += 20 * scale
  }
  return count
}
