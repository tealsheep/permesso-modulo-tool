import { modulo1 } from '../data/catalog'
import type { FormDefinition } from '../data/schemas'
import type { FieldValue, FieldValues } from '../engine/application'

function sampleText(count: number): string { return 'ESEMPIO'.repeat(Math.ceil(count / 7)).slice(0, count) }

/** Alignment test only: deliberately fills every field, not a valid application. */
export function createAlignmentValues(definition: FormDefinition): FieldValues {
  return Object.fromEntries(definition.fields.map((field): [string, FieldValue] => {
  switch (field.kind) {
    case 'boxes': return [field.id, sampleText(field.boxes.count + (field.moreRows ?? []).reduce((sum, row) => sum + row.count, 0))]
    case 'checkbox': return [field.id, true]
    case 'choice': return [field.id, field.options[0]!.value]
    case 'parts': return [field.id, Object.fromEntries(field.parts.map((part) => [part.name,
      part.name === 'euro' ? '80' : part.name === 'centesimi' ? '46' : '0'.repeat(part.boxes.count)]))]
    case 'date': return [field.id, '2000-02-29']
    case 'freetext': return [field.id, 'ESEMPIO']
  }
  }))
}

export const alignmentValues = createAlignmentValues(modulo1)
