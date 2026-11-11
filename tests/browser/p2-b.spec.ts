import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { DOMMatrix, ImageData, Path2D } from '@napi-rs/canvas'
import { expect, test } from '@playwright/test'
import applicationTypes from '../../data/application-types.json' with { type: 'json' }
import { exampleApplication } from '../../src/demo/applications'
import { noOverflow, seed } from './fixtures'
import { fillStep } from './fill-questionnaire'

const amounts: Record<string, string> = { '10': '€30,46', '18': '€70,46', '21': '€70,46', '06': '€70,46', '02': '€30,46' }
for (const type of applicationTypes.types.filter((type) => ['10', '18', '21', '06', '02'].includes(type.code))) {
  for (const operation of type.operations) test(`P2 B ${type.code} ${operation}: new application -> questionnaire -> reference PDF`, async ({ page }) => {
    await seed(page)
    await page.getByRole('button', { name: '新建申请', exact: true }).click()
    await page.getByRole('button', { name: '新建一个人的申请', exact: true }).click()
    const group = operation === 'rilascio' ? '第一次申请 RILASCIO' : operation === 'conversione' ? '更新、补发、转换 AGGIORNAMENTO' : '续签 RINNOVO'
    const card = page.locator('.group-card').filter({ has: page.getByRole('heading', { name: group, exact: true }) })
    await card.getByRole('button', { name: new RegExp(type.titleZh ?? type.nameZh) }).click()
    await expect(page.locator('.notice').filter({ hasText: type.noteZh! })).toBeVisible()
    if (type.code === '21' || type.code === '06') await expect(page.getByRole('radio', { name: operation === 'rilascio' ? '第一次申请 · Rilascio' : '续签 · Rinnovo', exact: true })).toBeChecked()
    const sample = exampleApplication(type.code, operation as 'rilascio' | 'rinnovo' | 'conversione')
    if (type.code === '21') {
      await expect(page.locator('#q-visa-number')).toHaveCount(operation === 'rilascio' ? 1 : 0)
      await expect(page.locator('#q-currentPermit-number')).toHaveCount(operation === 'rilascio' ? 0 : 1)
    }
    const count = await page.locator('.stepper button').count()
    for (let step = 0; step < count; step++) {
      if (type.code === '18' && step === 3) {
        await expect(page.locator('#q-work-type input')).toHaveCount(1)
        await expect(page.locator('#q-work-contract input')).toHaveCount(1)
      }
      if (type.code === '21' && step === 3) {
        await expect(page.locator('#q-work-type')).toHaveCount(0)
        // Required income prevents moving on before it is answered.
        await page.getByRole('button', { name: '保存并下一步', exact: true }).click()
        await expect(page.locator('.error-summary')).toContainText('年收入')
      }
      if (type.code === '02' && step === count - 1) await expect(page.locator('.notice')).not.toContainText('印花税票贴')
      await fillStep(page, sample)
      await noOverflow(page)
      await page.getByRole('button', { name: step === count - 1 ? '生成参考件' : '保存并下一步', exact: true }).click()
      await expect(page.locator('.error-summary')).toHaveCount(0)
    }
    const downloadLink = page.getByRole('link', { name: '下载 PDF' })
    await expect(downloadLink).toBeVisible({ timeout: 60_000 })
    await expect(page.locator('.preview-status')).toHaveText('')
    const pending = page.waitForEvent('download'); await downloadLink.click()
    mkdirSync('output/p2-b', { recursive: true })
    const pdfPath = `output/p2-b/${type.code}-${operation}.pdf`
    await (await pending).saveAs(pdfPath)
    Object.assign(globalThis, { DOMMatrix, ImageData, Path2D })
    const { getDocument, OPS } = await import('pdfjs-dist/legacy/build/pdf.mjs')
    const reader = getDocument({ data: new Uint8Array(readFileSync(pdfPath)), useSystemFonts: true })
    try {
      const document = await reader.promise
      const textAt = async (n: number) => (await (await document.getPage(n)).getTextContent()).items.map((item) => 'str' in item ? item.str : '').join('').replace(/\s/g, '')
      const cover = await textAt(1), materials = await textAt(document.numPages)
      expect(cover).toContain(amounts[type.code])
      expect(cover).toContain('ÉsempioFittìzio')
      expect(materials).toContain('材料清单')
      expect(document.numPages).toBeGreaterThan(type.moduli === '1' ? 9 : 12)
      const operators = await (await document.getPage(2)).getOperatorList()
      const stampBoxMarked = operators.fnArray.some((fn, i) => fn === OPS.setStrokeRGBColor && operators.argsArray[i][0] === '#b5532a')
      expect(stampBoxMarked).toBe(type.stampExempt !== true)
      if (type.code === '02') {
        expect(cover + materials).not.toMatch(/印花税票|€16|Marcada bollo/i)
        await page.getByRole('button', { name: 'Modulo 1', exact: true }).click()
        await expect(page.locator('.preview-status')).toHaveText('')
        await expect(page.locator('.notice')).toHaveCount(0)
        await page.screenshot({ path: 'output/p2-b/02-modulo1.png', fullPage: true })
        writeFileSync('output/p2-b/02-text.json', JSON.stringify({ cover, materials }, null, 2))
      } else expect(cover).toContain('印花税票€16,00')
    } finally { await reader.destroy() }
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('permesso-helper-v1')!))
    expect(saved.drafts.at(-1).data.application.operation).toBe(operation)
    if (type.code === '18') expect(saved.drafts.at(-1).data.application.expectedDurationMonths).toBe(9)
    await page.getByRole('button', { name: '返回', exact: true }).click()
    await page.getByRole('button', { name: '返回', exact: true }).click()
    await expect(page.locator('.application-detail')).toContainText(amounts[type.code]!)
    if (type.code === '02') await expect(page.locator('.application-detail')).not.toContainText('印花税票')
  })
}
