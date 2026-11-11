import { expect } from '@playwright/test'
import type { Page } from '@playwright/test'
import { exampleApplication } from '../../src/demo/applications'

export const fixedTime = new Date('2026-11-06T12:00:00+01:00')
export async function seed(page: Page, step = 0, path = '/') {
  await page.clock.setFixedTime(fixedTime)
  const application = exampleApplication('16')
  const store = {
    version: 1, familyIntroDismissed: true,
    drafts: [{ id: 'visual-fictional-draft', data: application, step, completed: ['application', 'person', 'address', 'work'], updatedAt: fixedTime.toISOString(), checks: [] }],
    members: [{ id: 'visual-fictional-member', role: 'applicant', data: application }],
  }
  await page.goto(path)
  await page.evaluate((value) => localStorage.setItem('permesso-helper-v1', JSON.stringify(value)), store)
  await page.reload()
  await expect(page.locator('.application-card')).toBeVisible()
}
export async function form(page: Page, step = 1) {
  await seed(page, step)
  await page.locator('.application-card').click()
  await page.getByRole('button', { name: '修改填写', exact: true }).click()
  await expect(page.locator('.stepper [aria-current]')).toContainText(step === 1 ? '个人与护照' : step === 0 ? '申请信息' : step === 2 ? '住址' : step === 3 ? '工作与收入' : '家属与关联申请')
}
export async function savedBirth(page: Page) {
  return page.evaluate(() => JSON.parse(localStorage.getItem('permesso-helper-v1')!).drafts[0].data.person.birthDate)
}
export async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
}
