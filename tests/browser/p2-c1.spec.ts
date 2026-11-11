import { mkdirSync, readFileSync } from 'node:fs'
import { DOMMatrix, ImageData, Path2D } from '@napi-rs/canvas'
import { expect, test } from '@playwright/test'
import { c1Scenarios } from '../../src/demo/c1'
import applicationTypes from '../../data/application-types.json' with { type: 'json' }
import { seed, noOverflow } from './fixtures'
import { fillStep } from './fill-questionnaire'

for (const { id, code, operation, amount, second, application } of c1Scenarios) test(`C1 ${id}: new application -> real questionnaire -> downloaded PDF`, async ({ page }) => {
  await seed(page)
  await page.getByRole('button', { name: '新建申请', exact: true }).click()
  await page.getByRole('button', { name: '新建一个人的申请', exact: true }).click()
  const type = applicationTypes.types.find((type) => type.code === code)!
  const group = operation === 'rinnovo' ? '续签 RINNOVO' : '第一次申请 RILASCIO' // 28 conversione stays in the first-application group (D55)
  const card = page.locator('.group-card').filter({ has: page.getByRole('heading', { name: group, exact: true }) })
  await card.getByRole('button', { name: new RegExp(type.titleZh ?? type.nameZh) }).click()
  const visa = ['32', '33', '19', '20'].includes(code) && operation === 'rilascio'
  await expect(page.locator('#q-visa-number')).toHaveCount(visa ? 1 : 0)
  await expect(page.locator('#q-currentPermit-number')).toHaveCount(visa ? 0 : 1)
  if (type.operations.length > 1) await expect(page.getByRole('radio', { name: operation === 'rilascio' ? '第一次申请 · Rilascio' : '续签 · Rinnovo', exact: true })).toBeChecked()
  if (type.noteZh) await expect(page.locator('.notice').filter({ hasText: type.noteZh })).toBeVisible()
  if (code === '28') await expect(page.locator('#q-employmentCentre-registrationDate')).toBeVisible()
  // Fill visible controls from scratch. Recount steps after student-working is set.
  for (let step = 0; ; step++) {
    if (code === '07' && step === 1) await expect(page.locator('#q-person-refugee input[value="true"]')).toBeChecked()
    await fillStep(page, application)
    if (code === '07' && step === 1) {
      await expect(page.locator('#q-document-otherCode')).toBeVisible()
      await expect(page.locator('#q-document-kind input[value="other"]')).toBeChecked()
    }
    await noOverflow(page)
    const last = step === await page.locator('.stepper button').count() - 1
    await page.getByRole('button', { name: last ? '生成参考件' : '保存并下一步', exact: true }).click()
    await expect(page.locator('.error-summary')).toHaveCount(0)
    if (last) break
  }
  const link = page.getByRole('link', { name: '下载 PDF' })
  await expect(link).toBeVisible({ timeout: 60_000 })
  await expect(page.locator('.preview-status')).toHaveText('')
  await expect(page.getByRole('button', { name: 'Modulo 2', exact: true })).toHaveCount(second ? 1 : 0)
  const pending = page.waitForEvent('download')
  await link.click()
  mkdirSync('output/p2-c1', { recursive: true })
  const path = `output/p2-c1/${id}.pdf`
  await (await pending).saveAs(path)
  Object.assign(globalThis, { DOMMatrix, ImageData, Path2D })
  const { getDocument } = await import('pdfjs-dist/legacy/build/pdf.mjs')
  const reader = getDocument({ data: new Uint8Array(readFileSync(path)), useSystemFonts: true })
  const money = `€${(amount / 100).toFixed(2).replace('.', ',')}`
  try {
    const document = await reader.promise
    const textAt = async (n: number) => (await (await document.getPage(n)).getTextContent()).items.map((item) => 'str' in item ? item.str : '').join('').replace(/\s/g, '')
    // Long catalog titles/material lists may continue onto a second materials page.
    const billPage = second ? 13 : 10
    expect(document.numPages).toBeGreaterThan(billPage)
    expect(document.numPages).toBeLessThanOrEqual(billPage + 2)
    for (let n = billPage + 1; n <= document.numPages; n++) expect(await textAt(n)).toContain('材料清单')
    expect(await textAt(1)).toContain(money)
    expect(await textAt(1)).toContain('ÉsempioFittìzio')
    expect(await textAt(document.numPages)).toContain('材料清单')
    expect(await textAt(second ? 13 : 10)).toContain(amount === 3046 ? 'TRENTA/46' : 'SETTANTA/46')
    if (code === '28') expect(await textAt(12)).toContain('ESEMPIA')
    if (code === '07') expect(await textAt(billPage + 1)).toContain('旅行证件')
  } finally { await reader.destroy() }
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('permesso-helper-v1')!).drafts.at(-1).data)
  expect(saved.application).toMatchObject({ code, operation })
  if (visa) expect(saved.visa).toMatchObject(application.visa!)
  if (code === '28') expect(saved.employmentCentre).toEqual(application.employmentCentre)
  if (code === '07') expect(saved.document).toMatchObject(application.document!)
  await page.getByRole('button', { name: '返回', exact: true }).click()
  await page.getByRole('button', { name: '返回', exact: true }).click()
  await expect(page.locator('.application-detail')).toContainText(money)
})
