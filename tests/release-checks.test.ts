import { describe, expect, it } from 'vitest'
import { exampleApplication, demoAsOf } from '../src/demo/applications'
import { stepsFor, questionErrors } from '../src/ui/questionnaire'
import { displayDate, displayTime } from '../src/ui/format'
import { normalizeText } from '../src/engine/characters'

// Second walkthrough batch (2026-11-10): inputs that used to slip through.
type App = ReturnType<typeof exampleApplication>
const errorFor = (a: App, path: string) =>
  questionErrors(a, stepsFor(a).flatMap((s) => s.sections.flatMap((s) => s.fields)).filter((f) => f.path === path), demoAsOf)[0]?.message

describe('dates', () => {
  it('rejects an expired passport', () => {
    const a = exampleApplication('16'); a.document!.validUntil = '2000-01-01'
    expect(errorFor(a, 'document.validUntil')).toContain('过期')
  })
  it('rejects an impossible permit expiry year', () => {
    const a = exampleApplication('16'); a.currentPermit!.validUntil = '9999-02-01'
    expect(errorFor(a, 'currentPermit.validUntil')).toContain('年份')
  })
  it('rejects a birth year before 1900', () => {
    const a = exampleApplication('16'); a.person!.birthDate = '1850-01-01'
    expect(errorFor(a, 'person.birthDate')).toContain('出生年份')
  })
})

describe('numbers and codes', () => {
  it('rejects more than 30 extra contract days', () => {
    const a = exampleApplication('16'); a.work!.contract = 'determinato'; a.work!.contractMonths = 6; a.work!.contractDays = 400
    expect(errorFor(a, 'work.contractDays')).toContain('0 到 30')
  })
  it('checks the employer VAT number and tax code', () => {
    const a = exampleApplication('16'); a.employer!.partitaIva = '123'; a.employer!.codiceFiscale = 'xyz'
    expect(errorFor(a, 'employer.partitaIva')).toContain('11 位数字')
    expect(errorFor(a, 'employer.codiceFiscale')).toContain('16 位')
    a.employer!.partitaIva = '01234567890'; a.employer!.codiceFiscale = '01234567890'
    expect(errorFor(a, 'employer.partitaIva')).toBeUndefined()
    expect(errorFor(a, 'employer.codiceFiscale')).toBeUndefined()
  })
  it('rejects a fractional cent amount instead of rounding it', () => {
    const a = exampleApplication('16'); a.income = { ...a.income, annualCents: 0.5 }
    expect(errorFor(a, 'income.annualCents')).toContain('两位小数')
  })
})

describe('phones', () => {
  it('accepts digits only and wants both parts', () => {
    const a = exampleApplication('16'); a.address!.phoneMobile = { prefisso: '+39 351', numero: '6655665' }
    expect(errorFor(a, 'address.phoneMobile.prefisso')).toContain('+39')
    a.address!.phoneMobile = { prefisso: '351', numero: null }
    expect(errorFor(a, 'address.phoneMobile.numero')).toContain('号码')
    a.address!.phoneFixed = { prefisso: 'abc', numero: '123' }
    expect(errorFor(a, 'address.phoneFixed.prefisso')).toContain('数字')
  })
})

describe('box capacity is checked on the answer\'s own step', () => {
  it('stops a permit number longer than column 18 before generation', () => {
    const a = exampleApplication('24'); a.currentPermit!.number = 'I12345678ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    expect(errorFor(a, 'currentPermit.number')).toMatch(/Modulo 1 第 18 栏）最多 14 格/)
  })
  it('stops a civic number longer than five boxes', () => {
    const a = exampleApplication('16'); a.address!.civic = { numero: '12/A bis' }
    expect(errorFor(a, 'address.civic.numero')).toContain('最多 5 格')
  })
})

describe('small fixes', () => {
  it('says e-mail addresses cannot contain Chinese', () => {
    const a = exampleApplication('16'); a.address!.email = '张三@example.com'
    expect(errorFor(a, 'address.email')).toContain('邮箱只能用英文字母')
  })
  it('drops spaces around names before filling boxes', () => {
    expect(normalizeText("  o'brien  ", true)).toBe('O BRIEN')
  })
  it('shows dates as day/month/year', () => {
    expect(displayDate('2027-02-01')).toBe('01/02/2027')
    expect(displayDate(undefined)).toBe('')
    expect(displayTime('2026-11-10T10:23:11.148Z')).toMatch(/^10\/11\/2026 \d\d:\d\d$/)
  })
})
