import { describe, expect, it } from 'vitest'
import { businessData } from '../src/data/business'
import { exampleApplication, demoAsOf } from '../src/demo/applications'
import { prepareApplication } from '../src/engine/prepare'
import { stepsFor, setAnswer, questionErrors } from '../src/ui/questionnaire'
import { emptyStore, parseBackup, loadStore } from '../src/storage/store'
import { deletePeople, exportPeople, sortedPeople, familyPerson } from '../src/storage/people'
import { matchingOptions } from '../src/ui/search-options'
import { codeTables } from '../src/data/catalog'
const fields = (a: ReturnType<typeof exampleApplication>) => stepsFor(a).flatMap((s) => s.sections.flatMap((s) => s.fields))
const kitFor = (a: ReturnType<typeof exampleApplication>) => { const kit = prepareApplication(a, businessData, demoAsOf); if (kit.kind !== 'kit') throw new Error(kit.message); return kit }
describe('D54 questionnaire applicability and projection', () => {
  it('keeps stale work answers in a student draft but projects only the active branch', () => {
    const a = exampleApplication('24'); a.work!.hiredThisYear = true
    a.income = { annualCents: 1234500, bustaPaga: true, bollettinoInps: true, monthlyCents: 120000, taxForm: 'unico-pf', autonomoStartedThisYear: true }
    const employed = kitFor(a)
    expect(employed.forms[1]!.values).toMatchObject({ 'M2-004': true, 'M2-060': true, 'M2-062': { euro: '1200', centesimi: '00' } })
    const self = setAnswer(a, 'work.type', 'autonomo'); self.work!.autonomoForm = 'titolare'
    expect(fields(self).some((q) => q.path === 'work.hiredThisYear' || q.path === 'income.bustaPaga' || q.path === 'income.monthlyCents')).toBe(false)
    expect(fields(self).find((q) => q.path === 'income.autonomoStartedThisYear')?.required).toBe(true)
    const values = kitFor(self).forms[1]!.values
    expect(values['M2-005']).toBe(true)
    for (const id of ['M2-004','M2-008','M2-021','M2-022','M2-060','M2-061','M2-062']) expect(values).not.toHaveProperty(id)
    expect(self.income?.bustaPaga).toBe(true)
    expect(kitFor(setAnswer(self, 'work.type', 'subordinato')).forms[1]!.values).toEqual(employed.forms[1]!.values)
    const noJob = setAnswer(a, 'study.working', false)
    expect(kitFor(noJob).forms).toHaveLength(1)
    expect(kitFor(noJob).application.income).toBeNull()
  })
  it('preserves an invalid old tax-form answer and reports it instead of choosing a replacement', () => {
    const a = exampleApplication('24'); a.work!.type = 'autonomo'; a.work!.autonomoForm = 'titolare'; a.income!.taxForm = 'cud'
    expect(questionErrors(a, fields(a), demoAsOf)).toContainEqual(expect.objectContaining({ path: 'income.taxForm' }))
    expect(a.income!.taxForm).toBe('cud')
  })
  it('ignores hidden salary material flags, independent of the application code', () => {
    const a = exampleApplication('16'); a.work!.hiredThisYear = true
    expect(kitFor(a).materials.some((m) => m.nameIt.includes('buste paga'))).toBe(true)
    a.work!.type = 'autonomo'; a.work!.autonomoForm = 'titolare'
    expect(kitFor(a).materials.some((m) => m.nameIt.includes('buste paga'))).toBe(false)
  })
  it('projects visa, other-document and mailing branches without deleting draft answers', () => {
    let a = exampleApplication('24','rilascio')
    a.currentPermit = { number: 'DEMO00000', typeCode: '24', validUntil: '2027-01-01' }
    expect(kitFor(a).forms[0]!.values).not.toHaveProperty('M1-018')
    a = setAnswer(a,'application.operation','rinnovo')
    expect(kitFor(a).forms[0]!.values).not.toHaveProperty('M1-048')
    expect(a.visa?.number).toBe('DEMO0001')
    a.mailTo = { province: 'PO', comune: 'CITTA FITTIZIA', street: 'VIA DEMO', cap: '00000' }; a.mailToDifferent = true
    expect(kitFor(a).forms[0]!.values['M1-078']).toBe('PO')
    a = setAnswer(a,'mailToDifferent',false)
    for (let n=76;n<=84;n++) expect(kitFor(a).forms[0]!.values).not.toHaveProperty('M1-'+String(n).padStart(3,'0'))
    expect(a.mailTo?.province).toBe('PO')
    a.document!.otherCode = '02'; a.document!.kind = 'passport'
    expect(kitFor(a).forms[0]!.values).not.toHaveProperty('M1-042')
    a.spouse = { surname: 'ESEMPIO', givenNames: 'SPOUSE FITTIZIO' }
    expect(fields(a).some((q) => q.path.startsWith('spouse.'))).toBe(false)
    expect(kitFor(a).application.spouse).toBeNull()
  })
  it('binds Questura name and province together and searches exact codes before aliases', () => {
    const a = setAnswer(exampleApplication('16'),'questura.city','LUCCA')
    expect(a.questura).toEqual({ city: 'LUCCA', province: 'LU' })
    a.questura!.province = 'PO'
    expect(kitFor(a).forms[0]!.values['M1-H02']).toBe('LU')
    const offices = codeTables.questure.entries.map((e) => ({ value: e.nameIt, label: e.code+' · '+e.nameIt, code: e.code, aliases: e.aliases }))
    expect(matchingOptions(offices,'lu')[0]!.code).toBe('LU')
    expect(fields(a).filter((q) => q.path.startsWith('questura.')).map((q) => q.path)).toEqual(['questura.city'])
  })
})
describe('D54/D55 local record upgrade and per-person operations', () => {
  it('sorts people by their latest application edits', () => {
    const store = emptyStore(), data = exampleApplication('16')
    store.members = [{ id:'a', updatedAt:'2020', data }, { id:'b', updatedAt:'2021', data }]
    store.drafts = [{ id:'d', profileId:'a', updatedAt:'2026', data, step:0, completed:[], checks:[] }]
    expect(sortedPeople(store).map((m) => m.id)).toEqual(['a','b'])
  })
  it('requires all four alternative mailing address fields', () => {
    const a = exampleApplication('16'); a.mailToDifferent = true; a.mailTo = {}
    expect(questionErrors(a, fields(a), demoAsOf).map((e) => e.path)).toEqual(expect.arrayContaining(['mailTo.province','mailTo.comune','mailTo.street','mailTo.cap']))
  })
  it('upgrades old 30/28 before validation, including member snapshots, without losing unrelated drafts', () => {
    const store = emptyStore()
    for (const code of ['16','30','28']) {
      const data = exampleApplication(code)
      store.members.push({ id: 'person-'+code, data })
      store.drafts.push({ id: 'draft-'+code, profileId: 'person-'+code, data, step: 0, completed: [], generatedAt: demoAsOf, updatedAt: demoAsOf, checks: [] })
    }
    const legacy = JSON.parse(JSON.stringify(store))
    for (const member of legacy.members) { member.role = 'spouse'; delete member.data.mailToDifferent; if (member.data.application.code !== '16') member.data.application.operation = 'rilascio' }
    for (const draft of legacy.drafts) { delete draft.data.mailToDifferent; if (draft.data.application.code !== '16') draft.data.application.operation = 'rilascio' }
    const text = JSON.stringify(legacy), upgraded = parseBackup(text)
    expect(upgraded.drafts).toHaveLength(3)
    for (const d of upgraded.drafts.filter((d) => d.data.application.code !== '16')) {
      expect(d.data.application.operation).toBe('conversione'); expect(d.generatedAt).toBeUndefined(); expect(kitFor(d.data).fees!.bollettinoCents).toBe(3046)
    }
    for (const member of upgraded.members) expect(member).not.toHaveProperty('role')
    expect(loadStore({ getItem: () => text }).error).toBeUndefined()
    expect(parseBackup(JSON.stringify(upgraded))).toEqual(upgraded)
  })
  it('keeps copied family snapshots when deleting a person and filters exported records/references', () => {
    const a = exampleApplication('09'), child = exampleApplication('16'); child.person!.birthDate = '2016-01-01'
    a.childrenUnder14 = [child.person!]
    const store = emptyStore(); store.members = [{ id: 'a', data: a }, { id: 'b', data: child }]
    store.drafts = [{ id:'da', profileId:'a', data:a, step:0, updatedAt:demoAsOf, completed:[], checks:[], relations:[{ personId:'b', relation:'child', purpose:'section', childIndex:0 }] }, { id:'db', profileId:'b', data:child, step:0, updatedAt:demoAsOf, completed:[], checks:[] }]
    const removed = deletePeople(store,['b'])
    expect(removed.drafts).toHaveLength(1); expect(removed.drafts[0]!.data.childrenUnder14).toEqual(a.childrenUnder14)
    expect(removed.drafts[0]!.relations).toEqual([])
    const exported = exportPeople(store,['b']); expect(exported.members.map((m)=>m.id)).toEqual(['b']); expect(exported.drafts.map((d)=>d.id)).toEqual(['db'])
    expect(parseBackup(JSON.stringify(exported)).drafts).toHaveLength(1)
  })
})

