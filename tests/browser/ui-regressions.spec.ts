import { expect, test } from '@playwright/test'
import { form, noOverflow } from './fixtures'

test.afterEach(async ({ page }) => { await noOverflow(page) })

for (const width of [390, 1280]) {
  test(`Chinese IME confirmation does not select an option at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    await form(page)
    const country = page.locator('#q-person-birthCountry')
    await country.click()
    const search = page.getByRole('combobox')
    await search.fill('意大利')
    await expect(page.getByRole('option')).toHaveCount(1)
    await search.dispatchEvent('keydown', { key: 'Enter', code: 'Enter', isComposing: true, keyCode: 229 })
    await expect(search).toBeVisible()
    await expect(country).toContainText('CHN')
    await search.press('Enter')
    await expect(search).toHaveCount(0)
    await expect(country).toContainText('ITA')
  })

  test(`reselecting the current reference page finishes loading at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    await form(page, 4)
    await page.getByRole('button', { name: '生成参考件', exact: true }).click()
    const status = page.locator('.preview-status')
    await expect(status).toHaveText('', { timeout: 60000 })
    await page.locator('.document-tabs button').first().click()
    await expect(status).toHaveText('')
    if (width >= 768) {
      await page.locator('.reference-thumbnails button').first().click()
      await expect(status).toHaveText('')
    }
    await page.getByRole('button', { name: '下一页', exact: true }).click()
    await expect(status).toHaveText('', { timeout: 60000 })
    await expect(page.locator('.pager strong')).toContainText('2 /')
  })
}
