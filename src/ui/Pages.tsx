import { useRef, useState } from 'react'
import { businessData } from '../data/business'
import { codeTables } from '../data/catalog'
import { parseBackup } from '../storage/store'
import { exportPeople, deletePeople } from '../storage/people'
import { PersonPicker } from './PersonPicker'
import type { Store } from '../storage/store'
import { Header, Icon, Modal } from './components'
import { download, titles, today } from './format'
import type { ApplicationType, Operation } from '../data/schemas'
import { planApplication } from '../engine/application'
import { defaultOperation, displayGroups, groupLabels, groupsFor, operationNames } from './selection'

export function SelectionPage({ back, select, guide, help }: { back: () => void; select: (code: string, operation?: Operation) => void; guide: () => void; help: () => void }) {
  const [search, setSearch] = useState('')
  const [choosing, setChoosing] = useState<ApplicationType | null>(null), [notice, setNotice] = useState('')
  function choose(code: string, group: string) {
    const type = businessData.applicationTypes.types.find((type) => type.code === code)!
    if (type.alsoInGroups?.length) select(code, defaultOperation(type, group))
    else if (type.operations.length > 1 || type.profile.operationChooser) setChoosing(type)
    else select(code, type.operations[0])
  }
  const configured = businessData.applicationTypes.types.map((t) => ({ ...t, displayName: titles[t.code] ?? t.nameZh, supported: true }))
  const pending = codeTables.motivi.entries.filter((t) => !configured.some((c) => c.code === t.code)).map((t) => ({ ...t, nameZh: t.nameZh ?? t.nameIt, group: 'pending', displayName: t.nameZh ?? t.nameIt, supported: false }))
  const query = search.trim().toLowerCase()
  const types = [...configured, ...pending].filter((t) => `${t.nameZh} ${t.nameIt} ${t.displayName} ${groupsFor(t).flatMap((group) => groupLabels[group] ?? []).join(' ')}`.toLowerCase().includes(query))
  const rows = types.reduce((sum, t) => sum + displayGroups(t, query).filter((group) => group in groupLabels).length, 0)
  return <><Header title="你要办什么？" back={back} /><label className="search-box"><Icon name="search" /><span className="sr-only">搜索申请类型</span><input type="search" placeholder="搜索中文、意大利文或分组" value={search} onChange={(e) => setSearch(e.target.value)} /></label>
    <button className="guide-link" onClick={guide}>不确定选哪个？回答 3 个问题帮你选<Icon name="arrow" /></button>
    {!types.length && <div className="card empty"><h2>没有找到匹配的申请</h2><p>试试“续签”“工作”或意大利文名称</p></div>}
    {Object.entries(groupLabels).map(([group, labels]) => types.some((t) => displayGroups(t, query).includes(group)) && <section className="card group-card" key={group}><h2>{labels[0]}<small>{labels[1]}</small></h2>{types.filter((t) => displayGroups(t, query).includes(group)).map((t) => <button key={t.code} className="list-row" disabled={!t.supported} onClick={() => choose(t.code, group)}><span><strong>{t.displayName}</strong><small>{t.nameIt}</small></span>{t.supported ? <Icon name="arrow" /> : <span className="muted upcoming">即将支持</span>}</button>)}</section>)}
    <p className="hint" aria-live="polite">找到 {types.length} 个类型{rows > types.length ? `，共 ${rows} 行（有的类型同时列在两个分组）` : ''}，当前开放 {configured.length} 种</p>
    <button className="guide-link" onClick={help}>要直接去 Questura 办的情况<Icon name="arrow" /></button>
    {choosing && <Modal title={`${choosing.nameZh} · 办理方式`} close={() => { setChoosing(null); setNotice('') }}>{[...new Set([...choosing.operations, ...choosing.sportelloUnicoFills])].map((operation) => <button className="list-row" key={operation} onClick={() => {
      const plan = planApplication({ applicationCode: choosing.code, operation }, businessData.applicationTypes)
      if (plan.kind === 'notice') setNotice(plan.message)
      else select(choosing.code, operation)
    }}>{operationNames[operation]}<Icon name="arrow" /></button>)}{notice && <p className="notice" role="status">{notice}</p>}</Modal>}
  </>
}
export function Guide({ close, select }: { close: () => void; select: (code: string) => void }) {
  const [answers, setAnswers] = useState<string[]>([])
  const n = answers.length
  const code = answers[1] === '首次转长居' ? '09' : answers[1] === '更新已有长居卡' ? '03' : answers[2] === '自雇工作' ? '15' : '16'
  const found = answers[0] === '有' && (answers[1] !== '续签' || answers[2] !== '其他 / 不确定')
  return <Modal title={n < 3 ? `帮你选申请 · ${n + 1} / 3` : '根据你的回答'} close={close}>{n < 3 ? <><p>{['你现在已有意大利居留吗？', '你这次主要要办什么？', '你现在的居留属于哪类？'][n]}</p>{(n === 0 ? ['有', '没有 / 不确定'] : n === 1 ? ['续签', '首次转长居', '更新已有长居卡'] : ['雇佣工作', '自雇工作', '其他 / 不确定']).map((a) => <button className="list-row" key={a} onClick={() => setAnswers([...answers, a])}>{a}<Icon name="arrow" /></button>)}</> : found ? <><p>与你回答对应的类型：{titles[code]}。请按现有证件核对；这里不判断申请资格。</p><button className="primary wide" onClick={() => select(code)}>选择这个类型</button></> : <><p>现有回答不足以确定类型。首次工作、家庭团聚等由 Sportello Unico 代填的情况不需要自己填。请先核对官方办理方式。</p><button className="secondary wide" onClick={close}>返回申请列表</button></>}</Modal>
}
export function MyPage({ store, replace, clear, back, about, faq }: { store: Store; replace: (s: Store) => void; clear: () => void; back: () => void; about: () => void; faq: () => void }) {
  const input = useRef<HTMLInputElement>(null)
  const [peopleAction, setPeopleAction] = useState<'export' | 'delete' | null>(null), [deleteIds, setDeleteIds] = useState<string[]>([])
  const [incoming, setIncoming] = useState<Store | null>(null), [confirm, setConfirm] = useState<'import' | 'clear' | null>(null), [message, setMessage] = useState('')
  return <><Header title="我的" back={back} /><p className="notice">资料只保存在这台设备的浏览器里。换设备或清理浏览器前，请先导出备份。</p>{message && <p className="notice" role="status">{message}</p>}<section className="card group-card">{[['导出备份文件', 'download'], ['导入备份文件', 'layers'], ['清除本机所有资料', 'close'], ['关于和免责声明', 'help'], ['按人导出', 'download'], ['删除某人', 'close']].map(([label, icon], i) => <button className={`list-row${i === 2 ? ' danger-text' : ''}`} key={label} onClick={() => { if (i === 0) download(JSON.stringify(store, null, 2), `permesso-backup-${today()}.json`); if (i === 1) input.current?.click(); if (i === 2) setConfirm('clear'); if (i === 3) about(); if (i === 4) setPeopleAction('export'); if (i === 5) setPeopleAction('delete') }}><Icon name={icon!} /><span>{label}</span><Icon name="arrow" /></button>)}</section><button className="card list-row" onClick={faq}><Icon name="help" /><span>常见问题</span><Icon name="arrow" /></button><p className="hint">备份包含你填写的个人资料，请保存在你信任的位置。</p><input className="sr-only" ref={input} type="file" accept=".json,application/json" aria-label="导入备份文件" onChange={(e) => { const file = e.target.files?.[0]; if (!file) return; if (file.size > 10_000_000) { setMessage('备份超过 10MB，无法导入'); return } void file.text().then((text) => { try { setIncoming(parseBackup(text)); setConfirm('import') } catch { setMessage('备份格式不正确，现有资料未改动') } }).catch(() => setMessage('无法读取备份文件，现有资料未改动')); e.target.value = '' }} />
    {peopleAction && <PersonPicker store={store} mode={peopleAction} close={() => setPeopleAction(null)} choose={(people) => { const ids = people.map((person) => person.id); if (peopleAction === 'export') download(JSON.stringify(exportPeople(store, ids), null, 2), 'permesso-selected-'+today()+'.json'); else setDeleteIds(ids); setPeopleAction(null) }} />}
    {!!deleteIds.length && <Modal title="删除所选人员？" close={() => setDeleteIds([])}><p>将删除 {deleteIds.length} 位人员和 {store.drafts.filter((draft) => !!draft.profileId && deleteIds.includes(draft.profileId)).length} 份申请。其他申请里已复制的家属信息会保留，人员关联会移除。此操作无法撤销。</p><div className="dialog-actions"><button className="secondary" onClick={() => setDeleteIds([])}>取消</button><button className="primary" onClick={() => { replace(deletePeople(store, deleteIds)); setDeleteIds([]); setMessage('所选人员已删除') }}>确认删除人员和申请</button></div></Modal>}
    {confirm && <Modal title={confirm === 'clear' ? '清除本机所有资料？' : '导入并替换现有资料？'} close={() => { setConfirm(null); setIncoming(null) }}><p>{confirm === 'clear' ? '将删除本机保存的申请、人员资料和材料勾选记录。请先导出备份，此操作无法撤销。' : `备份包含 ${incoming?.drafts.length} 份申请、${incoming?.members.length} 位人员。确认后会替换现有资料。`}</p><div className="dialog-actions"><button className="secondary" onClick={() => { setConfirm(null); setIncoming(null) }}>取消</button><button className="primary" onClick={() => { try { if (confirm === 'clear') clear(); else if (incoming) replace(incoming); setMessage(confirm === 'clear' ? '本机资料已清除' : '备份已导入') } catch { setMessage('操作失败，请检查浏览器存储设置') } setConfirm(null); setIncoming(null) }}>确认{confirm === 'clear' ? '清除' : '替换'}</button></div></Modal>}
  </>
}
