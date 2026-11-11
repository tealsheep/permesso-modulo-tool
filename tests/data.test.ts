import { describe, expect, it } from 'vitest'
import { loadData } from '../src/data/load'
import { applicationTypesSchema, codeTableSchema, conditionSchema, feesSchema, formSchema, materialsSchema } from '../src/data/schemas'
import { demoForm } from '../src/demo/modulo1'
import { codeTables, modulo1 } from '../src/data/catalog'

const nameField = demoForm.fields.find((field) => field.id === 'M1-003')!

describe('validated data boundary', () => {
  it('loads a SPEC form from JSON', () => {
    expect(loadData(formSchema, JSON.stringify(demoForm), 'fixture').fields).toHaveLength(146)
  })
  it.each([
    { ...demoForm, version: 2 }, { ...demoForm, verifiedOn: '2026-02-30' },
    { ...demoForm, source: '../private.pdf' }, { ...demoForm, form: 'modulo2' },
    { ...demoForm, fields: [demoForm.fields[0], demoForm.fields[0]] },
    { ...demoForm, fields: [{ ...nameField, page: 0 }] },
    { ...demoForm, fields: [{ ...nameField, boxes: { x: -1, y: 0, w: 10, h: 12, count: 1, pitch: 10 } }] },
    { ...demoForm, fields: [{ ...nameField, boxes: { x: 0, y: 0, w: 10, h: 12, count: 1, pitch: 0 } }] },
  ])('rejects invalid form %#', (input) => expect(() => loadData(formSchema, input, 'bad.json')).toThrow('bad.json'))
  it('rejects malformed JSON', () => expect(() => loadData(formSchema, '{', 'broken')).toThrow('JSON 格式无效'))
  it('validates code tables and rejects duplicate codes', () => {
    const entry = { code: 'ZZ', nameIt: 'Esempio', nameZh: '虚构省份' }
    const table = { version: 1, verifiedOn: '2026-11-05', table: 'provinces', entries: [entry] }
    expect(codeTableSchema.parse(table).entries[0]?.code).toBe('ZZ')
    expect(codeTableSchema.safeParse({ ...table, entries: [entry, entry] }).success).toBe(false)
  })
  it('requires metadata, integer cents, and valid rule ranges', () => {
    expect(applicationTypesSchema.safeParse([]).success).toBe(false)
    expect(feesSchema.safeParse({ version: 1, verifiedOn: '2026-11-05', cardCents: 30.46, rules: [] }).success).toBe(false)
    expect(materialsSchema.safeParse({ version: 1, verifiedOn: '2026-11-05', applicationCode: '16', items: [{ nameIt: 'Esempio', nameZh: '样例', condition: { minDurationMonths: 24, maxDurationMonths: 12 } }] }).success).toBe(false)
  })
  it('rejects misspelled rule conditions instead of applying a rule unconditionally', () => {
    expect(conditionSchema.safeParse({ minors: true }).success).toBe(false)
  })
  it('validates date groups and freetext geometry', () => {
    const b = { x: 10, y: 10, w: 10, h: 15, count: 2, pitch: 12 }
    const base = nameField
    const date = { ...base, kind: 'date', groups: { day: b, month: b, year: { ...b, count: 4 } } }
    expect(formSchema.parse({ ...demoForm, fields: [date] }).fields[0]?.kind).toBe('date')
    expect(formSchema.safeParse({ ...demoForm, fields: [{ ...date, groups: { day: { ...b, count: 1 }, month: b, year: b } }] }).success).toBe(false)
    expect(formSchema.parse({ ...demoForm, fields: [{ ...base, kind: 'freetext', area: { x: 10, y: 10, w: 60, h: 20 } }] }).fields[0]?.kind).toBe('freetext')
  })
  it('loads the official form without losing continuation rows or header IDs', () => {
    expect(demoForm).toBe(modulo1)
    expect(modulo1.fields.filter((field) => field.kind === 'boxes' && field.moreRows?.length)).toHaveLength(31)
    expect(nameField).toMatchObject({ moreRows: [{ x: 45.15, y: 579.1, count: 30 }] })
    expect(modulo1.fields.filter((field) => field.id.startsWith('M1-H')).map((field) => field.id)).toEqual(['M1-H01', 'M1-H02'])
    expect(formSchema.safeParse({ ...modulo1, fields: [{ ...nameField, moreRows: [{ x: 0, y: -1, w: 10, h: 10, pitch: 12, count: 2 }] }] }).success).toBe(false)
  })
  it('validates all six actual code tables and retains source and note', () => {
    expect(Object.fromEntries(Object.entries(codeTables).map(([key, table]) => [key, table.entries.length])))
      .toEqual({ questure: 106, provinces: 105, motivi: 31, stati: 230, documenti: 9, autorita: 6 })
    for (const [name, table] of Object.entries(codeTables)) {
      expect(table.table).toBe(name)
      expect(table.source).toBeTruthy()
      expect(codeTableSchema.parse(table)).toEqual(table)
    }
    expect(codeTables.provinces.note).toContain('105')
    expect(codeTables.motivi.note).toBeTruthy()
  })
  it('requires nonempty, uniquely named choice options and parts', () => {
    const choice = modulo1.fields.find((field) => field.id === 'M1-037')!
    const parts = modulo1.fields.find((field) => field.id === 'M1-069')!
    if (choice.kind !== 'choice' || parts.kind !== 'parts') throw new Error('fixture')
    expect(formSchema.safeParse({ ...modulo1, fields: [{ ...choice, options: [] }] }).success).toBe(false)
    expect(formSchema.safeParse({ ...modulo1, fields: [{ ...choice, options: [choice.options[0], choice.options[0]] }] }).success).toBe(false)
    expect(formSchema.safeParse({ ...modulo1, fields: [{ ...parts, parts: [] }] }).success).toBe(false)
    expect(formSchema.safeParse({ ...modulo1, fields: [{ ...parts, parts: [parts.parts[0], parts.parts[0]] }] }).success).toBe(false)
  })
})
