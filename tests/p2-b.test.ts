import { describe, expect, it } from 'vitest'
import { applicationProfileSchema, applicationTypeSchema } from '../src/data/schemas'
import { applicationSchema } from '../src/data/application-schema'
import { businessData } from '../src/data/business'
import { demoAsOf, exampleApplication } from '../src/demo/applications'
import { familyDuration } from '../src/engine/duration'
import { prepareApplication } from '../src/engine/prepare'
import { emptyStore, newApplication, parseBackup } from '../src/storage/store'
import { titles } from '../src/ui/format'
import { questionErrors, setAnswer, stepsFor } from '../src/ui/questionnaire'

const fields = (a: ReturnType<typeof exampleApplication>) => stepsFor(a).flatMap((step) => step.sections.flatMap((section) => section.fields))
const kitFor = (a: ReturnType<typeof exampleApplication>, data = businessData) => {
  const kit = prepareApplication(a, data, demoAsOf)
  if (kit.kind !== 'kit') throw new Error(kit.message)
  return kit
}

describe('D47 data-driven type profiles', () => {
  it.each([
    { typo: true }, { workStep: 'unknown' }, { workTypes: ['unknown'] }, { workTypes: [] },
    { contracts: ['unknown'] }, { sections: ['unknown'] }, { noCurrentPermitFor: ['unknown'] },
    { visaFor: ['unknown'] }, { operationChooser: false },
    { duration: { source: 'fixed' } }, { duration: { source: 'fixed', months: 0 } },
    { duration: { source: 'question', months: 12 } }, { duration: { source: 'contract', typo: true } },
  ])('rejects invalid or unknown profile values %#', (profile) => {
    expect(applicationProfileSchema.safeParse(profile).success).toBe(false)
    expect(applicationTypeSchema.safeParse({ ...businessData.applicationTypes.types[0], profile }).success).toBe(false)
  })
  it('uses data titles, including the old P1 titles', () => {
    for (const type of businessData.applicationTypes.types) expect(titles[type.code]).toBe(type.titleZh ?? type.nameZh)
    expect(['16', '15', '09', '03'].map((code) => titles[code])).toEqual(['工作居留续签', '自雇居留续签', '首次申请长居', '更新长居卡'])
  })
  it('projects permit/work and derives sponsor duration by injected profile, without a special type code', () => {
    const original = exampleApplication('16', 'rinnovo')
    original.family = { sponsorPermitValidUntil: '2027-11-05' }
    const type = { ...businessData.applicationTypes.types[0]!, profile: { workStep: 'income' as const, noCurrentPermitFor: ['rinnovo' as const], duration: { source: 'sponsor' as const } } }
    const data = { ...businessData, applicationTypes: { ...businessData.applicationTypes, types: [type] } }
    expect(familyDuration(original, demoAsOf, data.applicationTypes).application.expectedDurationMonths).toBe(12)
    const kit = kitFor(original, data)
    expect(kit.application.currentPermit).toBeNull()
    for (const key of ['work', 'employer', 'business', 'contrattoSoggiorno'] as const) expect(kit.application[key]).toBeNull()
    expect(kit.forms[1]?.values).not.toHaveProperty('M2-004')
    expect(original.work?.type).toBe('subordinato')
    expect(original.currentPermit?.number).toBe('DEMO0000000')
  })
})

