import { readFile } from 'node:fs/promises'
import { PDFDocument } from 'pdf-lib'
import { describe, expect, it } from 'vitest'
import { applicationSchema } from '../src/data/application-schema'
import { businessData } from '../src/data/business'
import { modulo1, bollettino, modulo2Layout } from '../src/data/catalog'
import { c1Combinations, c1Scenarios } from '../src/demo/c1'
import { demoAsOf } from '../src/demo/applications'
import { prepareApplication } from '../src/engine/prepare'
import { renderApplication } from '../src/render/application'
import { newApplication } from '../src/storage/store'
import { stepsFor, questionErrors } from '../src/ui/questionnaire'

const assets = { modulo1Pdf: await readFile(modulo1.source), bollettinoImage: await readFile(bollettino.source) }
describe('C1 fictional questionnaire -> mapping -> actual PDF', () => {
  it('covers all nine types and every supported operation (13, not 12)', () => {
    const codes = new Set(c1Combinations.map(({ code }) => code))
    expect(codes.size).toBe(9)
    expect(c1Combinations).toHaveLength(13)
    expect(c1Combinations.map(({ code, operation }) => `${code}/${operation}`).sort()).toEqual(
      businessData.applicationTypes.types.filter(({ code }) => codes.has(code)).flatMap(({ code, operations }) => operations.map((operation) => `${code}/${operation}`)).sort(),
    )
  })
  for (const { id, code, operation, amount, second, application } of c1Scenarios) it(id, async () => {
    const before = structuredClone(application)
    expect(applicationSchema.parse(application)).toEqual(application)
    const fields = stepsFor(application).flatMap((step) => step.sections.flatMap((section) => section.fields))
    expect(questionErrors(application, fields, demoAsOf)).toEqual([])
    const visa = ['32', '33', '19', '20'].includes(code) && operation === 'rilascio'
    expect(fields.some((field) => field.path === 'visa.validFrom')).toBe(visa)
    expect(fields.some((field) => field.path === 'currentPermit.number')).toBe(!visa)
    const kit = prepareApplication(application, businessData, demoAsOf)
    if (kit.kind !== 'kit') throw new Error(kit.message)
    expect(kit.warnings).toEqual([])
    expect(kit.fees?.bollettinoCents).toBe(amount)
    expect(kit.forms.map((form) => form.definition.form)).toEqual(second ? ['modulo1', 'modulo2'] : ['modulo1'])
    const m1 = kit.forms[0]!.values
    expect(m1).toMatchObject({ 'M1-016': code, 'M1-014': true, [{ rilascio: 'M1-008', rinnovo: 'M1-009', conversione: 'M1-012' }[operation as 'rilascio' | 'rinnovo' | 'conversione']]: true })
    expect(m1['M1-024']).toBe(second ? true : undefined)
    if (visa) {
      expect(m1).toMatchObject({ 'M1-048': '2026-09-01', 'M1-049': 'CONFINE FITTIZIO', 'M1-050': 'DEMO0001', 'M1-051': 'D', 'M1-053': true, 'M1-056': '2026-09-01', 'M1-057': '2027-08-31' })
      expect(m1).not.toHaveProperty('M1-018')
    } else {
      expect(m1['M1-019']).toBe(code === '28' ? '27' : code)
      expect(m1).not.toHaveProperty('M1-048')
    }
    if (['23', '07'].includes(code)) {
      expect(kit.materials.some((item) => item.nameIt.includes('Modulo 2'))).toBe(second)
      if (second) expect(kit.forms[1]!.values).toMatchObject({ 'M2-053': { euro: '12345', centesimi: '67' }, 'M2-059': true })
    }
    if (code === '28') {
      expect(fields.some((field) => field.path === 'employmentCentre.registrationDate')).toBe(true)
      expect(kit.forms[1]!.values).toMatchObject({ 'M2-065': '2026-10-01', 'M2-066': 'MI', 'M2-067': 'ESEMPIA', 'M2-068': 'DEMO' })
    }
    if (code === '07') {
      expect(newApplication(code, operation).person?.refugee).toBe(true)
      expect(m1).toMatchObject({ 'M1-037': 'SI', 'M1-041': true, 'M1-042': '02', 'M1-044': 'DEMO00000' })
      expect(m1).not.toHaveProperty('M1-040')
      expect(m1).not.toHaveProperty('M1-059') // no simultaneous travel-document renewal
    }
    expect(kit.bills[0]!.values['B-importo-1']).toEqual({ euro: String(Math.floor(amount / 100)), centesimi: '46' })
    expect(kit.bills[0]!.values['B-lettere-1']).toBe(amount === 3046 ? 'TRENTA/46' : 'SETTANTA/46')
    const pdf = await renderApplication(kit, assets, modulo2Layout)
    expect((await PDFDocument.load(pdf.bytes)).getPageCount()).toBe(second ? 12 : 9)
    expect(pdf.placements.some((p) => p.fieldId === 'M1-016')).toBe(true)
    expect(pdf.placements.some((p) => p.fieldId === 'M2-053')).toBe(second && application.income != null)
    expect(application).toEqual(before)
  })
})

it('28 ticks M1-024 when Modulo 2 is attached', () => {
  const sample = c1Scenarios.find(({ code }) => code === '28')!
  const kit = prepareApplication(sample.application, businessData, demoAsOf)
  if (kit.kind !== 'kit') throw new Error(kit.message)
  expect(kit.forms.map((form) => form.definition.form)).toContain('modulo2')
  expect(kit.forms[0]!.values['M1-024']).toBe(true)
})
