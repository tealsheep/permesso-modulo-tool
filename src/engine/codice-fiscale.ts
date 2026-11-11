import type { Sex } from '../data/schemas'
import { parseDate } from './dates'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const months = 'ABCDEHLMPRST'
const omocodia = 'LMNPQRSTUV'
const numericPositions = new Set([6, 7, 9, 10, 12, 13, 14])
const oddValues = [1, 0, 5, 7, 9, 13, 15, 17, 19, 21, 2, 4, 18, 20, 11, 3, 6, 8, 12, 14, 16, 10, 22, 25, 24, 23]
const structure = /^[A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST][0-9LMNPQRSTUV]{2}[A-Z][0-9LMNPQRSTUV]{3}[A-Z]$/

/** DM 23/12/1976, art. 7. Check the original letters, before decoding omocodia. */
export function fiscalChecksum(first15: string): string {
  if (!/^[A-Z0-9]{15}$/.test(first15)) throw new Error('校验位输入必须是 15 位大写字母或数字')
  const sum = [...first15].reduce((total, char, index) => {
    const n = /\d/.test(char) ? Number(char) : alphabet.indexOf(char)
    return total + (index % 2 === 0 ? oddValues[n]! : n)
  }, 0)
  return alphabet[sum % 26]!
}

function decode(code: string): string {
  return [...code].map((char, i) => numericPositions.has(i) && omocodia.includes(char)
    ? String(omocodia.indexOf(char)) : char).join('')
}

function nameCode(value: string, givenName: boolean): string | null {
  const name = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/[ '\u2019-]/g, '')
  if (!/^[A-Z]+$/.test(name)) return null
  const consonants = name.replace(/[AEIOU]/g, '')
  const vowels = name.replace(/[^AEIOU]/g, '')
  if (givenName && consonants.length >= 4) return consonants[0]! + consonants[2]! + consonants[3]!
  return (consonants + vowels + 'XXX').slice(0, 3)
}

export interface FiscalIdentity {
  surname: string
  givenName: string
  birthDate: string
  sex: Sex
  /** Optional codice catastale, not the kit's nationality code. */
  birthplaceCode?: string
}
export interface FiscalIssue { code: string; message: string; severity: 'warning' }
export interface FiscalValidation {
  normalized: string
  formatValid: boolean
  checksumValid: boolean
  consistent: boolean | null
  issues: FiscalIssue[]
}

/** Offline plausibility check only. Never verifies official issuance or blocks an application. */
export function validateCodiceFiscale(value: string, identity?: FiscalIdentity): FiscalValidation {
  const normalized = value.trim().toUpperCase()
  const result: FiscalValidation = { normalized, formatValid: false, checksumValid: false, consistent: null, issues: [] }
  const warn = (code: string, message: string) => result.issues.push({ code, message, severity: 'warning' })
  if (!structure.test(normalized)) {
    warn('format', '税号应为 16 位个人税号，字母及数字位置需符合格式。')
    return result
  }
  const decoded = decode(normalized)
  const encodedDay = Number(decoded.slice(9, 11))
  const day = encodedDay > 40 ? encodedDay - 40 : encodedDay
  const month = months.indexOf(decoded[8]!) + 1
  const year = 2000 + Number(decoded.slice(6, 8))
  const possibleDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  result.formatValid = (encodedDay <= 31 || encodedDay >= 41) && parseDate(possibleDate) !== null
  if (!result.formatValid) warn('encoded-date', '税号中的出生日期或性别编码无效。')
  result.checksumValid = fiscalChecksum(normalized.slice(0, 15)) === normalized[15]
  if (!result.checksumValid) warn('checksum', '税号校验位不符，请对照税号卡。')
  if (identity) {
    const surname = nameCode(identity.surname, false), givenName = nameCode(identity.givenName, true)
    const birth = parseDate(identity.birthDate)
    if (!surname || !givenName) warn('name-uncheckable', '姓名含无法核对的字符，请对照税号卡。')
    if (surname && surname !== decoded.slice(0, 3)) warn('surname', '税号与填写的姓不一致。')
    if (givenName && givenName !== decoded.slice(3, 6)) warn('given-name', '税号与填写的名不一致。')
    if (!birth) warn('birth-date', '填写的出生日期无效。')
    else if (birth.year % 100 !== year % 100 || birth.month !== month || birth.day !== day) warn('birth-date', '税号与填写的出生日期不一致。')
    if ((encodedDay > 40 ? 'F' : 'M') !== identity.sex) warn('sex', '税号与填写的性别不一致。')
    if (identity.birthplaceCode && identity.birthplaceCode.toUpperCase() !== decoded.slice(11, 15)) warn('birthplace', '税号与填写的出生地代码不一致。')
    result.consistent = result.issues.length === 0
  }
  return result
}
