import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { chromium } from '@playwright/test'

if (!process.env.D42_APPROVED_UPDATE) throw new Error('更新原型截图前须用户同意，D42_APPROVED_UPDATE 必须记录原因')
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ deviceScaleFactor: 1, reducedMotion: 'reduce' })
  for (const [name, width, state] of [['mobile-preview', 390, '普通状态'], ['error-preview', 390, '报错状态'], ['desktop-preview', 1100, '普通状态']] as const) {
    await page.setViewportSize({ width, height: width === 1100 ? 1000 : 844 })
    await page.goto(process.argv[2] ?? 'http://127.0.0.1:4319/designs/soft-neumorphism/')
    await page.getByRole('button', { name: state, exact: true }).click()
    const path = `designs/soft-neumorphism/${name}.png`
    if (width === 1100 || state === '报错状态') await page.screenshot({ path, fullPage: true, animations: 'disabled' })
    else await page.locator('.phone').screenshot({ path, animations: 'disabled' })
  }
} finally { await browser.close() }
const path = 'tests/fixtures/approved-visual-sha.json'
const hashes = JSON.parse(readFileSync(path, 'utf8')) as Record<string, string>
for (const file of Object.keys(hashes)) hashes[file] = createHash('sha256').update(readFileSync(file)).digest('hex')
writeFileSync(path, JSON.stringify(hashes, null, 2) + '\n')
