import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { exampleApplication } from '../../src/demo/applications'
import { seed, noOverflow } from './fixtures'
import { fillStep } from './fill-questionnaire'

async function openForm(page: Page, sample = exampleApplication('16'), step = 0) {
  await seed(page, step)
  await page.evaluate((data) => { const value = JSON.parse(localStorage.getItem('permesso-helper-v1')!); value.drafts[0].data = data; value.members[0].data = data; localStorage.setItem('permesso-helper-v1', JSON.stringify(value)) }, sample)
  await page.reload(); await page.locator('.application-card').click(); await page.getByRole('button', { name: '修改填写', exact: true }).click()
}
async function generate(page: Page) {
  for (let n = 0; n < 8; n++) {
    const last = page.getByRole('button', { name: '生成参考件', exact: true })
    if (await last.count()) { await last.click(); await expect(page.getByRole('link', { name: '下载 PDF' })).toBeVisible({ timeout: 60_000 }); await expect(page.locator('.preview-status')).toHaveText(''); return }
    await page.getByRole('button', { name: '保存并下一步', exact: true }).click(); await expect(page.locator('.error-summary')).toHaveCount(0)
  }
  throw new Error('Did not reach final questionnaire page')
}
async function manyPeople(page: Page) {
  await seed(page)
  await page.evaluate(() => {
    const value = JSON.parse(localStorage.getItem('permesso-helper-v1')!), base = value.drafts[0]
    value.members = []; value.drafts = []
    for (let i = 0; i < 53; i++) {
      const data = structuredClone(base.data); data.person = i < 50 ? { ...data.person, surname: 'ESEMPIO', givenNames: 'PERSONA '+String(i).padStart(2,'0'), birthDate: i === 1 ? '2016-01-01' : i === 2 ? '2008-01-01' : '1990-01-31' } : {}
      value.members.push({ id: 'person-'+i, role: 'applicant', data })
      value.drafts.push({ ...structuredClone(base), id:'draft-'+i, profileId:'person-'+i, data, updatedAt:'2026-11-06T12:'+String(i).padStart(2,'0')+':00Z' })
    }
    localStorage.setItem('permesso-helper-v1',JSON.stringify(value))
  }); await page.reload()
}
async function saved(page: Page) { return page.evaluate(() => JSON.parse(localStorage.getItem('permesso-helper-v1')!)) }

test('D54 50 people: new entry first, searchable named people, folded unnamed records and no family assumptions', async ({ page }) => {
  await manyPeople(page)
  await page.getByRole('button', { name: '新建申请', exact: true }).click()
  const create = page.getByRole('button', { name: '新建一个人的申请', exact: true })
  expect((await create.boundingBox())!.y).toBeLessThan(400)
  await expect(page.getByText('未填姓名的资料（3）')).toBeVisible()
  await expect(page.getByRole('button', { name:'继续填写', exact:true })).toHaveCount(0)
  await page.getByRole('searchbox', { name:'搜索已有人员' }).fill('PERSONA 00')
  await expect(page.locator('.group-card .list-row')).toHaveCount(1)
  await page.locator('.group-card .list-row').click()
  await page.getByRole('button', { name:/工作居留续签 Lavoro subordinato$/ }).click()
  // The chosen person's data is prefilled, but work is a new application.
  const sample = exampleApplication('16'); sample.person!.surname='ESEMPIO'; sample.person!.givenNames='PERSONA 00'
  for (let i=0;i<4;i++) { await fillStep(page,sample); await page.getByRole('button',{name:'保存并下一步',exact:true}).click(); await expect(page.locator('.error-summary')).toHaveCount(0) }
  await expect(page.getByRole('button',{name:'选择／添加子女'})).toBeVisible()
  await expect(page.getByText('ESEMPIO PERSONA 49',{exact:true})).toHaveCount(0)
  await page.getByRole('button',{name:'选择／添加子女'}).click()
  await page.getByRole('searchbox',{name:'搜索人员'}).fill('PERSONA 00')
  await expect(page.getByRole('dialog').getByRole('button',{name:/ESEMPIO PERSONA 00/})).toHaveCount(0)
  await page.getByRole('searchbox',{name:'搜索人员'}).fill('PERSONA 02')
  await expect(page.getByRole('button',{name:/ESEMPIO PERSONA 02/})).toBeDisabled()
  await expect(page.getByRole('dialog')).toContainText('年满 14 岁，要另建申请')
  await page.getByRole('searchbox',{name:'搜索人员'}).fill('PERSONA 01')
  await page.getByRole('button',{name:/ESEMPIO PERSONA 01/}).click()
  await expect(page.getByRole('dialog')).toContainText('是 ESEMPIO PERSONA 00 的子女')
  await page.getByRole('button',{name:'确认',exact:true}).click()
  expect((await saved(page)).drafts.at(-1).relations[0]).toMatchObject({personId:'person-1',relation:'child',purpose:'section'})
  await noOverflow(page)
})

