import { readFile } from 'node:fs/promises'
import { PDFDocument } from 'pdf-lib'
import { describe, expect, it } from 'vitest'
import { applicationSchema } from '../src/data/application-schema'
import { businessData } from '../src/data/business'
import { bollettino, modulo1, modulo2Layout } from '../src/data/catalog'
import { demoAsOf, exampleApplication } from '../src/demo/applications'
import { matchesCondition } from '../src/engine/conditions'
import { prepareApplication } from '../src/engine/prepare'
import { familyDuration } from '../src/engine/duration'
import { renderApplication } from '../src/render/application'
import { emptyStore, newApplication, parseBackup } from '../src/storage/store'
import { questionErrors, setAnswer, stepsFor } from '../src/ui/questionnaire'

const assets = { modulo1Pdf: await readFile(modulo1.source), bollettinoImage: await readFile(bollettino.source) }
const amounts: Record<string, number> = { '16': 7046, '15': 8046, '09': 13046, '03': 3046, '04': 3046, '12': 3046, '11': 3046, '13': 8046, '14': 3046, '24': 7046, '31': 7046, '30': 3046, '05': 7046, '10': 3046, '18': 7046, '21': 7046, '06': 7046, '02': 3046, '32': 3046, '33': 3046, '19': 7046, '20': 7046, '27': 7046, '28': 3046, '29': 7046, '23': 7046, '07': 3046, '17': 13046 }
const operations = { rilascio: 'M1-008', rinnovo: 'M1-009', aggiornamento: 'M1-010', duplicato: 'M1-011', conversione: 'M1-012' }

describe('all catalog types: fictional questionnaire -> engine -> actual PDF', () => {
  for (const type of businessData.applicationTypes.types) for (const operation of type.operations) {
    it(`${type.code} / ${operation} produces correct fees, form ticks and PDF`, async () => {
      const application = exampleApplication(type.code, operation), before = structuredClone(application)
      expect(applicationSchema.parse(application)).toEqual(application)
      expect(questionErrors(application, stepsFor(application).flatMap((step) => step.sections.flatMap((section) => section.fields)), demoAsOf)).toEqual([])
      const kit = prepareApplication(application, businessData, demoAsOf)
      if (kit.kind !== 'kit') throw new Error(kit.message)
      expect(kit.warnings).toEqual([])
      expect(kit.fees?.bollettinoCents).toBe(amounts[type.code])
      expect(kit.materials.length).toBeGreaterThan(0)
      const second = type.moduli === '1+2' || (type.moduli === '1+2-if-income' && kit.selection.hasIncome) || (type.moduli === '1+2-when' && matchesCondition(type.modulo2When!, kit.selection, application))
      expect(kit.forms.map((form) => form.definition.form)).toEqual(second ? ['modulo1', 'modulo2'] : ['modulo1'])
      const values = kit.forms[0]!.values
      expect(values['M1-016']).toBe(type.code)
      expect(values[operations[operation]]).toBe(true)
      expect(values[['09', '03', '11'].includes(type.code) ? 'M1-015' : 'M1-014']).toBe(true)
      expect(values['M1-023']).toBe(true)
      expect(values['M1-024']).toBe(second ? true : undefined)
      if (type.profile.visaFor?.includes(operation)) {
        expect(values['M1-048']).toBe(application.visa?.entryDate)
        expect(values['M1-053']).toBe(true)
        expect(values['M1-056']).toBe(application.visa?.validFrom)
        expect(values).not.toHaveProperty('M1-018')
      } else expect(values).not.toHaveProperty('M1-048')
      if (['05', '30'].includes(type.code)) expect(kit.forms[1]!.values).toMatchObject({ 'M2-065': '2026-10-01', 'M2-066': 'MI', 'M2-067': 'ESEMPIA', 'M2-068': 'DEMO' })
      const pdf = await renderApplication(kit, assets, modulo2Layout)
      expect((await PDFDocument.load(pdf.bytes)).getPageCount()).toBe(8 + (second ? 3 : 0) + kit.bills.length)
      expect(pdf.placements.some((placement) => placement.fieldId === 'M1-016')).toBe(true)
      expect(application).toEqual(before)
    })
  }
  for (const type of businessData.applicationTypes.types) for (const operation of type.sportelloUnicoFills) {
    it(`${type.code} / ${operation} is notice-only, never a kit`, () => {
      expect(prepareApplication({ application: { code: type.code, operation } }, businessData, demoAsOf)).toMatchObject({ kind: 'notice', reason: 'sportello-unico' })
    })
  }
})

