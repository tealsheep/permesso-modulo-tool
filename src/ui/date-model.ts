import { parseDate } from '../engine/dates'

export type DateParts = [string, string, string]
export function dateParts(iso: string): DateParts {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  return match ? [match[3]!, match[2]!, match[1]!] : ['', '', '']
}
export function pastedDate(text: string): DateParts | null {
  const trimmed = text.trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return dateParts(trimmed)
  const match = /^(\d{1,2})([/.])(\d{1,2})\2(\d{4})$/.exec(trimmed)
  return match ? [match[1]!, match[3]!, match[4]!] : null
}
export function dateValue(parts: DateParts): string | null {
  if (!parts[0] || !parts[1] || parts[2].length !== 4) return null
  const iso = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`
  return parseDate(iso) ? iso : null
}
export function dateDraftError(parts: DateParts, required: boolean, birth: boolean, today: string): string {
  if (parts.every((part) => !part) && !required) return ''
  if (!parts[0] || !parts[1] || parts[2].length < 4) return '请把日、月、年都填上'
  const iso = dateValue(parts)
  if (!iso) return '这个日期不存在，请检查'
  return birth && iso > today ? '出生日期不能晚于今天' : ''
}
