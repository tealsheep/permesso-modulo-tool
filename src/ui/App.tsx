import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { Application } from '../data/application-schema'
import { businessData } from '../data/business'
import { prepareApplication, selectionFromApplication } from '../engine/prepare'
import { selectMaterials } from '../engine/application'
import { copyShared, emptyStore, loadStore, newApplication, storageKey, trySaveStore } from '../storage/store'
import type { Draft, Member, Store } from '../storage/store'
import { age, questionErrors, questionId, setAnswer, stepsFor, orderFormErrors } from './questionnaire'
import type { FormError, Section } from './questionnaire'
import { Field, FiscalCheck, Header, Icon, Modal, SectionCard, SectionHelpContent } from './components'
import { generateReference, instructions } from './reference'
import type { Reference } from './reference'
import { Preview } from './Preview'
import { MemberPage, CopyDialog } from './Family'
import { MyPage, Guide, SelectionPage } from './Pages'
import { download, nameOf, titles, today } from './format'
import { applyQuestionDefaults } from '../engine/question-defaults'
import { ApplicationsHome, ApplicationDetail, ChoosePerson } from './Applications'
import { cloneDraft, familyPerson, latestPerson, organizePeople, personalData } from '../storage/people'
import { operationNames } from './selection'
import { DesktopFrame, PaperFocus, RelatedPeople } from './Desktop'
import { DateDraftProvider, mergeDateErrors, useDateDrafts } from './date-drafts'
import { PersonPicker } from './PersonPicker'
import type { PickerMode } from './PersonPicker'
import { focusField } from './focus-field'
import { projectApplication } from '../questionnaire/projection'
import { deletePeople } from '../storage/people'

