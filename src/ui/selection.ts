import type { ApplicationType, Operation } from '../data/schemas'

export const groupLabels: Record<string, [string, string]> = { rinnovo: ['续签', 'RINNOVO'], rilascio: ['第一次申请', 'RILASCIO'], aggiornamento: ['更新、补发、转换', 'AGGIORNAMENTO'], pending: ['其他类型', 'IN PREPARAZIONE'] }
export const operationNames: Record<Operation, string> = { rilascio: '第一次申请 · Rilascio', rinnovo: '续签 · Rinnovo', aggiornamento: '更新 · Aggiornamento', duplicato: '补发 · Duplicato', conversione: '转换 · Conversione' }
type Grouped = { group: string; alsoInGroups?: readonly string[] }
export const groupsFor = (type: Grouped) => [type.group, ...(type.alsoInGroups ?? [])]
export function displayGroups(type: Grouped, query: string): string[] {
  // D46: a type listed in two groups stays in both unless the query names a group.
  const matched = groupsFor(type).filter((group) => groupLabels[group]?.join(' ').toLowerCase().includes(query))
  return matched.length ? matched : groupsFor(type)
}
export function defaultOperation(type: ApplicationType, group: string): Operation {
  return type.operations.find((operation) => operation === group) ?? type.operations[0]!
}
