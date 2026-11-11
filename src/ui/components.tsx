import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import type { Application } from '../data/application-schema'
import { readPath } from '../engine/conditions'
import { validateCodiceFiscale } from '../engine/codice-fiscale'
import type { FormError, Question, Section } from './questionnaire'
import { questionId } from './questionnaire'
import { sectionCopy } from '../data/questions'
import { DateInput } from './DateInput'
import { SearchSelect } from './SearchSelect'
import { usedProvinces } from './search-options'
import { PhoneGroup, phoneGroupFields } from './PhoneGroup'
import { groupCopy } from '../data/questions'
import { FieldStatus } from './FieldStatus'
import { today } from './format'

/** 12.5 → 1250; 0.005 stays fractional so validation rejects it instead of rounding to 1 cent. */
const toCents = (text: string) => { const cents = Number(text) * 100; return Math.abs(cents - Math.round(cents)) < 1e-6 ? Math.round(cents) : cents }

const drawings: Record<string, ReactNode> = {
  document: <><path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6M9 16h6" /></>,
  home: <><path d="m3 11 9-8 9 8M5 10v11h14V10M10 21v-7h4v7" /></>,
  person: <><circle cx="12" cy="7" r="4" /><path d="M5 21v-3a7 7 0 0 1 14 0v3z" /></>,
  people: <><circle cx="9" cy="7" r="3" /><path d="M2 21v-3a7 7 0 0 1 14 0v3M17 4a3 3 0 0 1 0 6M18 14a5 5 0 0 1 4 5v2" /></>,
  pin: <><path d="M19 10c0 5-7 12-7 12S5 15 5 10a7 7 0 0 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>,
  work: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V3h8v4M3 12c5 4 13 4 18 0M10 13h4" /></>,
  card: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 14h4M7 17h7" /></>,
  phone: <path d="m7 3-4 2c0 9 7 16 16 16l2-4-5-3-2 2c-3-1-5-3-6-6l2-2z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  arrow: <path d="m9 5 7 7-7 7" />,
  back: <path d="m15 5-7 7 7 7" />,
  plus: <path d="M12 4v16M4 12h16" />,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 11h18M7 15h3" /></>,
  search: <><circle cx="10" cy="10" r="6" /><path d="m15 15 6 6" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9 8a3 3 0 0 1 6 1c0 2-3 2-3 5M12 17h.01" /></>,
  download: <><path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4" /></>,
  layers: <><path d="m3 7 9-5 9 5-9 5zM3 12l9 5 9-5M3 17l9 5 9-5" /></>,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  warning: <><circle cx="12" cy="12" r="9" /><path d="M12 7v6m0 4h.01" /></>,
}
export function Icon({ name, tile = false }: { name: string; tile?: boolean }) {
  return <span className={tile ? 'icon-tile' : 'icon'} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{drawings[name] ?? drawings.document}</svg></span>
}
export function Ring({ percent }: { percent: number }) {
  return <span className="ring" aria-hidden="true"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="27" /><circle cx="32" cy="32" r="27" className="ring-value" strokeDasharray={`${percent * 1.696} 169.6`} /></svg><span>{percent}%</span></span>
}
export function Header({ title, back, action }: { title: string; back: () => void; action?: ReactNode }) {
  return <header className="page-header"><button className="circle secondary" aria-label="返回" onClick={back}><Icon name="back" /></button><h1>{title}</h1><div className="header-action">{action}</div></header>
}
export function Modal({ title, children, close, sheet = false }: { title: string; children: ReactNode; close: () => void; sheet?: boolean }) {
  const [returnFocus] = useState(() => typeof document === 'undefined' ? null : document.activeElement as HTMLElement | null)
  const swipe = useRef<{ x: number; y: number } | null>(null)
  return <Dialog.Root open onOpenChange={(open) => { if (!open) close() }}><Dialog.Portal><Dialog.Overlay className="modal-overlay" /><Dialog.Content className={`modal-content${sheet ? ' bottom-sheet help-sheet' : ''}`} aria-describedby={undefined} onCloseAutoFocus={(event) => { event.preventDefault(); if (returnFocus?.isConnected) returnFocus.focus() }}>
    <div className="dialog-head" onPointerDown={(event) => {
      if (!sheet || !matchMedia('(max-width: 719px)').matches || (event.target as HTMLElement).closest('button')) return
      swipe.current = { x: event.clientX, y: event.clientY }; event.currentTarget.setPointerCapture(event.pointerId)
    }} onPointerUp={(event) => {
      const start = swipe.current; swipe.current = null
      if (start && event.clientY - start.y > 80 && Math.abs(event.clientX - start.x) < 60) close()
    }} onPointerCancel={() => { swipe.current = null }}><Dialog.Title>{title}</Dialog.Title><Dialog.Close className="circle secondary" aria-label="关闭"><Icon name="close" /></Dialog.Close></div>{children}</Dialog.Content></Dialog.Portal></Dialog.Root>
}
export function Field({ field: f, data, error, update, blur }: { field: Question; data: Application; error?: FormError; update: (path: string, value: unknown) => void; blur: (path: string) => void }) {
  const [editingType, setEditingType] = useState(false)
  const id = questionId(f.path), value = readPath(data, f.path)
  const display = f.path === 'mailToDifferent' ? String(data.mailToDifferent ?? !!data.mailTo) : value == null ? '' : f.type === 'money' ? String(Number(value) / 100) : String(value)
  const description = [f.hint ? `${id}-hint` : '', error ? `${id}-error` : '', f.options?.find((option) => option.value === display)?.hint ? `${id}-option-hint` : ''].filter(Boolean).join(' ') || undefined
  const props = { id, required: f.required, 'aria-invalid': !!error, 'aria-describedby': description, onBlur: () => blur(f.path) }
  const selectedType = f.path === 'currentPermit.typeCode' && !editingType && f.options?.find((o) => o.value === display)
  // Rinnovo after 60 days past expiry: the official pages send people to the Questura instead of the postal kit.
  const overdue = f.path === 'currentPermit.validUntil' && data.application.operation === 'rinnovo' && /^\d{4}-\d{2}-\d{2}$/.test(display) && (Date.parse(today()) - Date.parse(display)) / 864e5 > 60
  if (f.type === 'date') return <div className="field"><DateInput id={id} field={f} value={display} error={error?.message} change={(next) => update(f.path, next)} blur={props.onBlur} />{overdue && <p className="notice" role="status">这张居留已过期超过 60 天。官方说明这种情况一般不能再用邮局 kit 续签，请先联系 Questura 确认怎么办。</p>}</div>
  const searchOptions = f.options && (f.options.length > 12 || (f.options.length > 6 && /document\.(otherCode|issuerCode)$/.test(f.path)))
  const common = /birthCountry$|citizenship$/.test(f.path) ? ['CHN', 'ITA'] : /province$/i.test(f.path) ? usedProvinces(data) : []
  const choices = f.options ?? (f.type === 'boolean' ? [{ value: 'true', label: '是' }, { value: 'false', label: '否' }] : undefined)
  const shortChoice = (f.type === 'boolean' || f.type === 'select') && choices && choices.length <= 6
  return <div className={`field${error ? ' has-error' : ''}`}>
    <label id={`${id}-label`} htmlFor={f.type === 'multi' ? undefined : id}>{f.label}<FieldStatus required={f.required} /></label><div className="paper-label">{f.paper}</div>
    {selectedType ? <div className="selected-type"><span>{selectedType.label}</span><button id={id} className="secondary" aria-label={`修改${f.label}`} aria-describedby={description} onClick={() => { setEditingType(true); requestAnimationFrame(() => document.getElementById(id)?.focus()) }}>修改</button></div> : f.type === 'multi' ? <div className="choice-options" id={id} role="group" tabIndex={-1} aria-labelledby={`${id}-label`} aria-invalid={!!error} aria-describedby={props['aria-describedby']}>{f.options?.map((o) => <label key={o.value}><input type="checkbox" checked={Array.isArray(value) && value.includes(o.value)} onChange={(e) => { const list = Array.isArray(value) ? value : []; update(f.path, e.target.checked ? [...list, o.value] : list.filter((v) => v !== o.value)) }} onBlur={props.onBlur} /><span>{o.label}</span></label>)}</div> :
      shortChoice ? <div className="choice-options" role="radiogroup" id={id} tabIndex={-1} aria-labelledby={`${id}-label`} aria-required={f.required} aria-invalid={!!error} aria-describedby={description}>{choices.map((option) => <label key={option.value}><input type="radio" name={id} value={option.value} checked={display === option.value} onChange={() => update(f.path, f.type === 'boolean' ? option.value === 'true' : option.value)} onBlur={props.onBlur} /><span>{option.label}</span></label>)}</div> :
      f.type === 'select' && searchOptions ? <SearchSelect id={id} label={f.label} options={f.options!} value={display} common={common} required={f.required} invalid={!!error} describedBy={description} change={(next) => update(f.path, next)} blur={props.onBlur} /> :
      f.type === 'select' || f.type === 'boolean' ? <select {...props} value={display} onChange={(e) => update(f.path, e.target.value === '' ? null : f.type === 'boolean' ? e.target.value === 'true' : e.target.value)}><option value="">请选择</option>{(f.type === 'boolean' ? [{ value: 'true', label: '是' }, { value: 'false', label: '否' }] : f.options)?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select> :
        <input {...props} type={f.type === 'money' || f.type === 'number' ? 'number' : f.type} value={display} min={f.type === 'number' || f.type === 'money' ? 0 : undefined} step={f.type === 'money' ? '.01' : f.type === 'number' ? 1 : undefined} autoComplete="off" spellCheck={false} onChange={(e) => update(f.path, (f.type === 'number' || f.type === 'money') ? e.target.value === '' ? null : f.type === 'money' ? toCents(e.target.value) : Number(e.target.value) : e.target.value)} />}
    {f.hint && <p className="hint" id={`${id}-hint`}>{f.hint}</p>}
    {f.path === 'questura.city' && data.questura?.province && <p className="hint">表头省份缩写：{f.options?.find((option) => option.value === display)?.code ?? data.questura.province}</p>}
    {f.path === 'questura.city' && display && !f.options?.some((option) => option.value === display) && <p className="field-error">原填写值已保留，请重新选择对应的 Questura。</p>}
    {choices?.find((option) => option.value === display)?.hint && <p className="hint" id={`${id}-option-hint`}>{choices.find((option) => option.value === display)!.hint}</p>}
    {error && <div className="field-error" id={`${id}-error`}><Icon name="warning" /><span>{error.message}</span></div>}
  </div>
}
export function SectionCard({ section, data, errors, update, blur, help }: { section: Section; data: Application; errors: FormError[]; update: (path: string, value: unknown) => void; blur: (path: string) => void; help: (s: Section) => void }) {
  const hasHelp = (section.help ?? sectionCopy(section.title)) || section.fields.some((f) => f.help === undefined ? f.paper || f.hint : f.help)
  return <section className="card section-card"><div className="section-heading"><Icon name={section.icon} tile /><h2>{section.title}</h2>{hasHelp && <button className="circle help" aria-label={`${section.title}填写说明`} onClick={() => help(section)}>?</button>}</div>
    <div className="fields">{phoneGroupFields(section.fields).map((item) => item.fields.length > 1 ? <PhoneGroup key={item.path} path={item.path} fields={item.fields} data={data} errors={errors} update={update} blur={blur} /> : <Field key={item.path} field={item.fields[0]!} data={data} update={update} blur={blur} error={errors.find((e) => e.path === item.path)} />)}</div></section>
}
export function SectionHelpContent({ section }: { section: Section }) {
  const text = section.help ?? sectionCopy(section.title)
  return <>{text && <p className="help-copy">{text}</p>}{phoneGroupFields(section.fields).map((item) => {
    const group = item.fields.length > 1 ? groupCopy(item.path) : undefined
    return group ? { ...item.fields[0]!, path: item.path, label: group.label, help: group.help } : item.fields[0]!
  }).filter((f) => f.help !== '').map((f) => <div className="help-item" key={f.path}>
    <strong>{f.label}</strong>{f.help === undefined ? <><p className="paper-label">{f.paper}</p>{f.hint && <p>{f.hint}</p>}</> : <p className="help-copy">{f.help}</p>}
  </div>)}</>
}
export function FiscalCheck({ data }: { data: Application }) {
  const p = data.person
  if (!p?.codiceFiscale) return null
  const complete = p.surname && p.givenNames && p.birthDate && p.sex
  const result = validateCodiceFiscale(p.codiceFiscale, complete ? { surname: p.surname!, givenName: p.givenNames!, birthDate: p.birthDate!, sex: p.sex! } : undefined)
  return <div className={result.consistent === true ? 'success notice' : 'notice'}>{result.consistent === true && <Icon name="check" />}{result.consistent === true ? '已核对：与你的姓名、生日、性别一致（不验证官方签发）' : result.issues.length ? result.issues.map((v) => v.message).join(' ') : '格式和校验位通过；填写完整姓名、生日、性别后可继续核对'}</div>
}
