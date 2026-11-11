import type { Application } from '../data/application-schema'
import { businessData } from '../data/business'
import { exampleApplication } from '../demo/applications'
import { stepsFor } from './model'

export function ruleScenarios() {
  const scenarios: { id: string; data: Application }[] = []
  for (const type of businessData.applicationTypes.types) for (const operation of type.operations) {
    const base = exampleApplication(type.code, operation)
    const add = (branch: string, change: (a: Application) => void) => { const data = structuredClone(base); change(data); scenarios.push({ id: type.code+'/'+operation+'/'+branch, data }) }
    add('default', () => {})
    add('other-document+mail+family', (a) => { a.document!.kind = 'other'; a.mailToDifferent = true; a.mailTo = {}; a.spouse = {}; a.childrenUnder14 = [{}, {}, {}, {}, {}]; a.housing = { pastResidences: [{}, {}, {}, {}] }; a.dependents = { other: true } })
    if (type.profile.workStep === 'student') add('not-working', (a) => { a.study = { working: false } })
    if (['work','student'].includes(type.profile.workStep ?? '')) {
      for (const work of type.profile.workTypes ?? ['subordinato','autonomo','altro'] as const) {
        add('work-'+work, (a) => { a.study = { working: true }; a.work = { ...a.work, type: work, contract: 'determinato', autonomoForm: 'titolare', hiredThisYear: true, contrattoSoggiornoStatus: 'same-employer' }; a.employer = { kind: 'giuridica' } })
        if (work === 'subordinato') {
          for (const contract of type.profile.contracts ?? ['determinato','indeterminato','stagionale','altro'] as const) add('contract-'+contract, (a) => { a.study = { working: true }; a.work = { type: work, contract, hiredThisYear: false } })
          for (const status of ['none','same-employer','changed'] as const) for (const kind of ['fisica','giuridica'] as const) add('employer-'+kind+'-'+status, (a) => { a.study = { working: true }; a.work = { type: work, contract: 'determinato', hiredThisYear: true, contrattoSoggiornoStatus: status }; a.employer = { kind } })
        }
      }
    }
    if (type.profile.sections?.includes('art27Letter')) {
      const question = stepsFor(base)[0]!.sections.flatMap((s) => s.fields).find((q) => q.path === 'application.art27Letter')!
      for (const option of question.options ?? []) add('subtype-'+option.value, (a) => { a.application.art27Letter = option.value as Application['application']['art27Letter'] })
    }
  }
  return scenarios
}
/** Include every mapping destination and the second half of compound controls. */
const targetCache = new Map<string, string[]>()
export function paperTargets(path: string): string[] {
  const cached = targetCache.get(path); if (cached) return cached
  const paths = [path, ...(path === 'questura.city' ? ['questura.province'] : [])]
  const depends = (value: unknown): boolean => {
    if (!value || typeof value !== 'object') return false
    return Object.entries(value).some(([key, part]) => {
      if (key === 'path' && typeof part === 'string') return paths.includes(part)
      if (key === 'computed' && typeof part === 'string') return paths.some((p) => part.startsWith(p === 'income.annualCents' ? 'income.annual.' : p === 'income.monthlyCents' ? 'income.monthly.' : p.startsWith('childrenUnder14') ? 'children.count' : '!'))
      if (key === 'equals' && part && typeof part === 'object') return Object.keys(part).some((p) => paths.includes(p))
      if (key === 'present' && Array.isArray(part)) return part.some((p) => typeof p === 'string' && paths.includes(p))
      return depends(part)
    })
  }
  const result = [...new Set(Object.values(businessData.mappings).flatMap((mapping) => mapping.rules.filter((rule) => depends(rule)).map((rule) => rule.field)))]
  targetCache.set(path, result); return result
}
const cell = (value: string) => value.replaceAll('|','\\|').replaceAll('\n',' ')
export function fieldRulesMarkdown(): string {
  const lines = ['# 问卷字段规则表', '', '由 `npm run rules:build` 根据当前 `stepsFor`、正式映射元数据和分支样例生成。勿手改；一致性测试会检查。', '', '每个类型 / 办理方式下，列出分支覆盖集。某字段的“显示于”是它在这些分支中出现的条件集合；未列出的分支不显示。表中不包含申请人的个人答案。', '']
  const scenarios = ruleScenarios(), optionSets = new Map<string, string>()
  for (const type of businessData.applicationTypes.types) for (const operation of type.operations) {
    const cases = scenarios.filter((s) => s.data.application.code === type.code && s.data.application.operation === operation)
    lines.push('## '+type.code+' · '+type.nameZh+' · '+operation, '', '覆盖分支：'+cases.map((s) => '`'+s.id.split('/').at(-1)+'`').join('、'), '', '| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |', '|---|---|---|---|---|---|')
    const rows = new Map<string, { path: string; label: string; required: boolean; options: string; paper: string; branches: string[] }>()
    for (const scenario of cases) for (const q of stepsFor(scenario.data).flatMap((s) => s.sections.flatMap((s) => s.fields))) {
      const allOptions = q.options?.map((o) => o.value+'='+o.label).join('；') ?? (q.type === 'boolean' ? 'true=是；false=否' : '—')
      let opts = allOptions
      if ((q.options?.length ?? 0) > 12) { if (!optionSets.has(allOptions)) optionSets.set(allOptions, 'O'+(optionSets.size+1)); opts = '选项集 '+optionSets.get(allOptions) }
      const paper = q.paper+' '+paperTargets(q.path).join('、')
      const key = JSON.stringify([q.path,q.required,opts,paper]), entry = rows.get(key) ?? { path:q.path,label:q.label,required:!!q.required,options:opts,paper,branches:[] }
      entry.branches.push(scenario.id.split('/').at(-1)!); rows.set(key,entry)
    }
    for (const row of rows.values()) lines.push('| '+[row.path,row.label,row.branches.length === cases.length ? '全部覆盖分支' : row.branches.join('、'),row.required?'是':'否',row.options,row.paper].map(cell).join(' | ')+' |')
    lines.push('')
  }
  lines.push('## 共享选项集', '')
  for (const [values,id] of optionSets) lines.push('### '+id, '', values, '')
  return lines.join('\n')+'\n'
}
