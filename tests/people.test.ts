import { describe, expect, it } from 'vitest'
import { exampleApplication } from '../src/demo/applications'
import { emptyStore, parseBackup } from '../src/storage/store'
import type { Store } from '../src/storage/store'
import { cloneDraft, latestPerson, organizePeople, personalData } from '../src/storage/people'

function fixture(): Store {
  return { ...emptyStore(), members: [{ id: 'old-member', data: exampleApplication('16') }], drafts: [{ id: 'old-draft', data: exampleApplication('16'), step: 2, completed: ['application'], updatedAt: '2026-11-05', checks: ['fixture-material'], generatedAt: '2026-11-05' }] }
}
describe('D43 people and legacy records', () => {
  it('links to a unique exact saved identity without losing members, answers or checks', () => {
    const original = fixture(), before = structuredClone(original), migrated = parseBackup(JSON.stringify(original))
    expect(migrated.members).toEqual(original.members)
    expect(migrated.drafts[0]).toEqual({ ...original.drafts[0], profileId: 'old-member' })
    expect(organizePeople(migrated)).toEqual(migrated)
    expect(original).toEqual(before)
  })
  it('clamps a saved step that no longer exists instead of rejecting the whole record', () => {
    const original = fixture(); original.drafts[0]!.step = 5
    const migrated = parseBackup(JSON.stringify(original))
    expect(migrated.drafts[0]!.step).toBeLessThan(5)
    expect(migrated.drafts[0]!.data).toEqual(original.drafts[0]!.data)
  })
  it('does not merge by name alone and preserves explicitly separate people', () => {
    const original = fixture(); original.drafts[0]!.data.person!.birthDate = '1991-02-01'
    const migrated = organizePeople(original)
    expect(migrated.members).toHaveLength(2)
    expect(migrated.drafts[0]!.profileId).not.toBe('old-member')
    const id = migrated.drafts[0]!.profileId
    migrated.drafts[0]!.data.person!.birthDate = '1990-01-31'
    expect(organizePeople(migrated).drafts[0]!.profileId).toBe(id)
  })
  it('keeps ambiguous identities separate and handles blank legacy drafts deterministically', () => {
    const original = fixture(); original.members.push({ ...original.members[0]!, id: 'second-member' })
    const migrated = organizePeople(original)
    expect(migrated.drafts[0]!.profileId).toBe('person-old-draft')
    original.drafts[0]!.data.person = {}
    expect(organizePeople(organizePeople(original))).toEqual(organizePeople(original))
  })
  it('uses the latest personal data, while an explicit profile edit takes precedence', () => {
    const store = organizePeople(fixture()); store.drafts[0]!.data.address!.street = 'VIA DEMO NUOVA'
    expect(latestPerson(store, store.members[0]!).data.address!.street).toBe('VIA DEMO NUOVA')
    store.members[0]!.updatedAt = '2026-11-06'
    expect(latestPerson(store, store.members[0]!).data.address!.street).toBe(store.members[0]!.data.address!.street)
    const target = exampleApplication('15'), copied = personalData(target, store.drafts[0]!.data)
    expect(copied.work).toEqual(target.work); expect(copied.application).toEqual(target.application)
    expect(copied.address).toEqual(store.drafts[0]!.data.address)
  })
  it('duplicates answers while resetting generation, progress, material checks and step', () => {
    const source = fixture().drafts[0]!, copy = cloneDraft(source, 'copy', '2026-11-06')
    expect(copy.data).toEqual(source.data); expect(copy.id).toBe('copy')
    expect(copy.generatedAt).toBeUndefined(); expect(copy.completed).toEqual([]); expect(copy.checks).toEqual([]); expect(copy.step).toBe(0)
    copy.data.person!.surname = 'DEMO COPY'
    expect(source.data.person!.surname).not.toBe('DEMO COPY')
  })
})
