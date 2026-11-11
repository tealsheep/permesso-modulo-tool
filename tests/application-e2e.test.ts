import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { DOMMatrix, ImageData, Path2D } from '@napi-rs/canvas'
import { PDFDocument, PDFDict, PDFName } from 'pdf-lib'
import { describe, expect, it } from 'vitest'
import { businessData } from '../src/data/business'
import { modulo1, modulo2Layout, bollettino } from '../src/data/catalog'
import { exampleApplication, demoAsOf } from '../src/demo/applications'
import { prepareApplication } from '../src/engine/prepare'
import { renderApplication } from '../src/render/application'
import type { FieldValues } from '../src/engine/application'

Object.assign(globalThis, { DOMMatrix, ImageData, Path2D })
const { getDocument } = await import('pdfjs-dist/legacy/build/pdf.mjs')
const [modulo1Pdf, bollettinoImage] = await Promise.all([readFile(modulo1.source), readFile(bollettino.source)])
const email = 'ESEMPIO_DEMO+KIT@EXAMPLE.INVALID'
const baseM1: FieldValues = {
  'M1-H01': 'MILANO', 'M1-H02': 'MI', 'M1-003': 'ESEMPIO', 'M1-004': 'FITTIZIO',
  'M1-005': 'MI', 'M1-006': 'ESEMPIA', 'M1-018': 'DEMO0000000', 'M1-020': '2026-12-31',
  'M1-023': true, 'M1-025': '12', 'M1-032': 'B', 'M1-033': 'F', 'M1-034': '1990-01-31',
  'M1-035': 'CHN', 'M1-036': 'CHN', 'M1-037': 'NO', 'M1-038': 'CITTA FITTIZIA',
  'M1-040': true, 'M1-044': 'DEMO00000', 'M1-045': '2030-01-01', 'M1-066': 'MI', 'M1-067': 'ESEMPIA',
  'M1-068': 'VIA ESEMPIO', 'M1-069': { numero: '0', lettera: 'A' }, 'M1-072': '00000',
  'M1-073': email, 'M1-075': { prefisso: '0000', numero: '000000000000' },
}
const employeeM2: FieldValues = {
  'M2-H01': 'MILANO', 'M2-H02': 'MI', 'M2-004': true, 'M2-009': true, 'M2-011': '12',
  'M2-019': 'ATTIVITA FITTIZIA', 'M2-021': true, 'M2-022': 'IMPRESA FITTIZIA ESEMPIO',
  'M2-034': true, 'M2-035': 'MI', 'M2-036': '2026-01-01',
  'M2-052': true, 'M2-053': { euro: '12345', centesimi: '67' }, 'M2-054': '2025',
  'M2-059': true, 'M2-060': true, 'M2-062': { euro: '1234', centesimi: '56' },
}
const businessM2: FieldValues = {
  'M2-H01': 'MILANO', 'M2-H02': 'MI', 'M2-005': true, 'M2-016': true, 'M2-019': 'ATTIVITA FITTIZIA',
  'M2-042': 'ATTIVITA FITTIZIA', 'M2-046': 'MI', 'M2-047': 'DEMO0000', 'M2-048': '2020-01-01',
  'M2-049': 'REGISTRO FITTIZIO', 'M2-050': '2020-01-01', 'M2-052': true,
  'M2-053': { euro: '12345', centesimi: '67' }, 'M2-054': '2025', 'M2-055': true,
  'M2-063': true,
}
const housingAndChild: FieldValues = {
  'M1-026': '01', 'M1-087': '2026-01-01', 'M1-088': true, 'M1-089': 'MI', 'M1-090': 'COMUNE FITTIZIO',
  'M1-096': 'MI', 'M1-097': 'ESEMPIA', 'M1-098': 'VIA ESEMPIO',
  'M1-109': 'MI', 'M1-110': 'ESEMPIA', 'M1-111': 'VIA ESEMPIO',
  'M1-120': '02', 'M1-123': true, 'M1-124': '01',
  'M1-137': 'ESEMPIO', 'M1-138': 'MINORE FITTIZIO', 'M1-139': 'M', 'M1-140': '2020-02-29',
  'M1-141': 'CHN', 'M1-142': 'CHN', 'M1-143': 'CITTA FITTIZIA',
}

