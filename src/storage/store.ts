import { z } from 'zod'
import { applicationSchema } from '../data/application-schema'
import type { Application } from '../data/application-schema'
import { businessData } from '../data/business'
import { organizePeople } from './people'
import { applyQuestionDefaults } from '../engine/question-defaults'
import { stepsFor } from '../ui/questionnaire'

export const storageKey = 'permesso-helper-v1'
const relationSchema = z.strictObject({ personId: z.string(), relation: z.enum(['spouse', 'child']), purpose: z.enum(['section', 'own-application']), draftId: z.string().optional(), childIndex: z.number().int().min(0).max(4).optional() }).refine((r) => r.purpose !== 'own-application' || !!r.draftId, { message: '关联申请缺少编号' })
const draftSchema = z.strictObject({
  relations: z.array(relationSchema).optional(),
  id: z.string(), profileId: z.string().optional(), data: applicationSchema,
  step: z.number().int().min(0).max(5), completed: z.array(z.string()),
  updatedAt: z.string(), generatedAt: z.string().optional(),
  checks: z.array(z.string()),
})
const memberSchema = z.strictObject({ id: z.string(), updatedAt: z.string().optional(), data: applicationSchema })
const currentStoreSchema = z.strictObject({
  version: z.literal(1), drafts: z.array(draftSchema).max(200),
  members: z.array(memberSchema).max(300), familyIntroDismissed: z.boolean(),
}).superRefine((s, ctx) => {
  for (const collection of [s.drafts, s.members]) {
    if (new Set(collection.map((v) => v.id)).size !== collection.length) ctx.addIssue({ code: 'custom', message: '备份里有重复编号' })
  }
  for (const d of s.drafts) {
    const sections = d.relations?.filter((r) => r.purpose === 'section') ?? []
    if (sections.some((r) => r.personId === d.profileId) || new Set(sections.map((r) => r.personId)).size !== sections.length) ctx.addIssue({ code: 'custom', message: '家属位置不能重复选择同一人或申请人本人' })
    const type = businessData.applicationTypes.types.find((t) => t.code === d.data.application.code)
    if (!type || !type.operations.includes(d.data.application.operation)) ctx.addIssue({ code: 'custom', message: '备份包含尚不支持的申请类型或办理方式' })
  }
}).transform((s) => ({
  // A saved step can outlive a rule change that removes a step; clamp it instead of rejecting the whole record.
  ...s, drafts: s.drafts.map((d) => ({ ...d, step: Math.min(d.step, stepsFor(d.data).length - 1) })),
}))
export function migrateStore(input: unknown): unknown {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return input
  const next = structuredClone(input) as Record<string, unknown>
  for (const key of ['members', 'drafts']) if (Array.isArray(next[key])) for (const item of next[key] as Record<string, unknown>[]) {
    if (!item || typeof item !== 'object') continue
    if (key === 'members') delete item.role
    const data = item.data as Record<string, unknown> | undefined
    if (!data || typeof data !== 'object') continue
    data.mailToDifferent ??= data.mailTo != null
    const app = data.application as Record<string, unknown> | undefined
    // Historical format upgrade only (D55), not a business-rule branch.
    if (app && ['30', '28'].includes(String(app.code)) && app.operation === 'rilascio') {
      app.operation = 'conversione'
      if (key === 'drafts') { delete item.generatedAt; item.completed = []; item.step = 0 }
    }

  }
  return next
}
export const storeSchema = z.preprocess(migrateStore, currentStoreSchema)
export type Store = z.infer<typeof storeSchema>
export type Draft = Store['drafts'][number]
export type Member = Store['members'][number]
export const emptyStore = (): Store => ({ version: 1, drafts: [], members: [], familyIntroDismissed: false })
export function parseBackup(text: string): Store { return organizePeople(storeSchema.parse(JSON.parse(text))) }
export function loadStore(storage: Pick<Storage, 'getItem'>): { store: Store; error?: string } {
  try {
    const raw = storage.getItem(storageKey)
    return { store: raw ? parseBackup(raw) : emptyStore() }
  } catch { return { store: emptyStore(), error: '本机资料无法读取，原记录已保留。请先导出原记录，再导入有效备份或清除资料。' } }
}
export function saveStore(storage: Pick<Storage, 'setItem'>, store: Store) {
  storage.setItem(storageKey, JSON.stringify(storeSchema.parse(store)))
}
/** invalid: a draft still has a value the questionnaire marks as wrong; nothing is written. failed: the browser refused the write. */
export function trySaveStore(storage: Pick<Storage, 'setItem'>, store: Store): 'saved' | 'invalid' | 'failed' {
  const parsed = storeSchema.safeParse(store)
  if (!parsed.success) return 'invalid'
  try { storage.setItem(storageKey, JSON.stringify(parsed.data)); return 'saved' } catch { return 'failed' }
}
export function newApplication(code: string, operation: Application['application']['operation']): Application {
  const profile = businessData.applicationTypes.types.find((type) => type.code === code)?.profile
  const months = profile?.duration?.source === 'fixed' ? profile.duration.months
    : profile?.duration?.source === 'contract' && (!profile.contracts || profile.contracts.includes('indeterminato')) ? 24 : undefined
  return applyQuestionDefaults({ mailToDifferent: false, application: { code, operation, ...(months ? { expectedDurationMonths: months } : {}) } })
}
export function copyShared(target: Application, source: Application, keys: string[]): Application {
  const result = structuredClone(target)
  if (keys.includes('address')) {
    const { email: _email, phoneFixed: _fixed, phoneMobile: _mobile, ...address } = source.address ?? {}
    void _email; void _fixed; void _mobile
    result.address = { ...result.address, ...address }
  }
  if (keys.includes('phone')) result.address = { ...result.address, phoneFixed: source.address?.phoneFixed, phoneMobile: source.address?.phoneMobile }
  if (keys.includes('email')) result.address = { ...result.address, email: source.address?.email }
  if (keys.includes('questura')) result.questura = structuredClone(source.questura)
  return result
}
