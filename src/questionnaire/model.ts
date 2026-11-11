import type { Application } from '../data/application-schema'
import { businessData } from '../data/business'
import { codeTables } from '../data/catalog'
import type { FormField, CodeTable } from '../data/schemas'
import { planApplication } from '../engine/application'
import { selectionFromApplication } from '../engine/selection'
import { questionCopy, sectionCopy } from '../data/questions'
import { parseDate } from '../engine/dates'

export type Question = { path: string; label: string; paper: string; hint: string; help?: string;
  type: 'text' | 'date' | 'number' | 'money' | 'select' | 'boolean' | 'multi';
  options?: { value: string; label: string; hint?: string; aliases?: string[]; code?: string }[]; required?: boolean }
export type Section = { title: string; icon: string; fields: Question[]; help?: string }
export type Step = { id: string; title: string; sections: Section[] }
const options = (items: string[]) => items.map((s) => { const [value, label] = s.split('|'); return { value: value!, label: label! } })
const enums: Record<string, string[]> = {
  'person.sex': ['M|男 · M', 'F|女 · F'], 'person.maritalStatus': ['A|未婚 · A', 'B|已婚 · B'],
  'document.kind': ['passport|护照', 'other|其他旅行证件'],
  'work.type': ['subordinato|雇佣工作', 'autonomo|自雇工作', 'altro|其他'],
  'work.contract': ['indeterminato|无固定期限', 'determinato|固定期限', 'stagionale|季节工', 'altro|其他'],
  'work.autonomoForm': ['titolare|经营者', 'socio|合伙人', 'libero|自由职业', 'altro|其他'],
  'employer.kind': ['giuridica|公司 / 法人', 'fisica|个人雇主'],
  'income.taxForm': ['unico-pf|UNICO PF', 'unico-sp|UNICO SP', 'unico-sc|UNICO SC', 'unico-enc|UNICO ENC', 'cud|CUD'],
  'contrattoSoggiorno.mode': ['sottoscritto|已签订', 'inviato|已寄出'], 'housing.idoneita.issuer': ['comune|Comune', 'asl|ASL'],
  'application.aggiornamentoReasons': ['domicilio|换住址', 'stato-civile|婚姻状况', 'figli-nati-italia|意大利出生子女', 'figli-ingresso|入境子女', 'passaporto|换护照', 'anagrafica|个人信息', 'foto|更新照片'],
}
const bools = ['mailToDifferent', 'study.working', 'person.refugee', 'work.hiredThisYear', 'income.bustaPaga', 'income.bollettinoInps', 'income.autonomoStartedThisYear', 'relatedApplication.spouse', 'relatedApplication.parent', 'dependents.spouse', 'dependents.children', 'dependents.other', 'family.childrenEnteredWithFamilyVisa']
const numbers = ['visa.durationDays', 'application.submissionTotalSheets', 'application.expectedDurationMonths', 'work.contractMonths', 'work.contractDays', 'income.lastTaxYear', 'dependents.cohabitingCount', 'dependents.childrenCount']
// Labels and paper references come from the same read-only mapping as PDF generation.
function paths(value: unknown): string[] {
  if (!value || typeof value !== 'object') return []
  return Object.entries(value).flatMap(([key, v]) => key === 'path' && typeof v === 'string' ? [v] : typeof v === 'object' ? paths(v) : [])
}
const metadata = new Map<string, { paper: string; label: string; table?: CodeTable; form?: string; field?: FormField }>()
for (const [form, mapping] of Object.entries(businessData.mappings)) {
  if (form === 'bollettino') continue
  for (const rule of mapping.rules) {
    const field = businessData.forms[form as 'modulo1' | 'modulo2'].fields.find((f) => f.id === rule.field)!
    for (const path of [...paths(rule.value), ...Object.keys(rule.when?.equals ?? {}), ...(rule.when?.present ?? [])]) if (!metadata.has(path)) metadata.set(path, {
      paper: `${form === 'modulo1' ? 'Modulo 1' : 'Modulo 2'} · ${field.id.slice(3).startsWith('H') ? '表格抬头（无栏号）' : `第 ${Number(field.id.slice(3))} 栏`} · ${field.labelIt}`,
      label: field.labelZh, form, field, table: field.codeTable ? codeTables[field.codeTable] : undefined,
    })
  }
}
export function q(path: string, label?: string, required = false, hint?: string): Question {
  const copy = questionCopy(path)
  const canonical = path.replace(/^spouse\.|^childrenUnder14\[\d+\]\./, 'person.')
  const meta = metadata.get(path) ?? metadata.get(path.replace(/\[\d+\]/g, '[0]')) ?? metadata.get(canonical)
  const selectOptions = enums[canonical] ?? enums[path]
  const copyOptions = copy?.options
  return { path, label: (copy?.label ?? label ?? meta?.label ?? path).replace(/（选填）|（如有）/g, ''), required,
    help: copy?.help,
    paper: copy?.paper ?? meta?.paper ?? '问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格',
    hint: copy?.hint ?? hint ?? (path.includes('birthCity') ? '按护照拼写，使用拉丁字母。工具不会把汉字自动转成拼音。' : path.endsWith('Cents') ? '输入欧元金额，最多两位小数' : required ? '按证件或相应证明材料填写' : '没有的可留空，按证件或证明材料填写'),
    type: path === 'mailToDifferent' ? 'boolean' : path === 'application.aggiornamentoReasons' ? 'multi' : copyOptions || selectOptions || meta?.table ? 'select' : bools.includes(path) ? 'boolean' : path.endsWith('Cents') ? 'money' : numbers.includes(path) ? 'number' : /Date$|Until$|From$|\.date$/.test(path) ? 'date' : 'text',
    options: copyOptions ?? (selectOptions ? options(selectOptions) : meta?.table?.entries.map((e) => ({ value: e.code, label: meta.table?.table === 'provinces' ? `${e.code} · ${e.nameIt}` : `${e.nameZh ? `${e.nameZh} · ` : ''}${e.nameIt} (${e.code})`, aliases: e.aliases }))),
  }
}
const s = (title: string, icon: string, fields: Question[]): Section => ({ title, icon, fields, help: sectionCopy(title) })
const fields = (items: string[]) => items.map((p) => q(p))
export function personFields(prefix = 'person'): Question[] {
  return [q(`${prefix}.surname`, '姓', true, '按护照上的拉丁字母拼写，生成参考件时自动转大写'), q(`${prefix}.givenNames`, '名', true), q(`${prefix}.sex`, '性别', true), q(`${prefix}.birthDate`, '出生日期', true),
    q(`${prefix}.birthCountry`, '出生国家', true), q(`${prefix}.citizenship`, '国籍', true), q(`${prefix}.birthCity`, '出生城市', true)]
}
export function addressFields(prefix = 'address'): Question[] {
  const required = prefix === 'address' || prefix === 'mailTo'
  return [q(`${prefix}.province`, '省份', required), q(`${prefix}.comune`, '城市 / Comune', required), q(`${prefix}.street`, '街道', required),
    q(`${prefix}.civic.numero`, '门牌数字'), q(`${prefix}.civic.lettera`, '门牌字母'), q(`${prefix}.scala`, '楼梯 / Scala'), q(`${prefix}.interno`, '室号 / Interno'), q(`${prefix}.cap`, '邮编 CAP', required)]
}
export function stepsFor(a: Application, mail = a.mailToDifferent ?? !!a.mailTo, catalog = businessData.applicationTypes, asOf = new Date().toLocaleDateString('sv-SE')): Step[] {
  const code = a.application.code
  const profile = catalog.types.find((type) => type.code === code)?.profile ?? {}
  const student = profile.workStep === 'student'
  const sections = profile.sections ?? []
  const noCurrentPermit = profile.noCurrentPermitFor?.includes(a.application.operation)
  const visa = profile.visaFor?.includes(a.application.operation)
  const askDuration = profile.duration?.source === 'question'
  const permitType = q('currentPermit.typeCode', '现有居留类型', true)
  const application = { id: 'application', title: '申请信息', sections: [
    s('受理地', 'pin', [{ ...q('questura.city', '交给哪个 Questura', true), type: 'select', options: codeTables.questure.entries.map((e) => ({ value: e.nameIt, label: `${e.code} · ${e.nameIt}`, code: e.code, aliases: e.aliases })) }]),
    ...(!noCurrentPermit ? [s('现有居留', 'document', [q('currentPermit.number', '现有居留号码', true), permitType, q('currentPermit.validUntil', '居留到期日期', true)])] : []),
    ...(sections.includes('aggiornamentoReasons') ? [s('更新原因', 'document', [q('application.aggiornamentoReasons', '需要更新哪些信息？', true)])] : []),
    ...(visa ? [s('签证信息', 'document', ['entryDate', 'border', 'number', 'type', 'entries', 'notes', 'durationDays', 'validFrom', 'validUntil'].map((key) => q(`visa.${key}`, undefined, key !== 'notes')))] : []),
    ...(sections.includes('sponsor') ? [s('担保家属', 'people', [q('family.sponsorPermitValidUntil', undefined, true)])] : []),
    ...(sections.includes('sponsorKind') ? [s('要团聚的家属', 'people', [q('family.sponsorKind', undefined, true)])] : []),
    ...(student ? [s('学习与打工', 'work', [q('study.working', undefined, true), ...(askDuration ? [q('application.expectedDurationMonths', undefined, true)] : [])])] : []),
    ...(sections.includes('employmentCentre') ? [s('职业介绍中心登记', 'work', [q('employmentCentre.registrationDate', undefined, true), q('employmentCentre.province', undefined, true), q('employmentCentre.city', undefined, true), q('employmentCentre.circoscrizione'), ...(askDuration ? [q('application.expectedDurationMonths', undefined, true)] : [])])] : []),
    ...(sections.includes('art27Letter') ? [s('特殊工作类别', 'work', [q('application.art27Letter', undefined, true)])] : []),
    ...(askDuration && !student && !sections.includes('employmentCentre') ? [s('居留期限', 'document', [q('application.expectedDurationMonths', undefined, true)])] : []),
  ] }
  const personal = { id: 'person', title: '个人与护照', sections: [s('姓名与出生资料', 'person', personFields()),
    s('婚姻与税号', 'card', [q('person.maritalStatus', '婚姻状况', true), q('person.codiceFiscale', '税号（如有）', false, '按税号卡填写 16 位。只做格式与资料核对，不验证是否由官方签发。'), q('person.refugee', '是否属于难民身份')]),
    s('身份证件', 'document', [q('document.kind', '证件种类', true), ...(a.document?.kind === 'other' ? fields(['document.otherCode', 'document.otherName', 'document.issuerCode']) : []), q('document.number', '证件号码', true), q('document.validUntil', '证件有效期', true)]),
  ] }
  const address: Step = { id: 'address', title: '住址', sections: [s('在意大利的住址', 'home', addressFields()), s('联系方式', 'phone', fields(['address.email', 'address.phoneFixed.prefisso', 'address.phoneFixed.numero', 'address.phoneMobile.prefisso', 'address.phoneMobile.numero'])),
    s('收信地址', 'mail', [q('mailToDifferent', '收信地址', true), ...(mail ? [q('mailTo.presso', '收件人 / Presso'), ...addressFields('mailTo')] : [])]),
    ...(sections.includes('idoneita') ? [s('住房适宜证明', 'home', fields(['housing.idoneita.date', 'housing.idoneita.issuer', 'housing.idoneita.province', 'housing.idoneita.comuneOrAsl']))] : []),
    ...(sections.includes('currentResidence') ? [s('目前登记住址', 'pin', fields(['housing.currentResidence.province', 'housing.currentResidence.comune', 'housing.currentResidence.street']))] : []),
    ...(sections.includes('pastResidences') ? (a.housing?.pastResidences ?? []).map((_, i) => s(`过去六年住址 ${i + 1}`, 'home', fields([`housing.pastResidences[${i}].province`, `housing.pastResidences[${i}].comune`, `housing.pastResidences[${i}].street`]))) : []),
  ] }
  const workType = q('work.type', '工作类型', true)
  if (profile.workTypes) workType.options = workType.options?.filter((o) => profile.workTypes!.some((value) => value === o.value))
  const contract = q('work.contract', '合同类型', true)
  if (profile.contracts) contract.options = contract.options?.filter((o) => profile.contracts!.some((value) => value === o.value))
  const work: Step = { id: 'work', title: '工作与收入', sections: [s('工作情况', 'work', [workType,
    ...(a.work?.type === 'subordinato' ? [contract, ...(['determinato', 'stagionale'].includes(a.work.contract ?? '') ? [q('work.contractMonths', '合同月数', true), q('work.contractDays', '额外天数')] : []), ...(a.work.contract === 'altro' ? [q('work.contractOther', '其他合同说明'), ...(profile.duration?.source === 'contract' ? [q('application.expectedDurationMonths', '预计批准期限（月）', true, '只用于计算缴费，不确定请在邮局窗口确认。')] : [])] : [])] : a.work?.type === 'autonomo' ? [q('work.autonomoForm', '经营形式', true)] : []), ...fields(['work.jobTitle'])]),
    ...(a.work?.type === 'subordinato' ? [s('雇主资料', 'work', [q('employer.kind', '雇主种类', true), ...(a.employer?.kind === 'fisica' ? fields(['employer.surname', 'employer.givenNames', 'employer.birthDate', 'employer.permitNumber']) : [q('employer.name', '公司名称', true)]), ...fields(['employer.codiceFiscale', 'employer.partitaIva', 'employer.inps'])]),
      s('居留合同（如有）', 'document', [q('work.contrattoSoggiornoStatus', undefined, true), ...(a.work?.contrattoSoggiornoStatus === 'same-employer' ? fields(['contrattoSoggiorno.province', 'contrattoSoggiorno.date']) : [])])] : a.work?.type === 'autonomo' ? [s('经营资料', 'work', fields(['business.name', 'business.codiceFiscale', 'business.partitaIva', 'business.inps', 'business.cciaaProvince', 'business.cciaaNumber', 'business.cciaaDate', 'business.albo', 'business.alboDate']))] : []),
    s('收入与报税', 'card', incomeFields(a, profile.workStep === 'income' || profile.workStep === 'income-optional')),
  ] }
  const family: Step = { id: 'family', title: '家属与关联申请', sections: [s('关联申请', 'people', fields(['relatedApplication.spouse', 'relatedApplication.parent'])),
    ...(sections.includes('dependents') ? [s('同住受抚养家属', 'people', fields(['dependents.cohabitingCount', 'dependents.spouse', 'dependents.children', 'dependents.childrenCount', 'dependents.other', ...(a.dependents?.other ? ['dependents.otherRelation'] : [])]))] : []),
    ...(a.spouse && sections.includes('dependents') ? [s('配偶资料', 'person', personFields('spouse'))] : []),
    ...(a.childrenUnder14 ?? []).map((_, i) => s(`未满 14 岁子女 ${i + 1}`, 'person', personFields(`childrenUnder14[${i}]`))),
    ...((a.childrenUnder14?.length ?? 0) > 0 ? [s('子女材料', 'document', fields(['family.childrenEnteredWithFamilyVisa']))] : []),
    s('提交前', 'document', [q('application.submissionTotalSheets', '表格和复印件总页数', false, '复印完再数，也可以留空在纸质表第 25 栏手写。签名和日期留到交表当天填写。')]),
  ] }
  const income = work.sections.find((section) => section.title === '收入与报税')!
  const incomeOnly = profile.workStep === 'income' || profile.workStep === 'income-optional'
  const birthDate = a.person?.birthDate
  // Invalid draft dates belong to field validation, not step construction.
  const selectionInput = birthDate && (!parseDate(birthDate) || birthDate > asOf) ? { ...a, person: { ...a.person, birthDate: null } } : a
  const plan = planApplication(selectionFromApplication(selectionInput, asOf, catalog), catalog, a)
  const hasSecond = plan.kind === 'kit' && plan.forms.includes('modulo2')
  const extra: Step[] = incomeOnly ? [{ id: 'income', title: '收入', sections: [{ ...income, fields: income.fields.filter((field) => field.path !== 'work.hiredThisYear').map((field) => ({ ...field, required: profile.workStep === 'income' && field.required })) }] }]
    : student ? a.study?.working ? [{ ...work, title: '工作情况', sections: work.sections.filter((section) => section !== income) }, { id: 'income', title: '收入与报税', sections: [income] }] : []
    : profile.workStep === 'work' && hasSecond ? [work] : []
  return [application, personal, address, ...extra, family]
}

