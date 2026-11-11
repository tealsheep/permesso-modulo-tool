import { useState } from 'react'
import type { Member, Store } from '../storage/store'
import { sortedPeople, isNamed } from '../storage/people'
import { displayDate, nameOf, today } from './format'
import { age, personFields } from './questionnaire'
import { Modal, Field } from './components'
import { parseDate } from '../engine/dates'
import { useDateDrafts } from './date-drafts'
export type PickerMode = 'spouse' | 'child' | 'own-spouse' | 'own-child' | 'copy' | 'export' | 'delete'
export function PersonPicker({ store, mode, applicant, exclude = [], initial, close, choose, add, createOwn }: {
  store: Store; mode: PickerMode; applicant?: Member; exclude?: string[]; initial?: string; close: () => void; choose: (people: Member[]) => void; add?: () => void; createOwn?: (member: Member) => void
}) {
  const dateDrafts = useDateDrafts()
  const [dateError, setDateError] = useState('')
  const [search, setSearch] = useState(''), [selected, setSelected] = useState<string[]>([])
  const [candidate, setCandidateState] = useState<Member | null>(() => store.members.find((member) => member.id === initial) ?? null)
  // Decided once when a person is opened, so the name inputs stay while the user types.
  const [askName, setAskName] = useState(() => { const first = store.members.find((member) => member.id === initial); return !!first && !isNamed(first.data) })
  const setCandidate = (member: Member | null) => { setCandidateState(member); if (member?.id !== candidate?.id) setAskName(!!member && !isNamed(member.data)) }
  const multi = mode === 'export' || mode === 'delete'
  const people = sortedPeople(store).filter((member) => !exclude.includes(member.id) && (multi || isNamed(member.data)))
  const fullName = applicant ? nameOf(applicant.data) : '当前申请人'
  const childAge = candidate?.data.person?.birthDate && parseDate(candidate.data.person.birthDate) ? age(candidate.data.person.birthDate, today()) : null
  const valid = !!candidate && isNamed(candidate.data) && (mode === 'child' ? childAge !== null && childAge >= 0 && childAge < 14 : mode === 'own-child' ? childAge !== null && childAge >= 14 : true)
  const select = (member: Member) => { if (multi) setSelected((ids) => ids.includes(member.id) ? ids.filter((id) => id !== member.id) : [...ids, member.id]); else if (mode === 'copy') choose([member]); else setCandidate(member) }
  const confirm = candidate && (mode === 'copy' ? '从 '+nameOf(candidate.data)+' 复制住址、电话到当前申请' : mode.startsWith('own-') ? '为 '+nameOf(candidate.data)+' 另建一份申请，和 '+fullName+' 的申请关联' : '确认：'+nameOf(candidate.data)+' 是 '+fullName+' 的'+(mode === 'child' ? '子女，把 TA 的资料填进第 12 节' : '配偶，把 TA 的资料填进第 11 节'))
  return <Modal title={multi ? mode === 'export' ? '按人导出' : '删除某人' : '选择人员'} close={close} sheet>
    {candidate ? <><p>{confirm}</p>{askName && personFields().slice(0,2).map((field) => <Field key={field.path} field={field} data={candidate.data} update={(path,value) => setCandidate({ ...candidate, data: { ...candidate.data, person: { ...candidate.data.person, [path.split('.').at(-1)!]: value } } })} blur={() => {}} />)}{(mode === 'child' || mode === 'own-child') && <Field field={{ path: 'person.birthDate', label: '出生日期', paper: '用于确认年龄', hint: '未满 14 岁写入本申请；年满 14 岁另建申请。', type: 'date', required: true }} data={candidate.data} update={(_, value) => setCandidate({ ...candidate, data: { ...candidate.data, person: { ...candidate.data.person, birthDate: value as string | null } } })} blur={() => {}} />}
      {dateError && <p role="alert" className="field-error">{dateError}</p>}{!valid && <p className="notice">{!isNamed(candidate.data) ? '请先填写姓或名' : mode === 'child' && childAge !== null && childAge >= 14 ? '年满 14 岁，要另建申请' : '请补填符合此用途的出生日期'}</p>}
      <div className="dialog-actions"><button className="secondary" onClick={() => setCandidate(null)}>返回</button><button className="primary" disabled={!valid} onClick={() => { const errors = dateDrafts.validate(); setDateError(errors.map((e) => e.message).join('；')); if (!errors.length) choose([candidate]) }}>确认</button></div></> : <>
      {add && <button className="primary wide" onClick={add}>＋ 添加新的人</button>}
      <label className="search-box"><span className="sr-only">搜索人员</span><input type="search" placeholder="搜索姓名" value={search} onChange={(event) => setSearch(event.target.value)} /></label>
      <div className="stack">{people.filter((member) => nameOf(member.data).toLocaleLowerCase().includes(search.toLocaleLowerCase())).map((member) => {
        const birth = member.data.person?.birthDate, over = mode === 'child' && !!birth && age(birth, today()) >= 14
        return <div key={member.id}><button className="list-row" disabled={over} aria-pressed={multi ? selected.includes(member.id) : undefined} onClick={() => select(member)}><span><strong>{nameOf(member.data)}</strong><small>{displayDate(birth) || '出生日期未填'}</small>{over && <small>年满 14 岁，要另建申请</small>}</span>{multi && selected.includes(member.id) && <span>已选择</span>}</button>{over && createOwn && <button className="text-action" onClick={() => createOwn(member)}>为 TA 另建申请</button>}</div>
      })}</div>
      {multi && <button className="primary wide" disabled={!selected.length} onClick={() => choose(people.filter((member) => selected.includes(member.id)))}>{mode === 'export' ? '导出' : '继续删除'} {selected.length} 人</button>}
    </>}
  </Modal>
}
