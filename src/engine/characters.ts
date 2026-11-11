const commonSymbols = new Set([...` '-/.,&()°:;+"!?%#=ºª`])

/** Courier/WinAnsi symbols that can be copied by hand; email extras stay field-specific. */
export function allowedText(value: string, fieldId: string, kind: string, charset?: string): boolean {
  const supported = [...value].every((char) => /^[A-Z0-9]$/.test(char) || commonSymbols.has(char) ||
    (fieldId === 'M1-073' && '@_'.includes(char)) || (kind === 'freetext' && '‘’“”'.includes(char)))
  return supported && (!charset || new RegExp(`^[${charset}]*$`, 'u').test(value))
}

export function normalizeText(value: string, grid: boolean): string {
  const upper = value.trim().normalize('NFD').replace(/\p{M}/gu, '').toUpperCase()
  return grid ? upper.replace(/['’]/g, ' ') : upper
}

export function unsupportedCharacters(value: string, fieldId: string, kind: string, charset?: string): string[] {
  return [...new Set([...value].filter((char) => !allowedText(char, fieldId, kind, charset)))]
}
