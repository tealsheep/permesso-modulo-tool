import { expect, test } from '@playwright/test'
import { form, noOverflow, savedBirth } from './fixtures'

const runtimeErrors = new WeakMap<object, string[]>()
test.beforeEach(async ({ page }) => {
  const errors: string[] = []; runtimeErrors.set(page, errors)
  page.on('pageerror', (error) => errors.push(error.message))
})
test.afterEach(async ({ page }) => { expect(runtimeErrors.get(page)).toEqual([]) })

test('D41 date drafts do not overwrite valid data or bypass Next', async ({ page }) => {
  await form(page)
  const group = page.locator('#q-person-birthDate')
  await group.getByRole('textbox', { name: '月', exact: true }).fill('')
  await page.locator('#q-person-surname').click()
  await expect(group).toContainText('请把日、月、年都填上')
  expect(await savedBirth(page)).toBe('1990-01-31')
  await page.getByRole('button', { name: '保存并下一步' }).click()
  await expect(page.locator('.stepper [aria-current]')).toContainText('个人与护照')
  await expect(page.locator('.error-summary')).toContainText('请把日、月、年都填上')
  await group.getByRole('textbox', { name: '月', exact: true }).fill('02')
  await page.locator('#q-person-surname').click()
  await expect(group).toContainText('这个日期不存在')
  expect(await savedBirth(page)).toBe('1990-01-31')
  await group.getByRole('textbox', { name: '日', exact: true }).fill('28')
  expect(await savedBirth(page)).toBe('1990-02-28')
  await page.getByRole('button', { name: '保存并下一步' }).click()
  await expect(page.locator('.stepper [aria-current]')).toContainText('住址')
})

test('D41 dates accept three paste formats, auto advance, backspace, and reject future birth', async ({ page }) => {
  await form(page)
  const group = page.locator('#q-person-birthDate'), day = group.getByRole('textbox', { name: '日', exact: true }), month = group.getByRole('textbox', { name: '月', exact: true }), year = group.getByRole('textbox', { name: '年', exact: true })
  for (const text of ['29/02/2000', '29.02.2000', '2000-02-29']) {
    await day.evaluate((input, value) => { const data = new DataTransfer(); data.setData('text/plain', value); input.dispatchEvent(new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true })) }, text)
    await expect(day).toHaveValue('29'); await expect(month).toHaveValue('02'); await expect(year).toHaveValue('2000')
    expect(await savedBirth(page)).toBe('2000-02-29')
  }
  await day.fill(''); await day.pressSequentially('15'); await expect(month).toBeFocused()
  await month.fill(''); await month.press('Backspace'); await expect(day).toBeFocused()
  await month.fill('06'); await year.fill('2030'); await page.locator('#q-person-surname').click()
  await expect(group).toContainText('出生日期不能晚于今天')
  await page.getByRole('button', { name: '保存并下一步' }).click()
  await expect(page.locator('.stepper [aria-current]')).toContainText('个人与护照')
})

