import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { questionsSchema } from '../src/data/questions-schema'
import type { Questions } from '../src/data/questions-schema'
import { normalizeQuestionPath, questionCopy, questions, sectionCopy } from '../src/data/questions'
import { businessData } from '../src/data/business'
import { applyQuestionDefaults } from '../src/engine/question-defaults'
import { prepareApplication } from '../src/engine/prepare'
import { exampleApplication } from '../src/demo/applications'
import { newApplication } from '../src/storage/store'
import { personFields, setAnswer, stepsFor } from '../src/ui/questionnaire'
import { Field, SectionCard, SectionHelpContent } from '../src/ui/components'

const asOf = '2026-11-05'
const draft = () => ({ application: { code: '16', operation: 'rinnovo' as const } })

describe('question copy boundary and coverage', () => {
  it('loads the versioned formal copy and rejects unsafe paths or ambiguous expressions', () => {
    expect(questionsSchema.safeParse(questions).success).toBe(true)
    for (const rule of [
      { path: '__proto__.polluted', value: { const: true } },
      { path: 'person.birthCountry', value: { fromPath: 'constructor.prototype' } },
      { path: 'person.birthCountry', value: { const: 'CHN', fromPath: 'person.citizenship' } },
      { path: 'person.birthCountry', value: { expression: 'run()' } },
      { path: 'person.birthCountry', value: { const: 'CHN' }, when: { typo: true } },
    ]) expect(questionsSchema.safeParse({ ...questions, defaults: [rule] }).success).toBe(false)
    expect(questionCopy('constructor')).toBeUndefined()
    expect(sectionCopy('constructor')).toBeUndefined()
  })
  it('prefers specific array/family copy, then person copy; empty strings are authoritative', () => {
    const data: Questions = { ...questions, fields: {
      'person.birthCity': { label: '成人出生地', hint: '成人提示', help: '成人说明' },
      'childrenUnder14[].birthCity': { label: '子女出生地', hint: '', help: '' },
      'spouse.birthCity': { label: '配偶出生地', hint: '配偶提示', help: '配偶说明' },
    } }
    expect(questionCopy('childrenUnder14[4].birthCity', data)).toEqual({ label: '子女出生地', hint: '', help: '' })
    expect(questionCopy('spouse.birthCity', data)?.label).toBe('配偶出生地')
    delete data.fields['spouse.birthCity']
    expect(questionCopy('spouse.birthCity', data)?.label).toBe('成人出生地')
    expect(questionCopy('spouse.unknown', data)).toBeUndefined()
    expect(normalizeQuestionPath('housing.pastResidences[3].comune')).toBe('housing.pastResidences[].comune')
  })
  it('matches section titles exactly before stripping trailing numbers', () => {
    const data = { ...questions, sections: { '过去六年住址': '通用说明', '过去六年住址 2': '' } }
    expect(sectionCopy('过去六年住址 1', data)).toBe('通用说明')
    expect(sectionCopy('过去六年住址 2', data)).toBe('')
    expect(sectionCopy('过去六年住址 4 ', data)).toBe('通用说明')
    expect(sectionCopy('未知分节', data)).toBeUndefined()
  })
  it('every field and section in all questionnaire branches uses the formal copy', () => {
    const usedFields = new Set<string>(), usedSections = new Set<string>()
    for (const { code, operations, profile } of businessData.applicationTypes.types) {
      for (const operation of operations) {
        const workTypes = profile.workTypes ?? (['work', 'student'].includes(profile.workStep ?? '') ? ['subordinato', 'autonomo', 'altro'] as const : ['altro'] as const)
        for (const type of workTypes) {
          for (const contract of type === 'subordinato' ? profile.contracts ?? ['determinato', 'indeterminato', 'stagionale', 'altro'] as const : ['determinato'] as const) {
            for (const kind of type === 'subordinato' ? ['fisica', 'giuridica'] as const : ['giuridica'] as const) {
              for (const status of type === 'subordinato' ? ['none', 'same-employer', 'changed'] as const : ['none'] as const) {
                const a = exampleApplication(code, operation)
                if (profile.workStep === 'student') a.study = { working: true }
                a.document = { kind: 'other' }; a.mailTo = {}; a.mailToDifferent = true; a.spouse = {}
                a.childrenUnder14 = [{}, {}, {}, {}, {}]
                a.housing = { pastResidences: [{}, {}, {}, {}] }
                a.work = { type, contract, contrattoSoggiornoStatus: status }; a.employer = { kind }; a.contrattoSoggiorno = { mode: 'sottoscritto' }
                a.dependents = { other: true }
                for (const step of stepsFor(a)) for (const section of step.sections) {
                  const sectionText = sectionCopy(section.title)
                  expect(sectionText, section.title).toBeDefined()
                  expect(section.help).toBe(sectionText)
                  usedSections.add(section.title.replace(/\s*\d+$/, ''))
                  for (const field of section.fields) {
                    const copy = questionCopy(field.path)
                    expect(copy, field.path).toBeDefined()
                    expect({ label: field.label, hint: field.hint, help: field.help, ...(copy?.paper ? { paper: field.paper } : {}),  }, field.path).toEqual(copy && Object.fromEntries(Object.entries(copy).filter(([key]) => key !== 'options')))
                    if (copy?.options) {
                      expect(field.options?.length).toBeGreaterThan(0)
                      for (const option of field.options ?? []) expect(copy.options).toContainEqual(option)
                      const allowed = field.path === 'work.type' ? profile.workTypes : field.path === 'work.contract' ? profile.contracts : field.path === 'income.taxForm' && !['income','income-optional'].includes(profile.workStep ?? '') && type !== 'altro' ? type === 'autonomo' ? ['unico-pf','unico-sp','unico-sc'] : ['cud','unico-pf'] : undefined
                      expect(field.options).toEqual(allowed ? copy.options.filter((option) => allowed.some((value) => value === option.value)) : copy.options)
                    }
                    const normalized = normalizeQuestionPath(field.path)
                    const key = Object.hasOwn(questions.fields, normalized) ? normalized : normalized.replace(/^spouse\.|^childrenUnder14\[\]\./,'person.')
                    if (Object.hasOwn(questions.fields,key)) usedFields.add(key); else expect(field.path).toBe('mailToDifferent')
                  }
                }
              }
            }
          }
        }
      }
    }
    expect([...usedFields].sort()).toEqual(Object.keys(questions.fields).filter((path) => !['questura.province', 'contrattoSoggiorno.mode', 'contrattoSoggiorno.raccomandata.numero', 'contrattoSoggiorno.raccomandata.controllo'].includes(path)).sort())
    expect([...usedSections].sort()).toEqual(Object.keys(questions.sections).sort())
  })
  it('does not render an empty hint or an empty field help; section help contains data text', () => {
    const a = exampleApplication('09')
    const section = stepsFor(a).find((s) => s.id === 'family')!.sections.find((s) => s.title === '同住受抚养家属')!
    const field = section.fields.find((q) => q.path === 'dependents.spouse')!
    expect(field.hint).toBe('')
    const html = renderToStaticMarkup(createElement(Field, { field, data: a, update: () => {}, blur: () => {} }))
    expect(html).not.toContain('id="q-dependents-spouse-hint"')
    expect(html).not.toContain('aria-describedby=')
    const noHelp = { ...field, help: '' }
    const hidden = { title: '不显示帮助的测试分节', icon: 'document', help: '', fields: [noHelp] }
    expect(renderToStaticMarkup(createElement(SectionHelpContent, { section: hidden }))).toBe('')
    const card = renderToStaticMarkup(createElement(SectionCard, { section: hidden, data: a, errors: [], update: () => {}, blur: () => {}, help: () => {} }))
    expect(card).not.toContain('填写说明')
    const help = renderToStaticMarkup(createElement(SectionHelpContent, { section }))
    expect(help).toContain(questions.sections['同住受抚养家属'])
    expect(help).toContain(field.help)
  })
})

