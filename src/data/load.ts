import { z } from 'zod'

/** Pure boundary: callers supply JSON or build-time imports; never fetch user data. */
export function loadData<T>(schema: z.ZodType<T>, input: unknown, source: string): T {
  let parsed: unknown = input
  if (typeof input === 'string') {
    try { parsed = JSON.parse(input) }
    catch { throw new Error(`${source}: JSON 格式无效`) }
  }
  const result = schema.safeParse(parsed)
  if (!result.success) {
    // Only paths and messages: avoid copying personal input into error logs.
    const details = result.error.issues.map((issue) => `${issue.path.join('.') || '(root)'}: ${issue.message}`).join('; ')
    throw new Error(`${source}: 数据校验失败: ${details}`)
  }
  return result.data
}
