import { useState } from 'react'
import type { Draft, Member, Store } from '../storage/store'
import { sortedPeople, isNamed } from '../storage/people'
import { businessData } from '../data/business'
import { prepareApplication } from '../engine/prepare'
import { Header, Icon } from './components'
import { displayDate, displayTime, nameOf, titles, today } from './format'
import { money } from './reference'
import { progress, stepsFor } from './questionnaire'

export function ApplicationDetail({ draft, proceed, reference, materials, duplicate, remove }: { draft: Draft; proceed: () => void; reference: () => void; materials: () => void; duplicate: () => void; remove: () => void }) {
  const p = progress(draft.data), type = businessData.applicationTypes.types.find((type) => type.code === draft.data.application.code)
  const complete = p.filled === p.total
  let costs
  try { const kit = prepareApplication(draft.data, businessData, today()); if (kit.kind === 'kit') costs = kit }
  catch { /* Invalid/incomplete inputs remain editable; do not invent amounts. */ }
  return <div className="application-detail stack" data-draft-id={draft.id}>
    <h2>{titles[draft.data.application.code]}</h2><p>{nameOf(draft.data)}{draft.data.childrenUnder14?.length ? ` · 带${draft.data.childrenUnder14.map((child) => nameOf({ ...draft.data, person: child })).join('、')}` : ''}</p>
    <small>{type?.nameIt} · {draft.data.application.code}</small>
    <p>已完成 {p.filled} / {p.total} 项 · {p.percent}%</p><p className="hint">{complete ? '已全部填好，可以生成参考件' : `下一节：${stepsFor(draft.data)[draft.step]?.title}`}</p>
    <button className="primary" onClick={draft.generatedAt || complete ? reference : proceed}>{draft.generatedAt ? '查看参考件' : complete ? '生成参考件' : '继续填写'}</button>
    <div className="detail-actions"><button className="secondary" onClick={complete || draft.generatedAt ? proceed : reference}>{complete || draft.generatedAt ? '修改填写' : '参考件'}</button><button className="secondary" onClick={materials}>材料清单</button></div>
    <h3>要交的钱</h3>{costs ? <>{costs.bills.map((bill, index) => <p key={index}>{bill.owner === 'applicant' ? `主申请人 · ${nameOf(draft.data)}` : `子女 ${bill.childIndex! + 1} · ${nameOf({ ...draft.data, person: draft.data.childrenUnder14?.[bill.childIndex!] })}`}：{bill.amountCents == null ? '待补全资料' : money(bill.amountCents)}</p>)}<p>邮局邮寄费：{money(businessData.fees.postageCents)}</p>{!costs.stampExempt && <p>印花税票：{money(businessData.fees.stampCents)}</p>}</> : <p>补全资料后显示金额</p>}
    <small>如不确定，请在邮局窗口确认</small><button className="text-action" onClick={duplicate}>复制为新申请</button><button className="text-action danger-text" onClick={remove}>删除这份申请</button>
  </div>
}


