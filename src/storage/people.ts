import type { Application } from '../data/application-schema'
import type { Draft, Member, Store } from './store'

function identity(a: Application) {
  const p = a.person
  return p?.surname && p.givenNames && p.birthDate ? JSON.stringify([p.surname.trim().toUpperCase(), p.givenNames.trim().toUpperCase(), p.birthDate]) : undefined
}
/** Keep every legacy member; attach unlinked drafts deterministically, never by name alone. */
export function organizePeople(store: Store): Store {
  const members = [...store.members]
  const drafts = store.drafts.map((draft) => {
    if (draft.profileId && members.some((member) => member.id === draft.profileId)) return draft
    const key = identity(draft.data)
    const matches = key ? members.filter((member) => identity(member.data) === key && (!member.data.document?.number || !draft.data.document?.number || member.data.document.number === draft.data.document.number)) : []
    const id = draft.profileId && !members.some((member) => member.id === draft.profileId) ? draft.profileId : `person-${draft.id}`
    let uniqueId = id, suffix = 1
    while (members.some((member) => member.id === uniqueId)) uniqueId = `${id}-${suffix++}`
    const member = matches.length === 1 ? matches[0]! : { id: uniqueId, data: structuredClone(draft.data) }
    if (!members.includes(member)) members.push(member)
    return { ...draft, profileId: member.id }
  })
  return { ...store, members, drafts }
}
export function latestPerson(store: Store, member: Member): Member {
  const latest = store.drafts.filter((draft) => draft.profileId === member.id).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0]
  return latest && (!member.updatedAt || member.updatedAt < latest.updatedAt) ? { ...member, updatedAt: latest.updatedAt, data: personalData(member.data, latest.data) } : member
}
/** Copy personal/common information, never a previous application's work or family answers. */
export function personalData(target: Application, source: Application): Application {
  const result = structuredClone(target)
  for (const key of ['person', 'document', 'currentPermit', 'address', 'questura'] as const) {
    if (source[key] !== undefined) Object.assign(result, { [key]: structuredClone(source[key]) })
  }
  return result
}
export function cloneDraft(draft: Draft, id: string, updatedAt: string): Draft {
  return { ...structuredClone(draft), id, updatedAt, generatedAt: undefined, completed: [], checks: [], step: 0 }
}
export function familyPerson(member: Member) {
  const { surname, givenNames, sex, birthDate, birthCountry, citizenship, birthCity } = member.data.person ?? {}
  return { surname, givenNames, sex, birthDate, birthCountry, citizenship, birthCity }
}

export const isNamed = (a: Application) => !!(a.person?.surname?.trim() || a.person?.givenNames?.trim())
export function sortedPeople(store: Store) {
  return store.members.map((member) => latestPerson(store, member)).sort((a,b) => (b.updatedAt ?? '').localeCompare(a.updatedAt ?? ''))
}
export function exportPeople(store: Store, ids: string[]): Store {
  const members = store.members.filter((member) => ids.includes(member.id)), drafts = store.drafts.filter((draft) => !!draft.profileId && ids.includes(draft.profileId))
  return { ...store, members, drafts: drafts.map((draft) => ({ ...draft, relations: draft.relations?.filter((r) => ids.includes(r.personId) && (!r.draftId || drafts.some((d) => d.id === r.draftId))) })) }
}
export function deletePeople(store: Store, ids: string[]): Store {
  return exportPeople(store, store.members.filter((member) => !ids.includes(member.id)).map((member) => member.id))
}
