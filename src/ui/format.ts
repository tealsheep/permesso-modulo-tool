import type { Application } from '../data/application-schema'
import { businessData } from '../data/business'

export const titles: Record<string, string> = Object.fromEntries(businessData.applicationTypes.types.map((type) => [type.code, type.titleZh ?? type.nameZh]))
export const today = () => new Date().toLocaleDateString('sv-SE')
/** 2027-02-01 → 01/02/2027, the order used on the paper forms. */
export const displayDate = (iso?: string | null) => iso && /^\d{4}-\d{2}-\d{2}$/.test(iso) ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : iso ?? ''
/** ISO timestamp → 10/11/2026 14:05 in local time. */
export function displayTime(iso?: string): string {
  if (!iso) return ''
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? iso : `${displayDate(date.toLocaleDateString('sv-SE'))} ${date.toTimeString().slice(0, 5)}`
}
export const nameOf = (a: Application) => [a.person?.surname, a.person?.givenNames].filter(Boolean).join(' ') || '尚未填写姓名'
export function download(text: string, filename: string) {
  const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }))
  const a = document.createElement('a'); a.href = url; a.download = filename; a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
