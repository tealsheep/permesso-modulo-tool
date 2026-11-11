import { describe, expect, it } from 'vitest'
import { dateDraftError, dateParts, dateValue, pastedDate } from '../src/ui/date-model'
import { matchingOptions, usedProvinces } from '../src/ui/search-options'
import { codeTables } from '../src/data/catalog'

describe('D41 calendar input', () => {
  it.each(['31/12/2026', '31.12.2026', '2026-12-31'])('splits pasted %s and stores ISO', (text) => {
    const parts = pastedDate(text)!
    expect(parts).toEqual(['31', '12', '2026'])
    expect(dateValue(parts)).toBe('2026-12-31')
  })
  it('does not publish partial input or nonexistent dates', () => {
    expect(dateValue(['31', '', '2026'])).toBeNull()
    expect(dateValue(['31', '02', '2026'])).toBeNull()
    expect(dateDraftError(['31', '02', '2026'], true, false, '2026-11-06')).toBe('这个日期不存在，请检查')
    expect(dateDraftError(['31', '', '2026'], true, false, '2026-11-06')).toBe('请把日、月、年都填上')
  })
  it('distinguishes leap dates, optional emptiness, birth dates, and document dates', () => {
    expect(dateValue(['29', '2', '2024'])).toBe('2024-02-29')
    expect(dateValue(['29', '2', '2100'])).toBeNull()
    expect(dateDraftError(['', '', ''], false, false, '2026-11-06')).toBe('')
    expect(dateDraftError(['1', '1', '2030'], true, true, '2026-11-06')).toBe('出生日期不能晚于今天')
    expect(dateDraftError(['1', '1', '2030'], true, false, '2026-11-06')).toBe('')
    expect(pastedDate('31/12.2026')).toBeNull()
    expect(dateParts('')).toEqual(['', '', ''])
  })
})

describe('D41 searchable code lists', () => {
  const countries = codeTables.stati!.entries.map((item) => ({ value: item.code, label: `${item.nameZh} ${item.nameIt}` }))
  const provinces = codeTables.provinces!.entries.map((item) => ({ value: item.code, label: item.nameIt }))
  it.each(['chn', '中', 'cina'])('finds China using %s', (query) => {
    expect(matchingOptions(countries, query).some((item) => item.value === 'CHN')).toBe(true)
  })
  it('ignores accents and case', () => {
    expect(matchingOptions(provinces, 'forli').some((item) => /FORL[IÌ]/i.test(item.label))).toBe(true)
    expect(matchingOptions([{ value: 'FC', label: 'FORLÌ' }], 'forli')).toHaveLength(1)
    expect(matchingOptions(provinces, 'FORLÌ')).toHaveLength(1)
  })
  it('keeps common options first without duplicating them or overriding a search', () => {
    const ordered = matchingOptions(countries, '', ['CHN', 'ITA'])
    expect(ordered.slice(0, 2).map((item) => item.value).sort()).toEqual(['CHN', 'ITA'])
    expect(new Set(ordered.map((item) => item.value)).size).toBe(countries.length)
    expect(matchingOptions(countries, 'no-such-country', ['CHN'])).toEqual([])
  })
  it('takes common provinces only from province fields', () => {
    expect(usedProvinces({ address: { province: 'MI', street: 'RM' }, children: [{ province: 'FI' }], questura: { province: 'MI' } })).toEqual(['MI', 'FI'])
  })
})
