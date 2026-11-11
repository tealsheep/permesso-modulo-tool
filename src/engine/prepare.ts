import { applicationSchema } from '../data/application-schema'
import type { Application } from '../data/application-schema'
import type { FieldMapping } from '../data/mapping-schema'
import type { ApplicationTypes, Fees, FormDefinition, Materials } from '../data/schemas'
import { loadData } from '../data/load'
import { calculateFees, planApplication, selectMaterials } from './application'
import type { ApplicationSelection, FieldValues } from './application'
import { selectionFromApplication, ageOn } from './selection'
export { selectionFromApplication } from './selection'
import { projectApplication } from '../questionnaire/projection'
import { mapFields } from './mapping'
import { matchesCondition } from './conditions'
import type { MappingWarning, RuleContext } from './mapping'
import { ApplicationInputError } from './input-errors'
import { familyDuration } from './duration'
import type { CharacterIssue } from './input-errors'

type FormName = FormDefinition['form']
export interface EngineData {
  applicationTypes: ApplicationTypes
  fees: Fees
  forms: Record<FormName, FormDefinition>
  mappings: Record<FormName, FieldMapping>
  materials: Record<string, Materials>
}
export interface PreparedForm { definition: FormDefinition; values: FieldValues }
export interface PreparedBill extends PreparedForm { owner: 'applicant' | 'child'; childIndex?: number; amountCents?: number }
export type PreparationWarning = MappingWarning | { code: 'fee-incomplete'; message: string }
export interface PreparedKit {
  kind: 'kit'
  stampExempt: boolean
  application: Application
  selection: ApplicationSelection
  forms: PreparedForm[]
  bills: PreparedBill[]
  fees?: ReturnType<typeof calculateFees>
  totalBollettinoCents?: number
  materials: ReturnType<typeof selectMaterials>
  warnings: PreparationWarning[]
}

/** Pure JSON in/out. asOf is explicit so age and exemption results are reproducible. */
export function prepareApplication(input: unknown, data: EngineData, asOf: string) {
  const application = projectApplication(familyDuration(loadData(applicationSchema, input, '申请资料'), asOf, data.applicationTypes), data.applicationTypes, asOf)
  const selection = selectionFromApplication(application, asOf, data.applicationTypes)
  const plan = planApplication(selection, data.applicationTypes, application)
  if (plan.kind === 'notice') return plan
  for (const child of application.childrenUnder14 ?? []) {
    const age = ageOn(child.birthDate, asOf)
    if (age !== undefined && age >= 14) throw new Error('年满 14 岁的子女应建立另一份申请资料')
  }
  const materials = data.materials[selection.applicationCode]
  if (!materials) throw new Error('缺少该申请类型的材料数据')
  const warnings: PreparationWarning[] = []
  const issues: CharacterIssue[] = []
  let fees: ReturnType<typeof calculateFees> | undefined
  if (selection.minor === undefined) warnings.push({ code: 'fee-incomplete', message: '出生日期未填，缴费金额暂留空。' })
  else {
    // An unfinished duration question can leave the amount blank; configuration
    // ambiguity and all other errors must still surface, rather than imply zero.
    const rules = data.fees.rules.filter((r) => r.feeRule === plan.application.feeRule)
    const knownPriority = Math.max(...rules.filter((r) => matchesCondition(r.when, selection, application)).map((r) => r.priority))
    const needsDuration = selection.durationMonths === undefined && rules.some((r) => r.priority >= knownPriority &&
      (r.when.minDurationMonths !== undefined || r.when.maxDurationMonths !== undefined) &&
      matchesCondition({ ...r.when, minDurationMonths: undefined, maxDurationMonths: undefined }, selection, application))
    if (needsDuration) {
      warnings.push({ code: 'fee-incomplete', message: '预期期限未填，缴费金额暂留空。' })
    } else if (!rules.some((rule) => matchesCondition(rule.when, selection, application))) {
      warnings.push({ code: 'fee-incomplete', message: '当前申请没有配置对应的缴费规则，请在邮局窗口确认；金额暂留空。' })
    } else fees = calculateFees(selection, plan.application.feeRule, data.fees, application)
  }
  if (fees && plan.application.stampExempt) fees.stampCents = 0
  const context: RuleContext = { application, selection, moduleCount: plan.forms.length, billCents: fees?.bollettinoCents }
  const fill = (name: FormName, billCents = context.billCents): PreparedForm => {
    const mapped = mapFields(data.forms[name], data.mappings[name], { ...context, billCents })
    warnings.push(...mapped.warnings)
    issues.push(...mapped.issues)
    return { definition: data.forms[name], values: mapped.values }
  }
  const forms = plan.forms.map((name) => fill(name))
  const bills: PreparedBill[] = [{ ...fill('bollettino'), owner: 'applicant', amountCents: fees?.bollettinoCents }]
  application.childrenUnder14?.forEach((_, childIndex) => {
    bills.push({ ...fill('bollettino', data.fees.cardCents), owner: 'child', childIndex, amountCents: data.fees.cardCents })
  })
  if (issues.length) throw new ApplicationInputError(issues)
  const kit: PreparedKit = { kind: 'kit', stampExempt: plan.application.stampExempt === true, application, selection, forms, bills,
    ...(fees ? { fees, totalBollettinoCents: bills.reduce((sum, bill) => sum + bill.amountCents!, 0) } : {}),
    materials: selectMaterials(selection, materials, application), warnings }
  return kit
}