describe('P2 B branches and existing backup compatibility', () => {
  it.each(['straniero', 'italiano-ue', 'rifugiato'] as const)('10 selects sponsor materials for %s', (sponsorKind) => {
    const a = exampleApplication('10'); a.family!.sponsorKind = sponsorKind
    const kit = kitFor(a)
    expect(kit.fees?.bollettinoCents).toBe(3046)
    expect(kit.fees?.contributionCents).toBe(0)
    expect(kit.materials.some((item) => item.nameIt.includes('dichiarazione dei redditi del familiare'))).toBe(sponsorKind === 'straniero')
    expect(kit.materials.some((item) => item.nameIt.startsWith('Certificato di idoneità'))).toBe(sponsorKind === 'straniero')
    expect(kit.materials.some((item) => item.nameIt === 'Fotocopia del permesso / carta di soggiorno del familiare')).toBe(sponsorKind === 'straniero')
    expect(fields(a).find((field) => field.path === 'family.sponsorKind')?.options).toHaveLength(3)
  })
  it('18 defaults to seasonal work only and derives the fee from the contract', () => {
    const initial = newApplication('18', 'rinnovo')
    expect(initial.work).toEqual({ type: 'subordinato', contract: 'stagionale' })
    const qs = fields(initial)
    expect(qs.find((field) => field.path === 'work.type')?.options?.map((option) => option.value)).toEqual(['subordinato'])
    expect(qs.find((field) => field.path === 'work.contract')?.options?.map((option) => option.value)).toEqual(['stagionale'])
    const a = exampleApplication('18')
    expect(kitFor(setAnswer(a, 'work.contractMonths', 3)).fees?.bollettinoCents).toBe(3046)
    expect(kitFor(setAnswer(a, 'work.contractMonths', 9)).fees?.bollettinoCents).toBe(7046)
    const invalid = setAnswer(a, 'work.contract', 'indeterminato')
    expect(questionErrors(invalid, fields(invalid), demoAsOf)).toContainEqual(expect.objectContaining({ path: 'work.contract' }))
  })
  it.each(['rilascio', 'rinnovo'] as const)('21 %s requires income and omits stale work from Modulo 2', (operation) => {
    const a = exampleApplication('21', operation), qs = fields(a)
    expect(qs.some((field) => field.path.startsWith('work.') || field.path.startsWith('employer.'))).toBe(false)
    expect(qs.find((field) => field.path === 'income.annualCents')?.required).toBe(true)
    expect(qs.some((field) => field.path === 'visa.number')).toBe(operation === 'rilascio')
    a.income = null
    expect(questionErrors(a, fields(a), demoAsOf)).toContainEqual(expect.objectContaining({ path: 'income.annualCents' }))
    a.income = { annualCents: 2345678 }; a.work = { type: 'subordinato', hiredThisYear: true }; a.employer = { kind: 'giuridica', name: 'STALE DEMO' }
    const kit = kitFor(a)
    expect(kit.forms).toHaveLength(2)
    expect(kit.application.work).toBeNull()
    expect(kit.application.employer).toBeNull()
    expect(kit.forms[1]?.values['M2-053']).toEqual({ euro: '23456', centesimi: '78' })
    expect(kit.forms[1]?.values).not.toHaveProperty('M2-004')
  })
  it('06 asks duration and retains the other current permit on first issue', () => {
    const a = exampleApplication('06', 'rilascio')
    expect(newApplication('06', 'rilascio').application.expectedDurationMonths).toBe(12)
    expect(fields(a).some((field) => field.path === 'application.expectedDurationMonths')).toBe(true)
    expect(fields(a).some((field) => field.path.startsWith('visa.'))).toBe(false)
    expect(kitFor(a).application.currentPermit?.typeCode).toBe('16')
  })
  it('02 has no stamp fee or stamp material; the exemption follows data rather than code', () => {
    const a = exampleApplication('02'), kit = kitFor(a)
    expect(kit.fees).toMatchObject({ bollettinoCents: 3046, contributionCents: 0, stampCents: 0 })
    expect(kit.stampExempt).toBe(true)
    expect(kit.materials.some((item) => /bollo|印花/.test(item.nameIt + item.nameZh))).toBe(false)
    const type = { ...businessData.applicationTypes.types[0]!, stampExempt: true }
    const data = { ...businessData, applicationTypes: { ...businessData.applicationTypes, types: [type] } }
    expect(kitFor(exampleApplication('16'), data).fees?.stampCents).toBe(0)
  })
  it('reads existing members and B applications without changing the backup version', () => {
    const store = emptyStore()
    store.members.push({ id: 'legacy-person', data: exampleApplication('16') })
    for (const code of ['10', '18', '21', '06', '02']) store.drafts.push({ id: `fictional-${code}`, data: exampleApplication(code), step: 0, completed: [], checks: [], updatedAt: demoAsOf })
    const restored = parseBackup(JSON.stringify(store))
    expect(restored.members.find((member) => member.id === 'legacy-person')?.data).toEqual(applicationSchema.parse(store.members[0]!.data))
    expect(restored.drafts.map((draft) => draft.data.application.code)).toEqual(['10', '18', '21', '06', '02'])
  })
})