export type Screen = 'home' | 'choose-person' | 'choose' | 'application' | 'form' | 'member' | 'materials' | 'preview' | 'my' | 'faq' | 'about'
export function App() {
  return <DateDraftProvider><ApplicationUI /></DateDraftProvider>
}
function ApplicationUI() {
  const dateDrafts = useDateDrafts()
  const [loaded] = useState(() => loadStore({ getItem: (key) => localStorage.getItem(key) }))
  const [store, setStore] = useState<Store>(loaded.store)
  const [storageError, setStorageError] = useState(loaded.error ?? '')
  const [saveStatus, setSaveStatus] = useState('资料保存在本机浏览器')
  const [screen, setScreen] = useState<Screen>('home')
  const [activeId, setActiveId] = useState('')
  const [chosenPerson, setChosenPerson] = useState<Member | undefined>()
  const [focusedPath, setFocusedPath] = useState('')
  const [memberReturn, setMemberReturn] = useState<Screen>('home')
  const [picker, setPicker] = useState<{ mode: PickerMode; initial?: string } | null>(null)
  const [memberPickerMode, setMemberPickerMode] = useState<PickerMode | null>(null)
  const [pendingLink, setPendingLink] = useState<{ sourceDraftId: string; relation: 'spouse' | 'child' } | null>(null)
  const [deletingPerson, setDeletingPerson] = useState<Member | null>(null)
  const [copySource, setCopySource] = useState('')
  const [syncMember, setSyncMember] = useState<Member | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [errors, setErrors] = useState<FormError[]>([]), [touched, setTouched] = useState<string[]>([])
  const [help, setHelp] = useState<Section | null>(null)
  const [message, setMessage] = useState(''), [busy, setBusy] = useState(false)
  const [reference, setReference] = useState<Reference | null>(null)
  const [previewReturn, setPreviewReturn] = useState<Screen>('form')
  const cache = useRef(new Map<string, { updatedAt: string; reference: Reference }>())
  const [member, setMember] = useState<Member | null>(null)
  const [copyOpen, setCopyOpen] = useState(false), [copyTarget, setCopyTarget] = useState('')
  const [guide, setGuide] = useState(false)
  const draft = store.drafts.find((d) => d.id === activeId)
  function navigate(next: Screen) { setScreen(next); setMessage(''); setErrors([]); setTouched([]); window.scrollTo(0, 0) }
  function persist(next: Store, override = false) {
    next = organizePeople(next); setStore(next)
    if (loaded.error && storageError && !override) { setSaveStatus('未保存：请先处理本机记录读取错误'); return }
    const result = trySaveStore(localStorage, next)
    if (result === 'saved') { setStorageError(''); setSaveStatus('已自动保存到本机') }
    // A value the questionnaire flags (e.g. a negative month count) is not a storage problem.
    else if (result === 'invalid') setSaveStatus('有一项填写不符合要求，改正后自动保存')
    else { setStorageError('保存失败，可能是浏览器空间不足。当前填写仍在页面中，请导出备份后再离开。'); setSaveStatus('当前修改尚未保存') }
  }
  function updateDraft(data: Application, completed?: string[]) {
    if (!draft) return
    data = applyQuestionDefaults(data)
    persist({ ...store, drafts: store.drafts.map((d) => d.id === draft.id ? { ...d, data, updatedAt: new Date().toISOString(), generatedAt: undefined, completed: completed ?? d.completed.filter((id) => stepsFor(data).some((s) => s.id === id)) } : d) })
    cache.current.delete(draft.id)
  }
  function start(code: string, operation?: Application['application']['operation']) {
    const type = businessData.applicationTypes.types.find((item) => item.code === code)!
    const base = newApplication(code, operation ?? type.operations[0]!)
    const profile = chosenPerson ?? { id: crypto.randomUUID(), data: base }
    const data = applyQuestionDefaults(personalData(base, profile.data))
    const d: Draft = { id: crypto.randomUUID(), profileId: profile.id, data, step: 0, completed: [], updatedAt: new Date().toISOString(), checks: [] }
    let drafts = [...store.drafts, d]
    if (pendingLink) {
      const source = store.drafts.find((item) => item.id === pendingLink.sourceDraftId)
      if (source) {
        const spouse = pendingLink.relation === 'spouse'
        d.data.relatedApplication = { ...d.data.relatedApplication, ...(spouse ? { spouse: true } : { parent: true }) }
        drafts = [...store.drafts.map((item) => item.id === source.id ? { ...item, generatedAt: undefined, updatedAt: new Date().toISOString(), data: spouse ? { ...item.data, relatedApplication: { ...item.data.relatedApplication, spouse: true } } : item.data, relations: [...(item.relations ?? []), { personId: profile.id, relation: pendingLink.relation, purpose: 'own-application' as const, draftId: d.id }] } : item), d]
        cache.current.delete(source.id)
      }
      setPendingLink(null)
    }
    persist({ ...store, members: store.members.some((m) => m.id === profile.id) ? store.members : [...store.members, profile], drafts })
    setActiveId(d.id); navigate('form')
  }
  function withDefaults(d: Draft): Draft {
    const data = applyQuestionDefaults(d.data)
    return JSON.stringify(data) === JSON.stringify(d.data) ? d : { ...d, data, updatedAt: new Date().toISOString(), generatedAt: undefined, completed: [] }
  }
  function openDraft(d: Draft) {
    const ready = withDefaults(d)
    if (ready !== d) { persist({ ...store, drafts: store.drafts.map((v) => v.id === d.id ? ready : v) }); cache.current.delete(d.id) }
    setActiveId(d.id); navigate('form')
  }
  function changeAnswer(path: string, value: unknown) {
    if (!draft) return
    const data = setAnswer(draft.data, path, value)
    updateDraft(data)
    if (touched.includes(path)) {
      const qs = stepsFor(data).flatMap((s) => s.sections.flatMap((s) => s.fields))
      setErrors((old) => orderFormErrors([...old.filter((e) => e.path !== path), ...questionErrors(data, qs.filter((q) => q.path === path), today())], qs))
    }
  }
  function blur(path: string) {
    if (!draft) return
    const qs = stepsFor(draft.data).flatMap((s) => s.sections.flatMap((s) => s.fields))
    setTouched((v) => [...new Set([...v, path])]); setErrors((v) => orderFormErrors([...v.filter((e) => e.path !== path), ...questionErrors(draft.data, qs.filter((q) => q.path === path), today())], qs))
  }
  async function generate(d: Draft, back: Screen = 'form') {
    d = withDefaults(d)
    const steps = stepsFor(d.data)
    const found = mergeDateErrors(questionErrors(d.data, steps.flatMap((s) => s.sections.flatMap((s) => s.fields)), today()), dateDrafts.validate())
    if (found.length) {
      const index = steps.findIndex((s) => s.sections.some((s) => s.fields.some((f) => f.path === found[0]!.path)))
      persist({ ...store, drafts: store.drafts.map((item) => item.id === d.id ? { ...d, step: Math.max(0, index) } : item) })
      setActiveId(d.id); setScreen('form'); setErrors(found); setTouched(found.map((e) => e.path)); setMessage('请先修改填写内容'); focusField(found[0]!.path); return
    }
    setBusy(true); setMessage('正在本机生成参考件…')
    try {
      const kit = prepareApplication(d.data, businessData, today())
      if (kit.kind !== 'kit') throw new Error(kit.message)
      const incompleteFee = kit.warnings.find((warning) => warning.code === 'fee-incomplete')
      if (incompleteFee) throw new Error(incompleteFee.message)
      const existing = cache.current.get(d.id)
      const next = existing?.updatedAt === d.updatedAt ? existing.reference : await generateReference(kit)
      cache.current.set(d.id, { updatedAt: d.updatedAt, reference: next }); setReference(next)
      persist({ ...store, drafts: store.drafts.map((item) => item.id === d.id ? { ...d, generatedAt: new Date().toISOString(), completed: stepsFor(d.data).map((s) => s.id) } : item) })
      setPreviewReturn(back); navigate('preview')
    } catch (error) { setMessage(error instanceof Error ? error.message : '生成失败，请检查资料') }
    finally { setBusy(false) }
  }
  function advance() {
    if (!draft) return
    const steps = stepsFor(draft.data), step = steps[draft.step]!
    const found = mergeDateErrors(questionErrors(draft.data, step.sections.flatMap((s) => s.fields), today()), dateDrafts.validate())
    setTouched(step.sections.flatMap((s) => s.fields.map((q) => q.path))); setErrors(found)
    if (found.length) { focusField(found[0]!.path); return }
    setMessage('')
    if (draft.step === steps.length - 1) { void generate(draft); return }
    persist({ ...store, drafts: store.drafts.map((d) => d.id === draft.id ? { ...d, step: d.step + 1, completed: [...new Set([...d.completed, step.id])] } : d) })
    setErrors([]); setTouched([]); window.scrollTo(0, 0)
  }
  function materialItems(d: Draft) {
    try { const projected = projectApplication(d.data, businessData.applicationTypes, today()); return selectMaterials(selectionFromApplication(projected, today()), businessData.materials[d.data.application.code]!, projected) }
    catch { return [] }
  }
  function openMember(m?: Member, from: Screen = 'home') {
    setMemberReturn(from)
    setMember(m ? { ...structuredClone(m), data: applyQuestionDefaults(m.data) } : { id: crypto.randomUUID(), data: newApplication('16', 'rinnovo') }); navigate('member')
  }
  function commitMember(m: Member, sync: boolean) {
    // Saving an untouched new-person form must not leave a nameless record behind.
    if (!store.members.some((item) => item.id === m.id) && JSON.stringify(m.data) === JSON.stringify(applyQuestionDefaults(newApplication('16', 'rinnovo')))) {
      setSyncMember(null); navigate(memberReturn); setMessage('资料是空的，没有新建人员')
      if (memberPickerMode) { setPicker({ mode: memberPickerMode }); setMemberPickerMode(null) }
      return
    }
    const drafts = store.drafts.map((d) => {
      if (!sync || d.generatedAt || !(d.profileId === m.id || d.relations?.some((r) => r.personId === m.id))) return d
      const data = d.profileId === m.id ? applyQuestionDefaults(personalData(d.data, m.data)) : structuredClone(d.data)
      for (const relation of d.relations ?? []) if (relation.personId === m.id && relation.purpose === 'section') {
        if (relation.relation === 'spouse') data.spouse = familyPerson(m)
        else if (relation.childIndex != null && data.childrenUnder14?.[relation.childIndex]) data.childrenUnder14[relation.childIndex] = familyPerson(m)
      }
      return { ...d, data, updatedAt: new Date().toISOString(), completed: [] }
    })
    persist({ ...store, members: [...store.members.filter((item) => item.id !== m.id), { ...m, updatedAt: new Date().toISOString() }], drafts })
    cache.current.clear(); setSyncMember(null); navigate(memberReturn)
    if (memberPickerMode) { setPicker({ mode: memberPickerMode, initial: m.id }); setMemberPickerMode(null) }
  }
  function selectPerson(people: Member[]) {
    const person = people[0]
    if (!person || !picker || !draft || person.id === draft.profileId) return
    const mode = picker.mode, members = store.members.map((item) => item.id === person.id ? { ...person, updatedAt: new Date().toISOString() } : item)
    // A name typed in the picker belongs to the person, not only to this dialog.
    if (mode === 'copy') { persist({ ...store, members }); setCopySource(person.id); setCopyTarget('draft:'+draft.id); setCopyOpen(true); setPicker(null); return }
    if (mode === 'own-spouse' || mode === 'own-child') {
      persist({ ...store, members }); setChosenPerson(person); setPendingLink({ sourceDraftId: draft.id, relation: mode === 'own-spouse' ? 'spouse' : 'child' }); setPicker(null); navigate('choose'); return
    }
    if (mode !== 'child' && mode !== 'spouse') return
    const snapshot = familyPerson(person), relations = (draft.relations ?? []).filter((r) => !(mode === 'spouse' && r.relation === 'spouse' && r.purpose === 'section'))
    const data = structuredClone(draft.data)
    if (mode === 'child') {
      if (!snapshot.birthDate || (age(snapshot.birthDate, today()) < 0 || age(snapshot.birthDate, today()) >= 14) || (data.childrenUnder14?.length ?? 0) >= 5) return
      if (data.childrenUnder14?.some((child) => JSON.stringify(child) === JSON.stringify(snapshot))) { setMessage('这位子女已经添加'); setPicker(null); return }
      relations.push({ personId: person.id, relation: 'child', purpose: 'section', childIndex: data.childrenUnder14?.length ?? 0 }); data.childrenUnder14 = [...(data.childrenUnder14 ?? []), snapshot]
    } else { relations.push({ personId: person.id, relation: 'spouse', purpose: 'section' }); data.spouse = snapshot }
    persist({ ...store, members, drafts: store.drafts.map((item) => item.id === draft.id ? { ...item, data, relations, updatedAt: new Date().toISOString(), generatedAt: undefined } : item) }); cache.current.delete(draft.id); setPicker(null)
  }
  function removeRelation(kind: 'spouse' | 'child', index = 0) {
    if (!draft) return
    const data = structuredClone(draft.data)
    if (kind === 'spouse') data.spouse = null
    else data.childrenUnder14 = data.childrenUnder14?.filter((_, i) => i !== index)
    const relations = draft.relations?.filter((r) => !(r.purpose === 'section' && r.relation === kind && (kind === 'spouse' || r.childIndex === index))).map((r) => kind === 'child' && r.childIndex != null && r.childIndex > index ? { ...r, childIndex: r.childIndex - 1 } : r)
    persist({ ...store, drafts: store.drafts.map((item) => item.id === draft.id ? { ...item, data, relations, generatedAt: undefined, updatedAt: new Date().toISOString() } : item) }); cache.current.delete(draft.id)
  }
  const selectedDraft = draft ?? store.drafts[0]
  function detail(d: Draft) { return <ApplicationDetail draft={d} proceed={() => openDraft(d)} reference={() => { setActiveId(d.id); void generate(d, 'application') }} materials={() => { setActiveId(d.id); navigate('materials') }} duplicate={() => { const copy = cloneDraft(d, crypto.randomUUID(), new Date().toISOString()); persist({ ...store, drafts: [...store.drafts, copy] }); setActiveId(copy.id); navigate('application') }} remove={() => { setActiveId(d.id); setDeleting(true) }} /> }
  let desktopSteps: ReactNode
  const pageHeader = (title: string, back: Screen = 'home', action?: ReactNode) => <Header title={title} back={() => navigate(back)} action={action} />
  const empty = (title: string, body: string) => <div className="card empty"><Icon name="document" tile /><h2>{title}</h2><p>{body}</p></div>
  let content: ReactNode
  if (screen === 'home') content = <ApplicationsHome store={store} selected={selectedDraft?.id ?? ''} select={(d) => { setActiveId(d.id); if (window.innerWidth < 1024) navigate('application') }} edit={(m) => openMember(m)} create={() => navigate('choose-person')} />
  else if (screen === 'choose-person') content = <ChoosePerson store={store} back={() => navigate('home')} choose={(m) => { setChosenPerson(m); setPendingLink(null); navigate('choose') }} resume={openDraft} remove={setDeletingPerson} />
  else if (screen === 'application' && draft) content = <>{pageHeader(titles[draft.data.application.code] ?? '申请')}<section className="card">{detail(draft)}</section></>
  else if (screen === 'choose') content = <SelectionPage back={() => { if (pendingLink) { setPendingLink(null); navigate('form') } else navigate('choose-person') }} select={start} guide={() => setGuide(true)} help={() => setHelp({ title: '要直接去 Questura 办的情况', icon: 'help', fields: [] })} />
  else if (screen === 'form' && draft) {
    const steps = stepsFor(draft.data), index = Math.min(draft.step, steps.length - 1), step = steps[index]!
    const type = businessData.applicationTypes.types.find((type) => type.code === draft.data.application.code)!
    const operations = type.operations
    desktopSteps = <nav className="vertical-steps" aria-label="竖向填写步骤">{steps.map((item, i) => <div key={item.id}><button aria-current={index === i ? 'step' : undefined} disabled={i > index && !draft.completed.includes(item.id)} onClick={() => { persist({ ...store, drafts: store.drafts.map((d) => d.id === draft.id ? { ...d, step: i } : d) }); setErrors([]); setFocusedPath(''); window.scrollTo(0, 0) }}>{i + 1}. {item.title}</button>{i === index && item.sections.map((section, n) => <a key={section.title} href={`#section-${n}`}>{section.title}</a>)}</div>)}</nav>
    const currentErrors = errors.filter((e) => step.sections.some((s) => s.fields.some((q) => q.path === e.path)))
    content = <>{pageHeader(titles[draft.data.application.code] ?? '填写申请', 'application')}<nav className="stepper" aria-label="填写步骤">{steps.map((s, i) => <button key={s.id} data-reached={i <= index || draft.completed.includes(s.id)} aria-current={i === index ? 'step' : undefined} disabled={i !== index && !draft.completed.includes(s.id) && i > index} onClick={() => { persist({ ...store, drafts: store.drafts.map((d) => d.id === draft.id ? { ...d, step: i } : d) }); setErrors([]); setTouched([]); window.scrollTo(0, 0) }}><span className={`step-dot${draft.completed.includes(s.id) && i !== index ? ' complete' : ''}`}>{draft.completed.includes(s.id) && i !== index ? <Icon name="check" /> : i + 1}</span><span>{s.title.includes('与') ? <>{s.title.split('与')[0]}与<wbr />{s.title.split('与')[1]}</> : s.title}</span></button>)}</nav>
      <div className="form-heading"><h2>{step.title}</h2><small role="status">{saveStatus}</small></div>
      {draft.generatedAt && <button className="secondary wide" disabled={busy} onClick={() => void generate(draft)}>查看已生成的参考件</button>}
      {currentErrors.length > 0 && <div className="error-summary" role="alert" tabIndex={-1}><h2>有 {currentErrors.length} 处需要补填或修改</h2><ul>{currentErrors.map((e) => <li key={e.path}><a href={`#${questionId(e.path)}`} onClick={(event) => { event.preventDefault(); focusField(e.path) }}>{e.message.startsWith(e.label) ? e.message : `${e.label}：${e.message}`}</a></li>)}</ul></div>}
      {step.id === 'address' && <button className="text-action wide" onClick={() => { setPicker({ mode: 'copy' }) }}>从另一人复制住址、电话</button>}
      {step.id === 'application' && type.noteZh && <p className="notice">{type.noteZh}</p>}
      {step.id === 'application' && operations.length > 1 && <section className="card"><Field field={{ path: 'application.operation', label: '办理方式', required: true, paper: '决定表格内容和材料', hint: '切换后请核对现有居留或签证信息。', type: 'select', options: operations.map((value) => ({ value, label: operationNames[value] })) }} data={draft.data} update={changeAnswer} blur={blur} /></section>}
      {step.sections.map((section, n) => <div id={`section-${n}`} key={section.title}><SectionCard section={section} data={draft.data} errors={errors} update={changeAnswer} blur={blur} help={setHelp} />{section.title === '婚姻与税号' && <FiscalCheck data={draft.data} />}</div>)}
      {step.id === 'address' && type.profile.sections?.includes('pastResidences') && <div className="card stack">{type.profile.sections?.includes('pastResidences') && <><button className="secondary" disabled={(draft.data.housing?.pastResidences?.length ?? 0) >= 4} onClick={() => updateDraft({ ...draft.data, housing: { ...draft.data.housing, pastResidences: [...(draft.data.housing?.pastResidences ?? []), {}] } })}>＋ 过去六年住址（最多 4 处）</button>{!!draft.data.housing?.pastResidences?.length && <button className="text-action" onClick={() => updateDraft({ ...draft.data, housing: { ...draft.data.housing, pastResidences: draft.data.housing?.pastResidences?.slice(0, -1) } })}>移除最后一处过去住址</button>}</>}</div>}
      {step.id === 'family' && <><RelatedPeople draft={draft} pick={(mode) => setPicker({ mode })} remove={removeRelation} />
        <div className="notice"><h2>交表前记住</h2><p>{instructions[2]}</p>{!type.stampExempt && <p>{instructions[3]}</p>}<p>生成后请检查所有填写提醒，超长内容可能在表格中被截断。</p></div></>}
      <div className="bottom-bar form-actions"><button className="secondary" onClick={() => { if (index === 0) navigate('choose'); else { persist({ ...store, drafts: store.drafts.map((d) => d.id === draft.id ? { ...d, step: index - 1 } : d) }); setErrors([]); setTouched([]); window.scrollTo(0, 0) } }}>{index === 0 ? '返回选申请' : '上一步'}</button><button className="primary" disabled={busy} onClick={advance}>{busy ? '正在生成…' : index === steps.length - 1 ? '生成参考件' : '保存并下一步'}</button></div>
    </>
  }
  else if (screen === 'member' && member) content = <MemberPage member={member} setMember={setMember} back={() => { setMemberPickerMode(null); navigate(memberReturn) }} save={(m) => { if (!memberPickerMode && store.drafts.some((d) => !d.generatedAt && (d.profileId === m.id || d.relations?.some((r) => r.personId === m.id)))) setSyncMember(m); else commitMember(m, false) }} />
  else if (screen === 'materials') content = <>{pageHeader('材料清单', 'application')}{!store.drafts.length && <>{empty('先选择申请类型', '材料会按申请类型、收入和家属情况列出')}<button className="primary wide" onClick={() => navigate('choose')}>新建申请</button></>}
    {store.drafts.filter((d) => d.id === activeId).map((d) => { const items = materialItems(d); const checked = items.filter((m) => d.checks.includes(m.nameIt)).length
      return <section className="card material-card" key={d.id}><div className="section-heading"><Icon name="check" tile /><div><h2>{titles[d.data.application.code]}</h2><small>{nameOf(d.data)}</small></div></div><p className="material-progress">已准备 {checked} / {items.length}</p><p className="hint">条件材料会随资料变化。填写完整申请后再逐项核对。</p>{items.map((item) => <label className="material-item" key={item.nameIt}><input type="checkbox" checked={d.checks.includes(item.nameIt)} onChange={(e) => persist({ ...store, drafts: store.drafts.map((v) => v.id === d.id ? { ...v, checks: e.target.checked ? [...v.checks, item.nameIt] : v.checks.filter((v) => v !== item.nameIt) } : v) })} /><span><strong>{item.nameZh}</strong><small>{item.nameIt}</small>{item.notice && <span className="common-tag">{item.notice}</span>}</span></label>)}</section>
    })}<p className="privacy-note">以当地 Questura 最新要求为准</p></>
  else if (screen === 'preview' && reference) content = <Preview reference={reference} back={() => navigate(previewReturn)} />
  else if (screen === 'my') content = <MyPage store={store} replace={(s) => { persist(s, true); cache.current.clear(); setReference(null); setActiveId('') }} clear={() => { localStorage.removeItem(storageKey); setStorageError(''); setSaveStatus('资料已清除'); setStore(emptyStore()); cache.current.clear(); setReference(null); setActiveId('') }} back={() => navigate('home')} about={() => navigate('about')} faq={() => navigate('faq')} />
  else if (screen === 'faq') content = <>{pageHeader('常见问题', 'my')}{[
    ['参考件能直接打印提交吗？', '不能。领取邮局纸质 kit 后，用黑色笔照着参考件手写。'],
    ['印花税票贴哪里？', instructions[3]!], ['哪些家人要另填一份？', '未满 14 岁子女写进主申请人的 Modulo 1 第 12 节；配偶和年满 14 岁子女各自建立申请，另出参考件。'],
    ['资料会上传吗？', '填写和生成都在本机完成，没有账号、服务器或追踪。浏览器清理资料后无法恢复，请在“我的”导出备份。'],
    ['费用不确定怎么办？', '工具按配置规则计算缴费单金额；邮局窗口另付邮寄费。如不确定，请在邮局窗口确认。'],
    ['第一次工作或家庭团聚申请呢？', '由 Sportello Unico 代填的首次申请，不需要自己填。本工具不生成这些表格。'],
  ].map(([q, a]) => <details className="card faq" key={q}><summary>{q}</summary><p>{a}</p></details>)}</>
  else if (screen === 'about') content = <>{pageHeader('关于和免责声明', 'my')}<section className="card"><h2>居留填表助手</h2><p>免费、开源的填写辅助工具。参考件供照着手写，不用于提交，不提供法律建议。</p><p>要求以 Questura、Poste Italiane 和 portaleimmigrazione.it 最新官方说明为准。</p><p>表格与规则核实日期：{businessData.applicationTypes.verifiedOn}</p><p>Modulo 2 根据版式数据重画，不使用官方 PDF，也不放国徽。</p><p>没有账号、服务器、访问统计或追踪。</p></section></>
  else content = <>{pageHeader('我的申请')}{empty('请选择一份申请', '返回首页继续填写')}</>

  return <div className={`app-shell ${screen === 'preview' ? 'preview-shell' : screen === 'home' ? 'home-shell' : screen === 'form' ? 'form-shell' : ''}`}><DesktopFrame screen={screen} home={() => navigate('home')} my={() => navigate('my')}>{desktopSteps}</DesktopFrame><main id="main-content" onFocusCapture={(event) => { const id = (event.target as HTMLElement).closest('[id^="q-"]')?.id; const field = draft && stepsFor(draft.data).flatMap((step) => step.sections.flatMap((section) => section.fields)).find((field) => questionId(field.path) === id); if (field) setFocusedPath(field.path) }}>
    {storageError && <div className="error-summary" role="alert"><p>{storageError}</p><button className="secondary" onClick={() => download(localStorage.getItem(storageKey) ?? JSON.stringify(store), 'permesso-original-record.json')}>导出原记录</button><button className="text-action" onClick={() => navigate('my')}>前往备份管理</button></div>}
    {message && <p role="status" className="notice">{message}</p>}{content}
  </main>{screen === 'home' && selectedDraft && <aside className="desktop-right card">{detail(selectedDraft)}</aside>}{screen === 'form' && draft && <PaperFocus data={draft.data} path={focusedPath || stepsFor(draft.data)[draft.step]?.sections[0]?.fields[0]?.path || ''} />}
    {['home', 'my'].includes(screen) && <nav className="bottom-nav" aria-label="主导航">{[['home', 'home', '首页'], ['my', 'person', '我的']].map(([to, icon, label]) => <button key={to} aria-current={screen === to ? 'page' : undefined} onClick={() => navigate(to as Screen)}><Icon name={icon!} /><span>{label}</span></button>)}</nav>}
    {help && <Modal sheet title={help.title} close={() => setHelp(null)}>{help.fields.length ? <SectionHelpContent section={help} /> : <p>必须直接到 Questura 办理的类型不生成邮局 kit。请按当地 Questura 的预约和最新官方说明办理；本工具不作资格判断。</p>}<button className="primary wide" onClick={() => setHelp(null)}>知道了</button></Modal>}
    {syncMember && <Modal title="要不要同步到进行中的申请？" close={() => setSyncMember(null)}><p>已生成的申请保持原样。</p><button className="primary wide" onClick={() => commitMember(syncMember, true)}>同步到进行中的申请</button><button className="secondary wide" onClick={() => commitMember(syncMember, false)}>只保存资料</button></Modal>}
    {deleting && draft && <Modal title="删除这份申请？" close={() => setDeleting(false)}><p>只删除这份申请，保留人的资料和其他申请。</p><button className="primary wide" onClick={() => { persist({ ...store, drafts: store.drafts.filter((d) => d.id !== draft.id).map((d) => ({ ...d, relations: d.relations?.filter((r) => r.draftId !== draft.id) })) }); cache.current.delete(draft.id); setActiveId(''); setDeleting(false); navigate('home') }}>确认删除</button></Modal>}
    {picker && draft && <PersonPicker key={picker.mode} store={store} mode={picker.mode} initial={picker.initial} applicant={{ id: draft.profileId ?? draft.id, data: draft.data }} exclude={[draft.profileId ?? '', ...(draft.relations ?? []).filter((r) => r.purpose === 'section' && (picker.mode === 'spouse' || picker.mode === 'child')).map((r) => r.personId)]} close={() => setPicker(null)} choose={selectPerson} add={() => { setMemberPickerMode(picker.mode); setPicker(null); openMember(undefined, 'form') }} createOwn={(person) => setPicker({ mode: 'own-child', initial: person.id })} />}
    {deletingPerson && <Modal title="删除这个人的资料？" close={() => setDeletingPerson(null)}><p>将删除 {store.drafts.filter((d) => d.profileId === deletingPerson.id).length} 份申请。别的申请里已复制的资料保留，只移除人员关联。此操作无法撤销。</p><button className="primary wide" onClick={() => { persist(deletePeople(store, [deletingPerson.id])); cache.current.clear(); setDeletingPerson(null) }}>确认删除这个人</button></Modal>}
    {copyOpen && <CopyDialog store={store} target={copyTarget} sourceId={copySource} close={() => setCopyOpen(false)} copy={(sourceId, target, keys) => {
      const source = latestPerson(store, store.members.find((m) => m.id === sourceId)!)
      const [kind, id] = target.split(':')
      persist({ ...store, members: store.members.map((m) => kind === 'member' && m.id === id ? { ...m, data: applyQuestionDefaults(copyShared(m.data, source.data, keys)) } : m), drafts: store.drafts.map((d) => kind === 'draft' && d.id === id ? { ...d, data: applyQuestionDefaults(copyShared(d.data, source.data, keys)), updatedAt: new Date().toISOString(), generatedAt: undefined, completed: [] } : d) }); cache.current.delete(id!); setCopyOpen(false); setMessage('已复制你勾选的共同信息')
    }} />}
    {guide && <Guide close={() => setGuide(false)} select={(code) => { start(code); setGuide(false) }} />}
    {busy && <div className="busy-overlay" role="status">正在本机生成参考件，请稍候…</div>}
  </div>
}