export function ApplicationsHome({ store, selected, select, edit, create }: { store: Store; selected: string; select: (draft: Draft) => void; edit: (member: Member) => void; create: () => void }) {
  const [filter, setFilter] = useState('all'), [search, setSearch] = useState('')
  const visible = (draft: Draft) => filter === 'all' || (filter === 'generated' ? !!draft.generatedAt : !draft.generatedAt)
  const row = (draft: Draft) => <button key={draft.id} className="list-row application-card application-row" data-selected={draft.id === selected} onClick={() => select(draft)}><span><strong>{titles[draft.data.application.code]}</strong><small>{businessData.applicationTypes.types.find((type) => type.code === draft.data.application.code)?.nameIt}</small>{!!draft.data.childrenUnder14?.length && <small>带{draft.data.childrenUnder14.map((child) => nameOf({ ...draft.data, person: child })).join('、')}</small>}</span><span className="row-progress">{progress(draft.data).percent}%</span><span className="row-date"><span className="date-caption">居留到期：</span><span>{displayDate(draft.data.currentPermit?.validUntil) || '待填写'}</span></span><span className="badge">{draft.generatedAt ? '已生成' : '进行中'}</span><Icon name="arrow" /></button>
  const unnamed = store.drafts.filter((draft) => !isNamed(draft.data) && visible(draft))
  return <><header className="brand"><span className="brand-mark"><Icon name="document" /></span><span>居留填表助手</span></header>
    <div className="home-heading"><h1 className="home-title">我的申请</h1><button className="primary" onClick={create}><Icon name="plus" />新建申请</button></div>
    <div className="segments" aria-label="申请状态">{[['all', '全部'], ['active', '进行中'], ['generated', '已生成']].map(([value, label]) => <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value!)}>{label}</button>)}</div>
    {store.drafts.length > 5 && <label className="search-box"><Icon name="search" /><span className="sr-only">搜索姓名</span><input type="search" value={search} placeholder="搜索姓名" onChange={(event) => setSearch(event.target.value)} /></label>}
    {!store.drafts.length && <p className="notice">还没有申请，点击“新建申请”开始。</p>}
    {sortedPeople(store).filter((member) => isNamed(member.data) && nameOf(member.data).toLocaleLowerCase().includes(search.toLocaleLowerCase())).map((member) => {
      const drafts = store.drafts.filter((draft) => draft.profileId === member.id && isNamed(draft.data) && visible(draft))
      if (!drafts.length && filter !== 'all') return null
      return <section key={member.id} className="person-applications"><div className="person-heading"><h2>{nameOf(member.data)}</h2><button className="text-action" aria-label={'编辑资料 '+nameOf(member.data)} onClick={() => edit(member)}>编辑资料</button></div><div className="card group-card">{drafts.map(row)}{!drafts.length && <p className="notice">暂无申请</p>}</div></section>
    })}
    {!!unnamed.length && !search && <section className="person-applications"><h2>未填姓名</h2><div className="card group-card">{unnamed.map(row)}</div></section>}
    <p className="privacy-note">资料只在本机浏览器保存 · 参考件供照着手写</p>
  </>
}
export function ChoosePerson({ store, choose, back, resume, remove }: { store: Store; choose: (member?: Member) => void; back: () => void; resume: (draft: Draft) => void; remove: (member: Member) => void }) {
  const [search, setSearch] = useState('')
  const people = sortedPeople(store), named = people.filter((member) => isNamed(member.data)), unnamed = people.filter((member) => !isNamed(member.data))
  return <><Header title="给谁办？" back={back} /><button className="primary wide" onClick={() => choose()}><Icon name="plus" />新建一个人的申请</button>
    <h2>选择已有人员</h2>{named.length > 5 && <label className="search-box"><Icon name="search" /><span className="sr-only">搜索已有人员</span><input type="search" placeholder="搜索姓名" value={search} onChange={(event) => setSearch(event.target.value)} /></label>}
    <section className="card group-card">{named.filter((member) => nameOf(member.data).toLocaleLowerCase().includes(search.toLocaleLowerCase())).map((member) => {
      const recent = store.drafts.filter((draft) => draft.profileId === member.id).sort((a,b) => b.updatedAt.localeCompare(a.updatedAt))[0]
      return <button className="list-row" key={member.id} onClick={() => choose(member)}><span><strong>{nameOf(member.data)}</strong><small>{displayDate(member.data.person?.birthDate) || '出生日期未填'}{recent ? ' · '+titles[recent.data.application.code] : ''}</small></span><Icon name="arrow" /></button>
    })}{!named.length && <p className="hint">还没有已命名的人员资料</p>}</section>
    {!!unnamed.length && <details className="card"><summary>未填姓名的资料（{unnamed.length}）</summary>{unnamed.map((member) => {
      const draft = store.drafts.filter((d) => d.profileId === member.id).sort((a,b) => b.updatedAt.localeCompare(a.updatedAt))[0]
      return <div className="stack" key={member.id}><p>{draft ? titles[draft.data.application.code] : '未完成资料'} · {displayTime(draft?.updatedAt ?? member.updatedAt) || '未记录时间'}</p><button className="secondary" onClick={() => draft ? resume(draft) : choose(member)}>继续填写</button><button className="text-action danger-text" onClick={() => remove(member)}>删除</button></div>
    })}</details>}
  </>
}
