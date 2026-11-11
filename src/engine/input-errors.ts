export interface CharacterIssue {
  code: 'unsupported-characters'
  field: string
  label: string
  part?: string
  paths: string[]
  characters: string[]
  message: string
}

/** Questionnaire and imported profiles share the same generation gate. */
export class ApplicationInputError extends Error {
  readonly issues: CharacterIssue[]
  constructor(issues: CharacterIssue[]) {
    const unique = [...new Map(issues.map((issue) => [`${issue.field}:${issue.part ?? ''}`, issue])).values()]
    super(`请先修改填写内容：${unique.map((issue) => issue.message).join('；')}`)
    this.name = 'ApplicationInputError'
    this.issues = unique
  }
}
