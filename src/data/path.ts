import { z } from 'zod'

const pattern = /^[A-Za-z_]\w*(?:\[\d+\])*(?:\.[A-Za-z_]\w*(?:\[\d+\])*)*$/
const blocked = new Set(['__proto__', 'prototype', 'constructor'])
export function pathTokens(path: string): (string | number)[] | undefined {
  if (!pattern.test(path)) return undefined
  const tokens = path.match(/[A-Za-z_]\w*|\d+/g)!
  if (tokens.some((token) => blocked.has(token))) return undefined
  return tokens.map((token) => /^\d+$/.test(token) ? Number(token) : token)
}
export const dataPathSchema = z.string().refine((path) => pathTokens(path) !== undefined, { message: '资料路径必须为安全的点号 / 数组下标路径' })
