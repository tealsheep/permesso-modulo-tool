import { describe, expect, it } from 'vitest'
import { applicationTypesSchema, feesSchema, materialsSchema } from '../src/data/schemas'
import { calculateFees, planApplication, selectMaterials } from '../src/engine/application'
import type { ApplicationSelection } from '../src/engine/application'

// Synthetic configuration tests the mechanism, not official fees or eligibility.
const catalog = applicationTypesSchema.parse({ version: 1, verifiedOn: '2026-11-05', types: [
  { code: '16', nameIt: 'Esempio', nameZh: '虚构工作示例', group: 'rinnovo', channel: 'kit', operations: ['rinnovo'], sportelloUnicoFills: ['rilascio'], moduli: '1+2', materials: 'data/materials/16.json', feeRule: 'fixture' },
  { code: '03', nameIt: 'Esempio', nameZh: '虚构更新示例', group: 'rinnovo', channel: 'kit', operations: ['aggiornamento'], sportelloUnicoFills: [], moduli: '1', materials: 'data/materials/03.json', feeRule: 'fixture' },
  { code: '13', nameIt: 'Esempio', nameZh: '虚构收入示例', group: 'rinnovo', channel: 'kit', operations: ['rinnovo'], sportelloUnicoFills: [], moduli: '1+2-if-income', materials: 'data/materials/13.json', feeRule: 'fixture' },
  { code: '99', nameIt: 'Esempio', nameZh: '虚构警局示例', group: 'rilascio', channel: 'questura', operations: [], sportelloUnicoFills: [], moduli: '1', materials: 'data/materials/99.json', feeRule: 'fixture' },
] })
const selection: ApplicationSelection = { applicationCode: '16', operation: 'rinnovo', durationMonths: 12, minor: false, hasIncome: true }
const fees = feesSchema.parse({ version: 1, verifiedOn: '2026-11-05', cardCents: 100, postageCents: 200, stampCents: 300,
  rules: [
    { id: 'short', feeRule: 'fixture', priority: 0, when: { maxDurationMonths: 12 }, contributionCents: 400 },
    { id: 'long', feeRule: 'fixture', priority: 0, when: { minDurationMonths: 13 }, contributionCents: 500 },
    { id: 'minor', feeRule: 'fixture', priority: 10, when: { minor: true }, contributionCents: 0 },
  ],
})

describe('pure application framework', () => {
  it('routes supported kit applications by injected moduli data', () => {
    expect(planApplication(selection, catalog)).toMatchObject({ kind: 'kit', forms: ['modulo1', 'modulo2'] })
    expect(planApplication({ ...selection, applicationCode: '03', operation: 'aggiornamento' }, catalog)).toMatchObject({ kind: 'kit', forms: ['modulo1'] })
    expect(planApplication({ ...selection, applicationCode: '13', hasIncome: false }, catalog)).toMatchObject({ forms: ['modulo1'] })
    expect(planApplication({ ...selection, applicationCode: '13', hasIncome: true }, catalog)).toMatchObject({ forms: ['modulo1', 'modulo2'] })
  })
  it('never generates a kit for questura, SUI, unknown codes or unsupported operations', () => {
    expect(planApplication({ ...selection, applicationCode: '99' }, catalog)).toMatchObject({ kind: 'notice', reason: 'questura' })
    expect(planApplication({ ...selection, operation: 'rilascio' }, catalog)).toMatchObject({ kind: 'notice', reason: 'sportello-unico' })
    expect(planApplication({ ...selection, applicationCode: '00' }, catalog)).toMatchObject({ kind: 'notice', reason: 'unsupported' })
    expect(planApplication({ ...selection, operation: 'duplicato' }, catalog)).toMatchObject({ kind: 'notice', reason: 'unsupported' })
  })
  it('separates payment slip, stamp and postage and applies priority', () => {
    expect(calculateFees(selection, 'fixture', fees)).toEqual({ ruleId: 'short', cardCents: 100, contributionCents: 400, bollettinoCents: 500, postageCents: 200, stampCents: 300 })
    expect(calculateFees({ ...selection, durationMonths: 24 }, 'fixture', fees).bollettinoCents).toBe(600)
    expect(calculateFees({ ...selection, minor: true }, 'fixture', fees).bollettinoCents).toBe(100)
  })
  it('rejects absent, ambiguous or invalid fee inputs', () => {
    expect(() => calculateFees({ ...selection, durationMonths: undefined }, 'fixture', fees)).toThrow('没有匹配')
    expect(() => calculateFees(selection, 'missing', fees)).toThrow('没有匹配')
    expect(() => calculateFees({ ...selection, durationMonths: NaN }, 'fixture', fees)).toThrow('期限')
    expect(() => calculateFees(selection, 'fixture', { ...fees, rules: [...fees.rules, { ...fees.rules[0]!, id: 'conflict' }] })).toThrow('冲突')
  })
  it('filters structured material conditions and returns only the two names', () => {
    const materials = materialsSchema.parse({ version: 1, verifiedOn: '2026-11-05', applicationCode: '16', items: [
      { nameIt: 'Documento esempio', nameZh: '虚构材料' },
      { nameIt: 'Documento minore', nameZh: '虚构未成年材料', condition: { minor: true } },
      { nameIt: 'Documento rinnovo', nameZh: '虚构续签材料', condition: { operations: ['rinnovo'], applicationCodes: ['16'], hasIncome: true } },
    ] })
    expect(selectMaterials(selection, materials)).toEqual([{ nameIt: 'Documento esempio', nameZh: '虚构材料' }, { nameIt: 'Documento rinnovo', nameZh: '虚构续签材料' }])
    expect(() => selectMaterials({ ...selection, applicationCode: '03' }, materials)).toThrow('不匹配')
  })
})
