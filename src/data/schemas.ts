import { z } from 'zod'
import { dataPathSchema } from './path'

export const isoDateSchema = z.iso.date()
const metadata = { version: z.literal(1), verifiedOn: isoDateSchema }
const text = z.string().min(1)
const cents = z.number().int().nonnegative().max(99_999_999)
export const operationSchema = z.enum(['rilascio', 'rinnovo', 'aggiornamento', 'duplicato', 'conversione'])
export const codeTableNameSchema = z.enum(['provinces', 'motivi', 'stati', 'documenti', 'autorita', 'questure'])
export const formNameSchema = z.enum(['modulo1', 'modulo2', 'bollettino'])
export const sexSchema = z.enum(['F', 'M'])
export const maritalStatusSchema = z.enum(['A', 'B'])
const coordinate = z.number().finite().nonnegative()
export const rectangleSchema = z.object({
  x: coordinate, y: coordinate, w: z.number().positive(), h: z.number().positive(),
})
export const boxesSchema = rectangleSchema.extend({
  count: z.number().int().positive(), pitch: z.number().positive(),
}).refine((b) => b.pitch >= b.w, { message: '格子间距 pitch 不得小于格宽 w' })

const fieldBase = {
  id: z.string().regex(/^(M[12]-(\d{3}|H\d{2})|B-[a-zA-Z0-9-]+)$/),
  page: z.number().int().positive(), section: text, labelIt: text, labelZh: text,
  charset: text.optional(), codeTable: codeTableNameSchema.nullable().default(null),
}
export const fieldSchema = z.discriminatedUnion('kind', [
  z.object({ ...fieldBase, kind: z.literal('boxes'), boxes: boxesSchema, moreRows: z.array(boxesSchema).optional() }),
  z.object({ ...fieldBase, kind: z.literal('checkbox'), box: rectangleSchema }),
  z.object({ ...fieldBase, kind: z.literal('choice'),
    options: z.array(z.object({ value: text, box: rectangleSchema })).min(1)
      .refine((options) => !duplicates(options.map((o) => o.value)), { message: '选项值重复' }),
  }),
  z.object({ ...fieldBase, kind: z.literal('parts'),
    parts: z.array(z.object({ name: text, boxes: boxesSchema })).min(1)
      .refine((parts) => !duplicates(parts.map((p) => p.name)), { message: '分组名称重复' }),
  }),
  z.object({ ...fieldBase, kind: z.literal('date'), groups: z.object({
    day: boxesSchema.refine((b) => b.count === 2),
    month: boxesSchema.refine((b) => b.count === 2),
    year: boxesSchema.refine((b) => b.count === 4),
  }) }),
  z.object({ ...fieldBase, kind: z.literal('freetext'), area: rectangleSchema }),
])

function duplicates(values: string[]): boolean { return new Set(values).size !== values.length }

export const formSchema = z.object({
  ...metadata, form: formNameSchema,
  source: z.string().regex(/^official\/[\w.-]+\.(pdf|jpg|png)$/),
  pageSize: z.object({ width: z.number().positive(), height: z.number().positive(), unit: z.literal('image-px') }).optional(),
  fields: z.array(fieldSchema).min(1),
}).superRefine((form, ctx) => {
  if (/\.(jpg|png)$/.test(form.source) && !form.pageSize) ctx.addIssue({ code: 'custom', path: ['pageSize'], message: '图片底图必须提供 pageSize' })
  if (duplicates(form.fields.map((f) => f.id))) ctx.addIssue({ code: 'custom', message: '字段 ID 重复' })
  const prefix = { modulo1: 'M1-', modulo2: 'M2-', bollettino: 'B-' }[form.form]
  form.fields.forEach((f, index) => {
    if (!f.id.startsWith(prefix)) ctx.addIssue({ code: 'custom', path: ['fields', index, 'id'], message: '字段 ID 与表格不匹配' })
  })
})

export const codeTableSchema = z.object({
  ...metadata, table: codeTableNameSchema,
  source: text.optional(), note: text.optional(),
  entries: z.array(z.object({ code: text, nameIt: text, nameZh: text.optional(), aliases: z.array(text).optional() })).min(1),
}).refine((t) => !duplicates(t.entries.map((e) => e.code)), { message: '代码重复' })

