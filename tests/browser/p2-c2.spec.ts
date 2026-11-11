import { mkdirSync, readFileSync } from 'node:fs'
import { DOMMatrix, ImageData, Path2D } from '@napi-rs/canvas'
import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { exampleApplication } from '../../src/demo/applications'
import { seed, noOverflow } from './fixtures'
import { fillStep } from './fill-questionnaire'

async function start(page: Page) {
  await seed(page)
  await page.getByRole('button', { name: '新建申请', exact: true }).click()
  await page.getByRole('button', { name: '新建一个人的申请', exact: true }).click()
  await page.getByRole('button', { name: /特殊工作居留续签/ }).click()
}
async function chooseLetter(page: Page, letter: string) {
  const field = page.locator('#q-application-art27Letter')
  await field.click()
  await page.getByRole('option', { name: new RegExp(`^${letter.toUpperCase()} `) }).click()
}
for (const letter of ['a', 'm', 'q'] as const) test(`C2 ${letter.toUpperCase()} real questionnaire -> downloaded PDF`, async ({ page }) => {
  await start(page)
  await page.getByRole('button', { name: '保存并下一步', exact: true }).click()
  await expect(page.locator('.error-summary')).toContainText('哪一类')
  const sample = exampleApplication('17', 'rinnovo', letter)
  for (let step = 0; ; step++) {
    await fillStep(page, sample)
    const second = letter === 'a'
    await expect(page.locator('.stepper button')).toHaveCount(second ? 5 : 4)
    await expect(page.locator('.stepper')).toContainText(second ? '工作与收入' : '家属与关联申请')
    if (!second) await expect(page.locator('.stepper')).not.toContainText('工作与收入')
    const last = step === await page.locator('.stepper button').count() - 1
    await noOverflow(page)
    await page.getByRole('button', { name: last ? '生成参考件' : '保存并下一步', exact: true }).click()
    await expect(page.locator('.error-summary')).toHaveCount(0)
    if (last) break
  }
  const link = page.getByRole('link', { name: '下载 PDF' })
  await expect(link).toBeVisible({ timeout: 60_000 })
  await expect(page.locator('.preview-status')).toHaveText('')
  await expect(page.getByRole('button', { name: 'Modulo 2', exact: true })).toHaveCount(letter === 'a' ? 1 : 0)
  const pending = page.waitForEvent('download'); await link.click()
  mkdirSync('output/p2-c2', { recursive: true })
  const path = `output/p2-c2/17-${letter}.pdf`; await (await pending).saveAs(path)
  Object.assign(globalThis, { DOMMatrix, ImageData, Path2D })
  const { getDocument } = await import('pdfjs-dist/legacy/build/pdf.mjs')
  const reader = getDocument({ data: new Uint8Array(readFileSync(path)), useSystemFonts: true })
  const money = letter === 'a' ? '€130,46' : '€70,46'
  try {
    const doc = await reader.promise
    const textAt = async (n: number) => (await (await doc.getPage(n)).getTextContent()).items.map((i) => 'str' in i ? i.str : '').join('').replace(/\s/g, '')
    const bill = letter === 'a' ? 13 : 10
    expect(doc.numPages).toBeGreaterThan(bill)
    expect(await textAt(1)).toContain(money)
    expect(await textAt(bill)).toContain(letter === 'a' ? 'CENTOTRENTA/46' : 'SETTANTA/46')
    let materials = ''
    for (let n = bill + 1; n <= doc.numPages; n++) materials += await textAt(n)
    expect(materials.includes('Modulo2')).toBe(letter === 'a')
    expect(materials.includes('nullaosta')).toBe(letter === 'm')
    expect(materials.includes('记者注册证明')).toBe(letter === 'q')
  } finally { await reader.destroy() }
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('permesso-helper-v1')!).drafts.at(-1).data)
  expect(saved.application.art27Letter).toBe(letter)
  await page.getByRole('button', { name: '返回', exact: true }).click()
  await page.getByRole('button', { name: '返回', exact: true }).click()
  await expect(page.locator('.application-detail')).toContainText(money)
})
test('C2 A -> M removes work step and Modulo 2 while retaining draft answers', async ({ page }) => {
  await start(page)
  await chooseLetter(page, 'a')
  await expect(page.locator('.stepper button')).toHaveCount(5)
  const sample = exampleApplication('17')
  for (let step = 0; step < 4; step++) {
    await fillStep(page, sample)
    await page.getByRole('button', { name: '保存并下一步', exact: true }).click()
    await expect(page.locator('.error-summary')).toHaveCount(0)
  }
  await page.locator('.stepper button').first().click()
  await chooseLetter(page, 'm')
  await expect(page.locator('.stepper button')).toHaveCount(4)
  await expect(page.locator('.stepper')).not.toContainText('工作与收入')
  for (let step = 0; step < 3; step++) {
    await page.getByRole('button', { name: '保存并下一步', exact: true }).click()
    await expect(page.locator('.error-summary')).toHaveCount(0)
  }
  await page.getByRole('button', { name: '生成参考件', exact: true }).click()
  await expect(page.getByRole('link', { name: '下载 PDF' })).toBeVisible({ timeout: 60_000 })
  await expect(page.getByRole('button', { name: 'Modulo 2', exact: true })).toHaveCount(0)
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('permesso-helper-v1')!).drafts.at(-1).data)
  expect(saved.application.art27Letter).toBe('m')
  expect(saved.work.contract).toBe('determinato') // draft retains answers for later edits
})
