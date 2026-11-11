import { expect, test } from '@playwright/test'
import { form, noOverflow, seed } from './fixtures'

for (const width of [320, 390]) test(`D44 200% relative text keeps step labels separate at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 1000 }); await form(page)
  const label = page.locator('.stepper [aria-current]>span:last-child')
  await expect(label).toHaveCSS('font-size', '10px')
  await expect(label).toHaveCSS('color', 'rgb(153, 67, 39)')
  await expect(page.locator('.stepper [aria-current] .step-dot')).toHaveCSS('color', 'rgb(172, 78, 46)')
  const input = page.locator('#q-person-surname')
  await expect(input).toHaveCSS('border-top-color', 'rgb(211, 200, 188)')
  await input.focus(); await expect(input).toHaveCSS('border-top-color', 'rgb(172, 78, 46)')
  const cdp = await page.context().newCDPSession(page)
  await cdp.send('Page.setFontSizes', { fontSizes: { standard: 32 } })
  await expect(label).toHaveCSS('font-size', '20px')
  await expect(page.locator('.paper-label').first()).toHaveCSS('font-size', '22px')
  const labels = await page.locator('.stepper button>span:last-child').evaluateAll((elements) => elements.map((element) => {
    const rect = element.getBoundingClientRect()
    return { left: rect.left, right: rect.right, clipped: element.scrollWidth > element.clientWidth + 1 }
  }))
  labels.forEach((label, index) => {
    expect(label.clipped).toBe(false)
    if (index) expect(label.left).toBeGreaterThanOrEqual(labels[index - 1]!.right - 1)
  })
  await noOverflow(page)
  // The new working-student branch is the tightest six-step mobile layout.
  await page.evaluate(() => {
    const store = JSON.parse(localStorage.getItem('permesso-helper-v1')!)
    store.drafts[0].data.application.code = '24'; store.drafts[0].data.study = { working: true }
    localStorage.setItem('permesso-helper-v1', JSON.stringify(store))
  })
  await page.reload(); await page.locator('.application-card').click()
  await page.getByRole('button', { name: '修改填写', exact: true }).click()
  await cdp.send('Page.setFontSizes', { fontSizes: { standard: 32 } })
  await expect(page.locator('.stepper button')).toHaveCount(6)
  const studentLabels = await page.locator('.stepper button>span:last-child').evaluateAll((elements) => elements.map((element) => {
    const rect = element.getBoundingClientRect()
    return { left: rect.left, right: rect.right, clipped: element.scrollWidth > element.clientWidth + 1 }
  }))
  studentLabels.forEach((label, index) => {
    expect(label.clipped).toBe(false)
    if (index) expect(label.left).toBeGreaterThanOrEqual(studentLabels[index - 1]!.right - 1)
  })
  await noOverflow(page)
})

test('D44 desktop 200% dates do not overlap adjacent row content', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 1000 }); await seed(page)
  const date = page.locator('.row-date')
  await expect(date).toHaveCSS('font-size', '11px')
  const cdp = await page.context().newCDPSession(page)
  await cdp.send('Page.setFontSizes', { fontSizes: { standard: 32 } })
  await expect(date).toHaveCSS('font-size', '22px')
  const boxes = await page.locator('.application-row').evaluate((row) => {
    const date = row.querySelector<HTMLElement>('.row-date')!
    const contents = document.createRange(); contents.selectNodeContents(date)
    return { date: date.getBoundingClientRect().toJSON(), text: contents.getBoundingClientRect().toJSON(), before: row.querySelector('.row-progress')!.getBoundingClientRect().toJSON(), after: row.querySelector('.badge')!.getBoundingClientRect().toJSON() }
  })
  expect(boxes.text.left).toBeGreaterThanOrEqual(boxes.before.right)
  expect(boxes.text.right).toBeLessThanOrEqual(boxes.after.left)
  expect(boxes.text.bottom).toBeLessThanOrEqual(boxes.date.bottom + 1)
  await noOverflow(page)
})