describe('P2 branches, derived durations and backup compatibility', () => {
  it.each(businessData.applicationTypes.types.map((type) => type.code))('%s leaves fees blank when no configured rule matches', (code) => {
    const data = { ...businessData, fees: { ...businessData.fees, rules: businessData.fees.rules.map((rule) => ({ ...rule, feeRule: 'fictional-unmatched' })) } }
    const kit = prepareApplication(exampleApplication(code), data, demoAsOf)
    if (kit.kind !== 'kit') throw new Error(kit.message)
    expect(kit.fees).toBeUndefined()
    expect(kit.bills[0]?.amountCents).toBeUndefined()
    expect(kit.warnings).toContainEqual(expect.objectContaining({ code: 'fee-incomplete', message: expect.stringContaining('当前申请没有配置对应的缴费规则') }))
  })
  it('still rejects conflicting matching rules instead of masking configuration errors', () => {
    const rule = businessData.fees.rules.find((rule) => rule.id === 'durata-fino-1-anno')!
    const data = { ...businessData, fees: { ...businessData.fees, rules: [...businessData.fees.rules, { ...rule, id: 'fictional-conflict' }] } }
    expect(() => prepareApplication(exampleApplication('16'), data, demoAsOf)).toThrow('费用规则优先级冲突')
  })
  it('keeps student duration independent of the job contract and excludes stale income when not working', () => {
    let a = exampleApplication('24')
    a = setAnswer(a, 'application.expectedDurationMonths', 10)
    a = setAnswer(a, 'work.contract', 'indeterminato')
    expect(a.application.expectedDurationMonths).toBe(10)
    a = setAnswer(a, 'study.working', false)
    expect(stepsFor(a).map((step) => step.id)).not.toContain('work')
    const kit = prepareApplication(a, businessData, demoAsOf)
    if (kit.kind !== 'kit') throw new Error(kit.message)
    expect(a.income?.annualCents).toBeGreaterThan(0)
    expect(kit.forms).toHaveLength(1)
    expect(kit.forms[0]!.values).not.toHaveProperty('M1-024')
    expect(kit.materials.some((item) => item.nameIt.includes('Modulo 2'))).toBe(false)
    a = setAnswer(a, 'study.working', true)
    expect(stepsFor(a).map((step) => step.id)).toEqual(['application', 'person', 'address', 'work', 'income', 'family'])
    expect(stepsFor(a).flatMap((step) => step.sections.flatMap((section) => section.fields)).find((field) => field.path === 'work.type')?.options).toHaveLength(3)
    const store = emptyStore()
    store.drafts.push({ id: 'fictional-student', data: a, step: 5, completed: [], updatedAt: demoAsOf, checks: [] })
    expect(parseBackup(JSON.stringify(store)).drafts[0]?.step).toBe(5)
  })
  it.each([['2026-11-06', 1], ['2026-12-05', 1], ['2026-12-06', 2], ['2027-11-05', 12], ['2028-11-05', 24], ['2029-11-05', 36], ['2026-11-05', null], ['', null]])('13 rounds %s up to %s months and never uses stale duration', (until, months) => {
    const a = exampleApplication('13'); a.family!.sponsorPermitValidUntil = until as string
    expect(familyDuration(a, demoAsOf).application.expectedDurationMonths).toBe(months)
    const kit = prepareApplication(a, businessData, demoAsOf)
    if (kit.kind !== 'kit') throw new Error(kit.message)
    expect(kit.fees?.bollettinoCents).toBe(months == null ? undefined : Number(months) <= 3 ? 3046 : Number(months) <= 12 ? 7046 : 8046)
    if (months == null) expect(kit.warnings).toContainEqual(expect.objectContaining({ code: 'fee-incomplete' }))
    else expect(kit.warnings).not.toContainEqual(expect.objectContaining({ code: 'fee-incomplete' }))
  })
  it('loads type-specific defaults without guessing the previous permit for 05', () => {
    for (const code of ['24', '31', '05']) expect(newApplication(code, 'rinnovo').application.expectedDurationMonths).toBe(12)
    // D55: 30 / 28 are conversions without contributo, so no duration is asked or defaulted.
    for (const code of ['30', '28']) expect(newApplication(code, 'conversione').application.expectedDurationMonths).toBeUndefined()
    expect(newApplication('11', 'duplicato').currentPermit?.typeCode).toBe('09')
    expect(newApplication('05', 'rinnovo').currentPermit?.typeCode).toBeUndefined()
  })
  it('keeps student renewal free of visa questions and unemployed income optional', () => {
    for (const code of ['24', '31']) for (const operation of ['rilascio', 'rinnovo'] as const) {
      const fields = stepsFor(exampleApplication(code, operation)).flatMap((step) => step.sections.flatMap((section) => section.fields))
      expect(fields.some((field) => field.path === 'visa.validFrom')).toBe(operation === 'rilascio')
      expect(fields.some((field) => field.path === 'currentPermit.number')).toBe(operation === 'rinnovo')
    }
    for (const code of ['05', '30']) {
      const a = exampleApplication(code); a.income = null
      expect(stepsFor(a).some((step) => step.id === 'work')).toBe(false)
      const fields = stepsFor(a).flatMap((step) => step.sections.flatMap((section) => section.fields))
      expect(fields.find((field) => field.path === 'income.annualCents')?.required).toBe(false)
      expect(questionErrors(a, fields, demoAsOf)).toEqual([])
    }
  })
})
