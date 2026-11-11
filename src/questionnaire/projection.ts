import type { Application } from '../data/application-schema'
import type { ApplicationTypes } from '../data/schemas'
import { readPath } from '../engine/conditions'
import { pathTokens } from '../data/path'
import { stepsFor } from './model'
import { codeTables } from '../data/catalog'

/** One applicability boundary for mappings, fees, materials and validation.
 * The editable draft is never mutated; inactive answers remain there for reuse. */
export function projectApplication(input: Application, catalog: ApplicationTypes, asOf: string): Application {
  const output: Application = { application: { code: input.application.code, operation: input.application.operation,
    expectedDurationMonths: input.application.expectedDurationMonths } }
  const paths = stepsFor(input, input.mailToDifferent ?? !!input.mailTo, catalog, asOf)
    .flatMap((step) => step.sections.flatMap((section) => section.fields.map((field) => field.path)))
  for (const path of paths) {
    const value = readPath(input, path), tokens = pathTokens(path)!
    if (value === undefined) continue
    let node = output as unknown as Record<string | number, unknown>
    tokens.forEach((token, index) => {
      if (index === tokens.length - 1) node[token] = structuredClone(value)
      else {
        node[token] ??= typeof tokens[index + 1] === 'number' ? [] : {}
        node = node[token] as Record<string | number, unknown>
      }
    })
  }
  // Values supplied by a compound control rather than separate questions.
  if (output.questura) output.questura.province = codeTables.questure.entries.find((entry) => entry.nameIt === output.questura?.city)?.code ?? input.questura?.province
  output.mailToDifferent = input.mailToDifferent ?? !!input.mailTo
  if (output.work?.contrattoSoggiornoStatus === 'same-employer') {
    output.contrattoSoggiorno = { ...output.contrattoSoggiorno, mode: 'sottoscritto' }
  }
  for (const key of ['work', 'employer', 'business', 'contrattoSoggiorno', 'currentPermit', 'visa', 'mailTo', 'spouse', 'income', 'housing', 'dependents', 'employmentCentre'] as const) {
    if (!(key in output) && key in input) Object.assign(output, { [key]: null })
  }
  return output
}
