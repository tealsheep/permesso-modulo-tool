import { describe, expect, it } from 'vitest'
import { applicationSchema } from '../src/data/application-schema'
import { mappingSchema } from '../src/data/mapping-schema'
import { conditionSchema } from '../src/data/schemas'
import { businessData } from '../src/data/business'
import { modulo1, modulo2 } from '../src/data/catalog'
import { exampleApplication, demoAsOf } from '../src/demo/applications'
import { mapFields } from '../src/engine/mapping'
import type { RuleContext } from '../src/engine/mapping'
import { matchesCondition, readPath, isPresent } from '../src/engine/conditions'
import { prepareApplication, selectionFromApplication } from '../src/engine/prepare'

function context(): RuleContext {
  const application = exampleApplication('09')
  return { application, selection: selectionFromApplication(application, demoAsOf), moduleCount: 2, billCents: 13046 }
}
function mapping(rules: unknown) { return mappingSchema.parse({ form: 'modulo1', version: 1, verifiedOn: demoAsOf, rules }) }

describe('DATA-MODEL application and rule loading', () => {
  it('preserves user spelling and accepts null/omitted optional draft data', () => {
    const raw = exampleApplication('16')
    const before = structuredClone(raw)
    expect(applicationSchema.parse(raw)).toEqual(before)
    expect(applicationSchema.parse({ application: { code: '16', operation: 'rinnovo' }, person: null }).person).toBeNull()
    expect(raw.person?.surname).toBe('Ésempio')
  })
  it('rejects invalid dates, cents, unknown properties and too many family/residence entries', () => {
    const raw = exampleApplication('09')
    expect(applicationSchema.safeParse({ ...raw, income: { annualCents: 12.34 } }).success).toBe(false)
    expect(applicationSchema.safeParse({ ...raw, person: { birthDate: '2026-02-30' } }).success).toBe(false)
    expect(applicationSchema.safeParse({ ...raw, person: { givenName: 'wrong-key' } }).success).toBe(false)
    expect(applicationSchema.safeParse({ ...raw, childrenUnder14: Array(6).fill({}) }).success).toBe(false)
    expect(applicationSchema.safeParse({ ...raw, housing: { pastResidences: Array(5).fill({}) } }).success).toBe(false)
  })
  it('loads all real business rules and preserves every material basis', () => {
    expect(Object.keys(businessData.materials).sort()).toEqual(businessData.applicationTypes.types.map((type) => type.code).sort())
    for (const type of businessData.applicationTypes.types) expect(businessData.materials[type.code]?.applicationCode).toBe(type.code)
    for (const mapping of Object.values(businessData.mappings)) expect(mapping.rules.length).toBeGreaterThan(0)
    expect(Object.values(businessData.materials).every((file) => file.items.every((item) => item.basis !== undefined))).toBe(true)
    expect(mappingSchema.safeParse({ form: 'modulo1', version: 1, verifiedOn: demoAsOf,
      rules: [{ field: 'M1-003', value: { computed: 'unknown' } }] }).success).toBe(false)
  })
})

describe('safe paths, equals and present', () => {
  it('reads dotted paths and array indices, never inherited properties or expressions', () => {
    expect(readPath(context().application, 'childrenUnder14[0].givenNames')).toBe('Minore Fittizio')
    expect(readPath(context().application, 'childrenUnder14[4].surname')).toBeUndefined()
    expect(readPath({ a: null }, 'a.b')).toBeUndefined()
    expect(readPath(Object.create({ value: 'inherited' }), 'value')).toBeUndefined()
    for (const path of ['__proto__.x', 'person.constructor', 'childrenUnder14[-1]', 'person.surname()', 'person["surname"]']) {
      expect(readPath(context().application, path)).toBeUndefined()
      expect(conditionSchema.safeParse({ present: [path] }).success).toBe(false)
    }
  })
  it.each([null, undefined, '', false, []])('treats %j as absent', (value) => expect(isPresent(value)).toBe(false))
  it.each([0, true, '0', [0], {}])('treats %j as present', (value) => expect(isPresent(value)).toBe(true))
  it('supports scalar/array membership with AND across all conditions', () => {
    const c = context()
    const condition = conditionSchema.parse({ applicationCodes: ['09'], operations: ['rilascio'], minor: false,
      equals: { 'work.type': ['autonomo', 'subordinato'], 'family.childrenEnteredWithFamilyVisa': false },
      present: ['childrenUnder14[0]', 'income.annualCents'] })
    expect(matchesCondition(condition, c.selection, c.application)).toBe(true)
    expect(matchesCondition(condition, { ...c.selection, minor: true }, c.application)).toBe(false)
    expect(matchesCondition(condition, c.selection)).toBe(false)
    expect(matchesCondition({ equals: { 'application.aggiornamentoReasons': ['foto', 'passaporto'] } }, c.selection, exampleApplication('03'))).toBe(true)
    expect(matchesCondition({ equals: { 'application.aggiornamentoReasons': 'anagrafica' } }, c.selection, exampleApplication('03'))).toBe(false)
    expect(matchesCondition({ equals: { missing: null } }, c.selection, {})).toBe(false)
    expect(matchesCondition({ equals: { missing: null } }, c.selection, { missing: null })).toBe(true)
    expect(matchesCondition({ present: ['income.annualCents'] }, c.selection, { income: { annualCents: 0 } })).toBe(true)
    expect(matchesCondition({ present: ['flag'] }, c.selection, { flag: false })).toBe(false)
  })
})

