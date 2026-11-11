import type { Application } from '../data/application-schema'
import type { FieldMapping, RuleValue } from '../data/mapping-schema'
import type { FormDefinition, FormField } from '../data/schemas'
import type { ApplicationSelection, FieldValue, FieldValues } from './application'
import { isPresent, matchesCondition, readPath } from './conditions'
import { allowedText, normalizeText, unsupportedCharacters } from './characters'
import type { CharacterIssue } from './input-errors'
import { parseDate } from './dates'
import { italianMoney } from './italian-money'

export interface RuleContext {
  application: Application
  selection: ApplicationSelection
  moduleCount: number
  billCents?: number
}
export interface MappingWarning {
  /** shrunk: a free-text line (payment slip) holds the full text in smaller type; nothing to fix in the questionnaire. */
  code: 'truncated' | 'shrunk'
  field: string
  part?: string
  message: string
  original: string
  rendered: string
  /** Questionnaire paths whose answers produced the text. */
  paths: string[]
  capacity: number
  /** e.g. （Modulo 1 第 18 栏） */
  column: string
}

/** Courier advance is 600/1000 em; the renderer shrinks text to fit the line height. */
export function freetextCapacity(area: { w: number; h: number }, fontSize = 12): number {
  const size = Math.min(fontSize, area.h - 2)
  return size > 0 ? Math.floor((area.w - 2) / (0.6 * size)) : 0
}
const formNames: Record<string, string> = { M1: 'Modulo 1', M2: 'Modulo 2', B: '缴费单' }
/** e.g. 现在这张居留的卡号（Modulo 1 第 18 栏） */
export function columnName(label: string, id: string): string {
  const form = formNames[id.split('-')[0]!]
  const column = /-(\d{3})$/.exec(id)
  return column && form ? `${label}（${form} 第 ${Number(column[1])} 栏）` : form ? `${label}（${form}）` : label
}
/** Free-text lines shrink down to this size before anything is cut. */
export const freetextMinSize = 5
const shorten: Record<string, string> = {
  'B-eseguito': '手写缴费单时可以只写护照上的第一个名字',
  'B-residente': '手写缴费单时街道名可用常见缩写，如 VIALE 写 V.LE、PIAZZA 写 P.ZZA、CORSO 写 C.SO',
}

function computed(name: Extract<RuleValue, { computed: string }>['computed'], context: RuleContext): unknown {
  if (name === 'children.count') return String(context.application.childrenUnder14?.length ?? 0).padStart(2, '0')
  if (name === 'modules.count') return String(context.moduleCount).padStart(2, '0')
  if (name === 'fee.words') return context.billCents === undefined ? undefined : italianMoney(context.billCents)
  const cents = name.startsWith('fee.') ? context.billCents :
    name.startsWith('income.annual.') ? context.application.income?.annualCents : context.application.income?.monthlyCents
  if (cents === undefined || cents === null) return undefined
  return name.endsWith('.euro') ? String(Math.floor(cents / 100)) : String(cents % 100).padStart(2, '0')
}

function evaluate(value: RuleValue, context: RuleContext): unknown {
  if ('path' in value) return readPath(context.application, value.path)
  if ('const' in value) return value.const
  if ('computed' in value) return computed(value.computed, context)
  if ('parts' in value) return Object.fromEntries(Object.entries(value.parts).map(([name, part]) => [name, evaluate(part, context)]))
  return value.join.map((part) => evaluate(part, context)).filter(isPresent).map((part) => {
    if (typeof part !== 'string' && typeof part !== 'number') throw new Error('join 只能连接字符串或数字')
    return String(part)
  }).join(value.sep)
}

function sourcePaths(value: RuleValue): string[] {
  if ('path' in value) return [value.path]
  if ('parts' in value) return Object.values(value.parts).flatMap(sourcePaths)
  if ('join' in value) return value.join.flatMap(sourcePaths)
  return []
}

