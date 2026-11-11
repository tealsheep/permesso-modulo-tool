import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import type { ReactNode } from 'react'
import type { Application } from '../data/application-schema'
import type { Draft } from '../storage/store'
import { paperTarget, stepsFor } from './questionnaire'
import { displayDate, nameOf, today } from './format'
import { prepareApplication } from '../engine/prepare'
import { businessData } from '../data/business'
import { generateReference } from './reference'
import { renderPage } from '../render/preview'

const query = '(min-width:1024px)'
function subscribe(callback: () => void) { const media = matchMedia(query); media.addEventListener('change', callback); return () => media.removeEventListener('change', callback) }
export function useDesktop() { return useSyncExternalStore(subscribe, () => matchMedia(query).matches, () => false) }
export function DesktopFrame({ screen, home, my, children }: { screen: string; home: () => void; my: () => void; children: ReactNode }) {
  return <aside className="desktop-left"><strong>居留填表助手</strong><nav aria-label="电脑端导航"><button onClick={home} aria-current={screen === 'home' ? 'page' : undefined}>我的申请</button><button onClick={my} aria-current={screen === 'my' ? 'page' : undefined}>我的</button></nav>{children}<p className="hint">资料只保存在这台电脑的浏览器里</p></aside>
}
export function RelatedPeople({ draft, pick, remove }: { draft: Draft; pick: (mode: import('./PersonPicker').PickerMode) => void; remove: (kind: 'spouse' | 'child', index?: number) => void }) {
  const data = draft.data, profile = businessData.applicationTypes.types.find((type) => type.code === data.application.code)?.profile
  return <div className="card stack"><h2>家属资料与关联申请</h2><p>只选择这份申请涉及的人。未满 14 岁子女写进本申请，配偶及年满 14 岁子女分别办理。</p>
    <h3>未满 14 岁子女（最多 5 人）</h3>{(data.childrenUnder14 ?? []).map((child, index) => <div key={index}><p>{nameOf({ ...data, person: child })} · {displayDate(child.birthDate) || '出生日期未填'}</p><small>{draft.relations?.some((r) => r.purpose === 'section' && r.relation === 'child' && r.childIndex === index) ? '填进本申请第 12 节' : '已填写（未关联人员资料）'}</small><button className="text-action" onClick={() => remove('child', index)}>移除子女 {index + 1}</button></div>)}
    <button className="secondary" disabled={(data.childrenUnder14?.length ?? 0) >= 5} onClick={() => pick('child')}>选择／添加子女</button>
    {profile?.sections?.includes('dependents') && <><h3>配偶资料</h3>{data.spouse ? <div><p>{nameOf({ ...data, person: data.spouse })} · {data.spouse.birthDate ?? '出生日期未填'}</p><small>{draft.relations?.some((r) => r.purpose === 'section' && r.relation === 'spouse') ? '填进本申请第 11 节' : '已填写（未关联人员资料）'}</small><button className="text-action" onClick={() => remove('spouse')}>移除配偶</button></div> : <p className="hint">尚未选择配偶资料</p>}<button className="secondary" onClick={() => pick('spouse')}>选择／添加配偶</button></>}
    <button className="secondary" onClick={() => pick('own-spouse')}>为配偶另建申请</button><button className="secondary" onClick={() => pick('own-child')}>为年满 14 岁的子女另建申请</button>
    {draft.relations?.filter((r) => r.purpose === 'own-application').map((r) => <p className="hint" key={r.draftId}>已关联另一份{r.relation === 'spouse' ? '配偶' : '子女'}申请</p>)}
  </div>
}

export function PaperFocus({ data, path }: { data: Application; path: string }) {
  const enabled = useDesktop()
  return enabled ? <PaperFocusContent data={data} path={path} /> : null
}
function PaperFocusContent({ data, path }: { data: Application; path: string }) {
  const canvas = useRef<HTMLCanvasElement>(null), [status, setStatus] = useState('正在显示纸质表格…')
  const [size, setSize] = useState({ width: 595, height: 842, transform: [1, 0, 0, -1, 0, 842] })
  const target = paperTarget(path)
  const section = stepsFor(data).flatMap((step) => step.sections).find((section) => section.fields.some((field) => field.path === path))
  const question = section?.fields.find((field) => field.path === path)
  const field = target?.field
  useEffect(() => {
    if (!field) return
    let cancelled = false
    const timer = setTimeout(() => {
      void (async () => {
        setStatus('正在显示纸质表格…')
        let kit
        try { kit = prepareApplication(data, businessData, today()) } catch { kit = prepareApplication({ application: data.application }, businessData, today()) }
        if (kit.kind !== 'kit') throw new Error(kit.message)
        const reference = await generateReference(kit)
        const first = reference.pages.findIndex((page) => page.group === (target?.form === 'modulo2' ? 'Modulo 2' : 'Modulo 1'))
        if (first < 0) throw new Error('此申请不需要该表格')
        const staging = document.createElement('canvas')
        const viewport = await renderPage(reference.bytes, staging, first + field.page)
        if (cancelled || !canvas.current) return
        canvas.current.width = staging.width; canvas.current.height = staging.height
        canvas.current.getContext('2d')!.drawImage(staging, 0, 0)
        setSize(viewport); setStatus('')
      })().catch((error: unknown) => { if (!cancelled) setStatus(error instanceof Error && error.message === '此申请不需要该表格' ? error.message : '暂时无法显示纸质表格，请先改正左侧标出的栏') })
    }, 200)
    return () => { cancelled = true; clearTimeout(timer) }
  }, [data, field, target?.form])
  const rectangles = !field ? [] : field.kind === 'boxes' ? [field.boxes, ...(field.moreRows ?? [])] : field.kind === 'date' ? Object.values(field.groups) : field.kind === 'parts' ? field.parts.filter((part) => part.name === path.split('.').at(-1) || !field.parts.some((p) => p.name === path.split('.').at(-1))).map((part) => part.boxes) : field.kind === 'choice' ? field.options.map((option) => option.box) : field.kind === 'checkbox' ? [field.box] : [field.area]
  return <aside className="desktop-right paper-focus"><section className="card"><h2>对照纸质表格</h2><p className="hint">{question?.paper}</p><p role="status">{field ? status : '此问题不单独写入纸质表格'}</p><div className="focus-paper" hidden={!field}><canvas ref={canvas} aria-label="当前字段所在纸质表页" /><svg viewBox={`0 0 ${size.width} ${size.height}`} aria-label="当前字段格子高亮">{rectangles.map((rect, index) => <rect key={index} x={rect.x * size.transform[0]! + (rect.y + rect.h) * size.transform[2]! + size.transform[4]!} y={rect.x * size.transform[1]! + (rect.y + rect.h) * size.transform[3]! + size.transform[5]!} width={rect.w + ('count' in rect ? (Number(rect.count) - 1) * Number('pitch' in rect ? rect.pitch : 0) : 0)} height={rect.h} />)}</svg></div></section>
    <section className="card"><h2>字段说明</h2><h3>{question?.label}</h3>{question?.help && <p className="help-copy">{question.help}</p>}{section?.help && <p className="help-copy">{section.help}</p>}</section>
  </aside>
}
