import { defineConfig } from '@playwright/test'
import { pagesBase } from './scripts/deployment'

const base = pagesBase(process.env.VITE_BASE_PATH)
export default defineConfig({
  testDir: './tests/production', workers: 1, retries: 0, timeout: 90_000,
  outputDir: 'output/production-tests', reporter: 'list',
  use: { baseURL: `http://127.0.0.1:4317${base}`, viewport: { width: 390, height: 844 },
    locale: 'zh-CN', timezoneId: 'Europe/Rome', trace: 'retain-on-failure' },
  webServer: { command: 'npm run preview -- --port 4317 --strictPort',
    url: `http://127.0.0.1:4317${base}`, reuseExistingServer: false },
})
