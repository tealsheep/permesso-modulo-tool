import { useRef } from 'react'
import type { Application } from '../data/application-schema'
import { readPath } from '../engine/conditions'
import { groupCopy } from '../data/questions'
import type { FormError, Question } from './questionnaire'
import { questionId } from './questionnaire'
import { FieldStatus } from './FieldStatus'

export function phoneGroupFields(fields: Question[]) {
  return fields.flatMap((field) => {
    const path = field.path.slice(0, field.path.lastIndexOf('.'))
    const group = groupCopy(path)
    if (!group || !group.parts.every((part) => fields.some((item) => item.path === `${path}.${part}`))) return [{ path: field.path, fields: [field] }]
    return field.path === `${path}.${group.parts[0]}` ? [{ path, fields: group.parts.map((part) => fields.find((item) => item.path === `${path}.${part}`)!) }] : []
  })
}
export function PhoneGroup({ path, fields, data, errors, update, blur }: { path: string; fields: Question[]; data: Application; errors: FormError[]; update: (path: string, value: unknown) => void; blur: (path: string) => void }) {
  const group = groupCopy(path)!, number = useRef<HTMLInputElement>(null)
  const mobile = path === 'address.phoneMobile'
  const value = readPath(data, path) as { prefisso?: string; numero?: string } | null | undefined
  const groupId = questionId(path)
  function change(part: string, text: string) { update(path, { ...value, [part]: text }) }
  return <fieldset className="field date-field phone-field" aria-describedby={`${groupId}-hint`}><legend>{group.label.replace(/（选填）|（如有）/g, '')}<FieldStatus required={fields.some((field) => field.required)} /></legend>
    <div className="paper-label">{fields[0]!.paper}</div><div className="phone-parts">{fields.map((field, index) => {
      const id = questionId(field.path), error = errors.find((item) => item.path === field.path)
      return <div key={field.path}><input id={id} ref={index === 1 ? number : undefined} type="tel" inputMode="tel" autoComplete="off" aria-label={`${mobile ? '手机号' : '固定电话'}${index === 0 ? mobile ? '前缀' : '区号' : '号码'}`} placeholder={field.label} value={String(readPath(data, field.path) ?? '')} aria-invalid={!!error} aria-describedby={[`${groupId}-hint`, error ? `${id}-error` : ''].filter(Boolean).join(' ')} onChange={(event) => {
        change(group.parts[index]!, event.target.value)
        if (mobile && index === 0 && /^\d{3}$/.test(event.target.value)) number.current?.focus()
      }} onBlur={() => blur(field.path)} onPaste={(event) => {
        const text = event.clipboardData.getData('text').trim().replace(/\s/g, '')
        if (mobile && /^\d{10}$/.test(text)) { event.preventDefault(); update(path, { prefisso: text.slice(0, 3), numero: text.slice(3) }); number.current?.focus() }
      }} />{error && <p className="field-error" id={`${id}-error`}>{error.message}</p>}</div>
    })}</div>{group.hint && <p className="hint" id={`${groupId}-hint`}>{group.hint}</p>}
  </fieldset>
}
