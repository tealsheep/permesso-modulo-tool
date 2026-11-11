import { readFile } from 'node:fs/promises'
import { expect, it } from 'vitest'
import { fieldRulesMarkdown, ruleScenarios, paperTargets } from '../src/questionnaire/rule-report'
it('keeps the generated field rules identical to current questionnaire branches and mapping metadata', async () => {
  expect(await readFile('docs/FIELD-RULES.md','utf8')).toBe(fieldRulesMarkdown())
  expect(ruleScenarios().some((s) => s.id.endsWith('subtype-r-bis'))).toBe(true)
})

it('lists every paper destination including compound controls and computed income', () => {
  expect(paperTargets('questura.city')).toEqual(expect.arrayContaining(['M1-H01','M1-H02','M2-H01','M2-H02']))
  expect(paperTargets('address.province')).toContain('M1-066')
  expect(paperTargets('income.taxForm')).toEqual(expect.arrayContaining(['M2-055','M2-056','M2-057','M2-058','M2-059']))
  expect(paperTargets('income.annualCents')).toContain('M2-053')
})

it('keeps repeated child and past-address destination indexes distinct', () => {
  expect(paperTargets('childrenUnder14[0].surname')).toContain('M1-137')
  expect(paperTargets('childrenUnder14[0].surname')).not.toContain('M1-145')
  expect(paperTargets('housing.pastResidences[0].street')).not.toContain('M1-101')
})
