import type { ApplicationType, ApplicationTypes, Fees, Materials, Operation } from '../data/schemas'
import { matchesCondition } from './conditions'
export { matchesCondition } from './conditions'
export type { Application } from '../data/application-schema'
export interface ApplicationSelection {
  applicationCode: string
  operation: Operation
  durationMonths?: number
  minor?: boolean
  hasIncome?: boolean
}
export type ApplicationPlan =
  | { kind: 'notice'; reason: 'questura' | 'sportello-unico' | 'unsupported'; message: string }
  | { kind: 'kit'; application: ApplicationType; forms: ('modulo1' | 'modulo2')[] }

export function planApplication(selection: ApplicationSelection, catalog: ApplicationTypes, input?: unknown): ApplicationPlan {
  const application = catalog.types.find((a) => a.code === selection.applicationCode)
  if (!application) return { kind: 'notice', reason: 'unsupported', message: '该申请类型尚未配置，请核对官方办理方式。' }
  if (application.channel === 'questura') return { kind: 'notice', reason: 'questura', message: '请直接预约 Questura' }
  if (application.sportelloUnicoFills.includes(selection.operation)) {
    return { kind: 'notice', reason: 'sportello-unico', message: '表格由 Sportello Unico 填写，不需要自己填' }
  }
  if (!application.operations.includes(selection.operation)) return { kind: 'notice', reason: 'unsupported', message: '该类型暂不支持所选办理方式。' }
  const needSecond = application.moduli === '1+2' || (application.moduli === '1+2-if-income' && selection.hasIncome) ||
    (application.moduli === '1+2-when' && matchesCondition(application.modulo2When!, selection, input))
  return { kind: 'kit', application, forms: needSecond ? ['modulo1', 'modulo2'] : ['modulo1'] }
}

/** Rules are injected from validated data. Missing or ambiguous rules never imply free contribution. */
export function calculateFees(selection: ApplicationSelection, feeRule: string, data: Fees, application?: unknown) {
  if (selection.durationMonths !== undefined && (!Number.isFinite(selection.durationMonths) || selection.durationMonths <= 0)) {
    throw new Error('预期期限必须大于零')
  }
  const matches = data.rules.filter((r) => r.feeRule === feeRule && matchesCondition(r.when, selection, application))
    .sort((a, b) => b.priority - a.priority)
  const rule = matches[0]
  if (!rule) throw new Error('没有匹配的费用规则，请核对配置或预期期限')
  if (matches[1]?.priority === rule.priority) throw new Error('费用规则优先级冲突')
  return {
    ruleId: rule.id, cardCents: data.cardCents, contributionCents: rule.contributionCents,
    bollettinoCents: data.cardCents + rule.contributionCents,
    postageCents: data.postageCents, stampCents: data.stampCents,
  }
}

export function selectMaterials(selection: ApplicationSelection, data: Materials, application?: unknown) {
  if (data.applicationCode !== selection.applicationCode) throw new Error('材料清单与申请类型不匹配')
  return data.items.filter((item) => !item.condition || matchesCondition(item.condition, selection, application))
    .map(({ nameIt, nameZh, basis }) => ({ nameIt, nameZh, ...(basis ? { basis } : {}),
      ...(basis === 'common' ? { notice: '常见要求，以当地 Questura 为准' } : {}),
    }))
}

export type FieldValue = string | boolean | Readonly<Record<string, string>>
export type FieldValues = Readonly<Record<string, FieldValue>>
