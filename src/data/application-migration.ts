/** Drop exactly the retired field, without inferring the new three-way answer. */
export function migrateLegacyWork(value: unknown): unknown {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return value
  const next = { ...value } as Record<string, unknown>
  delete next.contractChangedSinceEntry
  return next
}