for (const width of [390, 1100]) test(`D41 searchable choices, keyboard and focus restoration at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 844 }); await form(page)
  const trigger = page.locator('#q-person-birthCountry')
  await trigger.click()
  const dialog = page.getByRole('dialog'), search = dialog.getByRole('combobox')
  await expect(search).toBeFocused(); await expect(dialog.getByText('常用', { exact: true })).toBeVisible()
  if (width === 390) {
    const box = await dialog.boundingBox(); expect(Math.round(box!.y + box!.height)).toBe(844)
  } else {
    const box = await dialog.boundingBox(), anchor = await trigger.boundingBox()
    expect(Math.abs(box!.x - anchor!.x)).toBeLessThan(2)
  }
  for (const query of ['chn', '中', 'cina']) { await search.fill(query); await expect(dialog.getByRole('option').filter({ hasText: 'CHN' })).toBeVisible() }
  await search.fill('not-a-country'); await expect(dialog.getByRole('status')).toContainText('没有找到')
  await search.fill('ita'); await search.press('Enter'); await expect(dialog).toHaveCount(0); await expect(trigger).toBeFocused(); await expect(trigger).toContainText('ITA')
  await trigger.click(); await search.fill(''); await search.press('ArrowDown')
  const active = await search.getAttribute('aria-activedescendant'); expect(active).toBeTruthy()
  await search.press('ArrowUp'); expect(await search.getAttribute('aria-activedescendant')).not.toBe(active)
  await search.press('Tab'); expect(await page.evaluate(() => document.activeElement?.closest('[role=dialog]') !== null)).toBe(true)
  await page.keyboard.press('Escape'); await expect(trigger).toBeFocused()
  await noOverflow(page)
})

test('D41 province search ignores accents and offers previously used provinces', async ({ page }) => {
  await form(page, 2); await page.locator('#q-address-province').click()
  await expect(page.getByRole('dialog').getByText('常用', { exact: true })).toBeVisible()
  await page.getByRole('combobox').fill('forli'); await expect(page.getByRole('option')).toHaveCount(1)
  await expect(page.getByRole('option')).toContainText(/FORL[IÌ]/i)
  await page.getByRole('combobox').fill('FORLÌ')
  await expect(page.getByRole('option')).toHaveCount(1)
  await page.getByRole('combobox').press('Enter'); await expect(page.locator('#q-address-province')).toContainText(/FORL[IÌ]/i)
})

test('D41 help traps focus, closes outside/Escape/swipe, returns to trigger', async ({ page }) => {
  await form(page)
  const trigger = page.getByRole('button', { name: '姓名与出生资料填写说明' })
  await trigger.click(); const dialog = page.getByRole('dialog')
  await expect(dialog).toContainText('姓名与出生资料')
  await page.keyboard.press('Shift+Tab'); expect(await page.evaluate(() => !!document.activeElement?.closest('[role=dialog]'))).toBe(true)
  await page.keyboard.press('Escape'); await expect(trigger).toBeFocused()
  await trigger.click(); await page.locator('.modal-overlay').click({ position: { x: 10, y: 10 } }); await expect(dialog).toHaveCount(0); await expect(trigger).toBeFocused()
  await trigger.click(); const box = await dialog.locator('.dialog-head').boundingBox()
  await page.mouse.move(box!.x + 20, box!.y + 15); await page.mouse.down(); await page.mouse.move(box!.x + 20, box!.y + 120); await page.mouse.up()
  await expect(dialog).toHaveCount(0); await expect(trigger).toBeFocused()
})

test('D41 incomplete optional date also blocks saving a family member', async ({ page }) => {
  await form(page)
  await page.getByRole('button', { name: '返回', exact: true }).click()
  await page.getByRole('button', { name: '返回', exact: true }).click()
  await page.getByRole('button', { name: /编辑资料 / }).click()
  await page.locator('#q-person-birthDate').getByRole('textbox', { name: '年', exact: true }).fill('20')
  await page.getByRole('button', { name: '保存资料' }).click()
  await expect(page.getByRole('heading', { name: '编辑资料' })).toBeVisible()
  await expect(page.locator('#q-person-birthDate')).toContainText('请把日、月、年都填上')
})

test('D41 remains usable offline and fits a 320px viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 }); await form(page)
  await page.context().setOffline(true)
  await noOverflow(page)
  await page.locator('#q-person-birthCountry').click()
  await page.getByRole('combobox').fill('chn'); await page.getByRole('combobox').press('Enter')
  await page.getByRole('button', { name: '姓名与出生资料填写说明' }).click()
  await expect(page.getByRole('dialog')).toBeVisible(); await page.keyboard.press('Escape')
  await page.locator('#q-person-birthDate').getByRole('textbox', { name: '日', exact: true }).fill('15')
  expect(await savedBirth(page)).toBe('1990-01-15')
  await noOverflow(page)
})

test('review: home note is above navigation and short choices use keyboard radios', async ({ page }) => {
  await form(page)
  const marital = page.locator('#q-person-maritalStatus')
  await expect(marital).toHaveRole('radiogroup')
  await marital.getByRole('radio', { name: /未婚.*Stato libero/ }).check()
  await marital.getByRole('radio', { name: /未婚.*Stato libero/ }).focus()
  await page.keyboard.press('ArrowRight')
  await expect(marital.getByRole('radio', { name: /已婚.*Coniugato/ })).toBeChecked()
  await page.locator('#q-person-refugee').getByRole('radio', { name: '是', exact: true }).check()
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('permesso-helper-v1')!).drafts[0].data.person.refugee)).toBe(true)
  await page.locator('#q-person-refugee').getByRole('radio', { name: '否', exact: true }).check()
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('permesso-helper-v1')!).drafts[0].data.person.refugee)).toBe(false)
  await expect(page.locator('#q-person-refugee').getByRole('radio', { name: '否', exact: true })).toBeChecked()
  await expect(page.locator('#q-document-kind')).toHaveRole('radiogroup')
  await page.locator('#q-person-birthCity').fill('虚构示例城市')
  await page.locator('#q-person-birthCity').blur()
  await expect(page.locator('#q-person-birthCity-error')).toHaveText('出生地（第 38 栏）不能写汉字，请照护照写拼音')
  await page.getByRole('button', { name: '保存并下一步' }).click()
  await expect(page.locator('.error-summary')).toContainText('出生地（第 38 栏）不能写汉字，请照护照写拼音')
  await expect(page.locator('.error-summary')).not.toContainText('M1-038')
  await page.getByRole('button', { name: '返回', exact: true }).click()
  await page.getByRole('button', { name: '返回', exact: true }).click()
  for (const width of [320, 390, 1100]) {
    await page.setViewportSize({ width, height: 844 })
    if (width < 768) {
      const note = await page.locator('.privacy-note').boundingBox(), nav = await page.locator('.bottom-nav').boundingBox()
      expect(note!.y + note!.height).toBeLessThanOrEqual(nav!.y)
    } else await expect(page.locator('.bottom-nav')).toBeHidden()
    await page.locator('.privacy-note').scrollIntoViewIfNeeded()
    await expect(page.locator('.privacy-note')).toBeInViewport()
    await noOverflow(page)
  }
})
