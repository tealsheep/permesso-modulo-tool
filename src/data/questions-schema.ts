import { z } from 'zod'
import { pathTokens } from './path'
import { conditionSchema, isoDateSchema } from './schemas'

/** [] is a data-only wildcard; executable/property-expression paths are rejected. */
export const questionPathSchema = z.string().refine((path) => pathTokens(path.replaceAll('[]', '[0]')) !== undefined, {
  message: '问卷路径必须是安全的资料路径，可用 [] 表示已有数组项',
})
export const questionsSchema = z.strictObject({
  version: z.literal(1), verifiedOn: isoDateSchema, note: z.string().optional(),
  fields: z.record(questionPathSchema, z.strictObject({
    label: z.string().min(1), hint: z.string(), help: z.string(),
    // DATA-MODEL §3A（2026-11-06）：辅助问题替换"第 N 栏"那一行；选项文字与说明
    paper: z.string().min(1).optional(),
    options: z.array(z.strictObject({ value: z.string().min(1), label: z.string().min(1), hint: z.string().optional() })).min(1).optional(),
  })),
  // DATA-MODEL §3A（2026-11-06）：几个路径合成一栏显示（如电话：区号 / 号码）。渲染由 Codex 实现。
  groups: z.record(questionPathSchema, z.strictObject({
    label: z.string().min(1), hint: z.string(), help: z.string(), parts: z.array(z.string().min(1)).min(2),
  })).optional(),
  sections: z.record(z.string().min(1), z.string()),
  defaults: z.array(z.strictObject({
    path: questionPathSchema,
    value: z.union([z.strictObject({ const: z.json() }), z.strictObject({ fromPath: questionPathSchema })]),
    when: conditionSchema.optional(),
  })),
})
export type Questions = z.infer<typeof questionsSchema>
