import { expect, test } from '@playwright/test'
import { form, noOverflow, seed } from './fixtures'

test.afterEach(async ({ page }) => { await noOverflow(page) })

for (const [state, button] of [['normal', '普通状态'], ['focus', '聚焦状态'], ['error', '报错状态']] as const) {
  test(`D42 prototype ${state}`, async ({ page }) => {
    await page.goto('/designs/soft-neumorphism/')
    await page.getByRole('button', { name: button, exact: true }).click()
    await expect(page.locator('.phone')).toHaveScreenshot(`prototype-${state}.png`)
  })
}
test('D42 home 390px', async ({ page }) => {
  await seed(page); await expect(page).toHaveScreenshot('app-home.png', { fullPage: true })
})
test('D42 application selection 390px', async ({ page }) => {
  await seed(page); await page.getByRole('button', { name: '新建申请', exact: true }).click(); await page.getByRole('button', { name: '新建一个人的申请', exact: true }).click()
  const heading = page.locator('.group-card h2').first(), item = page.locator('.group-card .list-row strong').first()
  expect(await heading.evaluate((element) => getComputedStyle(element).fontSize)).toBe('14px')
  expect(await item.evaluate((element) => getComputedStyle(element).fontSize)).toBe('16px')
  expect(await heading.evaluate((element) => getComputedStyle(element).color)).not.toBe(await item.evaluate((element) => getComputedStyle(element).color))
  await expect(page).toHaveScreenshot('app-selection.png', { fullPage: true, maxDiffPixelRatio: 0 })
})
test('D42 second step normal 390px', async ({ page }) => {
  await form(page)
  await expect(page).toHaveScreenshot('app-step2-normal.png')
})
test('D42 second step error 390px', async ({ page }) => {
  await form(page)
  await page.locator('#q-person-birthCity').fill('虚构示例城市')
  await page.getByRole('button', { name: '保存并下一步' }).click()
  await expect(page.locator('.error-summary')).toBeVisible()
  await expect(page).toHaveScreenshot('app-step2-error.png')
})
test('D42 reference first page 390px', async ({ page }) => {
  await form(page, 4)
  await page.getByRole('button', { name: '生成参考件', exact: true }).click()
  await expect(page.getByRole('link', { name: '下载 PDF' })).toBeVisible({ timeout: 60_000 })
  await expect(page.locator('.preview-status')).toHaveText('', { timeout: 60_000 })
  await expect(page.locator('.paper-viewport canvas')).toHaveAttribute('width', /[1-9]\d+/)
  await expect(page).toHaveScreenshot('app-reference-first.png', { fullPage: true })
})

test('D42 shared surfaces exactly match the approved prototype values', async ({ page, context }) => {
  await form(page)
  const prototype = await context.newPage()
  await prototype.goto('/designs/soft-neumorphism/')
  for (const [appSelector, prototypeSelector, properties] of [
    ['#q-person-surname', '#surname', ['backgroundColor', 'color', 'boxShadow', 'borderRadius', 'borderWidth', 'height', 'paddingLeft', 'fontSize', 'letterSpacing']],
    ['.section-card', '.form-card', ['backgroundColor', 'boxShadow', 'borderRadius', 'paddingTop', 'paddingRight', 'paddingBottom']],
    ['.form-actions .primary', '.footer .primary', ['backgroundColor', 'color', 'boxShadow', 'borderRadius', 'minHeight']],
    ['.page-header .circle', '.app-header .circle', ['backgroundColor', 'boxShadow', 'borderRadius', 'width', 'height']],
  ] as const) {
    const read = (element: Element, names: readonly string[]) => Object.fromEntries(names.map((name) => {
      // The prototype panel is transparent over --surface; the application
      // explicitly paints --surface. Compare their rendered background.
      let surface = element
      if (name === 'backgroundColor') while (surface.parentElement && getComputedStyle(surface).backgroundColor === 'rgba(0, 0, 0, 0)') surface = surface.parentElement
      return [name, getComputedStyle(surface)[name as keyof CSSStyleDeclaration]]
    }))
    expect(await page.locator(appSelector).first().evaluate(read, properties)).toEqual(await prototype.locator(prototypeSelector).first().evaluate(read, properties))
  }
  await page.locator('#q-person-givenNames').focus(); await prototype.locator('#given-name').focus()
  expect(await page.locator('#q-person-givenNames').evaluate((element) => getComputedStyle(element).borderColor)).toBe(await prototype.locator('#given-name').evaluate((element) => getComputedStyle(element).borderColor))
  await page.locator('#q-person-birthCity').fill('虚构城市'); await page.locator('#q-person-birthCity').blur()
  await prototype.getByRole('button', { name: '报错状态' }).click()
  expect(await page.locator('#q-person-birthCity').evaluate((element) => getComputedStyle(element).borderColor)).toBe(await prototype.locator('#city').evaluate((element) => getComputedStyle(element).borderColor))
  await page.locator('#q-person-birthCity').focus(); await prototype.locator('#city').focus()
  expect(await page.locator('#q-person-birthCity').evaluate((element) => getComputedStyle(element).borderColor)).toBe(await prototype.locator('#city').evaluate((element) => getComputedStyle(element).borderColor))
  await prototype.close()
})

test('D43 desktop home 1280px', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 1000 }); await seed(page)
  await expect(page).toHaveScreenshot('app-home-desktop.png', { maxDiffPixelRatio: 0 })
})
test('D43 desktop form 1280px', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 1000 }); await form(page)
  await page.locator('#q-person-surname').focus()
  await expect(page.locator('.paper-focus [role=status]')).toHaveText('', { timeout: 60000 })
  await expect(page).toHaveScreenshot('app-form-desktop.png')
})
test('D43 desktop reference 1280px', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 1000 }); await form(page, 4)
  await page.getByRole('button', { name: '生成参考件', exact: true }).click()
  await expect(page.locator('.preview-status')).toHaveText('', { timeout: 60000 })
  await expect(page.locator('.reference-thumbnails canvas').last()).toHaveAttribute('width', /[1-9]\d+/, { timeout: 60000 })
  await expect(page).toHaveScreenshot('app-reference-desktop.png')
})

// D54: reasons recorded before changing application baselines in HANDOFF.
test('D54 person chooser 390px', async ({ page }) => {
  await seed(page); await page.getByRole('button', { name: '新建申请', exact: true }).click()
  await expect(page).toHaveScreenshot('app-person-chooser.png', { fullPage: true })
})
test('D54 address step 390px', async ({ page }) => {
  await form(page); await page.locator('.stepper button').nth(2).click()
  await expect(page).toHaveScreenshot('app-address.png', { fullPage: true })
})
test('D54 family positions 390px', async ({ page }) => {
  await form(page, 4)
  await expect(page).toHaveScreenshot('app-family.png', { fullPage: true })
})