test('D54 keyboard Questura/province, visible required markers and focus each missing field', async ({ page }) => {
  await openForm(page)
  const office = page.locator('#q-questura-city'); await office.focus(); await page.keyboard.type('lu')
  await expect(page.getByRole('option').first()).toContainText('LU · LUCCA')
  await page.keyboard.press('Enter'); await expect(office).toContainText('LUCCA')
  await expect(page.getByText('表头省份缩写：LU')).toBeVisible()
  const birth = page.locator('#q-currentPermit-validUntil'); await birth.getByRole('textbox').first().fill('')
  await page.locator('#q-currentPermit-number').fill('')
  await page.getByRole('button',{name:'保存并下一步',exact:true}).click()
  await expect(page.locator('.error-summary')).toContainText('有 2 处')
  await expect(page.locator('#q-currentPermit-number')).toBeFocused()
  await page.locator('.error-summary a').last().click(); await expect(birth.getByRole('textbox').first()).toBeFocused()
  await expect(office).toContainText('LUCCA')
  await page.locator('#q-currentPermit-number').fill('DEMO0000000'); await birth.getByRole('textbox').first().fill('31')
  await page.getByRole('button',{name:'保存并下一步',exact:true}).click(); await page.getByRole('button',{name:'保存并下一步',exact:true}).click()
  const province=page.locator('#q-address-province'); await province.focus(); await page.keyboard.type('po'); await page.keyboard.press('Enter'); await expect(province).toContainText('PO · PRATO')
})

test('D54 employee -> self-employed -> employee keeps draft answers and hides unrelated questions', async ({ page }) => {
  const sample=exampleApplication('24'); sample.work!.hiredThisYear=true; sample.income!.taxForm='unico-pf'; sample.income!.bustaPaga=true; sample.income!.monthlyCents=120000
  await openForm(page,sample,3)
  await expect(page.locator('#q-work-contract')).toBeVisible()
  await page.getByRole('button',{name:'保存并下一步',exact:true}).click()
  await expect(page.locator('#q-income-monthlyCents')).toHaveValue('1200')
  await expect(page.locator('#q-income-autonomoStartedThisYear')).toHaveCount(0)
  await page.locator('.stepper button').nth(3).click()
  await page.locator('#q-work-type input[value="autonomo"]').check()
  await page.locator('#q-work-autonomoForm input[value="titolare"]').check()
  await page.getByRole('button',{name:'保存并下一步',exact:true}).click()
  await expect(page.locator('#q-work-hiredThisYear')).toHaveCount(0)
  await expect(page.locator('#q-income-bustaPaga')).toHaveCount(0)
  await expect(page.locator('#q-income-monthlyCents')).toHaveCount(0)
  await page.locator('#q-income-autonomoStartedThisYear input[value="true"]').check()
  await generate(page)
  await page.getByRole('button',{name:'返回',exact:true}).click(); await page.locator('.stepper button').nth(3).click()
  await page.locator('#q-work-type input[value="subordinato"]').check()
  await expect(page.locator('#q-employer-name')).toHaveValue('Impresa Fittizia Esempio')
  await page.getByRole('button',{name:'保存并下一步',exact:true}).click(); await expect(page.locator('#q-income-monthlyCents')).toHaveValue('1200')
  expect((await saved(page)).drafts[0].data.work.contract).toBe('determinato')
})

test('D54 first issue/renewal switches visible permit and visa without deleting either', async ({ page }) => {
  const a=exampleApplication('24','rilascio'); a.currentPermit={number:'DEMO0000000',typeCode:'24',validUntil:'2026-12-31'}
  await openForm(page,a)
  await expect(page.locator('#q-visa-number')).toHaveValue('DEMO0001')
  await page.getByRole('radio',{name:'续签 · Rinnovo',exact:true}).check()
  await expect(page.locator('#q-visa-number')).toHaveCount(0)
  await expect(page.locator('#q-currentPermit-number')).toHaveValue('DEMO0000000')
  await page.getByRole('radio',{name:'第一次申请 · Rilascio',exact:true}).check()
  await expect(page.locator('#q-visa-number')).toHaveValue('DEMO0001')
  await generate(page)
})