describe('P1 fictional application -> all mapped fields -> PDF', () => {
  it.each([
    { code: '16' as const, amount: 7046, words: 'SETTANTA/46', pages: 12 },
    { code: '15' as const, amount: 8046, words: 'OTTANTA/46', pages: 12 },
    { code: '09' as const, amount: 13046, words: 'CENTOTRENTA/46', pages: 13 },
    { code: '03' as const, amount: 3046, words: 'TRENTA/46', pages: 9 },
  ])('$code produces the exact field map and a $pages-page PDF', async ({ code, amount, words, pages }) => {
    const application = exampleApplication(code), original = structuredClone(application)
    const kit = prepareApplication(application, businessData, demoAsOf)
    if (kit.kind !== 'kit') throw new Error('Expected kit')
    expect(kit.warnings).toEqual([])
    expect(kit.fees?.bollettinoCents).toBe(amount)
    const expectedM1 = { ...baseM1, 'M1-016': code, 'M1-019': code === '03' ? '09' : code === '15' ? '15' : '16',
      [code === '09' ? 'M1-008' : code === '03' ? 'M1-010' : 'M1-009']: true,
      [code === '09' || code === '03' ? 'M1-015' : 'M1-014']: true,
      ...(code !== '03' ? { 'M1-024': true } : { 'M1-017': true }),
      ...(code === '09' ? housingAndChild : {}),
    }
    expect(kit.forms[0]?.values).toEqual(expectedM1)
    expect(kit.forms.map((f) => f.definition.form)).toEqual(code === '03' ? ['modulo1'] : ['modulo1', 'modulo2'])
    if (code !== '03') expect(kit.forms[1]?.values).toEqual(code === '15' ? businessM2 : employeeM2)
    for (const id of ['M1-022', 'M1-028', 'M1-048', 'M1-056', 'M1-059']) expect(kit.forms[0]!.values).not.toHaveProperty(id)
    const expectedBill = {
      ...Object.fromEntries([1, 2, 3].flatMap((copy) => [
        [`B-importo-${copy}`, { euro: String(Math.floor(amount / 100)), centesimi: '46' }],
        [`B-lettere-${copy}`, words], [`B-eseguito-${copy}`, 'ESEMPIO FITTIZIO'],
        [`B-residente-${copy}`, 'VIA ESEMPIO 0 A'],
      ])), 'B-cap-3': '00000', 'B-localita-3': 'ESEMPIA',
    }
    expect(kit.bills[0]?.values).toEqual(expectedBill)
    expect(kit.bills).toHaveLength(code === '09' ? 2 : 1)
    if (code === '09') {
      expect(kit.bills[1]?.values).toEqual({ ...expectedBill,
        ...Object.fromEntries([1, 2, 3].flatMap((copy) => [
          [`B-importo-${copy}`, { euro: '30', centesimi: '46' }], [`B-lettere-${copy}`, 'TRENTA/46'],
        ])),
      })
    }
    const rendered = await renderApplication(kit, { modulo1Pdf, bollettinoImage }, modulo2Layout)
    const reopened = await PDFDocument.load(rendered.bytes)
    expect(reopened.getPageCount()).toBe(pages)
    if (code !== '03') for (const index of [8, 9, 10]) {
      expect(reopened.getPage(index).node.Resources()?.lookupMaybe(PDFName.of('XObject'), PDFDict)?.keys()).toEqual([])
    }
    const emailPlacements = rendered.placements.filter((p) => p.fieldId === 'M1-073')
    expect(emailPlacements.map((p) => p.text).join('')).toBe(email)
    expect(emailPlacements.every((p) => p.page === 3)).toBe(true)
    const choice = rendered.placements.filter((p) => p.fieldId === 'M1-037')
    expect(choice).toHaveLength(1)
    expect(choice[0]?.text).toBe('X')
    expect(choice[0]?.bounds.x).toBe(539.95)
    const reader = getDocument({ data: rendered.bytes.slice(), standardFontDataUrl: resolve('node_modules/pdfjs-dist/standard_fonts') + '/' })
    try {
      const doc = await reader.promise
      const content = await (await doc.getPage(3)).getTextContent()
      expect(content.items.map((item) => 'str' in item ? item.str : '').join('').replace(/\s/g, '')).toContain(email)
    } finally { await reader.destroy() }
    expect(application).toEqual(original)
  })
})
