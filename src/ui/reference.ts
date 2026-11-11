import sourceUrl from '../../official/2026-11-05_Modulo_1.pdf?url'
import slipUrl from '../../official/2026-11-05_bollettino_TD674_user_sample.jpg?url'
import { PDFDocument, rgb } from 'pdf-lib'
import { modulo2Layout } from '../data/catalog'
import { businessData } from '../data/business'
import type { PreparedKit } from '../engine/prepare'
import { renderApplication } from '../render/application'
import { referenceFont, textSheets } from '../render/text-sheets'

const assetsPromise = Promise.all([sourceUrl, slipUrl].map(async (url) => {
  const r = await fetch(url)
  if (!r.ok) throw new Error('表格资源加载失败，请刷新重试')
  return new Uint8Array(await r.arrayBuffer())
}))
// Eagerly cache local assets so subsequent form generation works without requests.
void assetsPromise.catch(() => undefined)
export const money = (cents: number) => `€${(cents / 100).toFixed(2).replace('.', ',')}`
export const instructions = [
  '参考件只供照着手写，不用于打印提交。',
  '用黑色笔，全部大写字母，一格一个字，写在格子里。写错请换新表，不涂改。',
  'Modulo 1 第 1 页底部 FIRMA 签名，DATA 填交表当天日期。',
  '€16 印花税票贴在第 1 页上方中间 MARCA DA BOLLO 框。右上角 Codice Istanza 留给邮局，不要贴、不要写。',
  '信封不封口，交给邮局窗口检查。金额如不确定，请在邮局窗口确认。',
]
export type ReferencePage = { group: string; name: string }
export const instructionsFor = (stampExempt: boolean) => stampExempt ? instructions.filter((_, index) => index !== 3) : instructions
export type Reference = { stampExempt: boolean; bytes: Uint8Array; pages: ReferencePage[]; warnings: string[] }

export async function generateReference(kit: PreparedKit): Promise<Reference> {
  const [modulo1Pdf, bollettinoImage] = await assetsPromise
  const rendered = await renderApplication(kit, { modulo1Pdf: modulo1Pdf!, bollettinoImage: bollettinoImage! }, modulo2Layout)
  const type = businessData.applicationTypes.types.find((t) => t.code === kit.application.application.code)!
  const coverParagraphs = [
    ...instructionsFor(kit.stampExempt).map((p, i) => `${i + 1}. ${p}`),
    `本次申请：${type.nameZh} · ${type.nameIt}`,
    `申请人：${kit.application.person?.surname ?? ''} ${kit.application.person?.givenNames ?? ''}`,
    `表格：${kit.forms.map((f) => f.definition.form === 'modulo1' ? 'Modulo 1' : 'Modulo 2（重画版，无国徽）').join('、')}`,
    `未满 14 岁子女：${kit.application.childrenUnder14?.length ?? 0} 人；配偶和年满 14 岁子女各自另建申请。`,
    `缴费单：${kit.bills.map((b) => b.amountCents == null ? '待确认' : money(b.amountCents)).join(' + ')}；邮局窗口另付 ${money(businessData.fees.postageCents)}${kit.stampExempt ? '' : `；印花税票 ${money(businessData.fees.stampCents)}`}。`,
    `表格与规则核实日期：${businessData.applicationTypes.verifiedOn}。如不确定，请在邮局窗口确认。`,
  ]
  const materialParagraphs = [
    `${type.nameZh} · ${type.nameIt}`,
    ...kit.materials.map((m, i) => `□ ${i + 1}. ${m.nameZh} / ${m.nameIt}${m.notice ? ` · ${m.notice}` : ''}`),
    '材料要求可能更新，以当地 Questura、Poste Italiane 和 portaleimmigrazione.it 的最新要求为准。',
  ]
  const pdf = await PDFDocument.create()
  const font = await referenceFont(pdf, [...coverParagraphs, ...materialParagraphs].join('\n'))
  const pages: ReferencePage[] = []
  const coverCount = textSheets(pdf, font, '填写须知', coverParagraphs)
  for (let i = 0; i < coverCount; i++) pages.push({ group: '须知', name: `填写须知 ${i + 1}` })
  const source = await PDFDocument.load(rendered.bytes)
  const copied = await pdf.copyPages(source, source.getPageIndices()); copied.forEach((p) => pdf.addPage(p))
  // D37: emphasize only the stamp box, without covering the original label.
  if (!kit.stampExempt) copied[0]?.drawRectangle({ x: 221.5, y: 660, width: 156, height: 71, borderColor: rgb(181 / 255, 83 / 255, 42 / 255), borderWidth: 1.5 })
  for (const doc of rendered.documents) {
    const group = doc.form === 'modulo1' ? 'Modulo 1' : doc.form === 'modulo2' ? 'Modulo 2' : '缴费单'
    for (let i = 0; i < doc.pages; i++) pages.push({ group, name: `${group}${doc.childIndex != null ? ` · 子女 ${doc.childIndex + 1}` : ''} · 第 ${i + 1} 页` })
  }
  const materialCount = textSheets(pdf, font, '材料清单', materialParagraphs)
  for (let i = 0; i < materialCount; i++) pages.push({ group: '材料', name: `材料清单 ${i + 1}` })
  return { stampExempt: kit.stampExempt, bytes: await pdf.save(), pages, warnings: [...kit.warnings.map((w) => w.message), ...rendered.warnings.map((w) => w.message)] }
}
