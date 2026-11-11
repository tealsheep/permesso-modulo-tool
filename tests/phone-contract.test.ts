import { describe, expect, it } from 'vitest'
import { exampleApplication } from '../src/demo/applications'
import { applicationSchema } from '../src/data/application-schema'
import { groupCopy, questionCopy } from '../src/data/questions'
import { businessData } from '../src/data/business'
import { prepareApplication } from '../src/engine/prepare'
import { emptyStore, loadStore, parseBackup } from '../src/storage/store'
import { questionErrors, setAnswer, stepsFor } from '../src/ui/questionnaire'

describe('phone and contract questionnaire', () => {
  it('reads paper/options, moves hired-this-year, and retains group copy', () => {
    const work = stepsFor(exampleApplication('16')).find((step) => step.id === 'work')!
    expect(work.sections.find((section) => section.title === '工作情况')!.fields.map((field) => field.path)).not.toContain('work.hiredThisYear')
    const hired = work.sections.find((section) => section.title === '收入与报税')!.fields[0]!
    expect(hired.path).toBe('work.hiredThisYear')
    expect(hired.paper).toBe(questionCopy(hired.path)!.paper)
    expect(groupCopy('address.phoneMobile')!.parts).toEqual(['prefisso', 'numero'])
    const status = work.sections.find((section) => section.title === '居留合同（如有）')!.fields[0]!
    expect(status.options).toEqual(questionCopy(status.path)!.options)
    expect(status.required).toBe(true)
  })
  it.each(['none', 'same-employer', 'changed'] as const)('%s controls fields and M2-034–036', (status) => {
    const old = exampleApplication('16'); old.contrattoSoggiorno!.mode = 'inviato'
    const data = setAnswer(old, 'work.contrattoSoggiornoStatus', status)
    const section = stepsFor(data).find((step) => step.id === 'work')!.sections.find((section) => section.title === '居留合同（如有）')!
    expect(section.fields.map((field) => field.path)).toEqual(['work.contrattoSoggiornoStatus', ...(status === 'same-employer' ? ['contrattoSoggiorno.province', 'contrattoSoggiorno.date'] : [])])
    const kit = prepareApplication(data, businessData, '2026-11-06')
    if (kit.kind !== 'kit') throw new Error('expected kit')
    const values = kit.forms.find((form) => form.definition.form === 'modulo2')!.values
    for (const id of ['M2-034', 'M2-035', 'M2-036']) expect(values[id] !== undefined).toBe(status === 'same-employer')
    expect(values['M2-037']).toBeUndefined()
    expect(kit.materials.some((item) => /raccomandata|ricevuta.*contratto/i.test(item.nameIt))).toBe(false)
  })
  it('shows no contract section for self employment and requires an explicit answer for employees', () => {
    expect(stepsFor(exampleApplication('15')).flatMap((step) => step.sections).some((section) => section.title === '居留合同（如有）')).toBe(false)
    const a = exampleApplication('16'); delete a.work!.contrattoSoggiornoStatus
    const fields = stepsFor(a).flatMap((step) => step.sections.flatMap((section) => section.fields))
    expect(questionErrors(a, fields, '2026-11-06').some((error) => error.path === 'work.contrattoSoggiornoStatus')).toBe(true)
  })
  it('migrates only the retired field for stored drafts, family records, imports and engine inputs', () => {
    const data = exampleApplication('16')
    const legacy = { ...data, work: { ...data.work, contractChangedSinceEntry: true } }
    const before = structuredClone(legacy)
    expect(applicationSchema.parse(legacy).work).not.toHaveProperty('contractChangedSinceEntry')
    expect(applicationSchema.safeParse({ ...legacy, work: { ...legacy.work, typo: true } }).success).toBe(false)
    const store = { ...emptyStore(), drafts: [{ id: 'legacy-demo', data: legacy, step: 0, completed: [], updatedAt: '2026-11-06', checks: [] }], members: [{ id: 'legacy-member', role: 'applicant', data: legacy }] }
    expect(parseBackup(JSON.stringify(store)).members[0]!.data.work).not.toHaveProperty('contractChangedSinceEntry')
    expect(loadStore({ getItem: () => JSON.stringify(store) }).error).toBeUndefined()
    const kit = prepareApplication(legacy, businessData, '2026-11-06')
    if (kit.kind === 'kit') expect(kit.application.work).not.toHaveProperty('contractChangedSinceEntry')
    expect(legacy).toEqual(before)
  })
})
