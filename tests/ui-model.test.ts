import { organizePeople } from '../src/storage/people'
import rawTypes from '../data/application-types.json'
import { describe, expect, it } from 'vitest'
import { applicationTypesSchema } from '../src/data/schemas'
import { businessData } from '../src/data/business'
import { exampleApplication } from '../src/demo/applications'
import { copyShared, emptyStore, loadStore, newApplication, parseBackup, saveStore, storageKey } from '../src/storage/store'
import { personFields, progress, questionErrors, setAnswer, stepsFor } from '../src/ui/questionnaire'

describe('v2 questionnaire and local records', () => {
  it('retains the group in the formal catalog and rejects unknown groups', () => {
    expect(businessData.applicationTypes.types.map((t) => [t.code, t.group])).toEqual(rawTypes.types.map((t) => [t.code, t.group]))
    expect(applicationTypesSchema.safeParse({ ...businessData.applicationTypes, types: [{ ...businessData.applicationTypes.types[0], group: 'unknown' }] }).success).toBe(false)
  })
  it.each(businessData.applicationTypes.types.map((type) => type.code))('%s has the right steps and its fictional complete example validates', (code) => {
    const a = exampleApplication(code), steps = stepsFor(a)
    const type = businessData.applicationTypes.types.find((type) => type.code === code)!
    const extra = ['income', 'income-optional'].includes(type.profile.workStep ?? '') ? ['income'] : type.profile.workStep === 'student' ? a.study?.working ? ['work', 'income'] : [] : type.profile.workStep === 'work' ? ['work'] : []
    expect(steps.map((s) => s.id)).toEqual(['application', 'person', 'address', ...extra, 'family'])
    expect(questionErrors(a, steps.flatMap((s) => s.sections.flatMap((s) => s.fields)), '2026-11-05')).toEqual([])
    expect(progress(a).percent).toBe(100)
  })
  it('starts with empty personal data instead of a demonstration identity', () => {
    const a = newApplication('03', 'aggiornamento')
    expect(a.person?.surname).toBeUndefined()
    expect(a.person?.givenNames).toBeUndefined()
    expect(a.person?.birthCountry).toBe('CHN')
    expect(a.currentPermit?.typeCode).toBe('09')
    expect(progress(a).percent).toBeLessThan(100)
    expect(questionErrors(a, personFields(), '2026-11-05')).toHaveLength(5)
  })
  it('derives duration when the work contract changes without changing the original', () => {
    const a = exampleApplication('16')
    expect(setAnswer(a, 'work.contract', 'indeterminato').application.expectedDurationMonths).toBe(24)
    expect(setAnswer(a, 'work.contractMonths', 18).application.expectedDurationMonths).toBe(12)
    expect(setAnswer(a, 'work.contract', 'altro').application.expectedDurationMonths).toBeNull()
    expect(a.application.expectedDurationMonths).toBe(12)
  })
  it('creates array paths safely and rejects prototype writes', () => {
    const a = setAnswer(exampleApplication('09'), 'childrenUnder14[1].surname', 'FITTIZIO')
    expect(a.childrenUnder14?.[1]?.surname).toBe('FITTIZIO')
    expect(() => setAnswer(a, '__proto__.polluted', true)).toThrow()
    expect({}).not.toHaveProperty('polluted')
  })
  it('blocks Chinese before generation and retains the original input', () => {
    const a = setAnswer(exampleApplication('16'), 'person.birthCity', '温州')
    const e = questionErrors(a, personFields(), '2026-11-05')
    expect(e).toMatchObject([{ path: 'person.birthCity' }])
    expect(e[0]?.message).toBe('出生地（第 38 栏）不能写汉字，请照护照写拼音')
    expect(a.person?.birthCity).toBe('温州')
    expect(progress(a, '2026-11-05').percent).toBeLessThan(100)
    expect(questionErrors(setAnswer(a, 'person.birthCity', 'WENZHOU'), personFields(), '2026-11-05')).toEqual([])
  })
  it('rejects adult children and impossible or future dates', () => {
    const a = exampleApplication('09')
    a.childrenUnder14![0]!.birthDate = '2012-11-05'
    const qs = stepsFor(a).flatMap((s) => s.sections.flatMap((s) => s.fields))
    expect(questionErrors(a, qs, '2026-11-05').some((e) => e.message.includes('14 岁'))).toBe(true)
    expect(questionErrors(setAnswer(a, 'person.birthDate', '1990-02-30'), personFields(), '2026-11-05')[0]?.message).toContain('有效日期')
    expect(questionErrors(setAnswer(a, 'person.birthDate', '2027-01-01'), personFields(), '2026-11-05')[0]?.message).toContain('晚于今天')
  })
  it('copies only explicitly selected shared data; identity and unselected contact stay', () => {
    const source = exampleApplication('16'), target = exampleApplication('15')
    source.address = { street: 'VIA FITTIZIA', email: 'source@example.invalid', phoneMobile: { numero: '000' } }
    target.person!.surname = 'ALTRO FITTIZIO'
    target.address!.email = 'target@example.invalid'
    const copied = copyShared(target, source, ['address'])
    expect(copied.address?.street).toBe('VIA FITTIZIA')
    expect(copied.address?.email).toBe('target@example.invalid')
    expect(copied.person?.surname).toBe('ALTRO FITTIZIO')
    expect(target.address?.street).toBe('Via Esempio')
    expect(copyShared(target, source, ['email']).address?.email).toBe('source@example.invalid')
  })
  it('round trips drafts, family and material checks in a versioned backup', () => {
    const store = emptyStore()
    store.drafts.push({ id: 'fictional-draft', data: exampleApplication('09'), step: 2, completed: ['application', 'person'], updatedAt: '2026-11-05T10:00:00Z', checks: ['Esempio'] })
    store.members.push({ id: 'fictional-member', data: exampleApplication('15') })
    let raw = ''
    saveStore({ setItem: (key, value) => { expect(key).toBe(storageKey); raw = value } }, store)
    expect(loadStore({ getItem: () => raw }).store).toEqual(organizePeople(store))
    expect(parseBackup(raw)).toEqual(organizePeople(store))
  })
  it('preserves unreadable records, rejects unsupported versions or types, and clamps stale steps', () => {
    const result = loadStore({ getItem: () => '{broken' })
    expect(result.error).toContain('原记录已保留')
    expect(() => parseBackup('{"version":2}')).toThrow()
    const store = emptyStore()
    store.drafts.push({ id: 'fictional', data: exampleApplication('03'), step: 4, completed: [], updatedAt: '', checks: [] })
    // A step removed by a later rule change must not make the whole local record unreadable.
    expect(parseBackup(JSON.stringify(store)).drafts[0]!.step).toBe(3)
    store.drafts[0]!.step = 0; store.drafts[0]!.data.application.code = '99'
    expect(() => parseBackup(JSON.stringify(store))).toThrow()
  })
})
