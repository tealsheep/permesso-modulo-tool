import type { Application } from '../data/application-schema'
import { businessData } from '../data/business'
import { codeTables } from '../data/catalog'
import { pathTokens } from '../data/path'
import { readPath } from '../engine/conditions'
import { validateApplicationDraft } from './validation'
import { applicationSchema, moneyLimits } from '../data/application-schema'
import { parseDate } from '../engine/dates'
import { applyQuestionDefaults } from '../engine/question-defaults'
import { familyDuration } from '../engine/duration'
import { directCapacities } from '../engine/mapping'
import { normalizeText } from '../engine/characters'
import { stepsFor } from '../questionnaire/model'
import type { Question } from '../questionnaire/model'
export * from '../questionnaire/model'

export function setAnswer(a: Application, path: string, value: unknown): Application {
  const tokens = pathTokens(path)
  if (!tokens) throw new Error('无效资料路径')
  const next = structuredClone(a)
  let node = next as unknown as Record<string | number, unknown>
  tokens.forEach((t, i) => {
    if (i === tokens.length - 1) node[t] = value
    else {
      if (node[t] === null || typeof node[t] !== 'object') node[t] = typeof tokens[i + 1] === 'number' ? [] : {}
      node = node[t] as Record<string | number, unknown>
    }
  })
  if (path === 'questura.city') {
    const office = codeTables.questure.entries.find((entry) => entry.nameIt === value)
    if (office) next.questura = { city: office.nameIt, province: office.code }
  }
  if (businessData.applicationTypes.types.find((type) => type.code === next.application.code)?.profile.duration?.source === 'contract' && (path === 'work.contract' || path === 'work.contractMonths')) {
    next.application.expectedDurationMonths = next.work?.contract === 'indeterminato' ? 24 :
      ['determinato', 'stagionale'].includes(next.work?.contract ?? '') ? (next.work?.contractMonths ? Math.min(next.work.contractMonths, 12) : null) : null
  }
  if (path === 'work.contrattoSoggiornoStatus') next.contrattoSoggiorno = { ...next.contrattoSoggiorno, mode: value === 'same-employer' ? 'sottoscritto' : null }
  return familyDuration(applyQuestionDefaults(next), new Date().toLocaleDateString('sv-SE'))
}
const months = ['work.contractMonths', 'application.expectedDurationMonths']
let capacities: Map<string, { capacity: number; column: string }> | undefined
/** Smallest Modulo box count an answer is copied into unchanged (the payment slip never blocks, D58). */
function capacityFor(path: string) {
  if (!capacities) {
    capacities = new Map()
    for (const name of ['modulo1', 'modulo2'] as const) for (const [key, value] of directCapacities(businessData.forms[name], businessData.mappings[name])) {
      const known = capacities.get(key)
      if (!known || value.capacity < known.capacity) capacities.set(key, value)
    }
  }
  return capacities.get(path)
}
export type FormError = { path: string; label: string; message: string }
export function orderFormErrors(errors: FormError[], questions: Question[]): FormError[] {
  const positions = new Map(questions.map((question, index) => [question.path, index]))
  return [...errors].sort((a,b) => (positions.get(a.path) ?? Number.MAX_SAFE_INTEGER) - (positions.get(b.path) ?? Number.MAX_SAFE_INTEGER))
}
export function questionErrors(a: Application, questions: Question[], today: string): FormError[] {
  const errors: FormError[] = []
  for (const f of questions) {
    const v = readPath(a, f.path)
    let message = ''
    if (f.required && (v == null || v === '' || (typeof v === 'string' && !v.trim()) || (Array.isArray(v) && !v.length))) message = '请填写这一项'
    else if (typeof v === 'string' && v) {
      if (f.type === 'select' && !f.options?.some((o) => o.value === v)) message = '请从列表中选择有效选项'
      if (f.type === 'date' && !parseDate(v)) message = '请输入有效日期'
      if (f.path.endsWith('birthDate') && v > today) message = '出生日期不能晚于今天'
      if (f.path.startsWith('childrenUnder14') && f.path.endsWith('birthDate') && age(v, today) >= 14) message = '年满 14 岁需另建申请，不能写进未满 14 岁子女栏'
      if (f.path.endsWith('.cap') && !/^\d{5}$/.test(v)) message = '邮编应为 5 位数字'
      if (f.path === 'family.sponsorPermitValidUntil' && v <= today) message = '担保家属的居留到期日应晚于办理日期'
      if (f.path === 'address.email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) message = '请对照邮箱检查 @ 和域名'
      if (f.type === 'date' && parseDate(v)) {
        if (f.path.endsWith('birthDate') && v < '1900-01-01') message = '请检查出生年份'
        if (/validUntil$/i.test(f.path) && (v < '1990-01-01' || Number(v.slice(0, 4)) > Number(today.slice(0, 4)) + 11)) message = '请检查年份，这个到期日不太可能'
        else if (f.path === 'document.validUntil' && v < today) message = '证件已经过期。邮局和 Questura 不收过期证件，请先换新护照，再照新护照填写'
      }
      if (/(^|\.)partitaIva$/.test(f.path) && !/^\d{11}$/.test(v.replace(/\s/g, ''))) message = '增值税号（Partita IVA）是 11 位数字'
      if (/^(employer|business)\.codiceFiscale$/.test(f.path) && !/^([A-Z0-9]{16}|\d{11})$/i.test(v.replace(/\s/g, ''))) message = '税号是 16 位字母和数字（个人），或 11 位数字（公司）'
      if (/phone\w*\.(prefisso|numero)$/i.test(f.path) && /[^\d\s]/.test(v)) message = v.trim().startsWith('+') ? '不要写 +39，只写数字' : '电话只能写数字'
    }
    const phone = /^(.*phone\w*)\.(prefisso|numero)$/i.exec(f.path)
    if (!message && phone && !(typeof v === 'string' && v.trim())) {
      const group = readPath(a, phone[1]!) as { prefisso?: string | null; numero?: string | null } | null | undefined
      if ((phone[2] === 'prefisso' ? group?.numero : group?.prefisso)?.trim()) message = phone[2] === 'prefisso' ? '请把区号（前缀）也填上' : '请把号码也填上'
    }
    if (typeof v === 'number') {
      const limit = moneyLimits[f.path as keyof typeof moneyLimits] ?? 99_999_999
      if (f.type === 'money' && (!Number.isInteger(v) || v < 0)) message = '请输入有效的欧元金额，最多两位小数'
      else if (f.type === 'money' && v > limit) message = `金额超出纸质表这一栏的格子（最多 ${String(Math.floor(limit / 100)).length} 位欧元整数），请检查是否多打了 0`
      else if (months.includes(f.path) && (!Number.isInteger(v) || v <= 0)) message = v === 0 ? '月数应大于零' : '月数请填大于零的整数，不带小数，例如 12'
      else if (f.path === 'income.lastTaxYear' && (!Number.isInteger(v) || v < 2000 || v > Number(today.slice(0, 4)))) message = `请填四位数的年份，例如 ${Number(today.slice(0, 4)) - 1}，不能晚于今年`
      else if (f.type !== 'money' && (!Number.isInteger(v) || v < 0)) message = '请输入不带小数的非负整数'
      else if (f.path === 'work.contractDays' && v > 30) message = '额外天数应在 0 到 30 之间，满一个月请算进月数'
      else if (f.path === 'application.submissionTotalSheets' && v === 0) message = '页数应大于零'
    }
    // A zero would tick Modulo 2 box 52 and write 0 euro; no previous-year income means leaving it blank.
    if (f.path === 'income.annualCents' && v === 0) message = f.required ? '年收入不能写 0。如果是今年才入职或今年才开始自雇，请在上面选「是」，年收入空着' : '去年没有收入就空着，不要填 0'
    const limit = capacityFor(f.path)
    if (!message && limit && !['money', 'select', 'boolean', 'date'].includes(f.type) && (typeof v === 'string' || typeof v === 'number') && v !== '') {
      const length = [...normalizeText(String(v), true)].length
      if (length > limit.capacity) message = `${f.label}${limit.column}最多 ${limit.capacity} 格，你填了 ${length} 个字符`
    }
    if (message) errors.push({ path: f.path, label: f.label, message })
  }
  // Last line of defence: any value storage would reject gets a Chinese message here, never the Zod text.
  const parsed = applicationSchema.safeParse(a)
  if (!parsed.success) for (const issue of parsed.error.issues) {
    const field = questions.find((q) => pathTokens(q.path)?.join('.') === issue.path.join('.'))
    if (field && !errors.some((e) => e.path === field.path)) errors.push({ path: field.path, label: field.label, message: field.type === 'number' || field.type === 'money' ? '请输入有效的数字' : '这一项的内容无效，请重新填写' })
  }
  const validation = validateApplicationDraft(a, businessData, today)
  if (validation.kind === 'ready') for (const warning of validation.kit.warnings) if (warning.code === 'truncated' && !warning.field.startsWith('B-')) for (const path of warning.paths) { // D58: the slip never blocks
    const field = questions.find((q) => q.path === path)
    if (field && !errors.some((e) => e.path === path)) errors.push({ path, label: field.label, message: `${field.label}${warning.column}最多 ${warning.capacity} 格，你填了 ${[...warning.original].length} 个字符` })
  }
  if (validation.kind === 'invalid') for (const issue of validation.issues) for (const path of issue.paths) {
    const field = questions.find((q) => q.path === path)
    if (field && !errors.some((e) => e.path === path)) {
      const column = /-(\d{3})$/.exec(issue.field)
      const name = `${field.label}${column ? `（第 ${Number(column[1])} 栏）` : ''}`
      const han = issue.characters.some((char) => /\p{Script=Han}/u.test(char))
      const message = han ? `${name}不能写汉字，${/email$/i.test(path) ? '邮箱只能用英文字母、数字和符号' : /birthCity$|surname$|givenNames$/.test(path) ? '请照护照写拼音' : '请照证件写拉丁字母或拼音'}` : `${name}含有表格不支持的字符，请照证件检查填写`
      errors.push({ path, label: field.label, message })
    }
  }
  return errors
}
export function age(birth: string, today: string): number {
  return Number(today.slice(0, 4)) - Number(birth.slice(0, 4)) - (today.slice(5) < birth.slice(5) ? 1 : 0)
}
export function progress(a: Application, asOf = new Date().toLocaleDateString('sv-SE')) {
  const qs = stepsFor(a).flatMap((s) => s.sections.flatMap((s) => s.fields)).filter((q) => q.required)
  const invalid = new Set(questionErrors(a, qs, asOf).map((e) => e.path))
  const filled = qs.filter((q) => { const v = readPath(a, q.path); return !invalid.has(q.path) && v != null && v !== '' && (!Array.isArray(v) || v.length) }).length
  return { filled, total: qs.length, percent: Math.round(filled / (qs.length || 1) * 100) }
}