export const conditionSchema = z.strictObject({
  applicationCodes: z.array(z.string().regex(/^\d{2}$/)).min(1).optional(),
  operations: z.array(operationSchema).min(1).optional(),
  minDurationMonths: z.number().positive().optional(),
  maxDurationMonths: z.number().positive().optional(),
  minor: z.boolean().optional(), hasIncome: z.boolean().optional(),
  equals: z.record(dataPathSchema, z.union([
    z.string(), z.number().finite(), z.boolean(), z.null(),
    z.array(z.union([z.string(), z.number().finite(), z.boolean(), z.null()])).min(1),
  ])).optional(),
  present: z.array(dataPathSchema).optional(),
}).refine((c) => c.minDurationMonths === undefined || c.maxDurationMonths === undefined ||
  c.minDurationMonths <= c.maxDurationMonths, { message: '期限范围颠倒' })

export const applicationGroupSchema = z.enum(['rinnovo', 'rilascio', 'aggiornamento'])
export const applicationProfileSchema = z.strictObject({
  noCurrentPermitFor: z.array(operationSchema).optional(),
  visaFor: z.array(operationSchema).optional(),
  workStep: z.enum(['work', 'student', 'income', 'income-optional']).optional(),
  workTypes: z.array(z.enum(['subordinato', 'autonomo', 'altro'])).min(1).optional(),
  contracts: z.array(z.enum(['indeterminato', 'determinato', 'stagionale', 'altro'])).min(1).optional(),
  duration: z.discriminatedUnion('source', [
    z.strictObject({ source: z.literal('contract') }),
    z.strictObject({ source: z.literal('fixed'), months: z.number().int().positive() }),
    z.strictObject({ source: z.literal('sponsor') }),
    z.strictObject({ source: z.literal('question') }),
  ]).optional(),
  sections: z.array(z.enum(['aggiornamentoReasons', 'sponsor', 'sponsorKind', 'employmentCentre', 'idoneita', 'currentResidence', 'pastResidences', 'dependents', 'art27Letter'])).optional(),
  operationChooser: z.literal(true).optional(),
})
export const applicationTypeSchema = z.object({
  code: z.string().regex(/^\d{2}$/), nameIt: text, nameZh: text,
  titleZh: text.optional(), noteZh: text.optional(), stampExempt: z.boolean().optional(),
  profile: applicationProfileSchema.default({}),
  group: applicationGroupSchema,
  alsoInGroups: z.array(applicationGroupSchema).optional(),
  channel: z.enum(['kit', 'questura']), operations: z.array(operationSchema),
  sportelloUnicoFills: z.array(operationSchema),
  moduli: z.enum(['1', '1+2', '1+2-if-income', '1+2-when']),
  modulo2When: conditionSchema.optional(),
  materials: z.string().regex(/^data\/materials\/\d{2}\.json$/), feeRule: text,
}).refine((a) => !duplicates(a.operations) && !duplicates(a.sportelloUnicoFills), { message: '办理方式重复' })
  .refine((a) => !(a.alsoInGroups ?? []).includes(a.group) && !duplicates(a.alsoInGroups ?? []), { path: ['alsoInGroups'], message: '分组重复' })
  .refine((a) => (a.moduli === '1+2-when') === (a.modulo2When !== undefined), { path: ['modulo2When'], message: '1+2-when 与 modulo2When 必须同时出现' })
export const applicationTypesSchema = z.object({
  ...metadata, types: z.array(applicationTypeSchema).min(1),
}).refine((a) => !duplicates(a.types.map((t) => t.code)), { message: '申请类型代码重复' })

export const feesSchema = z.object({
  ...metadata, cardCents: cents, postageCents: cents, stampCents: cents,
  rules: z.array(z.object({
    id: text, feeRule: text, priority: z.number().int(), when: conditionSchema,
    contributionCents: cents,
  })).min(1),
}).refine((f) => !duplicates(f.rules.map((r) => r.id)), { message: '费用规则 ID 重复' })
export const materialsSchema = z.object({
  ...metadata, applicationCode: z.string().regex(/^\d{2}$/),
  items: z.array(z.object({ nameIt: text, nameZh: text,
    basis: z.enum(['official', 'kit', 'decision', 'common']).optional(), condition: conditionSchema.optional() })),
})

export type FormDefinition = z.infer<typeof formSchema>
export type FormField = z.infer<typeof fieldSchema>
export type Boxes = z.infer<typeof boxesSchema>
export type Operation = z.infer<typeof operationSchema>
export type CodeTable = z.infer<typeof codeTableSchema>
export type ApplicationType = z.infer<typeof applicationTypeSchema>
export type ApplicationTypes = z.infer<typeof applicationTypesSchema>
export type Fees = z.infer<typeof feesSchema>
export type Materials = z.infer<typeof materialsSchema>
export type Condition = z.infer<typeof conditionSchema>
export type Sex = z.infer<typeof sexSchema>
export type MaritalStatus = z.infer<typeof maritalStatusSchema>
