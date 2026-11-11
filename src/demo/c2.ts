import { exampleApplication } from './applications'
import type { Application } from '../data/application-schema'
export const art27Letters: NonNullable<Application['application']['art27Letter']>[] = ['a', 'b', 'c', 'd', 'e', 'f', 'i', 'm', 'n', 'o', 'p', 'q', 'r', 'r-bis']
// Independent expected outcomes, rather than deriving expectations from rule data.
export const c2Scenarios = art27Letters.map((letter) => ({
  letter, application: exampleApplication('17', 'rinnovo', letter),
  second: ['a', 'b', 'c', 'd', 'e', 'o', 'p', 'r'].includes(letter),
  amount: letter === 'a' ? 13046 : 7046,
}))
