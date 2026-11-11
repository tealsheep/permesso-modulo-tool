import { defineConfig } from '@playwright/test'

// First-time creation is authorized by D42. Replacing approved images requires
// an explicit reason supplied only after user approval (see README).
const update = process.argv.find((arg) => arg.startsWith('--update-snapshots'))
if (update && update !== '--update-snapshots=missing' && !process.env.D42_APPROVED_UPDATE) {
  throw new Error('D42: 更新已有基准前须用户同意，并用 D42_APPROVED_UPDATE 记录原因。首次创建使用 --update-snapshots=missing。')
}
export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 90_000,
  outputDir: 'output/playwright',
  reporter: [['list'], ['html', { outputFolder: 'output/playwright-report', open: 'never' }]],
  updateSnapshots: 'none',
  snapshotPathTemplate: '{testDir}/__screenshots__/{projectName}/{arg}{ext}',
  expect: { timeout: 10_000, toHaveScreenshot: { animations: 'disabled', caret: 'hide', scale: 'css', threshold: 0.1, maxDiffPixelRatio: 0.001 } },
  use: { baseURL: 'http://127.0.0.1:4315', viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, locale: 'zh-CN', timezoneId: 'Europe/Rome', colorScheme: 'light', reducedMotion: 'reduce', trace: 'retain-on-failure' },
  projects: [{ name: `chromium-${process.platform}`, use: { browserName: 'chromium' } }],
  webServer: { command: 'npm run dev -- --port 4315 --strictPort', url: 'http://127.0.0.1:4315', reuseExistingServer: false, timeout: 30_000 },
})
