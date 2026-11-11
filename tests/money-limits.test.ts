import { describe, expect, it } from 'vitest'
import { businessData } from '../src/data/business'
import { exampleApplication, demoAsOf } from '../src/demo/applications'
import { prepareApplication } from '../src/engine/prepare'
import { stepsFor, questionErrors } from '../src/ui/questionnaire'
import { emptyStore, parseBackup } from '../src/storage/store'

const errorsFor = (a: ReturnType<typeof exampleApplication>, path: string) =>
  questionErrors(a, stepsFor(a).flatMap((s) => s.sections.flatMap((s) => s.fields)).filter((f) => f.path === path), demoAsOf)

describe('money fields follow the paper box counts', () => {
  it('accepts an annual income of 2,000,000 euro (M2-053 has 8 euro boxes) and writes it on the form', () => {
    const a = exampleApplication('16'); a.income!.annualCents = 200_000_000
    expect(errorsFor(a, 'income.annualCents')).toEqual([])
    const kit = prepareApplication(a, businessData, demoAsOf)
    if (kit.kind !== 'kit') throw new Error(kit.message)
    expect(kit.forms[1]!.values['M2-053']).toEqual({ euro: '2000000', centesimi: '00' })
    const store = emptyStore(); store.drafts.push({ id: 'fictional', data: a, step: 0, completed: [], updatedAt: '', checks: [] })
    expect(parseBackup(JSON.stringify(store)).drafts[0]!.data.income!.annualCents).toBe(200_000_000)
  })
  it('explains an amount that does not fit the boxes instead of a generic integer message', () => {
    const a = exampleApplication('16'); a.income!.annualCents = 10_000_000_000
    expect(errorsFor(a, 'income.annualCents')[0]!.message).toContain('最多 8 位欧元整数')
    const b = exampleApplication('16'); b.work!.hiredThisYear = true; b.income!.monthlyCents = 100_000_000
    expect(errorsFor(b, 'income.monthlyCents')[0]!.message).toContain('最多 6 位欧元整数')
  })
  it('keeps the month message only for month fields', () => {
    const a = exampleApplication('16'); a.work!.contract = 'determinato'; a.work!.contractMonths = 0
    expect(errorsFor(a, 'work.contractMonths')[0]!.message).toBe('月数应大于零')
  })
})

describe('no previous-year income (official notes x / y)', () => {
  const required = (a: ReturnType<typeof exampleApplication>, path: string) =>
    stepsFor(a).flatMap((s) => s.sections.flatMap((s) => s.fields)).find((f) => f.path === path)?.required
  it('lets an employee hired this year leave boxes 52–53 blank and requires the monthly amount instead', () => {
    const a = exampleApplication('16'); a.work!.hiredThisYear = true
    a.income = { annualCents: null, bustaPaga: true, monthlyCents: 150_000 }
    expect(required(a, 'income.annualCents')).toBe(false)
    expect(required(a, 'income.monthlyCents')).toBe(true)
    expect(errorsFor(a, 'income.annualCents')).toEqual([])
    const kit = prepareApplication(a, businessData, demoAsOf)
    if (kit.kind !== 'kit') throw new Error(kit.message)
    expect(kit.forms[1]!.values['M2-052']).toBeUndefined()
    expect(kit.forms[1]!.values['M2-062']).toEqual({ euro: '1500', centesimi: '00' })
    expect(kit.forms[1]!.values['M2-060']).toBe(true)
  })
  it('lets the self-employed who started this year leave the annual income blank', () => {
    const a = exampleApplication('15'); a.income = { annualCents: null, autonomoStartedThisYear: true }
    expect(required(a, 'income.annualCents')).toBe(false)
    a.income.autonomoStartedThisYear = false
    expect(required(a, 'income.annualCents')).toBe(true)
  })
  it('never accepts 0 as an annual income, and says what to do instead', () => {
    const a = exampleApplication('16'); a.work!.hiredThisYear = false; a.income!.annualCents = 0
    expect(errorsFor(a, 'income.annualCents')[0]!.message).toContain('请在上面选「是」')
    a.work!.hiredThisYear = true
    expect(errorsFor(a, 'income.annualCents')[0]!.message).toBe('去年没有收入就空着，不要填 0')
  })
})
