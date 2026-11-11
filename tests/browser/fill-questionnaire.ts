import type { Page } from '@playwright/test'
import type { exampleApplication } from '../../src/demo/applications'
function answers(value: unknown, prefix = ''): [string, string | number | boolean][] {
  if (value === null || value === undefined) return []
  if (typeof value !== 'object') return [[prefix, value as string | number | boolean]]
  return Object.entries(value).flatMap(([key, child]) => answers(child, prefix ? `${prefix}.${key}` : key))
}
// Fill actual controls; complete applications are never injected.
export async function fillStep(page: Page, sample: ReturnType<typeof exampleApplication>) {
  for (const [path, value] of answers(sample)) {
    if (path === 'application.operation' || path.startsWith('address.phone')) continue
    const field = page.locator(`#q-${path.replace(/[^\w-]/g, '-')}`)
    if (!await field.count()) continue
    const tag = await field.evaluate((element) => element.tagName)
    if (tag === 'FIELDSET') {
      const [year, month, day] = String(value).split('-')
      await field.getByRole('textbox', { name: '日', exact: true }).fill(day!)
      await field.getByRole('textbox', { name: '月', exact: true }).fill(month!)
      await field.getByRole('textbox', { name: '年', exact: true }).fill(year!)
    } else if (tag === 'INPUT') await field.fill(String(path.endsWith('Cents') ? Number(value) / 100 : value))
    else if (await field.getAttribute('role') === 'radiogroup') await field.locator(`input[value="${value}"]`).check()
    else if (tag === 'SELECT') await field.selectOption(String(value))
    else if (tag === 'BUTTON') {
      if (!await field.evaluate((element) => element.classList.contains('search-select'))) await field.click()
      await field.click()
      const code = path === 'questura.city' ? sample.questura!.province : value
      await page.getByRole('combobox').fill(String(code))
      await page.getByRole('option').filter({ has: page.locator('small', { hasText: new RegExp('^'+String(code)+'$') }) }).click()
    }
  }
}