describe('mapping operators and field conversions', () => {
  it('implements path, const, join, parts, computed and preserves original input', () => {
    const c = context(), before = structuredClone(c.application)
    const result = mapFields(modulo1, mapping([
      { field: 'M1-003', value: { const: "D’Èsempio" } },
      { field: 'M1-004', value: { path: 'person.givenNames' } },
      { field: 'M1-H01', value: { const: "Città d’Èsempio" } },
      { field: 'M1-006', value: { join: [{ path: 'missing' }, { const: null }, { const: 'Città' }, { const: '' }, { const: 0 }], sep: ' ' } },
      { field: 'M1-025', value: { computed: 'modules.count' } },
      { field: 'M1-026', value: { computed: 'children.count' } },
      { field: 'M1-069', value: { parts: { numero: { const: 2 }, lettera: { const: "à’b" } } } },
      { field: 'M1-120', value: { const: 0 } },
    ]), c)
    expect(result.values).toEqual({ 'M1-003': 'D ESEMPIO', 'M1-004': 'FITTIZIO', 'M1-H01': 'CITTA D’ESEMPIO',
      'M1-006': 'CITTA 0', 'M1-025': '02', 'M1-026': '01', 'M1-069': { numero: '00002', lettera: 'A B' }, 'M1-120': '00' })
    expect(result.warnings).toEqual([])
    expect(c.application).toEqual(before)
  })
  it('converts X to checkbox true and booleans to SI/NO without weakening renderer types', () => {
    const c = context()
    const rules = mapping([{ field: 'M1-009', value: { const: 'X' } }, { field: 'M1-037', value: { path: 'person.refugee' } }])
    expect(mapFields(modulo1, rules, c).values).toEqual({ 'M1-009': true, 'M1-037': 'NO' })
    c.application.person!.refugee = true
    expect(mapFields(modulo1, rules, c).values['M1-037']).toBe('SI')
    delete c.application.person!.refugee
    expect(mapFields(modulo1, rules, c).values).not.toHaveProperty('M1-037')
  })
  it('selects the first matching rule even if its value is absent; fields with no rule remain blank', () => {
    const c = context()
    const result = mapFields(modulo1, mapping([
      { field: 'M1-003', value: { const: 'NO' }, when: { applicationCodes: ['03'] } },
      { field: 'M1-003', value: { path: 'missing' } },
      { field: 'M1-003', value: { const: 'FALLBACK' } },
      { field: 'M1-004', value: { const: 'FIRST' } }, { field: 'M1-004', value: { const: 'SECOND' } },
    ]), c)
    expect(result.values).toEqual({ 'M1-004': 'FIRST' })
    expect(mapFields(modulo1, businessData.mappings.modulo1, { ...c, application: { application: c.application.application } }).values).not.toHaveProperty('M1-003')
  })
  it('warns and truncates against all rows/individual parts, but never truncates freetext', () => {
    const c = context()
    const result = mapFields(modulo1, mapping([
      { field: 'M1-003', value: { const: 'à'.repeat(61) } },
      { field: 'M1-069', value: { parts: { numero: { const: '123456' } } } },
      { field: 'M1-H01', value: { const: 'à'.repeat(100) } },
    ]), c)
    expect(result.values['M1-003']).toBe('A'.repeat(60))
    expect(result.values['M1-069']).toEqual({ numero: '12345' })
    expect(result.values['M1-H01']).toBe('A'.repeat(100))
    expect(result.warnings.map((w) => [w.field, w.part, w.rendered.length])).toEqual([['M1-003', undefined, 60], ['M1-069', 'numero', 5]])
  })
  it('computes income in integer cents including zero and leaves missing income blank', () => {
    const c = context()
    const result = mapFields(modulo2, businessData.mappings.modulo2, { ...c, application: { ...c.application,
      income: { annualCents: 0, monthlyCents: 105 } } })
    expect(result.values['M2-052']).toBe(true)
    expect(result.values['M2-053']).toEqual({ euro: '0', centesimi: '00' })
    expect(result.values['M2-062']).toEqual({ euro: '1', centesimi: '05' })
    expect(mapFields(modulo2, businessData.mappings.modulo2, { ...c, application: { ...c.application, income: null } }).values).not.toHaveProperty('M2-053')
  })
  it('rejects unknown fields and parts rather than silently dropping a mapping typo', () => {
    expect(() => mapFields(modulo1, mapping([{ field: 'M1-999', value: { const: 'A' } }]), context())).toThrow('不存在')
    expect(() => mapFields(modulo1, mapping([{ field: 'M1-069', value: { parts: { wrong: { const: 'A' } } } }]), context())).toThrow('不存在的分组')
  })
})

