import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Popover from '@radix-ui/react-popover'
import { matchingOptions } from './search-options'
import type { SelectOption } from './search-options'

const mobileQuery = '(max-width: 719px)'
function subscribe(callback: () => void) {
  const query = matchMedia(mobileQuery); query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}
export function SearchSelect({ id, label, options, value, common, required, invalid, describedBy, change, blur }: {
  id: string; label: string; options: SelectOption[]; value: string; common: string[]; required?: boolean; invalid: boolean; describedBy?: string; change: (value: string | null) => void; blur: () => void
}) {
  const mobile = useSyncExternalStore(subscribe, () => matchMedia(mobileQuery).matches, () => false)
  const [open, setOpen] = useState(false), [query, setQuery] = useState(''), [active, setActive] = useState(0)
  const search = useRef<HTMLInputElement>(null), trigger = useRef<HTMLButtonElement>(null)
  const matches = matchingOptions(options, query, common)
  const selected = options.find((option) => option.value === value)
  const listId = `${id}-list`, activeId = matches.length ? `${listId}-${active}` : undefined
  useEffect(() => { if (open && activeId) document.getElementById(activeId)?.scrollIntoView({ block: 'nearest' }) }, [open, activeId])
  function openChange(next: boolean) { setOpen(next); if (next) { setQuery(''); setActive(0) } }
  function choose(next: string | null) { change(next); setOpen(false) }
  const triggerButton = <button ref={trigger} type="button" className="search-select" id={id} aria-labelledby={`${id}-label ${id}-value`} aria-describedby={describedBy} aria-invalid={invalid} onBlur={() => { if (!open) blur() }} onKeyDown={(event) => {
    if (event.nativeEvent.isComposing || event.keyCode === 229) return
    if (!event.ctrlKey && !event.metaKey && !event.altKey && /^[\p{L}\p{N}]$/u.test(event.key)) {
      event.preventDefault(); setQuery(event.key); setActive(0); setOpen(true)
    }
  }}>
    <span id={`${id}-value`} className={selected ? undefined : 'muted'}>{selected?.label ?? (value || '请选择')}</span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6" /><path d="m15 15 6 6" /></svg>
  </button>
  const controls = <>
    <label className="sr-only" htmlFor={`${id}-search`}>搜索{label}</label>
    <input ref={search} id={`${id}-search`} className="search-input" role="combobox" aria-expanded="true" aria-controls={listId} aria-activedescendant={activeId} aria-autocomplete="list" autoComplete="off" placeholder={options.some((option) => /\p{Script=Han}/u.test(option.label)) ? '搜索中文、意大利文或代码' : '搜索意大利文名称或缩写'} value={query} onChange={(event) => { setQuery(event.target.value); setActive(0) }} onKeyDown={(event) => {
      if (event.nativeEvent.isComposing || event.keyCode === 229) return
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); setActive((index) => matches.length ? (index + (event.key === 'ArrowDown' ? 1 : -1) + matches.length) % matches.length : 0) }
      if (event.key === 'Enter') { event.preventDefault(); if (matches[active]) choose(matches[active]!.value) }
    }} />
    <div role="listbox" id={listId} aria-label={label} className="search-results">{matches.map((option, index) => <div key={option.value}>
      {!query && common.includes(option.value) && index === 0 && <p className="hint option-group">常用</p>}
      {!query && index > 0 && common.includes(matches[index - 1]!.value) && !common.includes(option.value) && <p className="hint option-group">全部</p>}
      <button type="button" role="option" tabIndex={-1} id={`${listId}-${index}`} aria-selected={option.value === value} data-active={active === index} onPointerMove={() => setActive(index)} onClick={() => choose(option.value)}><span>{option.label.replace(/\s*\([^()]*\)$/, '')}</span><small>{option.code ?? option.value}</small>{option.value === value && <span aria-hidden="true">✓</span>}</button>
    </div>)}</div>
    {!matches.length && <p role="status" className="hint">没有找到，可以试试意大利文名或代码</p>}
    {!required && <button type="button" className="text-action" onClick={() => choose(null)}>清空选择</button>}
  </>
  const focusSearch = (event: Event) => { event.preventDefault(); search.current?.focus() }
  const restoreFocus = (event: Event) => { event.preventDefault(); trigger.current?.focus() }
  return mobile ? <Dialog.Root open={open} onOpenChange={openChange}><Dialog.Trigger asChild>{triggerButton}</Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="modal-overlay" /><Dialog.Content className="modal-content bottom-sheet search-sheet" aria-describedby={undefined} onOpenAutoFocus={focusSearch} onCloseAutoFocus={restoreFocus}>
    <div className="dialog-head"><Dialog.Title>{label}</Dialog.Title><Dialog.Close className="circle secondary" aria-label="关闭">×</Dialog.Close></div>{controls}
  </Dialog.Content></Dialog.Portal></Dialog.Root> : <Popover.Root open={open} onOpenChange={openChange}><Popover.Trigger asChild>{triggerButton}</Popover.Trigger><Popover.Portal><Popover.Content className="search-popover" sideOffset={8} align="start" collisionPadding={16} aria-label={label} onOpenAutoFocus={focusSearch} onCloseAutoFocus={restoreFocus}>
    <div className="dialog-head"><h2>{label}</h2><Popover.Close className="circle secondary" aria-label="关闭">×</Popover.Close></div>{controls}
  </Popover.Content></Popover.Portal></Popover.Root>
}