test('D54 other mailing address stays saved when turned off and required fields are checked', async ({ page }) => {
  await openForm(page,exampleApplication('16'),2)
  await page.getByRole('radio',{name:'使用其他地址',exact:true}).check()
  await page.getByRole('button',{name:'保存并下一步',exact:true}).click()
  await expect(page.locator('.error-summary')).toContainText('有 4 处')
  await page.locator('#q-mailTo-province').click(); await page.getByRole('combobox').fill('PO'); await page.getByRole('option').filter({has:page.locator('small',{hasText:/^PO$/})}).click()
  await page.locator('#q-mailTo-comune').fill('CITTA FITTIZIA'); await page.locator('#q-mailTo-street').fill('VIA ESEMPIO'); await page.locator('#q-mailTo-cap').fill('00000')
  await page.getByRole('radio',{name:'与住址相同',exact:true}).check(); await expect(page.locator('#q-mailTo-cap')).toHaveCount(0)
  await page.getByRole('radio',{name:'使用其他地址',exact:true}).check(); await expect(page.locator('#q-mailTo-cap')).toHaveValue('00000')
  await page.getByRole('radio',{name:'与住址相同',exact:true}).check(); await generate(page)
  expect((await saved(page)).drafts[0].data.mailTo.cap).toBe('00000')
})

test('D54 explicit spouse own-application, person export and confirmed delete preserve other snapshots', async ({ page }) => {
  await manyPeople(page)
  await page.locator('.application-card').first().click(); await page.getByRole('button',{name:'修改填写',exact:true}).click()
  await page.locator('.stepper button').nth(3).click(); await page.getByRole('button',{name:'保存并下一步',exact:true}).click()
  await expect(page.getByRole('button',{name:'选择／添加配偶'})).toHaveCount(0)
  await page.getByRole('button',{name:'为配偶另建申请'}).click(); await page.getByRole('searchbox',{name:'搜索人员'}).fill('PERSONA 04')
  await page.getByRole('button',{name:/ESEMPIO PERSONA 04/}).click(); await expect(page.getByRole('dialog')).toContainText('另建一份申请')
  await page.getByRole('button',{name:'确认',exact:true}).click(); await page.getByRole('button',{name:/工作居留续签 Lavoro subordinato$/}).click()
  const store=await saved(page), created=store.drafts.at(-1), source=store.drafts.find((d:{id:string})=>d.id===store.drafts.find((d:{relations?:unknown[]})=>d.relations?.length)?.id)
  expect(created.data.relatedApplication.spouse).toBe(true); expect(source.data.relatedApplication.spouse).toBe(true)
  await page.getByRole('button',{name:'返回',exact:true}).click(); await page.getByRole('button',{name:'返回',exact:true}).click()
  await page.getByRole('button',{name:'我的',exact:true}).click()
  await page.getByRole('button',{name:'按人导出',exact:true}).click(); await page.getByRole('searchbox',{name:'搜索人员'}).fill('PERSONA 04')
  await page.getByRole('button',{name:/ESEMPIO PERSONA 04/}).click()
  const pending=page.waitForEvent('download'); await page.getByRole('button',{name:'导出 1 人',exact:true}).click(); await (await pending).saveAs('output/p3-form-people/selected-person.json')
  await page.getByRole('button',{name:'删除某人',exact:true}).click(); await page.getByRole('searchbox',{name:'搜索人员'}).fill('PERSONA 04'); await page.getByRole('button',{name:/ESEMPIO PERSONA 04/}).click(); await page.getByRole('button',{name:'继续删除 1 人',exact:true}).click()
  await expect(page.getByRole('dialog')).toContainText('已复制的家属信息会保留')
  await page.getByRole('button',{name:'确认删除人员和申请'}).click(); expect((await saved(page)).members.some((m:{id:string})=>m.id==='person-4')).toBe(false)
})

