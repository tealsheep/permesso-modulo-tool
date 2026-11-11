import type { Application } from '../data/application-schema'
import { businessData } from '../data/business'
import type { ApplicationTypes } from '../data/schemas'
import { parseDate } from './dates'

/** Calendar months, rounded up; expired/missing dates cannot imply free fees. */
export function familyDuration(application: Application, asOf: string, catalog: ApplicationTypes = businessData.applicationTypes): Application {
  if (catalog.types.find((type) => type.code === application.application.code)?.profile.duration?.source !== 'sponsor') return application
  const until = application.family?.sponsorPermitValidUntil
  const start = parseDate(asOf), end = until && parseDate(until)
  const months = start && end && until! > asOf
    ? (end.year - start.year) * 12 + end.month - start.month + (end.day > start.day ? 1 : 0) : null
  return { ...application, application: { ...application.application, expectedDurationMonths: months } }
}
