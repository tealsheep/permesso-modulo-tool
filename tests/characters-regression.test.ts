import { readFile } from 'node:fs/promises'
import { PDFDocument } from 'pdf-lib'
import { describe, expect, it } from 'vitest'
import { businessData } from '../src/data/business'
import { bollettino, modulo1, modulo2Layout } from '../src/data/catalog'
import { exampleApplication, demoAsOf } from '../src/demo/applications'
import { prepareApplication } from '../src/engine/prepare'
import { renderApplication } from '../src/render/application'
import { ApplicationInputError } from '../src/engine/input-errors'
import { validateApplicationDraft } from '../src/ui/validation'
import { allowedText } from '../src/engine/characters'

const [modulo1Pdf, bollettinoImage] = await Promise.all([readFile(modulo1.source), readFile(bollettino.source)])
describe('Claude character review regressions', () => {
  it.each([
    { input: 'company', field: 'M2-022', expected: 'ESEMPIO & FIGLI SRL' },
    { input: 'street', field: 'M1-068', expected: 'VIA 1° MAGGIO' },
    { input: 'surname', field: 'M1-003', expected: 'D ESEMPIO' },
  ])('$input survives application -> full PDF without losing its supported characters', async ({ input, field, expected }) => {
    const application = exampleApplication('16')
    if (input === 'company') application.employer!.name = 'ESEMPIO & FIGLI SRL'
    if (input === 'street') application.address!.street = 'VIA 1° MAGGIO'
    if (input === 'surname') application.person!.surname = "D'ESEMPIO"
    const kit = prepareApplication(application, businessData, demoAsOf)
    if (kit.kind !== 'kit') throw new Error('kit expected')
    const result = await renderApplication(kit, { modulo1Pdf, bollettinoImage }, modulo2Layout)
    expect((await PDFDocument.load(result.bytes)).getPageCount()).toBe(12)
    expect(result.placements.filter((p) => p.fieldId === field).map((p) => p.text).join('')).toBe(expected)
    expect(kit.warnings).toEqual([])
  })
  it('blocks Chinese birth city before PDF generation and identifies the field to correct', () => {
    const application = exampleApplication('16')
    application.person!.birthCity = '温州'
    expect(() => prepareApplication(application, businessData, demoAsOf)).toThrow(/M1-038|出生城市/)
    try { prepareApplication(application, businessData, demoAsOf) }
    catch (error) {
      expect(error).toBeInstanceOf(ApplicationInputError)
      expect((error as Error).message).not.toContain('M1-038')
      expect((error as Error).message).not.toContain('温 州')
      expect((error as Error).message).toContain('第 38 栏')
      expect((error as ApplicationInputError).issues).toMatchObject([
        { field: 'M1-038', paths: ['person.birthCity'], characters: ['温', '州'] },
      ])
    }
    const questionnaire = validateApplicationDraft(application, businessData, demoAsOf)
    expect(questionnaire).toMatchObject({ kind: 'invalid', issues: [{ field: 'M1-038', paths: ['person.birthCity'] }] })
    expect(application.person!.birthCity).toBe('温州')
    application.person!.birthCity = 'WENZHOU'
    expect(validateApplicationDraft(application, businessData, demoAsOf).kind).toBe('ready')
  })
  it('renders every requested common symbol through the actual Courier font', async () => {
    const application = exampleApplication('16')
    application.employer!.name = 'ESEMPIO & FIGLI (SRL) N° 1: A; B+ "C"'
    const kit = prepareApplication(application, businessData, demoAsOf)
    if (kit.kind !== 'kit') throw new Error('kit expected')
    const result = await renderApplication(kit, { modulo1Pdf, bollettinoImage }, modulo2Layout)
    expect(result.warnings).toEqual([])
    expect(result.placements.filter((p) => p.fieldId === 'M2-022').map((p) => p.text).join('')).toBe(application.employer!.name)
    expect(allowedText('A@B_C', 'M1-003', 'boxes')).toBe(false)
    expect(allowedText('A@B_C', 'M1-073', 'boxes')).toBe(true)
    expect(allowedText('&', 'M2-022', 'boxes', 'A-Z0-9')).toBe(false)
  })
  it('does not hide an unsupported character beyond a truncation boundary', () => {
    const application = exampleApplication('16')
    application.person!.surname = 'A'.repeat(60) + '温'
    const result = validateApplicationDraft(application, businessData, demoAsOf)
    expect(result.kind).toBe('invalid')
    if (result.kind === 'invalid') expect(result.issues).toEqual(expect.arrayContaining([expect.objectContaining({ field: 'M1-003' })]))
  })
  it('leaves only unsupported cells blank and reports them even if a caller bypasses preflight', async () => {
    const kit = prepareApplication(exampleApplication('16'), businessData, demoAsOf)
    if (kit.kind !== 'kit') throw new Error('kit expected')
    kit.forms[0]!.values = { ...kit.forms[0]!.values, 'M1-038': 'A温B州C', 'M1-069': { numero: '0', lettera: 'A温B' } }
    kit.bills[0]!.values = { ...kit.bills[0]!.values, 'B-eseguito-1': 'A温B' }
    const result = await renderApplication(kit, { modulo1Pdf, bollettinoImage }, modulo2Layout)
    expect((await PDFDocument.load(result.bytes)).getPageCount()).toBe(12)
    const city = result.placements.filter((p) => p.fieldId === 'M1-038')
    expect(city.map((p) => p.text).join('')).toBe('ABC')
    expect(city[1]!.bounds.x - city[0]!.bounds.x).toBeCloseTo(2 * 17.004, 1)
    expect(result.warnings).toMatchObject([
      { field: 'M1-038', page: 2, characters: ['温', '州'] },
      { field: 'M1-069', page: 3, part: 'lettera', characters: ['温'] },
      { field: 'B-eseguito-1', page: 12, characters: ['温'] },
    ])
    expect(result.placements.find((p) => p.fieldId === 'B-eseguito-1')?.text).toBe('A B')
    expect(result.placements.some((p) => p.fieldId === 'M2-022')).toBe(true)
  })
})
