import { describe, expect, it } from 'vitest'
import { businessData } from '../src/data/business'
import { exampleApplication, demoAsOf } from '../src/demo/applications'
import { prepareApplication } from '../src/engine/prepare'
import { stepsFor, questionErrors } from '../src/ui/questionnaire'
import { displayGroups } from '../src/ui/selection'
import { emptyStore, trySaveStore } from '../src/storage/store'
import { readFile } from 'node:fs/promises'
import { modulo1, modulo2Layout, bollettino } from '../src/data/catalog'
import { renderApplication } from '../src/render/application'

const [modulo1Pdf, bollettinoImage] = await Promise.all([readFile(modulo1.source), readFile(bollettino.source)])
async function generateReferenceDocuments(a: unknown) {
  const kit = prepareApplication(a, businessData, demoAsOf)
  if (kit.kind !== 'kit') throw new Error(kit.message)
  return (await renderApplication(kit, { modulo1Pdf, bollettinoImage }, modulo2Layout)).documents.length
}

type App = ReturnType<typeof exampleApplication>
const errorsFor = (a: App, path: string) =>
  questionErrors(a, stepsFor(a).flatMap((s) => s.sections.flatMap((s) => s.fields)).filter((f) => f.path === path), demoAsOf)
const longName = 'Esempiolunghissimo Fittizio'

describe('1. a name or street that does not fit the payment slip (D58)', () => {
  const long = () => { const a = exampleApplication('24'); a.person!.surname = longName; a.person!.givenNames = 'Nomelungo Secondonome'; a.address!.street = 'Via Esempio Fittizio Molto Lungo Della Prova'; return a }
  it('is not blocked in the questionnaire', () => {
    const a = long()
    expect(errorsFor(a, 'person.givenNames')).toEqual([])
    expect(errorsFor(a, 'person.surname')).toEqual([])
    expect(errorsFor(a, 'address.street')).toEqual([])
  })
  it('keeps the full text on both forms and explains the smaller type on the slip', () => {
    const kit = prepareApplication(long(), businessData, demoAsOf)
    if (kit.kind !== 'kit') throw new Error(kit.message)
    const shrunk = kit.warnings.filter((w) => w.code === 'shrunk').map((w) => w.message)
    expect(shrunk.some((m) => m.includes('缴款人姓名') && m.includes('缴费单') && m.includes('第一个名字'))).toBe(true)
    expect(shrunk.some((m) => m.includes('缩写') && m.includes('Modulo 1 上照常写全称'))).toBe(true)
    expect(JSON.stringify(kit)).toContain('VIA ESEMPIO FITTIZIO MOLTO LUNGO DELLA PROVA')
  })
  it('renders the long text instead of throwing', async () => {
    await expect(generateReferenceDocuments(long())).resolves.toBeGreaterThan(0)
  })
  it('cuts only what cannot fit even at the smallest type, and says so', async () => {
    const a = long(); a.address!.street = 'Via ' + 'Esempio '.repeat(12).trim()
    const kit = prepareApplication(a, businessData, demoAsOf)
    if (kit.kind !== 'kit') throw new Error(kit.message)
    expect(kit.warnings.some((w) => w.code === 'shrunk' && w.message.includes('仍只写得下前'))).toBe(true)
    await expect(generateReferenceDocuments(a)).resolves.toBeGreaterThan(0)
  })
})

describe('2. invalid numbers stop in the questionnaire, not in storage', () => {
  const cases: [string, (a: App) => void, string, RegExp][] = [
    ['24', (a) => { a.application.expectedDurationMonths = -3.5 }, 'application.expectedDurationMonths', /月数/],
    ['24', (a) => { a.application.expectedDurationMonths = 0 }, 'application.expectedDurationMonths', /月数应大于零/],
    ['16', (a) => { a.work!.contract = 'determinato'; a.work!.contractMonths = 2.5 }, 'work.contractMonths', /整数/],
    ['16', (a) => { a.work!.contract = 'determinato'; a.work!.contractMonths = 6; a.work!.contractDays = -1 }, 'work.contractDays', /整数/],
    ['16', (a) => { a.income!.lastTaxYear = 3025 }, 'income.lastTaxYear', /年份/],
    ['16', (a) => { a.income!.lastTaxYear = 0 }, 'income.lastTaxYear', /年份/],
    ['16', (a) => { a.application.submissionTotalSheets = 0 }, 'application.submissionTotalSheets', /大于零/],
  ]
  for (const [code, change, path, message] of cases) it(`${path} ${code}`, () => {
    const a = exampleApplication(code); change(a)
    const errors = errorsFor(a, path)
    expect(errors[0]?.message).toMatch(message)
    expect(errors[0]?.message).not.toMatch(/Invalid|expected|Too|number/)
  })
  it('reports an invalid draft as not saved rather than as a storage failure', () => {
    const store = emptyStore(); const a = exampleApplication('24'); a.application.expectedDurationMonths = -3.5
    store.drafts.push({ id: 'fictional', data: a, step: 0, completed: [], updatedAt: '', checks: [] })
    let written = false
    expect(trySaveStore({ setItem: () => { written = true } }, store)).toBe('invalid')
    expect(written).toBe(false)
    expect(trySaveStore({ setItem: () => { throw new Error('QuotaExceededError') } }, emptyStore())).toBe('failed')
    expect(trySaveStore({ setItem: () => undefined }, emptyStore())).toBe('saved')
  })
})

describe('4. search keeps double-grouped types in every group', () => {
  const study = { group: 'rinnovo', alsoInGroups: ['rilascio'] }
  it('shows a name match in all of its groups', () => {
    expect(displayGroups(study, '学习')).toEqual(['rinnovo', 'rilascio'])
  })
  it('filters by group only when the query matches a group name', () => {
    expect(displayGroups(study, '第一次')).toEqual(['rilascio'])
    expect(displayGroups(study, 'rinnovo')).toEqual(['rinnovo'])
  })
})

describe('5. content longer than the boxes', () => {
  it('is caught in the questionnaire with the Chinese label and column number', () => {
    const a = exampleApplication('16'); a.currentPermit!.number = 'A'.repeat(45)
    expect(errorsFor(a, 'currentPermit.number')[0]?.message).toBe('现在这张居留的卡号（Modulo 1 第 18 栏）最多 14 格，你填了 45 个字符')
    const b = exampleApplication('16'); b.work!.contract = 'determinato'; b.work!.contractMonths = 99999
    expect(errorsFor(b, 'work.contractMonths')[0]?.message).toMatch(/合同期限（月）（Modulo 2 第 \d+ 栏）最多 \d 格，你填了 5 个字符/)
  })
  it('words the remaining reference warnings in Chinese with the column number', () => {
    const a = exampleApplication('16'); a.currentPermit!.number = 'A'.repeat(45)
    const kit = prepareApplication(a, businessData, demoAsOf)
    if (kit.kind !== 'kit') throw new Error(kit.message)
    const warning = kit.warnings.find((w) => w.code === 'truncated')
    expect(warning?.message).toContain('Modulo 1 第 18 栏')
    expect(warning?.message).not.toContain('M1-018')
  })
})
