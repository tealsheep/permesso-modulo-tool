import { useState } from 'react'
import type { Member, Store } from '../storage/store'
import { addressFields, personFields, questionErrors, setAnswer, stepsFor } from './questionnaire'
import type { FormError, Section } from './questionnaire'
import { Header, Modal, SectionCard, SectionHelpContent } from './components'
import { nameOf, today } from './format'
import { mergeDateErrors, useDateDrafts } from './date-drafts'

export function MemberPage({ member, setMember, back, save }: { member: Member; setMember: (m: Member) => void; back: () => void; save: (m: Member) => void }) {
  const dateDrafts = useDateDrafts()
  const [errors, setErrors] = useState<FormError[]>([]), [help, setHelp] = useState<Section | null>(null)
  const sections: Section[] = [{ title: '个人资料', icon: 'person', fields: personFields().map((f) => ({ ...f, required: false })) },
    { title: '护照与居留', icon: 'document', fields: stepsFor(member.data).filter((s) => ['application', 'person'].includes(s.id)).flatMap((s) => s.sections.filter((s) => ['现有居留', '身份证件'].includes(s.title)).flatMap((s) => s.fields)).map((q) => ({ ...q, required: false })) },
    { title: '共同住址与联系', icon: 'home', fields: [...addressFields().map((q) => ({ ...q, required: false })), ...stepsFor(member.data).find((s) => s.id === 'address')!.sections.find((s) => s.title === '联系方式')!.fields] }]
  return <><Header title="编辑资料" back={back} /><p className="hint">可以先保存部分资料，在申请问卷里补齐</p>
    {sections.map((s) => <SectionCard key={s.title} section={s} data={member.data} errors={errors} update={(path, value) => { const data = setAnswer(member.data, path, value); setMember({ ...member, data }); setErrors((v) => [...v.filter((e) => e.path !== path), ...questionErrors(data, sections.flatMap((s) => s.fields).filter((q) => q.path === path), today())]) }} blur={(path) => setErrors((v) => [...v.filter((e) => e.path !== path), ...questionErrors(member.data, sections.flatMap((s) => s.fields).filter((q) => q.path === path), today())])} help={setHelp} />)}
    {errors.length > 0 && <p role="alert" className="error-summary">有 {errors.length} 处资料需要修改，请检查标出的输入框</p>}
    <div className="bottom-bar form-actions"><button className="secondary" onClick={back}>取消</button><button className="primary" onClick={() => { const found = mergeDateErrors(questionErrors(member.data, sections.flatMap((s) => s.fields), today()), dateDrafts.validate()); setErrors(found); if (!found.length) save(member) }}>保存资料</button></div>
    {help && <Modal sheet title={help.title} close={() => setHelp(null)}><SectionHelpContent section={help} /><button className="primary wide" onClick={() => setHelp(null)}>知道了</button></Modal>}
  </>
}
export function CopyDialog({ store, target, sourceId, close, copy }: { store: Store; target: string; sourceId: string; close: () => void; copy: (source: string, target: string, keys: string[]) => void }) {
  const [keys, setKeys] = useState<string[]>([])
  const source = store.members.find((member) => member.id === sourceId)
  return <Modal title="复制住址、电话" close={close}><p>从 {source ? nameOf(source.data) : '另一人'} 复制到当前申请。姓名、护照和税号不会被复制。</p><div className="field"><div className="choice-options">{[['address','住址'],['phone','电话'],['email','邮箱'],['questura','受理地']].map(([value,label]) => <label key={value}><input type="checkbox" checked={keys.includes(value!)} onChange={(event) => setKeys(event.target.checked ? [...keys,value!] : keys.filter((key) => key !== value))} /><span>{label}</span></label>)}</div></div><button className="primary wide" disabled={!source || !keys.length} onClick={() => copy(sourceId,target,keys)}>确认复制 {keys.length} 项</button></Modal>
}
