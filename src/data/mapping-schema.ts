import { z } from 'zod'
import { conditionSchema, formNameSchema, isoDateSchema } from './schemas'
import { dataPathSchema } from './path'

export const computedNameSchema = z.enum(['children.count', 'modules.count', 'fee.euro', 'fee.cents', 'fee.words',
  'income.annual.euro', 'income.annual.cents', 'income.monthly.euro', 'income.monthly.cents'])
type Scalar = string | number | boolean | null
export type RuleValue = { path: string } | { const: Scalar } | { computed: z.infer<typeof computedNameSchema> } |
  { parts: Record<string, RuleValue> } | { join: RuleValue[]; sep: string }
export const ruleValueSchema: z.ZodType<RuleValue> = z.lazy(() => z.union([
  z.strictObject({ path: dataPathSchema }),
  z.strictObject({ const: z.union([z.string(), z.number().finite(), z.boolean(), z.null()]) }),
  z.strictObject({ computed: computedNameSchema }),
  z.strictObject({ parts: z.record(z.string().min(1), ruleValueSchema).refine((p) => Object.keys(p).length > 0) }),
  z.strictObject({ join: z.array(ruleValueSchema).min(1), sep: z.string() }),
]))
export const mappingSchema = z.strictObject({
  form: formNameSchema, version: z.literal(1), verifiedOn: isoDateSchema,
  rules: z.array(z.strictObject({ field: z.string().min(1), value: ruleValueSchema, when: conditionSchema.optional() })),
})
export type FieldMapping = z.infer<typeof mappingSchema>
