import { expect, it } from 'vitest'
import { applicationTypeSchema } from '../src/data/schemas'
import { businessData } from '../src/data/business'
import { defaultOperation, displayGroups, groupsFor } from '../src/ui/selection'

it('accepts optional extra groups and rejects primary, duplicate and unknown groups', () => {
  const type = businessData.applicationTypes.types.find((type) => type.code === '24')!
  expect(type.alsoInGroups).toEqual(['rilascio'])
  expect(applicationTypeSchema.safeParse({ ...type, alsoInGroups: undefined }).success).toBe(true)
  for (const groups of [['rinnovo'], ['rilascio', 'rilascio'], ['unknown']]) expect(applicationTypeSchema.safeParse({ ...type, alsoInGroups: groups }).success).toBe(false)
})
it.each(businessData.applicationTypes.types)('$code defaults only to a supported operation in each displayed group', (type) => {
  for (const group of groupsFor(type)) {
    const operation = defaultOperation(type, group)
    expect(type.operations).toContain(operation)
    if (type.operations.some((operation) => operation === group)) expect(operation).toBe(group)
  }
})
it('keeps both student groups for a name search and filters only when the query names a group (D46)', () => {
  const type = businessData.applicationTypes.types.find((type) => type.code === '24')!
  expect(displayGroups(type, '')).toEqual(['rinnovo', 'rilascio'])
  for (const query of ['学生', 'studente', '学习']) expect(displayGroups(type, query)).toEqual(['rinnovo', 'rilascio'])
  expect(displayGroups(type, '续签')).toEqual(['rinnovo'])
  expect(displayGroups(type, '第一次申请')).toEqual(['rilascio'])
  expect(displayGroups(type, 'rilascio')).toEqual(['rilascio'])
})
