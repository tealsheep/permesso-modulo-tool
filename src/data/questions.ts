import rawQuestions from '../../data/questions.json'
import { loadData } from './load'
import { questionsSchema } from './questions-schema'
import type { Questions } from './questions-schema'

export const questions = loadData(questionsSchema, rawQuestions, 'data/questions.json')
export const normalizeQuestionPath = (path: string) => path.replace(/\[\d+\]/g, '[]')
export function groupCopy(path: string, data: Questions = questions) {
  return data.groups && own(data.groups, normalizeQuestionPath(path))
}
function own<T>(record: Record<string, T>, key: string): T | undefined {
  return Object.hasOwn(record, key) ? record[key] : undefined
}

export function questionCopy(path: string, data: Questions = questions): Questions['fields'][string] | undefined {
  const normalized = normalizeQuestionPath(path)
  // D54 wording now lives in data/questions.json; no source-side overrides.
  return own(data.fields, normalized) ?? own(data.fields, normalized.replace(/^spouse\.|^childrenUnder14\[\]\./, 'person.'))
}
export function sectionCopy(title: string, data: Questions = questions): string | undefined {
  return own(data.sections, title) ?? own(data.sections, title.replace(/\s*\d+\s*$/, '').trimEnd())
}
