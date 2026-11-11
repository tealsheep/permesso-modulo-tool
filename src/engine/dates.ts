export interface CalendarDate { year: number; month: number; day: number }

export function parseDate(value: string): CalendarDate | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return null
  const year = Number(match[1]), month = Number(match[2]), day = Number(match[3])
  if (year < 1 || month < 1 || month > 12 || day < 1) return null
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
  const max = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1]!
  return day <= max ? { year, month, day } : null
}

export function dateGroups(value: string): { day: string; month: string; year: string } {
  if (!parseDate(value)) throw new Error('日期必须是有效的 YYYY-MM-DD')
  return { day: value.slice(8), month: value.slice(5, 7), year: value.slice(0, 4) }
}
