export type SelectOption = { value: string; label: string; aliases?: string[]; code?: string }
export const normalizeSearch = (text: string) => text.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase().trim()
export function matchingOptions(options: SelectOption[], query: string, common: string[] = []) {
  const terms = normalizeSearch(query).split(/\s+/).filter(Boolean)
  const matches = options.filter((option) => terms.every((term) => normalizeSearch(`${option.label} ${option.value} ${option.code ?? ''} ${(option.aliases ?? []).join(' ')}`).includes(term)))
  if (!terms.length) return [...matches.filter((option) => common.includes(option.value)), ...matches.filter((option) => !common.includes(option.value))]
  const text = normalizeSearch(query)
  const rank = (option: SelectOption) => {
    if ([option.value, option.code ?? ''].some((value) => normalizeSearch(value) === text)) return 0
    const name = normalizeSearch(option.label.replace(/^[A-Z]{2} · /, ''))
    if (name.startsWith(text)) return 1
    if (name.includes(text) || normalizeSearch(option.value).includes(text)) return 2
    return 3
  }
  return matches.sort((a, b) => rank(a) - rank(b))
}
/** Only collect province fields; do not infer usage from unrelated text values. */
export function usedProvinces(value: unknown): string[] {
  if (!value || typeof value !== 'object') return []
  return [...new Set(Object.entries(value).flatMap(([key, item]) => /province$/i.test(key) && typeof item === 'string' ? [item] : usedProvinces(item)))]
}
