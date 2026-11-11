import { Fragment, useEffect, useRef, useState } from 'react'
import { dateDraftError, dateParts, dateValue, pastedDate } from './date-model'
import type { DateParts } from './date-model'
import { useDateDrafts } from './date-drafts'
import { today } from './format'
import type { Question } from './questionnaire'
import { FieldStatus } from './FieldStatus'

export function DateInput({ id, field, value, error, change, blur }: {
  id: string; field: Question; value: string; error?: string; change: (value: string | null) => void; blur: () => void
}) {
  const [draft, setDraft] = useState({ source: value, parts: dateParts(value) })
  const [touched, setTouched] = useState(false)
  const inputs = useRef<(HTMLInputElement | null)[]>([])
  const registry = useDateDrafts()
  // Synchronize external replacement (e.g. copy family data), not partial keystrokes.
  if (draft.source !== value) setDraft({ source: value, parts: dateParts(value) })
  const localError = dateDraftError(draft.parts, !!field.required, field.path.endsWith('birthDate'), today())
  const message = touched && localError ? localError : error
  useEffect(() => registry.register(field.path, () => localError ? { path: field.path, label: field.label, message: localError } : null), [registry, field.path, field.label, localError])
  const describedBy = [`${id}-paper`, field.hint ? `${id}-hint` : '', message ? `${id}-error` : ''].filter(Boolean).join(' ')
  function apply(parts: DateParts) {
    const iso = dateValue(parts)
    const empty = parts.every((part) => !part)
    setDraft({ source: iso ?? (empty ? '' : value), parts })
    if (iso || empty) change(iso)
  }
  return <fieldset className="date-field" id={id} tabIndex={-1} aria-describedby={describedBy} aria-invalid={!!message} onBlur={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) { setTouched(true); blur() }
  }}>
    <legend>{field.label}<FieldStatus required={field.required} /></legend>
    <div className="paper-label" id={`${id}-paper`}>{field.paper}</div>
    <div className="date-parts">{(['日', '月', '年'] as const).map((label, index) => <Fragment key={label}>
      {index > 0 && <span className="date-separator" aria-hidden="true">/</span>}
      <label>
      <input ref={(element) => { inputs.current[index] = element }} aria-label={label} aria-describedby={describedBy} aria-invalid={!!message} inputMode="numeric" autoComplete="off" maxLength={index === 2 ? 4 : 2} value={draft.parts[index]} onChange={(event) => {
        const parts: DateParts = [...draft.parts]; parts[index] = event.target.value.replace(/\D/g, ''); apply(parts)
        if (index < 2 && parts[index]!.length === 2 && (event.nativeEvent as InputEvent).inputType !== 'deleteContentBackward') { inputs.current[index + 1]?.focus(); inputs.current[index + 1]?.select() }
      }} onKeyDown={(event) => { if (event.key === 'Backspace' && !draft.parts[index] && index > 0) { event.preventDefault(); inputs.current[index - 1]?.focus() } }} onPaste={(event) => {
        const parts = pastedDate(event.clipboardData.getData('text'))
        if (parts) { event.preventDefault(); apply(parts); inputs.current[2]?.focus() }
      }} /><span>{label}</span>
      </label></Fragment>)}</div>
    {field.hint && <p className="hint" id={`${id}-hint`}>{field.hint}</p>}
    {message && <div className="field-error" id={`${id}-error`}><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v6m0 4h.01" /></svg><span>{message}</span></div>}
  </fieldset>
}