/** First matching rule wins, even when that rule reads an absent optional value. */
export function mapFields(definition: FormDefinition, mapping: FieldMapping, context: RuleContext): { values: FieldValues; warnings: MappingWarning[]; issues: CharacterIssue[] } {
  if (mapping.form !== definition.form) throw new Error('填写规则与表格不匹配')
  const fields = new Map(definition.fields.map((field) => [field.id, field]))
  const seen = new Set<string>()
  const values: Record<string, FieldValue> = {}
  const warnings: MappingWarning[] = []
  const issues: CharacterIssue[] = []
  function textValue(raw: unknown, field: FormField, expression: RuleValue, capacity?: number, part?: string): string | undefined {
    if (raw === undefined || raw === null || raw === '') return undefined
    if (typeof raw !== 'string' && typeof raw !== 'number') throw new Error(`${field.id}: 规则需提供文本或数字`)
    const grid = field.kind !== 'freetext'
    let text = normalizeText(String(raw), grid)
    const characters = unsupportedCharacters(text, field.id, field.kind, field.charset)
    if (characters.length) {
      const paths = sourcePaths(expression).filter((path) => {
        const value = readPath(context.application, path)
        return typeof value === 'string' && !allowedText(normalizeText(value, grid), field.id, field.kind, field.charset)
      })
      issues.push({ code: 'unsupported-characters', field: field.id, label: field.labelZh, ...(part ? { part } : {}), paths, characters,
        message: `${field.labelZh}${/-(\d{3})$/.test(field.id) ? `（第 ${Number(field.id.slice(-3))} 栏）` : ''}${characters.some((char) => /\p{Script=Han}/u.test(char)) ? '不能写汉字，请照证件写拉丁字母或拼音' : '含有表格不支持的字符，请照证件检查填写'}` })
      // Safe draft values for lower-level consumers; prepareApplication blocks generation.
      text = [...text].map((char) => allowedText(char, field.id, field.kind, field.charset) ? char : ' ').join('')
    }
    if (capacity !== undefined && ((typeof raw === 'number' && part !== 'euro') || part === 'cents' || part === 'centesimi')) {
      text = text.padStart(capacity, '0')
    }
    const original = text
    const filled = sourcePaths(expression).filter((path) => isPresent(readPath(context.application, path)))
    if (capacity !== undefined && [...text].length > capacity) {
      text = [...text].slice(0, capacity).join('')
      warnings.push({ code: 'truncated', field: field.id, ...(part ? { part } : {}), original, rendered: text, paths: filled, capacity, column: columnName('', field.id),
        message: `${columnName(field.labelZh, field.id)}最多 ${capacity} 格，你填了 ${[...original].length} 个字符，表格上只写了前 ${capacity} 个：${text}` })
    }
    if (field.kind === 'freetext' && filled.length) {
      // D58: a long name or address is never blocked; only the slip line is squeezed, Modulo 1 keeps the full text.
      const limit = freetextCapacity(field.area), hardLimit = freetextCapacity(field.area, freetextMinSize), length = [...text].length
      if (length > limit) {
        const advice = shorten[field.id.replace(/-\d+$/, '')]
        const name = `${field.labelZh.split(' · ')[0]}（${formNames[field.id.split('-')[0]!] ?? ''}）`
        if (length > hardLimit) text = [...text].slice(0, hardLimit).join('')
        // The slip repeats the line on each part; one reminder is enough.
        if (!warnings.some((w) => w.code === 'shrunk' && w.field.replace(/-\d+$/, '') === field.id.replace(/-\d+$/, ''))) warnings.push({ code: 'shrunk', field: field.id, original, rendered: text, paths: filled, capacity: limit, column: columnName('', field.id),
          message: `${name}这一行正常只够写 ${limit} 个字符，你的有 ${length} 个：${length > hardLimit ? `参考件上缩小了字号，仍只写得下前 ${hardLimit} 个` : '参考件上缩小了字号写全'}。${advice ? `${advice}；` : ''}Modulo 1 上照常写全称` })
      }
    }
    return text
  }
  for (const rule of mapping.rules) {
    const field = fields.get(rule.field)
    if (!field) throw new Error(`填写规则引用不存在的字段: ${rule.field}`)
    if (seen.has(rule.field) || (rule.when && !matchesCondition(rule.when, context.selection, context.application))) continue
    seen.add(rule.field)
    const raw = evaluate(rule.value, context)
    if (raw === undefined || raw === null || raw === '') continue
    if (field.kind === 'checkbox') {
      if (raw !== 'X' && typeof raw !== 'boolean') throw new Error(`${field.id}: 勾选框规则需提供 X 或布尔值`)
      values[field.id] = raw === 'X' ? true : raw
    } else if (field.kind === 'choice') {
      const choice = typeof raw === 'boolean' ? (raw ? 'SI' : 'NO') : raw
      if (typeof choice !== 'string' || !field.options.some((option) => option.value === choice)) throw new Error(`${field.id}: 单选规则值不存在`)
      values[field.id] = choice
    } else if (field.kind === 'parts') {
      if (typeof raw !== 'object' || Array.isArray(raw)) throw new Error(`${field.id}: 分组规则需提供对象`)
      const parts: Record<string, string> = {}
      for (const [name, value] of Object.entries(raw)) {
        const part = field.parts.find((part) => part.name === name)
        if (!part) throw new Error(`${field.id}: 不存在的分组 ${name}`)
        const expression = 'parts' in rule.value ? rule.value.parts[name]! : rule.value
        const text = textValue(value, field, expression, part.boxes.count, name)
        if (text !== undefined) parts[name] = text
      }
      if (Object.keys(parts).length) values[field.id] = parts
    } else if (field.kind === 'date') {
      if (typeof raw !== 'string' || !parseDate(raw)) throw new Error(`${field.id}: 日期规则值必须是有效 ISO 日期`)
      values[field.id] = raw
    } else {
      const capacity = field.kind === 'boxes' ? field.boxes.count + (field.moreRows ?? []).reduce((n, row) => n + row.count, 0) : undefined
      const text = textValue(raw, field, rule.value, capacity)
      if (text !== undefined) values[field.id] = text
    }
  }
  return { values, warnings, issues }
}

/** Box count for answers copied unchanged into one Modulo field, so the questionnaire can stop them on their own step. */
export function directCapacities(definition: FormDefinition, mapping: FieldMapping): Map<string, { capacity: number; column: string }> {
  const fields = new Map(definition.fields.map((field) => [field.id, field]))
  const result = new Map<string, { capacity: number; column: string }>()
  const add = (path: string, capacity: number, id: string) => {
    const known = result.get(path)
    if (!known || capacity < known.capacity) result.set(path, { capacity, column: columnName('', id) })
  }
  for (const rule of mapping.rules) {
    const field = fields.get(rule.field)
    if (rule.when || !field) continue
    if (field.kind === 'boxes' && 'path' in rule.value) add(rule.value.path, field.boxes.count + (field.moreRows ?? []).reduce((n, row) => n + row.count, 0), field.id)
    if (field.kind === 'parts' && 'parts' in rule.value) for (const part of field.parts) {
      const value = rule.value.parts[part.name]
      if (value && 'path' in value) add(value.path, part.boxes.count, field.id)
    }
  }
  return result
}
