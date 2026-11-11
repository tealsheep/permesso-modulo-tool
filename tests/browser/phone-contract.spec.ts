import { expect, test } from '@playwright/test'
import { noOverflow, seed } from './fixtures'

test('phones share one row; mobile prefix advances and pasted full numbers split atomically', async ({ page }) => {
  await seed(page, 2); await page.locator('.application-card').click(); await page.getByRole('button', { name: '修改填写', exact: true }).click()
  const prefix = page.getByRole('textbox', { name: '手机号前缀', exact: true }), number = page.getByRole('textbox', { name: '手机号号码', exact: true })
  await prefix.fill(''); await prefix.pressSequentially('351'); await expect(number).toBeFocused()
  await prefix.evaluate((input) => { const clipboardData = new DataTransfer(); clipboardData.setData('text/plain', '3510000000'); input.dispatchEvent(new ClipboardEvent('paste', { clipboardData, bubbles: true, cancelable: true })) })
  await expect(prefix).toHaveValue('351'); await expect(number).toHaveValue('0000000')
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('permesso-helper-v1')!).drafts[0].data.address.phoneMobile)).toEqual({ prefisso: '351', numero: '0000000' })
  const fixed = page.getByRole('textbox', { name: '固定电话区号', exact: true })
  await fixed.fill('055'); await expect(fixed).toBeFocused()
  await fixed.evaluate((input) => { const clipboardData = new DataTransfer(); clipboardData.setData('text/plain', '0550000000'); input.dispatchEvent(new ClipboardEvent('paste', { clipboardData, bubbles: true, cancelable: true })) })
  await expect(page.getByRole('textbox', { name: '固定电话号码', exact: true })).toHaveValue('')
  for (const width of [320, 390, 1100]) {
    await page.setViewportSize({ width, height: 844 }); await noOverflow(page)
    const left = await prefix.boundingBox(), right = await number.boundingBox()
    expect(left!.y).toBe(right!.y); expect(right!.width).toBeGreaterThan(left!.width * 2)
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.locator('.section-card').filter({ has: prefix }).screenshot({ path: 'output/phone-review/phone.png' })
})

test('contract asks status first, conditionally reveals details and uses data option hints', async ({ page }) => {
  await seed(page, 3); await page.locator('.application-card').click(); await page.getByRole('button', { name: '修改填写', exact: true }).click()
  const group = page.locator('#q-work-contrattoSoggiornoStatus')
  const radios = group.getByRole('radio')
  await expect(radios).toHaveCount(3)
  await radios.nth(0).check(); await expect(page.locator('#q-contrattoSoggiorno-province')).toHaveCount(0)
  await expect(page.getByText('例如凭家庭团聚、学习等其他方式来意大利。这一节跳过。', { exact: true })).toBeVisible()
  await radios.nth(1).check(); await expect(page.locator('#q-contrattoSoggiorno-province')).toBeVisible(); await expect(page.locator('#q-contrattoSoggiorno-date')).toBeVisible()
  await radios.nth(2).check(); await expect(page.locator('#q-contrattoSoggiorno-date')).toHaveCount(0)
  await expect(page.locator('#q-contrattoSoggiorno-mode')).toHaveCount(0)
  await expect(page.locator('[id*=raccomandata]')).toHaveCount(0)
  const income = page.locator('.section-card').filter({ has: page.getByRole('heading', { name: '收入与报税', exact: true }) })
  await expect(income.locator('.field').first()).toContainText('你是今年才入职这份工作的吗？')
  await expect(income).toContainText('不写进表格 · 决定要带哪些材料')
})
