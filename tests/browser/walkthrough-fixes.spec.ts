import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { exampleApplication } from '../../src/demo/applications'
import { seed } from './fixtures'

// Fixes for the 2026-11-10 user walkthrough. All data is fictional.
async function openForm(page: Page, sample = exampleApplication('24'), step = 0) {
  await seed(page, step)
  await page.evaluate((data) => { const value = JSON.parse(localStorage.getItem('permesso-helper-v1')!); value.drafts[0].data = data; value.members[0].data = data; localStorage.setItem('permesso-helper-v1', JSON.stringify(value)) }, sample)
  await page.reload(); await page.locator('.application-card').click(); await page.getByRole('button', { name: '修改填写', exact: true }).click()
}
const saved = (page: Page) => page.evaluate(() => JSON.parse(localStorage.getItem('permesso-helper-v1')!))
const next = (page: Page) => page.getByRole('button', { name: '保存并下一步', exact: true }).click()

test('1. a name too long for the payment slip is not blocked (D58)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 1000 })
  await openForm(page, exampleApplication('24'), 1)
  await page.locator('#q-person-surname').fill('ESEMPIOLUNGHISSIMO FITTIZIO')
  await page.locator('#q-person-givenNames').fill('NOMELUNGO SECONDONOME')
  await next(page)
  await expect(page.locator('.error-summary')).toHaveCount(0)
  await expect(page.getByRole('heading', { name: '住址', exact: true })).toBeVisible()
  await expect(page.locator('main')).not.toContainText('自由文本')
  await expect(page.locator('main')).not.toContainText('B-eseguito')
  expect((await saved(page)).drafts[0].data.person.givenNames).toBe('NOMELUNGO SECONDONOME')
})

test('2. a negative or fractional month count shows a Chinese field error, never a storage failure or Zod text', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 1000 })
  await openForm(page, exampleApplication('24'), 0)
  for (const value of ['-3.5', '0']) {
    await page.locator('#q-application-expectedDurationMonths').fill(value)
    await next(page)
    await expect(page.locator('.error-summary')).toContainText('月数')
    await expect(page.locator('body')).not.toContainText('保存失败')
    await expect(page.locator('body')).not.toContainText('Invalid')
    await expect(page.locator('body')).not.toContainText('application.expectedDurationMonths')
  }
  await page.locator('#q-application-expectedDurationMonths').fill('12')
  await next(page)
  await expect(page.locator('.error-summary')).toHaveCount(0)
  expect((await saved(page)).drafts[0].data.application.expectedDurationMonths).toBe(12)
})

test('3. the picker keeps both name inputs, saves the name, asks for the missing name and skips empty people', async ({ page }) => {
  await openForm(page, exampleApplication('16'), 2)
  const before = (await saved(page)).members.length
  await page.getByRole('button', { name: '从另一人复制住址、电话' }).click()
  await page.getByRole('button', { name: '＋ 添加新的人' }).click()
  await page.getByRole('button', { name: '保存资料' }).click()
  expect((await saved(page)).members.length).toBe(before)
  await page.getByRole('button', { name: '＋ 添加新的人' }).click()
  await page.locator('#q-address-comune').fill('COMUNE FITTIZIO')
  await page.getByRole('button', { name: '保存资料' }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toContainText('请先填写姓或名')
  await expect(dialog).not.toContainText('出生日期')
  await dialog.locator('#q-person-surname').fill('ESEMPIO')
  await expect(dialog.locator('#q-person-givenNames')).toBeVisible()
  await dialog.locator('#q-person-givenNames').fill('COPIA')
  await dialog.getByRole('button', { name: '确认', exact: true }).click()
  await expect(page.getByRole('dialog')).toContainText('ESEMPIO COPIA')
  expect((await saved(page)).members.some((m: { data: { person?: { surname?: string; givenNames?: string } } }) => m.data.person?.surname === 'ESEMPIO' && m.data.person.givenNames === 'COPIA')).toBe(true)
})

test('4. searching 学习 lists the university type under both groups and the count matches the rows', async ({ page }) => {
  await openForm(page, exampleApplication('24'), 0)
  await page.getByRole('button', { name: '返回选申请' }).click()
  await page.getByRole('searchbox', { name: '搜索申请类型' }).fill('学习')
  for (const group of ['续签', '第一次申请']) await expect(page.locator('.group-card').filter({ has: page.getByRole('heading', { name: group }) }).getByRole('button', { name: /学习（大学）/ })).toBeVisible()
  const rows = await page.locator('.group-card .list-row').count()
  await expect(page.locator('.hint[aria-live]')).toContainText(`共 ${rows} 行`)
})

test('5. a permit number longer than the boxes is stopped with the Chinese label and column', async ({ page }) => {
  await openForm(page, exampleApplication('16'), 0)
  await page.locator('#q-currentPermit-number').fill('A'.repeat(45))
  await next(page)
  await expect(page.locator('.error-summary')).toContainText('现在这张居留的卡号（Modulo 1 第 18 栏）最多 14 格，你填了 45 个字符')
})