it('keeps legacy family snapshots and paper results while removing global roles', () => {
  const a = exampleApplication('09'), b = exampleApplication('16'), c = exampleApplication('16')
  c.person!.birthDate = '2016-01-01'; a.spouse = familyPerson({id:'b',data:b}); b.childrenUnder14 = [familyPerson({id:'c',data:c})]
  const legacy = { ...emptyStore(), members:[{id:'a',role:'applicant',data:a},{id:'b',role:'spouse',data:b},{id:'c',role:'child',data:c}], drafts:[a,b].map((data,i) => ({id:'d'+i,profileId:i?'b':'a',data,step:0,completed:[],checks:[],updatedAt:demoAsOf})) }
  const before = legacy.drafts.map((d) => kitFor(d.data).forms.map((f) => f.values))
  const upgraded = parseBackup(JSON.stringify(legacy))
  expect(upgraded.members).toHaveLength(3); expect(upgraded.drafts).toHaveLength(2)
  expect(upgraded.drafts.map((d) => kitFor(d.data).forms.map((f) => f.values))).toEqual(before)
  expect(parseBackup(JSON.stringify(upgraded))).toEqual(upgraded)
  const noFamily = exampleApplication('16'), alone = kitFor(noFamily)
  expect(alone.bills).toHaveLength(1); expect(alone.forms[0]!.values).not.toHaveProperty('M1-026')
  noFamily.childrenUnder14 = [familyPerson({id:'c',data:c})]
  expect(kitFor(noFamily).bills).toHaveLength(2); expect(kitFor(noFamily).forms[0]!.values['M1-026']).toBe('01')
})
