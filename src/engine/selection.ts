import type { Application } from '../data/application-schema'
import type { ApplicationTypes } from '../data/schemas'
import type { ApplicationSelection } from './application'
import { businessData } from '../data/business'
import { parseDate } from './dates'
export function ageOn(birthDate: string | null | undefined, asOf: string): number | undefined {
  if (!birthDate) return undefined
  const birth = parseDate(birthDate)!, today = parseDate(asOf)!
  if (birthDate > asOf) throw new Error('出生日期不能晚于办理日期')
  return today.year - birth.year - (today.month < birth.month || (today.month === birth.month && today.day < birth.day) ? 1 : 0)
}

export function selectionFromApplication(application: Application, asOf: string, catalog: ApplicationTypes = businessData.applicationTypes): ApplicationSelection {
  if (!parseDate(asOf)) throw new Error('办理日期必须是有效 ISO 日期')
  const age = ageOn(application.person?.birthDate, asOf)
  const income = application.income
  const hasIncome = catalog.types.find((type) => type.code === application.application.code)?.profile.workStep === 'student' && application.study?.working === false ? false : income?.annualCents != null || income?.monthlyCents != null
    ? (income.annualCents ?? 0) > 0 || (income.monthlyCents ?? 0) > 0 : undefined
  return { applicationCode: application.application.code, operation: application.application.operation,
    ...(application.application.expectedDurationMonths != null ? { durationMonths: application.application.expectedDurationMonths } : {}),
    minor: age === undefined ? undefined : age < 18, hasIncome }
}

