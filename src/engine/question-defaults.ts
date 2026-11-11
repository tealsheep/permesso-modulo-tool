import type { Application } from '../data/application-schema'
import { pathTokens } from '../data/path'
import { questions } from '../data/questions'
import type { Questions } from '../data/questions-schema'
import { matchesCondition, readPath } from './conditions'
import { parseDate } from './dates'
import { selectionFromApplication } from './prepare'

// Unlike present-conditions, an explicit false or zero is an answer, not an empty field.
function empty(value: unknown): boolean {
  return value == null || value === '' || (Array.isArray(value) && value.length === 0)
}
function targets(path: string, application: Application): string[] {
  const wildcard = path.indexOf('[]')
  if (wildcard < 0) return [path]
  const array = readPath(application, path.slice(0, wildcard))
  return Array.isArray(array) ? array.flatMap((_, i) => targets(path.replace('[]', `[${i}]`), application)) : []
}
function sourcePath(path: string, target: string): string | undefined {
  const indices = [...target.matchAll(/\[(\d+)\]/g)].map((m) => m[1]!)
  let index = 0
  const source = path.replace(/\[\]/g, () => `[${indices[index++] ?? ''}]`)
  return pathTokens(source) ? source : undefined
}
function assign(application: Application, path: string, value: unknown) {
  const tokens = pathTokens(path)
  if (!tokens) throw new Error('无效默认值路径')
  let node = application as unknown as Record<string | number, unknown>
  tokens.forEach((token, i) => {
    if (i === tokens.length - 1) node[token] = structuredClone(value)
    else {
      if (node[token] === null || typeof node[token] !== 'object') node[token] = typeof tokens[i + 1] === 'number' ? [] : {}
      node = node[token] as Record<string | number, unknown>
    }
  })
}

/** Pure draft transformation. Apply in data order, without creating any array members. */
export function applyQuestionDefaults(application: Application, rules: Questions['defaults'] = questions.defaults,
  asOf = new Date().toLocaleDateString('sv-SE')): Application {
  const result = structuredClone(application), matched = new Set<string>()
  for (const rule of rules) for (const path of targets(rule.path, result)) {
    if (matched.has(path) || !empty(readPath(result, path))) continue
    // Invalid/future draft dates must remain editable rather than crashing defaults.
    const birth = result.person?.birthDate
    const selection = selectionFromApplication({ ...result, person: { ...result.person,
      birthDate: birth && parseDate(birth) && birth <= asOf ? birth : null } }, asOf)
    if (!matchesCondition(rule.when ?? {}, selection, result)) continue
    matched.add(path)
    const from = 'fromPath' in rule.value ? sourcePath(rule.value.fromPath, path) : undefined
    const value = 'const' in rule.value ? rule.value.const : from ? readPath(result, from) : undefined
    if (!empty(value)) assign(result, path, value)
  }
  return result
}
