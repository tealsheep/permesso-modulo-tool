import rawTypes from '../../data/application-types.json'
import rawFees from '../../data/fees.json'
import rawM1 from '../../data/mapping/modulo1.json'
import rawM2 from '../../data/mapping/modulo2.json'
import rawB from '../../data/mapping/bollettino.json'
import { modulo1, modulo2, bollettino } from './catalog'
import { loadData } from './load'
import { applicationTypesSchema, feesSchema, materialsSchema } from './schemas'
import { mappingSchema } from './mapping-schema'
import type { EngineData } from '../engine/prepare'

const applicationTypes = loadData(applicationTypesSchema, rawTypes, 'data/application-types.json')
// Eager glob in Vite/Vitest; the CLI's Node/tsx imports the same catalog paths.
const rawMaterials: Record<string, unknown> = import.meta.env
  ? import.meta.glob('../../data/materials/*.json', { eager: true, import: 'default' })
  : Object.fromEntries(await Promise.all(applicationTypes.types.map(async (type) => {
    const path = `../../${type.materials}`
    return [path, (await import(/* @vite-ignore */ path, { with: { type: 'json' } })).default]
  })))
const materials = Object.fromEntries(applicationTypes.types.map((type) => {
  const raw = rawMaterials[`../../${type.materials}`]
  const file = loadData(materialsSchema, raw, type.materials)
  if (file.applicationCode !== type.code) throw new Error(`${type.materials}: 材料类型不匹配`)
  return [type.code, file]
}))
export const businessData: EngineData = {
  applicationTypes,
  fees: loadData(feesSchema, rawFees, 'data/fees.json'),
  materials,
  forms: { modulo1, modulo2, bollettino },
  mappings: {
    modulo1: loadData(mappingSchema, rawM1, 'data/mapping/modulo1.json'),
    modulo2: loadData(mappingSchema, rawM2, 'data/mapping/modulo2.json'),
    bollettino: loadData(mappingSchema, rawB, 'data/mapping/bollettino.json'),
  },
}
for (const [name, mapping] of Object.entries(businessData.mappings)) {
  const form = businessData.forms[name as keyof typeof businessData.forms]
  if (mapping.form !== form.form) throw new Error(`${name}: 填写规则表格名不符`)
  for (const rule of mapping.rules) {
    const field = form.fields.find((field) => field.id === rule.field)
    if (!field) throw new Error(`${name}: 填写规则引用未知字段 ${rule.field}`)
    if ('parts' in rule.value && (field.kind !== 'parts' || Object.keys(rule.value.parts).some((name) => !field.parts.some((p) => p.name === name)))) {
      throw new Error(`${rule.field}: 填写规则分组不匹配`)
    }
  }
}
