import type { Condition } from '../data/schemas'
import { pathTokens } from '../data/path'
import type { ApplicationSelection } from './application'

export function readPath(source: unknown, path: string): unknown {
  const tokens = pathTokens(path)
  if (!tokens) return undefined
  let value: unknown = source
  for (const token of tokens) {
    if (typeof value !== 'object' || value === null || !Object.hasOwn(value, token)) return undefined
    value = (value as Record<string | number, unknown>)[token]
  }
  return value
}
export function isPresent(value: unknown): boolean {
  return value !== undefined && value !== null && value !== '' && value !== false &&
    (!Array.isArray(value) || value.length > 0)
}
export function matchesCondition(condition: Condition, selection: ApplicationSelection, application?: unknown): boolean {
  return (!condition.applicationCodes || condition.applicationCodes.includes(selection.applicationCode)) &&
    (!condition.operations || condition.operations.includes(selection.operation)) &&
    (condition.minor === undefined || condition.minor === selection.minor) &&
    (condition.hasIncome === undefined || condition.hasIncome === selection.hasIncome) &&
    (condition.minDurationMonths === undefined || (selection.durationMonths !== undefined && selection.durationMonths >= condition.minDurationMonths)) &&
    (condition.maxDurationMonths === undefined || (selection.durationMonths !== undefined && selection.durationMonths <= condition.maxDurationMonths)) &&
    Object.entries(condition.equals ?? {}).every(([path, expected]) => {
      const actual = readPath(application, path)
      const candidates = Array.isArray(expected) ? expected : [expected]
      const values = Array.isArray(actual) ? actual : [actual]
      return candidates.some((candidate) => values.some((value) => value === candidate))
    }) && (condition.present ?? []).every((path) => isPresent(readPath(application, path)))
}
