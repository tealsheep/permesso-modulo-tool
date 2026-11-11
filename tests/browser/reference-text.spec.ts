import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { DOMMatrix, ImageData, Path2D } from '@napi-rs/canvas'
import { PDFDict, PDFDocument, PDFName, PDFRawStream } from 'pdf-lib'
import { expect, test } from '@playwright/test'
import { seed } from './fixtures'

test('reference Chinese cover and materials are selectable subset-font text; font loads at startup', async ({ page }) => {
  const fonts: string[] = []
  const fontResponses: Promise<number>[] = []
  const fontErrors: string[] = []
  page.on('console', (message) => { if (/callsubr|rmoveto|FontFileType|Missing subrs/i.test(message.text())) fontErrors.push(message.text()) })
  page.on('request', (request) => { if (/\/fonts\/.*\.(?:otf|ttf)/.test(request.url())) fonts.push(request.url()) })
  page.on('response', (response) => { if (/\/fonts\/.*\.ttf/.test(response.url())) fontResponses.push(response.body().then((body) => body.length)) })
  await seed(page)
  await page.waitForLoadState('networkidle')
  const startupFonts = fonts.length
  expect(startupFonts).toBeGreaterThan(0)
  await page.locator('.application-card').click()
  await page.getByRole('button', { name: '生成参考件', exact: true }).click()
  const link = page.getByRole('link', { name: '下载 PDF' })
  await expect(link).toBeVisible({ timeout: 60000 })
  await expect(page.locator('.preview-status')).toHaveText('')
  const [downloadedFontBytes] = await Promise.all(fontResponses)
  expect(downloadedFontBytes).toBeGreaterThan(1000)
  expect(downloadedFontBytes).toBeLessThan(500_000)
  expect(fontErrors).toEqual([])
  const pending = page.waitForEvent('download'); await link.click(); const download = await pending
  mkdirSync('output/font-review', { recursive: true })
  await download.saveAs('output/font-review/reference16.pdf')
  Object.assign(globalThis, { DOMMatrix, ImageData, Path2D })
  const { getDocument } = await import('pdfjs-dist/legacy/build/pdf.mjs')
  const bytes = new Uint8Array(readFileSync('output/font-review/reference16.pdf'))
  const pdf = await PDFDocument.load(bytes)
  const descriptor = pdf.context.enumerateIndirectObjects().map(([, value]) => value).find((value) => value instanceof PDFDict && value.get(PDFName.of('FontName'))?.toString().includes('ModuloSansSC'))
  expect(descriptor).toBeInstanceOf(PDFDict)
  const font = pdf.context.lookup((descriptor as PDFDict).get(PDFName.of('FontFile2'))!)
  expect(font).toBeInstanceOf(PDFRawStream)
  const subsetBytes = (font as PDFRawStream).getContents().length
  expect(subsetBytes).toBeGreaterThan(1000)
  expect(subsetBytes).toBeLessThan(500_000)
  const reader = getDocument({ data: bytes.slice(), useSystemFonts: true })
  try {
    const document = await reader.promise
    const cover = await (await document.getPage(1)).getTextContent()
    const materials = await (await document.getPage(document.numPages)).getTextContent()
    const text = (items: typeof cover.items) => items.map((item) => 'str' in item ? item.str : '').join('').replace(/\s/g, '')
    writeFileSync('output/font-review/metrics.json', JSON.stringify({ bytes: bytes.length, pages: document.numPages, subsetBytes, downloadedFontBytes, coverText: text(cover.items), materialText: text(materials.items), fontRequests: fonts.length }, null, 2))
    expect(text(cover.items)).toContain('参考件只供照着手写')
    expect(text(cover.items)).toContain('3.Modulo1第1页底部FIRMA签名')
    expect(text(materials.items)).toContain('材料清单')
    expect(fonts).toHaveLength(startupFonts)
    // A fresh copy has no generated-PDF cache, so this really regenerates offline.
    await page.context().setOffline(true)
    await page.getByRole('button', { name: '返回', exact: true }).click()
    await page.getByRole('button', { name: '复制为新申请', exact: true }).click()
    await page.getByRole('button', { name: '生成参考件', exact: true }).click()
    await expect(link).toBeVisible()
    expect(fonts).toHaveLength(startupFonts)
  } finally { await reader.destroy() }
})
