import applicationTypes from '../../data/application-types.json' with { type: 'json' }
import { expect, test } from '@playwright/test'
import { seed, noOverflow } from './fixtures'

async function selection(page: import('@playwright/test').Page) {
  await seed(page)
  await page.getByRole('button', { name: '新建申请', exact: true }).click()
  await page.getByRole('button', { name: '新建一个人的申请', exact: true }).click()
}

test('P2 student can choose first issue or renewal and working controls extra steps', async ({ page }) => {
  await selection(page)
  await expect(page.getByText(`当前开放 ${applicationTypes.types.length} 种`, { exact: false })).toBeVisible()
  const first = page.locator('.group-card').filter({ has: page.getByRole('heading', { name: '第一次申请 RILASCIO' }) })
  await first.getByRole('button', { name: /学习（大学）/ }).click()
  await expect(page.getByRole('radio', { name: '第一次申请 · Rilascio', exact: true })).toBeChecked()
  await expect(page.locator('#q-visa-entryDate')).toBeVisible()
  await expect(page.locator('#q-visa-validFrom')).toBeVisible()
  await expect(page.locator('#q-currentPermit-number')).toHaveCount(0)
  const working = page.locator('#q-study-working')
  await working.getByRole('radio', { name: '是', exact: true }).check()
  await expect(page.locator('.stepper button')).toHaveCount(6)
  await working.getByRole('radio', { name: '否', exact: true }).check()
  await expect(page.locator('.stepper button')).toHaveCount(4)
  await noOverflow(page)
})

for (const name of ['学习（大学）', '学生（成年人读高中、技术培训课程）']) test(`D46 ${name} group defaults, search by name and group, and later operation changes`, async ({ page }) => {
  await selection(page)
  const student = page.getByRole('button', { name: new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) })
  await expect(student).toHaveCount(2)
  const search = page.getByRole('searchbox', { name: '搜索申请类型' })
  // A name search keeps both groups; only a group-name search narrows to one (walkthrough 2026-11-10 #4).
  await search.fill(name); await expect(student).toHaveCount(2)
  await search.fill('第一次申请'); await expect(student).toHaveCount(1)
  await search.fill('')
  const renew = page.locator('.group-card').filter({ has: page.getByRole('heading', { name: '续签 RINNOVO', exact: true }) })
  await renew.getByRole('button', { name: new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) }).click()
  await expect(page.getByRole('radio', { name: '续签 · Rinnovo', exact: true })).toBeChecked()
  await expect(page.locator('#q-currentPermit-number')).toBeVisible()
  await expect(page.locator('#q-visa-entryDate')).toHaveCount(0)
  await page.getByRole('radio', { name: '第一次申请 · Rilascio', exact: true }).check()
  await expect(page.locator('#q-visa-entryDate')).toBeVisible()
  await expect(page.locator('#q-currentPermit-number')).toHaveCount(0)
  await page.getByRole('radio', { name: '续签 · Rinnovo', exact: true }).check()
  await expect(page.locator('#q-currentPermit-number')).toBeVisible()
  await noOverflow(page)
})

test('P2 family first issue is notice-only; renewal asks sponsor date', async ({ page }) => {
  await selection(page)
  await page.getByRole('button', { name: /家庭居留续签 Famiglia$/, exact: false }).click()
  await page.getByRole('button', { name: '第一次申请 · Rilascio', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('表格由 Sportello Unico 填写，不需要自己填')
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('permesso-helper-v1')!).drafts.length)).toBe(1)
  await page.getByRole('button', { name: '续签 · Rinnovo', exact: true }).click()
  await expect(page.locator('#q-family-sponsorPermitValidUntil')).toBeVisible()
  await expect(page.locator('.stepper button')).toHaveCount(4)
})
