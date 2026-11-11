import { mkdirSync, writeFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import { form } from './fixtures'

function luminance(rgb: string): number {
  const parts = rgb.match(/[\d.]+/g)!.slice(0, 3).map((v) => {
    const value = Number(v) / 255
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  })
  return parts[0]! * 0.2126 + parts[1]! * 0.7152 + parts[2]! * 0.0722
}

// D44 keeps evidence collection and adds the approved current-text threshold.
test('D44 readability audit: forced colors, OS text scaling and current text contrast', async ({ page }, testInfo) => {
  await form(page)
  mkdirSync('output/d42-audit', { recursive: true })
  const sample = async () => page.evaluate(() => {
    const input = document.querySelector<HTMLInputElement>('#q-person-surname')!
    const styles = getComputedStyle(input)
    const current = getComputedStyle(document.querySelector('.stepper [aria-current]')!)
    const elements = ['.paper-label', '.hint', '.stepper button>span:last-child', '.date-parts input', '.form-actions .secondary', '.form-actions .primary']
    return {
      input: { borderColor: styles.borderTopColor, borderWidth: styles.borderTopWidth, boxShadow: styles.boxShadow, background: styles.backgroundColor, color: styles.color },
      accent: current.color, surface: getComputedStyle(document.documentElement).backgroundColor,
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
      text: elements.map((selector) => {
        const element = document.querySelector<HTMLElement>(selector)!, style = getComputedStyle(element), rect = element.getBoundingClientRect()
        return { selector, fontSize: style.fontSize, width: rect.width, height: rect.height, clippedHorizontally: element.scrollWidth > element.clientWidth + 1, clippedVertically: element.scrollHeight > element.clientHeight + 1 }
      }),
    }
  })
  const normal = await sample()
  const contrast = (Math.max(luminance(normal.accent), luminance(normal.surface)) + 0.05) / (Math.min(luminance(normal.accent), luminance(normal.surface)) + 0.05)
  expect(contrast).toBeGreaterThanOrEqual(4.5)
  await page.emulateMedia({ forcedColors: 'active' })
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))))
  const forcedColors = await sample()
  await page.screenshot({ path: 'output/d42-audit/forced-colors.png' })
  await page.emulateMedia({ forcedColors: 'none' })
  const cdp = await page.context().newCDPSession(page)
  await cdp.send('Emulation.setEmulatedVisionDeficiency', { type: 'reducedContrast' })
  await page.screenshot({ path: 'output/d42-audit/reduced-contrast.png' })
  await cdp.send('Emulation.setEmulatedVisionDeficiency', { type: 'none' })
  await cdp.send('Emulation.setEmulatedOSTextScale', { scale: 2 })
  const osTextScale200 = await sample()
  await page.screenshot({ path: 'output/d42-audit/os-text-scale-200.png', fullPage: true })
  await cdp.send('Emulation.setEmulatedOSTextScale', { scale: 1 })
  // Fixed px text may not respond to the OS override on this platform. Also
  // stress every rendered font at 200%, confined to this test page.
  await page.evaluate(() => {
    const sizes = Array.from(document.querySelectorAll<HTMLElement>('body *')).map((element) => [element, parseFloat(getComputedStyle(element).fontSize)] as const)
    sizes.forEach(([element, size]) => element.style.setProperty('font-size', `${size * 2}px`, 'important'))
  })
  const textStress200 = await sample()
  await page.screenshot({ path: 'output/d42-audit/text-stress-200.png', fullPage: true })
  const report = { normal, forcedColors, osTextScale200, textStress200, accentContrast: contrast, meetsSmallText45: contrast >= 4.5, limitations: ['Reduced-contrast emulation is not a real bright-sunlight test.', 'OS text scaling is Chromium emulation, not physical iOS/Android testing.', '200% stress changes only this browser test DOM, never application styles.'] }
  writeFileSync('output/d42-audit/report.json', JSON.stringify(report, null, 2))
  await testInfo.attach('D42 report-only findings', { body: JSON.stringify(report, null, 2), contentType: 'application/json' })
})
