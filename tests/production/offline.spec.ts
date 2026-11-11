import { expect, test } from '@playwright/test'
import { seed, noOverflow } from '../browser/fixtures'

for (const width of [390, 1280]) test(`production ${width}px: first generation and regeneration need no requests after startup`, async ({ page, context, baseURL }) => {
  await page.setViewportSize({ width, height: 1000 })
  const errors: string[] = [], initial: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('request', (request) => initial.push(request.url()))
  // A fresh context and the production server: no previous PDF or HTTP cache.
  await seed(page, 0, baseURL!)
  await page.waitForLoadState('networkidle')
  const origin = new URL(baseURL!).origin, prefix = new URL(baseURL!).pathname
  expect(initial.every((url) => url.startsWith(`${origin}${prefix}`))).toBe(true)
  for (const name of [/Modulo_1.*\.pdf/, /bollettino.*\.jpg/, /\.ttf$/, /\.wasm$/, /pdf\.worker.*\.mjs$/]) {
    expect(initial.some((url) => name.test(url))).toBe(true)
  }
  const late: string[] = []
  // Disabling the HTTP cache and aborting all routes catches attempts even when
  // they would normally succeed from the browser's cache.
  await context.route('**/*', async (route) => { late.push(route.request().url()); await route.abort() })
  page.on('request', (request) => late.push(request.url()))
  await page.locator('.application-card').click()
  if (width >= 1024) await page.locator('.application-row').first().click()
  await page.getByRole('button', { name: '修改填写', exact: true }).click()
  await page.locator('#q-questura-city').click()
  await page.getByRole('combobox').fill('MI')
  await page.getByRole('option').filter({ has: page.locator('small', { hasText: /^MI$/ }) }).click()
  await page.getByRole('button', { name: '保存并下一步', exact: true }).click()
  await page.locator('#q-person-birthCity').fill('Citta Fittizia')
  // Already completed demo steps permit revisiting the final page.
  for (;;) {
    const generate = page.getByRole('button', { name: '生成参考件', exact: true })
    if (await generate.count()) { await generate.click(); break }
    await page.getByRole('button', { name: '保存并下一步', exact: true }).click()
    await expect(page.locator('.error-summary')).toHaveCount(0)
  }
  const link = page.getByRole('link', { name: '下载 PDF' })
  await expect(link).toBeVisible({ timeout: 60_000 })
  await expect(page.locator('.preview-status')).toHaveText('')
  for (const group of ['Modulo 1', 'Modulo 2', '缴费单', '材料']) {
    await page.getByRole('button', { name: group, exact: true }).click()
    await expect(page.locator('.preview-status')).toHaveText('')
  }
  await page.getByRole('button', { name: '上一页', exact: true }).click()
  const pending = page.waitForEvent('download'); await link.click()
  expect((await pending).suggestedFilename()).toMatch(/\.pdf$/)
  await page.getByRole('button', { name: '返回', exact: true }).click()
  // Leave the form, then clone: this bypasses the generated-PDF cache.
  await page.getByRole('button', { name: '返回', exact: true }).click()
  await page.getByRole('button', { name: '复制为新申请', exact: true }).click()
  await page.getByRole('button', { name: '生成参考件', exact: true }).click()
  await expect(link).toBeVisible({ timeout: 60_000 })
  await expect(page.locator('.preview-status')).toHaveText('')
  await noOverflow(page)
  expect(late).toEqual([])
  expect(errors).toEqual([])
})
