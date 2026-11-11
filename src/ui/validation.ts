import { prepareApplication } from '../engine/prepare'
import type { EngineData, PreparedKit } from '../engine/prepare'
import { ApplicationInputError } from '../engine/input-errors'
import type { CharacterIssue } from '../engine/input-errors'

export type DraftValidation = { kind: 'ready'; kit: PreparedKit } |
  { kind: 'invalid'; issues: CharacterIssue[]; message: string } | { kind: 'notice'; message: string }

/** The questionnaire uses the same blocking validation as imported profiles. */
export function validateApplicationDraft(input: unknown, data: EngineData, asOf: string): DraftValidation {
  try {
    const result = prepareApplication(input, data, asOf)
    return result.kind === 'kit' ? { kind: 'ready', kit: result } : { kind: 'notice', message: result.message }
  } catch (error) {
    if (error instanceof ApplicationInputError) return { kind: 'invalid', issues: error.issues, message: error.message }
    return { kind: 'invalid', issues: [], message: error instanceof Error ? error.message : '请检查填写内容。' }
  }
}