export function incomeFields(a: Application, incomeOnly = false): Question[] {
  const autonomo = a.work?.type === 'autonomo'
  // Official note x / y: people hired (or self-employed) only this year have no previous-year income.
  // They leave Modulo 2 boxes 52–53 blank; an employee proves income with payslips and box 62 instead.
  const newThisYear = !incomeOnly && (autonomo ? a.income?.autonomoStartedThisYear === true : a.work?.hiredThisYear === true)
  const showMonthly = incomeOnly || (!autonomo && a.work?.hiredThisYear === true)
  const tax = q('income.taxForm')
  if (!incomeOnly && a.work?.type !== 'altro') tax.options = tax.options?.filter((o) => (autonomo ? ['unico-pf', 'unico-sp', 'unico-sc'] : ['cud', 'unico-pf']).includes(o.value))
  const monthly = (path: string) => q(path, undefined, path === 'income.monthlyCents' && !incomeOnly)
  return [...(!incomeOnly && !autonomo ? [q('work.hiredThisYear', undefined, true)] : []), ...(!incomeOnly && autonomo ? [q('income.autonomoStartedThisYear', undefined, true)] : []),
    q('income.annualCents', '年收入（欧元）', !newThisYear), q('income.lastTaxYear'), tax, ...(showMonthly ? ['income.bustaPaga', 'income.bollettinoInps', 'income.monthlyCents'].map(monthly) : [])]
}
export const questionId = (path: string) => 'q-'+path.replace(/[^\w-]/g, '-')
export function paperTarget(path: string) { const canonical=path.replace(/^spouse\.|^childrenUnder14\[\d+\]\./,'person.'); return metadata.get(path) ?? metadata.get(path.replace(/\[\d+\]/g,'[0]')) ?? metadata.get(canonical) }
