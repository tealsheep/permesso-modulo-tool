import { describe, expect, it } from 'vitest'
import { fiscalChecksum, validateCodiceFiscale } from '../src/engine/codice-fiscale'
import { dateGroups, parseDate } from '../src/engine/dates'
import { italianMoney } from '../src/engine/italian-money'

// Fictional ROSSI MARIO vector, not data collected from an applicant.
const identity = { surname: 'ROSSI', givenName: 'MARIO', birthDate: '1980-01-01', sex: 'M' as const }
const sample = 'RSSMRA80A01H501U'

describe('codice fiscale', () => {
  it('checks a fixed checksum vector and normalizes lowercase', () => {
    expect(fiscalChecksum(sample.slice(0, 15))).toBe('U')
    expect(validateCodiceFiscale('  ' + sample.toLowerCase() + ' ', identity)).toMatchObject({ formatValid: true, checksumValid: true, consistent: true, issues: [] })
  })
  it.each(['', '12345678901', 'RSSMRA80A01H501', 'RSSMRA8WA01H501U', '税号', 'RSSMRA80A01H501U!'])('rejects malformed %s', (code) => {
    expect(validateCodiceFiscale(code).formatValid).toBe(false)
  })
  it('detects checksum tampering', () => expect(validateCodiceFiscale(sample.slice(0, 15) + 'A').checksumValid).toBe(false))
  it('compares surname, given name, date and sex without blocking', () => {
    const result = validateCodiceFiscale(sample, { surname: 'ESEMPIO', givenName: 'FITTIZIO', birthDate: '2000-02-29', sex: 'F' })
    expect(result.checksumValid).toBe(true)
    expect(result.issues.map((i) => i.code)).toEqual(['surname', 'given-name', 'birth-date', 'sex'])
    expect(result.issues.every((i) => i.severity === 'warning')).toBe(true)
  })
  it('accepts all 127 omocodia variants and checks their original letters', () => {
    const positions = [6, 7, 9, 10, 12, 13, 14]
    for (let mask = 1; mask < 128; mask++) {
      const chars = [...sample.slice(0, 15)]
      positions.forEach((p, bit) => { if (mask & (1 << bit)) chars[p] = 'LMNPQRSTUV'[Number(chars[p])]! })
      const first = chars.join('')
      expect(validateCodiceFiscale(first + fiscalChecksum(first), identity).issues).toEqual([])
    }
    // Final 1 -> M changes the checksum from U to M.
    expect(validateCodiceFiscale('RSSMRA80A01H50MM', identity).issues).toEqual([])
    expect(validateCodiceFiscale('RSSMRA80A01H50MU').checksumValid).toBe(false)
  })
  it.each(['RSSMRA80B31H501', 'RSSMRA80A00H501', 'RSSMRA80A40H501', 'RSSMRA80A72H501'])('rejects impossible encoded day %s', (first) => {
    expect(validateCodiceFiscale(first + fiscalChecksum(first)).formatValid).toBe(false)
  })
  it('handles female dates, leap years and four-consonant given names', () => {
    const first = 'SMPFTZ00B69Z000'
    expect(validateCodiceFiscale(first + fiscalChecksum(first), { surname: 'ESEMPIO', givenName: 'FITTIZIO', birthDate: '2000-02-29', sex: 'F' }).issues).toEqual([])
    expect(validateCodiceFiscale(first + fiscalChecksum(first), { surname: 'ESEMPIO', givenName: 'FITTIZIO', birthDate: '1900-02-29', sex: 'F' }).consistent).toBe(false)
  })
  it('warns rather than silently deleting non-Latin name characters', () => {
    expect(validateCodiceFiscale(sample, { ...identity, surname: '测试' }).issues[0]?.code).toBe('name-uncheckable')
  })
  it('supports short names, spaces, apostrophes, and optional birthplace comparison', () => {
    const first = 'LIXDGL00A01Z000'
    expect(validateCodiceFiscale(first + fiscalChecksum(first), { surname: 'LI', givenName: "D'ANGELO", birthDate: '2000-01-01', sex: 'M', birthplaceCode: 'Z000' }).issues).toEqual([])
    expect(validateCodiceFiscale(sample, { ...identity, birthplaceCode: 'Z000' }).issues[0]?.code).toBe('birthplace')
  })
})

describe('Italian amount in integer cents', () => {
  it.each([
    [0, 'ZERO/00'], [1, 'ZERO/01'], [3046, 'TRENTA/46'], [7046, 'SETTANTA/46'],
    [8046, 'OTTANTA/46'], [13046, 'CENTOTRENTA/46'], [2100, 'VENTUNO/00'],
    [2800, 'VENTOTTO/00'], [3800, 'TRENTOTTO/00'], [10000, 'CENTO/00'],
    [10100, 'CENTOUNO/00'], [10800, 'CENTOTTO/00'], [18000, 'CENTOTTANTA/00'],
    [18100, 'CENTOTTANTUNO/00'], [18800, 'CENTOTTANTOTTO/00'], [20000, 'DUECENTO/00'],
    [100000, 'MILLE/00'], [100100, 'MILLEUNO/00'], [200000, 'DUEMILA/00'],
    [2100000, 'VENTUNOMILA/00'], [99999999, 'NOVECENTONOVANTANOVEMILANOVECENTONOVANTANOVE/99'],
  ])('%i -> %s', (cents, words) => expect(italianMoney(cents)).toBe(words))
  it.each([-1, 30.46, NaN, Infinity, 100_000_000])('rejects invalid cents %s', (cents) => expect(() => italianMoney(cents)).toThrow(RangeError))
})

describe('calendar dates without timezone conversion', () => {
  it.each(['2026-02-29', '1900-02-29', '2026-04-31', '2026-13-01', '0000-01-01', '01/01/2000'])('rejects %s', (value) => expect(parseDate(value)).toBeNull())
  it('formats a real leap day', () => expect(dateGroups('2000-02-29')).toEqual({ day: '29', month: '02', year: '2000' }))
})
