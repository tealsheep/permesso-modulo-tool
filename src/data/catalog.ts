import rawModulo1 from '../../data/forms/modulo1.json'
import rawModulo2 from '../../data/forms/modulo2.json'
import rawModulo2Layout from '../../data/forms/modulo2-layout.json'
import rawBollettino from '../../data/forms/bollettino.json'
import rawProvinces from '../../data/codes/provinces.json'
import rawMotivi from '../../data/codes/motivi.json'
import rawStati from '../../data/codes/stati.json'
import rawDocumenti from '../../data/codes/documenti.json'
import rawAutorita from '../../data/codes/autorita.json'
import rawQuesture from '../../data/codes/questure.json'
import { loadData } from './load'
import { codeTableSchema, formSchema } from './schemas'
import { modulo2LayoutSchema } from './layout-schema'

/** Read-only build-time JSON imports; validate before the app can consume them. */
export const modulo1 = loadData(formSchema, rawModulo1, 'data/forms/modulo1.json')
// source/basedOn are provenance only: Modulo 2 is drawn from JSON, never loaded as a PDF.
export const modulo2 = loadData(formSchema, rawModulo2, 'data/forms/modulo2.json')
export const modulo2Layout = loadData(modulo2LayoutSchema, rawModulo2Layout, 'data/forms/modulo2-layout.json')
export const bollettino = loadData(formSchema, rawBollettino, 'data/forms/bollettino.json')
export const codeTables = {
  questure: loadData(codeTableSchema, rawQuesture, 'data/codes/questure.json'),
  provinces: loadData(codeTableSchema, rawProvinces, 'data/codes/provinces.json'),
  motivi: loadData(codeTableSchema, rawMotivi, 'data/codes/motivi.json'),
  stati: loadData(codeTableSchema, rawStati, 'data/codes/stati.json'),
  documenti: loadData(codeTableSchema, rawDocumenti, 'data/codes/documenti.json'),
  autorita: loadData(codeTableSchema, rawAutorita, 'data/codes/autorita.json'),
}