test('D54 old backups: import roles and snapshots, export again, and no automatic relationship in a new application', async ({ page }) => {
  await seed(page)
  const legacy=await saved(page)
  legacy.members[0].role='spouse'; delete legacy.drafts[0].data.mailToDifferent
  legacy.drafts[0].data.application={...legacy.drafts[0].data.application,code:'30',operation:'rilascio'}
  legacy.members[0].data.application=structuredClone(legacy.drafts[0].data.application)
  await page.getByRole('button',{name:'我的',exact:true}).click()
  await page.getByLabel('导入备份文件').setInputFiles({name:'fictional-legacy.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(legacy))})
  await page.getByRole('button',{name:'确认替换'}).click()
  const upgraded=await saved(page)
  expect(upgraded.drafts[0].data.application.operation).toBe('conversione'); expect(upgraded.members[0].role).toBeUndefined()
  const pending=page.waitForEvent('download'); await page.getByRole('button',{name:'导出备份文件',exact:true}).click(); await (await pending).saveAs('output/p3-form-people/upgraded-backup.json')
  await page.getByRole('button',{name:'首页',exact:true}).click(); await page.getByRole('button',{name:'新建申请',exact:true}).click(); await page.locator('.group-card .list-row').first().click(); await page.getByRole('button',{name:/工作居留续签 Lavoro subordinato$/}).click()
  expect((await saved(page)).drafts.at(-1).relations ?? []).toEqual([])
})

test('D54 child confirmation validates partial dates and older children get their own linked application', async ({ page }) => {
  await manyPeople(page)
  await page.locator('.application-card').first().click(); await page.getByRole('button',{name:'修改填写',exact:true}).click(); for (let i=0;i<4;i++) await page.getByRole('button',{name:'保存并下一步',exact:true}).click()
  await page.getByRole('button',{name:'选择／添加子女'}).click(); await page.getByRole('searchbox',{name:'搜索人员'}).fill('PERSONA 01'); await page.getByRole('button',{name:/ESEMPIO PERSONA 01/}).click()
  await page.getByRole('dialog').locator('#q-person-birthDate').getByRole('textbox').first().fill('0')
  await page.getByRole('button',{name:'确认',exact:true}).click()
  await expect(page.getByRole('dialog')).toBeVisible(); expect((await saved(page)).drafts[0].relations ?? []).toEqual([])
  await page.getByRole('dialog').locator('#q-person-birthDate').getByRole('textbox').first().fill('01'); await page.getByRole('button',{name:'确认',exact:true}).click()
  expect((await saved(page)).drafts.find((d:{relations?:unknown[]})=>d.relations?.length).data.childrenUnder14).toHaveLength(1)
  await page.getByRole('button',{name:'选择／添加子女'}).click(); await page.getByRole('searchbox',{name:'搜索人员'}).fill('PERSONA 02')
  await page.getByRole('button',{name:'为 TA 另建申请',exact:true}).click(); await page.getByRole('button',{name:'确认',exact:true}).click(); await page.getByRole('button',{name:/工作居留续签 Lavoro subordinato$/}).click()
  expect((await saved(page)).drafts.at(-1).data.relatedApplication.parent).toBe(true)
})

test('D54 copying from a newly added person never asks for a family relationship', async ({ page }) => {
  await openForm(page,exampleApplication('16'),2)
  await page.getByRole('button',{name:'从另一人复制住址、电话'}).click(); await page.getByRole('button',{name:'＋ 添加新的人'}).click()
  await page.locator('#q-person-surname').fill('ESEMPIO'); await page.locator('#q-person-givenNames').fill('COPIA FITTIZIA'); await page.locator('#q-address-comune').fill('COMUNE FITTIZIO')
  await page.getByRole('button',{name:'保存资料'}).click()
  await expect(page.getByRole('dialog')).not.toContainText('配偶'); await page.getByRole('button',{name:'确认',exact:true}).click()
  await page.getByRole('checkbox',{name:'住址',exact:true}).check(); await page.getByRole('button',{name:'确认复制 1 项'}).click()
  await expect(page.locator('#q-address-comune')).toHaveValue('COMUNE FITTIZIO')
  expect((await saved(page)).drafts[0].relations ?? []).toEqual([])
})

test('D54 09 spouse section is explicit and the same spouse remains available for an own application', async ({ page }) => {
  await openForm(page,exampleApplication('09'))
  await page.getByRole('button',{name:'返回',exact:true}).click()
  await page.evaluate(() => { const value=JSON.parse(localStorage.getItem('permesso-helper-v1')!), data=structuredClone(value.drafts[0].data); data.person.surname='CONIUGE'; data.person.givenNames='FITTIZIO'; value.members.push({id:'fictional-spouse',data}); localStorage.setItem('permesso-helper-v1',JSON.stringify(value)) })
  await page.reload(); await page.locator('.application-card').click(); await page.getByRole('button',{name:'修改填写',exact:true}).click(); for (let i=0;i<4;i++) await page.getByRole('button',{name:'保存并下一步',exact:true}).click()
  await page.getByRole('button',{name:'选择／添加配偶'}).click(); await page.getByRole('button',{name:/CONIUGE FITTIZIO/}).click()
  await expect(page.getByRole('dialog')).toContainText('配偶，把 TA 的资料填进第 11 节'); await page.getByRole('button',{name:'确认',exact:true}).click()
  await expect(page.locator('#q-spouse-surname')).toHaveValue('CONIUGE')
  await page.getByRole('button',{name:'为配偶另建申请'}).click(); await expect(page.getByRole('button',{name:/CONIUGE FITTIZIO/})).toBeVisible(); await page.keyboard.press('Escape')
  await generate(page)
})

test('D54 three legacy roles stay independent through import, generation and backup round-trip', async ({ page }) => {
  await seed(page)
  const a=exampleApplication('09'), b=exampleApplication('16'), c=exampleApplication('16')
  a.person!.surname='PRIMO'; b.person!.surname='SECONDO'; c.person!.surname='TERZO'; c.person!.birthDate='2016-01-01'
  const snapshot=(data:typeof a) => { const {surname,givenNames,sex,birthDate,birthCountry,citizenship,birthCity}=data.person!; return {surname,givenNames,sex,birthDate,birthCountry,citizenship,birthCity} }
  a.spouse=snapshot(b); b.childrenUnder14=[snapshot(c)]
  const legacy={version:1,familyIntroDismissed:true,members:[a,b,c].map((data,i)=>({id:'legacy-'+i,role:['applicant','spouse','child'][i],data})),drafts:[a,b].map((data,i)=>({id:'legacy-draft-'+i,profileId:'legacy-'+i,data,step:0,completed:['application','person','address','work'],checks:[],updatedAt:'2026-11-06T12:00:00Z'}))}
  await page.getByRole('button',{name:'我的',exact:true}).click()
  await page.getByLabel('导入备份文件').setInputFiles({name:'legacy-three-fictional.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(legacy))}); await page.getByRole('button',{name:'确认替换'}).click()
  let store=await saved(page); expect(store.members).toHaveLength(3); expect(store.drafts).toHaveLength(2)
  expect(store.drafts[0].data.spouse).toEqual(a.spouse); expect(store.drafts[1].data.childrenUnder14).toEqual(b.childrenUnder14)
  await page.getByRole('button',{name:'首页',exact:true}).click()
  for (const title of ['首次申请长期居留','工作居留续签']) {
    const card=page.locator('.application-card').filter({hasText:title})
    if (await card.count()) await card.click(); else await page.locator('.application-card').first().click()
    await page.getByRole('button',{name:'修改填写',exact:true}).click(); await generate(page)
    await page.getByRole('button',{name:'返回',exact:true}).click(); await page.getByRole('button',{name:'返回',exact:true}).click(); await page.getByRole('button',{name:'返回',exact:true}).click()
  }
  await page.getByRole('button',{name:'我的',exact:true}).click(); const pending=page.waitForEvent('download'); await page.getByRole('button',{name:'导出备份文件',exact:true}).click(); const backup=await pending, path=await backup.path(); const buffer=readFileSync(path!)
  await page.getByLabel('导入备份文件').setInputFiles({name:'roundtrip-fictional.json',mimeType:'application/json',buffer}); await page.getByRole('button',{name:'确认替换'}).click()
  store=await saved(page); expect(store.members).toHaveLength(3); expect(store.members.every((m:{role?:string})=>!m.role)).toBe(true)
  await page.getByRole('button',{name:'首页',exact:true}).click(); await page.getByRole('button',{name:'新建申请',exact:true}).click(); await page.getByRole('button',{name:/TERZO/}).click(); await page.getByRole('button',{name:/工作居留续签 Lavoro subordinato$/}).click()
  const sample=exampleApplication('16'); sample.person=c.person
  for(let i=0;i<4;i++){await fillStep(page,sample);await page.getByRole('button',{name:'保存并下一步',exact:true}).click()}
  expect((await saved(page)).drafts.at(-1).relations ?? []).toEqual([]); await expect(page.getByRole('button',{name:'移除子女 1'})).toHaveCount(0)
})