describe('fill-only-empty question defaults', () => {
  it.each([['16', 'rinnovo', '16'], ['15', 'rinnovo', '15'], ['03', 'aggiornamento', '09']] as const)('%s / %s defaults current permit to %s', (code, operation, expected) => {
    const a = newApplication(code, operation)
    expect(a.currentPermit?.typeCode).toBe(expected)
    const result = prepareApplication(a, businessData, asOf)
    expect(result.kind).toBe('kit')
    if (result.kind === 'kit') expect(result.forms[0]!.values['M1-019']).toBe(expected)
  })
  it('does not infer a current permit for a first long-term application', () => {
    expect(newApplication('09', 'rilascio').currentPermit?.typeCode).toBeUndefined()
  })
  it('keeps entered values including false and zero, and does not mutate input', () => {
    const a = { ...draft(), currentPermit: { typeCode: '15' }, person: { citizenship: 'ITA', refugee: false }, income: { annualCents: 0 } }
    const before = structuredClone(a)
    const rules: Questions['defaults'] = [...questions.defaults,
      { path: 'person.refugee', value: { const: true } }, { path: 'income.annualCents', value: { const: 100 } }]
    const filled = applyQuestionDefaults(a, rules, asOf)
    expect(filled.currentPermit?.typeCode).toBe('15')
    expect(filled.person?.citizenship).toBe('ITA')
    expect(filled.person?.refugee).toBe(false)
    expect(filled.income?.annualCents).toBe(0)
    expect(a).toEqual(before)
    expect(applyQuestionDefaults(filled, rules, asOf)).toEqual(filled)
  })
  it.each([undefined, null, ''])('fills an empty permit value %s and lets the user change 03 afterwards', (typeCode) => {
    const a = applyQuestionDefaults({ ...draft(), currentPermit: { typeCode } }, undefined, asOf)
    expect(a.currentPermit?.typeCode).toBe('16')
    const updated = setAnswer(newApplication('03', 'aggiornamento'), 'currentPermit.typeCode', '16')
    expect(updated.currentPermit?.typeCode).toBe('16')
    const field = stepsFor(updated)[0]!.sections[1]!.fields.find((f) => f.path === 'currentPermit.typeCode')!
    expect(field.options?.some((o) => o.value === '16')).toBe(true)
    const kit = prepareApplication(updated, businessData, asOf)
    if (kit.kind === 'kit') expect(kit.forms[0]!.values['M1-019']).toBe('16')
  })
  it('fills address province from Questura once and preserves a later user choice', () => {
    let a = setAnswer(newApplication('16', 'rinnovo'), 'questura.province', 'MI')
    expect(a.address?.province).toBe('MI')
    a = setAnswer(a, 'address.province', 'FI')
    a = setAnswer(a, 'questura.province', 'RM')
    expect(a.address?.province).toBe('FI')
    expect(a.questura?.province).toBe('RM')
    expect(applyQuestionDefaults(a, undefined, asOf).address?.province).toBe('FI')
  })
  it('first matching rule wins even if its source is empty; nonmatching rules do not reserve the path', () => {
    const rules: Questions['defaults'] = [
      { path: 'address.province', value: { const: 'RM' }, when: { operations: ['rilascio'] } },
      { path: 'address.province', value: { fromPath: 'questura.province' }, when: { operations: ['rinnovo'] } },
      { path: 'address.province', value: { const: 'MI' } },
    ]
    expect(applyQuestionDefaults(draft(), rules, asOf).address?.province).toBeUndefined()
    expect(applyQuestionDefaults({ ...draft(), questura: { province: 'FI' } }, rules, asOf).address?.province).toBe('FI')
    const first = [{ path: 'address.province', value: { const: 'MI' } }, { path: 'address.province', value: { const: 'RM' } }]
    expect(applyQuestionDefaults(draft(), first, asOf).address?.province).toBe('MI')
  })
  it('supports the existing condition language and never guesses age from an invalid draft date', () => {
    const rule = { path: 'address.comune', value: { const: 'COMUNE FITTIZIO' }, when: { operations: ['rinnovo' as const], equals: { 'person.sex': 'F' }, present: ['questura.city'], minor: false, hasIncome: true, minDurationMonths: 12 } }
    expect(applyQuestionDefaults({ ...exampleApplication('16'), address: null }, [rule], asOf).address?.comune).toBe('COMUNE FITTIZIO')
    for (const birthDate of ['2099-01-01', 'bad-date']) {
      const a = { ...draft(), person: { birthDate } }
      expect(applyQuestionDefaults(a, [{ ...rule, when: { minor: false } }], asOf).address?.comune).toBeUndefined()
      expect(applyQuestionDefaults(a, undefined, asOf).person?.birthDate).toBe(birthDate)
    }
  })
  it('defaults every existing child from the parent and preserves a different child nationality', () => {
    const a = { ...draft(), person: { citizenship: 'CHN' }, childrenUnder14: [{ citizenship: '' }, { citizenship: 'ITA' }, {}] }
    const filled = applyQuestionDefaults(a, undefined, asOf)
    expect(filled.childrenUnder14?.map((c) => c.citizenship)).toEqual(['CHN', 'ITA', 'CHN'])
    const next = setAnswer(filled, 'childrenUnder14[3].surname', 'MINORE FITTIZIO')
    expect(next.childrenUnder14?.[3]?.citizenship).toBe('CHN')
    expect(applyQuestionDefaults(draft(), undefined, asOf).childrenUnder14).toBeUndefined()
  })
  it('resolves wildcard source paths at the same child index and does not create children for missing sources', () => {
    const rules = [{ path: 'childrenUnder14[].birthCity', value: { fromPath: 'childrenUnder14[].surname' } }]
    const a = { ...draft(), childrenUnder14: [{ surname: 'ESEMPIO A' }, { surname: 'ESEMPIO B' }, {}] }
    expect(applyQuestionDefaults(a, rules, asOf).childrenUnder14?.map((c) => c.birthCity)).toEqual(['ESEMPIO A', 'ESEMPIO B', undefined])
    expect(applyQuestionDefaults(draft(), rules, asOf).childrenUnder14).toBeUndefined()
  })
  it('uses person fallback for spouse copy while retaining child-specific birth-place instructions', () => {
    expect(personFields('spouse').find((f) => f.path === 'spouse.birthCity')?.hint).toBe(questions.fields['person.birthCity']?.hint)
    expect(personFields('childrenUnder14[1]').find((f) => f.path.endsWith('birthCity'))?.hint).toBe(questions.fields['childrenUnder14[].birthCity']?.hint)
  })
})
