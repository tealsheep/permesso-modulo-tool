import { exampleApplication } from './applications'
import type { Application } from '../data/application-schema'

// Expected cases are explicit: a missing catalog operation must fail coverage.
export const c1Combinations: { code: string; operation: Application['application']['operation']; amount: number; second: boolean }[] = [
  { code: '32', operation: 'rilascio', amount: 3046, second: false },
  { code: '32', operation: 'rinnovo', amount: 3046, second: false },
  { code: '33', operation: 'rilascio', amount: 3046, second: false },
  { code: '33', operation: 'rinnovo', amount: 3046, second: false },
  { code: '19', operation: 'rilascio', amount: 7046, second: false },
  { code: '19', operation: 'rinnovo', amount: 7046, second: false },
  { code: '20', operation: 'rilascio', amount: 7046, second: false },
  { code: '20', operation: 'rinnovo', amount: 7046, second: false },
  { code: '27', operation: 'rinnovo', amount: 7046, second: true },
  { code: '28', operation: 'conversione', amount: 3046, second: true },
  { code: '29', operation: 'rinnovo', amount: 7046, second: true },
  { code: '23', operation: 'rinnovo', amount: 7046, second: false },
  { code: '07', operation: 'rinnovo', amount: 3046, second: false },
]
export const c1Scenarios = [
  ...c1Combinations.map((entry) => ({ ...entry, id: `${entry.code}-${entry.operation}`, application: exampleApplication(entry.code, entry.operation) })),
  ...c1Combinations.filter(({ code }) => code === '23' || code === '07').map((entry) => {
    const application = exampleApplication(entry.code, entry.operation)
    application.income = { annualCents: 1234567, lastTaxYear: 2025, taxForm: 'cud' }
    return { ...entry, second: true, id: `${entry.code}-${entry.operation}-income`, application }
  }),
]
