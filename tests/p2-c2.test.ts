import { readFile } from 'node:fs/promises'
import { PDFDocument } from 'pdf-lib'
import { describe, expect, it } from 'vitest'
import { applicationSchema } from '../src/data/application-schema'
import { applicationTypeSchema } from '../src/data/schemas'
import { businessData } from '../src/data/business'
import { modulo1, bollettino, modulo2Layout } from '../src/data/catalog'
import { art27Letters, c2Scenarios } from '../src/demo/c2'
import { demoAsOf, exampleApplication } from '../src/demo/applications'
import { planApplication } from '../src/engine/application'
import { prepareApplication, selectionFromApplication } from '../src/engine/prepare'
import { renderApplication } from '../src/render/application'
import { emptyStore, newApplication, parseBackup } from '../src/storage/store'
import { questionErrors, setAnswer, stepsFor } from '../src/ui/questionnaire'
const type = businessData.applicationTypes.types.find((t) => t.code === '17')!
const fields = (a: ReturnType<typeof exampleApplication>) => stepsFor(a).flatMap((s) => s.sections.flatMap((s) => s.fields))
const kitFor = (a: ReturnType<typeof exampleApplication>, data = businessData) => {
  const kit = prepareApplication(a, data, demoAsOf)
  if (kit.kind !== 'kit') throw new Error(kit.message)
  return kit
}
const assets = { modulo1Pdf: await readFile(modulo1.source), bollettinoImage: await readFile(bollettino.source) }
describe('C2 formats and conditional form selection', () => {
  it('requires the conditional mode and condition together, validates condition syntax', () => {
    expect(applicationTypeSchema.parse(type)).toEqual(type)
    const without = { ...type }; delete without.modulo2When
    expect(applicationTypeSchema.safeParse(without).success).toBe(false)
    for (const moduli of ['1', '1+2', '1+2-if-income']) expect(applicationTypeSchema.safeParse({ ...type, moduli }).success).toBe(false)
    expect(applicationTypeSchema.safeParse({ ...type, modulo2When: { typo: true } }).success).toBe(false)
    expect(applicationTypeSchema.safeParse({ ...type, modulo2When: { equals: { 'application.art27Letter': [] } } }).success).toBe(false)
  })
  it('supports nullish draft values but requires a valid choice before continuing', () => {
    const a = newApplication('17', 'rinnovo')
    expect(a.application.expectedDurationMonths).toBe(12)
    expect(a.work?.type).toBe('subordinato')
    expect(stepsFor(a).map((s) => s.id)).not.toContain('work')
    for (const value of [undefined, null]) expect(applicationSchema.safeParse({ ...a, application: { ...a.application, art27Letter: value } }).success).toBe(true)
    for (const value of ['l', 'g', 'h', 'A', '', 'r bis', 'unknown']) expect(applicationSchema.safeParse({ ...a, application: { ...a.application, art27Letter: value } }).success).toBe(false)
    const qs = fields(a)
    expect(qs.find((q) => q.path === 'application.art27Letter')?.options?.map((o) => o.value)).toEqual(art27Letters)
    expect(questionErrors(a, qs, demoAsOf)).toContainEqual(expect.objectContaining({ path: 'application.art27Letter' }))
    const sections = stepsFor(a)[0]!.sections.map((s) => s.title)
    expect(sections.indexOf('特殊工作类别')).toBeLessThan(sections.indexOf('居留期限'))
    const store = emptyStore(); store.drafts.push({ id: 'fictional-c2', data: exampleApplication('17'), step: 0, completed: [], updatedAt: demoAsOf, checks: [] })
    expect(parseBackup(JSON.stringify(store)).drafts[0]!.data.application.art27Letter).toBe('a')
    expect(parseBackup(JSON.stringify(emptyStore())).version).toBe(1)
  })
  it('interprets conditions on any code using selection and full application data', () => {
    const a = exampleApplication('16'); a.application.art27Letter = 'a'
    const conditional = { ...businessData.applicationTypes.types.find((t) => t.code === '16')!, moduli: '1+2-when' as const,
      modulo2When: { minor: false, equals: { 'application.art27Letter': ['a'], 'questura.province': 'MI' } } }
    const catalog = { ...businessData.applicationTypes, types: [conditional] }
    const data = { ...businessData, applicationTypes: catalog }
    expect(stepsFor(a, false, catalog).some((s) => s.id === 'work')).toBe(true)
    expect(planApplication(selectionFromApplication(a, demoAsOf), catalog, a)).toMatchObject({ forms: ['modulo1', 'modulo2'] })
    const changed = setAnswer(a, 'application.art27Letter', 'm'), before = structuredClone(changed)
    const kit = kitFor(changed, data)
    expect(stepsFor(changed, false, catalog).some((s) => s.id === 'work')).toBe(false)
    expect(kit.forms).toHaveLength(1)
    for (const key of ['work', 'employer', 'business', 'contrattoSoggiorno'] as const) expect(kit.application[key]).toBeNull()
    expect(changed).toEqual(before)
  })
  it('switches A -> M -> A without losing draft work, while projecting no work for M', () => {
    const a = exampleApplication('17'), m = setAnswer(a, 'application.art27Letter', 'm')
    expect(stepsFor(a).map((s) => s.id)).toContain('work')
    expect(stepsFor(m).map((s) => s.id)).not.toContain('work')
    expect(kitFor(m).forms).toHaveLength(1)
    expect(kitFor(m).application.work).toBeNull()
    expect(kitFor(m).application.employer).toBeNull()
    expect(m.work).toEqual(a.work)
    expect(kitFor(setAnswer(m, 'application.art27Letter', 'a')).forms).toHaveLength(2)
    expect(kitFor(setAnswer(m, 'application.art27Letter', 'a')).fees?.bollettinoCents).toBe(13046)
  })
  it('first issue is notice-only regardless of subtype', () => {
    for (const letter of art27Letters) expect(prepareApplication(exampleApplication('17', 'rilascio', letter), businessData, demoAsOf)).toMatchObject({ kind: 'notice', reason: 'sportello-unico' })
  })
  it('keeps unfinished and future dates editable without throwing during step construction', () => {
    for (const birthDate of ['2099-01-01', 'invalid-draft-date']) {
      const a = exampleApplication('17'); a.person!.birthDate = birthDate
      expect(() => stepsFor(a)).not.toThrow()
    }
  })
})
describe('C2 all 14 fictional subtypes -> official mappings, materials, fees -> PDF', () => {
  for (const { letter, application, second, amount } of c2Scenarios) it(letter, async () => {
    const before = structuredClone(application), kit = kitFor(application)
    expect(applicationSchema.parse(application)).toEqual(application)
    expect(questionErrors(application, fields(application), demoAsOf)).toEqual([])
    expect(kit.warnings).toEqual([])
    expect(kit.fees?.bollettinoCents).toBe(amount)
    expect(kit.fees?.contributionCents).toBe(letter === 'a' ? 10000 : 4000)
    expect(kit.forms.map((f) => f.definition.form)).toEqual(second ? ['modulo1', 'modulo2'] : ['modulo1'])
    expect(stepsFor(application).some((s) => s.id === 'work')).toBe(second)
    expect(kit.forms[0]!.values).toMatchObject({ 'M1-016': '17', 'M1-019': '17', 'M1-014': true, 'M1-009': true })
    expect(kit.forms[0]!.values['M1-024']).toBe(second ? true : undefined)
    const names = kit.materials.map((m) => m.nameIt)
    expect(names.some((n) => n.startsWith('Modulo 2'))).toBe(second)
    expect(names.some((n) => n.includes('nulla osta'))).toBe(['m', 'n', 'o'].includes(letter))
    expect(names.some((n) => n.includes('Nota di accredito'))).toBe(letter === 'q')
    expect(names.some((n) => n.includes('frequenza al corso'))).toBe(letter === 'f')
    expect(names.some((n) => n.includes('addestramento'))).toBe(letter === 'f')
    expect(names.some((n) => n.includes('presso l\'ente di ricerca'))).toBe(letter === 'r')
    expect(names.some((n) => n.includes('clausola'))).toBe(['a', 'b', 'c', 'd', 'e', 'i', 'p', 'r-bis'].includes(letter))
    expect(names.includes('Ultime buste paga')).toBe(['a', 'b', 'c', 'd', 'e', 'i', 'm', 'n', 'o', 'p', 'r-bis'].includes(letter))
    expect(kit.bills[0]!.values['B-importo-1']).toEqual({ euro: letter === 'a' ? '130' : '70', centesimi: '46' })
    const pdf = await renderApplication(kit, assets, modulo2Layout)
    expect((await PDFDocument.load(pdf.bytes)).getPageCount()).toBe(second ? 12 : 9)
    expect(pdf.placements.some((p) => p.fieldId === 'M2-004')).toBe(second)
    expect(application).toEqual(before)
  })
})