describe('application preparation, fees and materials', () => {
  it('uses data-driven fees, preserves common basis/notice, and evaluates material equals/present', () => {
    const application = exampleApplication('15')
    const kit = prepareApplication(application, businessData, demoAsOf)
    if (kit.kind !== 'kit') throw new Error('kit expected')
    expect(kit.fees?.bollettinoCents).toBe(8046)
    expect(kit.materials.some((m) => m.nameIt.includes('libro soci'))).toBe(true)
    expect(kit.materials.filter((m) => m.basis === 'common').every((m) => m.notice === '常见要求，以当地 Questura 为准')).toBe(true)
    application.work!.autonomoForm = 'titolare'
    const changed = prepareApplication(application, businessData, demoAsOf)
    if (changed.kind !== 'kit') throw new Error('kit expected')
    expect(changed.materials.some((m) => m.nameIt.includes('libro soci'))).toBe(false)
  })
  it('creates one extra card-only bill per child with the main applicant as payer', () => {
    const application = exampleApplication('09')
    application.childrenUnder14!.push({ surname: 'Esempio', givenNames: 'Altro Minore', birthDate: '2021-01-01' })
    const kit = prepareApplication(application, businessData, demoAsOf)
    if (kit.kind !== 'kit') throw new Error('kit expected')
    expect(kit.bills.map((b) => b.amountCents)).toEqual([13046, 3046, 3046])
    expect(kit.bills.map((b) => b.values['B-importo-1'])).toEqual([{ euro: '130', centesimi: '46' }, { euro: '30', centesimi: '46' }, { euro: '30', centesimi: '46' }])
    expect(kit.bills.every((b) => b.values['B-eseguito-1'] === 'ESEMPIO FITTIZIO')).toBe(true)
    expect(kit.totalBollettinoCents).toBe(19138)
    expect(kit.materials.some((m) => m.nameIt.includes('stato di figlio minore'))).toBe(true)
    application.family!.childrenEnteredWithFamilyVisa = true
    const changed = prepareApplication(application, businessData, demoAsOf)
    expect(changed.kind === 'kit' && changed.materials.some((m) => m.nameIt.includes('stato di figlio minore'))).toBe(true)
    if (changed.kind === 'kit') expect(changed.materials.find((m) => m.nameIt.includes('stato di figlio minore'))?.nameZh).toContain('凭家庭团聚签证入境的免交')
    delete application.family!.childrenEnteredWithFamilyVisa
    const unanswered = prepareApplication(application, businessData, demoAsOf)
    expect(unanswered.kind === 'kit' && unanswered.materials.some((m) => m.nameIt.includes('stato di figlio minore'))).toBe(true)
    application.childrenUnder14 = []
    const noChildren = prepareApplication(application, businessData, demoAsOf)
    expect(noChildren.kind === 'kit' && noChildren.materials.some((m) => m.nameIt.includes('stato di figlio minore'))).toBe(false)
  })
  it('respects birth dates at the 14/18-year boundary and does not infer age from a missing date', () => {
    const raw = exampleApplication('16')
    raw.person!.birthDate = '2008-11-06'
    const minor = prepareApplication(raw, businessData, demoAsOf)
    expect(minor.kind === 'kit' && minor.fees?.bollettinoCents).toBe(3046)
    raw.person!.birthDate = '2008-11-05'
    const adult = prepareApplication(raw, businessData, demoAsOf)
    expect(adult.kind === 'kit' && adult.fees?.bollettinoCents).toBe(7046)
    delete raw.person!.birthDate
    const draft = prepareApplication(raw, businessData, demoAsOf)
    expect(draft.kind === 'kit' && draft.fees).toBeUndefined()
    expect(draft.kind === 'kit' && draft.bills[0]?.values['B-importo-1']).toBeUndefined()
    const family = exampleApplication('09')
    family.childrenUnder14![0]!.birthDate = '2012-11-05'
    expect(() => prepareApplication(family, businessData, demoAsOf)).toThrow('另一份申请资料')
  })
  it('leaves unknown fee duration blank, routes SUI away, and does not hide rule conflicts', () => {
    const raw = exampleApplication('16')
    delete raw.application.expectedDurationMonths
    const draft = prepareApplication(raw, businessData, demoAsOf)
    expect(draft.kind === 'kit' && draft.warnings.some((w) => w.code === 'fee-incomplete')).toBe(true)
    raw.application.operation = 'rilascio'
    expect(prepareApplication(raw, businessData, demoAsOf)).toMatchObject({ kind: 'notice', reason: 'sportello-unico' })
    const bad = { ...businessData, fees: { ...businessData.fees, rules: [...businessData.fees.rules, { ...businessData.fees.rules[1]!, id: 'conflict' }] } }
    expect(() => prepareApplication(exampleApplication('16'), bad, demoAsOf)).toThrow('冲突')
  })
})
