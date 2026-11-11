import { expect, test } from '@playwright/test'
import { seed, form, noOverflow } from './fixtures'

for (const width of [390, 1280]) {
  test(`D43 review application primary action follows completion and generation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 }); await seed(page, 1)
    if (width < 1024) await page.locator('.application-card').click()
    const detail = page.locator('.application-detail')
    await expect(detail).toContainText('已全部填好，可以生成参考件')
    await expect(detail).not.toContainText('下一节：')
    await detail.getByRole('button', { name: '生成参考件', exact: true }).click()
    await expect(page.getByRole('link', { name: '下载 PDF' })).toBeVisible({ timeout: 60000 })
    await page.getByRole('button', { name: '返回', exact: true }).click()
    await expect(detail.getByRole('button', { name: '查看参考件', exact: true })).toBeVisible()
    await detail.getByRole('button', { name: '修改填写', exact: true }).click()
    await expect(page.locator('#q-person-surname')).toHaveValue('Ésempio')
    await page.locator('#q-person-surname').fill('')
    await page.getByRole('button', { name: '返回', exact: true }).click()
    await expect(detail).toContainText('下一节：个人与护照')
    await expect(detail).not.toContainText('已全部填好')
    await detail.getByRole('button', { name: '继续填写', exact: true }).click()
    await expect(page.locator('#q-person-surname')).toHaveValue('')
  })
}

test('D43 review desktop current navigation and opaque form footer while scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 1000 }); await seed(page)
  const nav = page.getByRole('navigation', { name: '电脑端导航' })
  await expect(nav.locator('[aria-current=page]')).toHaveText('我的申请')
  const currentStyle = await nav.locator('[aria-current=page]').evaluate((element) => {
    const style = getComputedStyle(element)
    return { color: style.color, shadow: style.boxShadow }
  })
  await nav.getByRole('button', { name: '我的', exact: true }).click()
  await expect(nav.locator('[aria-current=page]')).toHaveText('我的')
  await nav.getByRole('button', { name: '我的申请', exact: true }).click()
  await page.getByRole('button', { name: '修改填写', exact: true }).click()
  expect(await page.locator('.vertical-steps button[aria-current]').evaluate((element) => {
    const style = getComputedStyle(element)
    return { color: style.color, shadow: style.boxShadow }
  })).toEqual(currentStyle)
  for (const width of [900, 1280]) {
    await page.setViewportSize({ width, height: 1000 })
    await page.locator('.bottom-bar').evaluate((bar) => {
      // Put a real field label under the gap between the two footer buttons.
      const field = document.querySelector('.field:last-child')!
      window.scrollBy(0, field.getBoundingClientRect().top - bar.getBoundingClientRect().top - 40)
    })
    const footer = page.locator('.bottom-bar')
    expect(await footer.evaluate((bar) => getComputedStyle(bar).backgroundColor)).toBe(await page.locator('body').evaluate(() => getComputedStyle(document.documentElement).backgroundColor))
    expect(await footer.evaluate((bar) => {
      const left = bar.children[0]!.getBoundingClientRect(), right = bar.children[1]!.getBoundingClientRect()
      return document.elementFromPoint((left.right + right.left) / 2, (left.top + left.bottom) / 2) === bar
    })).toBe(true)
    await noOverflow(page)
  }
})

test('D43 legacy members, new application, latest data, application actions and scoped materials', async ({ page }) => {
  await seed(page)
  await expect(page.getByRole('button', { name: '家人', exact: true })).toHaveCount(0)
  await expect(page.getByText('快捷操作', { exact: true })).toHaveCount(0)
  await page.getByRole('button', { name: '新建申请', exact: true }).click()
  await expect(page.getByRole('heading', { name: '给谁办？' })).toBeVisible()
  await page.getByRole('button', { name: /Ésempio Fittìzio/ }).click()
  await page.getByRole('button', { name: /自雇居留续签/ }).click()
  expect(await page.locator('.stepper [aria-current]').innerText()).toContain('申请信息')
  await page.getByRole('button', { name: '返回', exact: true }).click()
  await expect(page.getByText('已完成', { exact: false }).first()).toBeVisible()
  await page.getByRole('button', { name: '复制为新申请' }).click()
  await page.getByRole('button', { name: '删除这份申请' }).click()
  await page.getByRole('button', { name: '确认删除' }).click()
  await expect(page.locator('.application-card')).toHaveCount(2)
  await expect(page.getByRole('button', { name: /编辑资料 / })).toHaveCount(1)
  await page.locator('.application-card').filter({ hasText: '工作居留续签' }).click()
  await page.getByRole('button', { name: '材料清单', exact: true }).click()
  await expect(page.locator('.material-card')).toHaveCount(1)
  await expect(page.locator('.material-card')).toContainText('工作居留续签')
})

test('D43 edit profile asks before synchronizing and preserves generated applications', async ({ page }) => {
  await seed(page)
  await page.evaluate(() => {
    const store = JSON.parse(localStorage.getItem('permesso-helper-v1')!)
    store.drafts.push({ ...structuredClone(store.drafts[0]), id: 'already-generated', generatedAt: '2026-11-05' })
    localStorage.setItem('permesso-helper-v1', JSON.stringify(store))
  })
  await page.reload()
  await page.getByRole('button', { name: /编辑资料 / }).click()
  await expect(page.getByRole('radio', { name: '其他', exact: true })).toHaveCount(0)
  await page.locator('#q-person-surname').fill('DEMO EDIT')
  await page.getByRole('button', { name: '保存资料' }).click()
  await page.getByRole('button', { name: '只保存资料', exact: true }).click()
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('permesso-helper-v1')!).drafts[0].data.person.surname)).not.toBe('DEMO EDIT')
  await page.getByRole('button', { name: /编辑资料 / }).click()
  await expect(page.locator('#q-person-surname')).toHaveValue('DEMO EDIT')
  await page.getByRole('button', { name: '保存资料' }).click()
  await page.getByRole('button', { name: '同步到进行中的申请', exact: true }).click()
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('permesso-helper-v1')!).drafts[0].data.person.surname)).toBe('DEMO EDIT')
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('permesso-helper-v1')!).drafts.find((draft: { id: string }) => draft.id === 'already-generated').data.person.surname)).not.toBe('DEMO EDIT')
})

test('D43 tablet and desktop layouts, current field paper page and PDF thumbnails', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 1000 }); await form(page)
  await page.locator('#q-person-birthCity').focus()
  await expect(page.locator('.paper-focus')).toBeVisible()
  await expect(page.locator('.paper-focus [role=status]')).toHaveText('', { timeout: 60000 })
  await expect(page.locator('.paper-focus rect')).not.toHaveCount(0)
  await expect(page.locator('.paper-focus')).toContainText('出生地')
  await noOverflow(page)
  await page.setViewportSize({ width: 900, height: 1000 }); await expect(page.locator('.paper-focus')).toHaveCount(0)
  await expect(page.locator('.desktop-left')).toBeVisible(); await noOverflow(page)
  await page.setViewportSize({ width: 1280, height: 1000 })
  await page.getByRole('button', { name: '4. 工作与收入', exact: true }).click()
  await page.getByRole('button', { name: '保存并下一步', exact: true }).click()
  await page.getByRole('button', { name: '生成参考件', exact: true }).click()
  await expect(page.getByRole('link', { name: '下载 PDF' })).toBeVisible({ timeout: 60000 })
  const total = Number((await page.locator('.pager strong').innerText()).split('/')[1])
  expect(total).toBeGreaterThan(10)
  await expect(page.locator('.reference-thumbnails button')).toHaveCount(total)
  await page.locator('.reference-thumbnails button').nth(2).click()
  await expect(page.locator('.pager strong')).toHaveText(`3 / ${total}`)
  await noOverflow(page)
})

test('D43 common information entry and adding a saved spouse in place', async ({ page }) => {
  await seed(page, 2); await page.evaluate(() => { const value = JSON.parse(localStorage.getItem('permesso-helper-v1')!); value.drafts[0].data.application = { ...value.drafts[0].data.application, code: '09', operation: 'rilascio' }; localStorage.setItem('permesso-helper-v1',JSON.stringify(value)) }); await page.reload(); await page.locator('.application-card').click(); await page.getByRole('button', { name: '修改填写' }).click()
  await expect(page.getByRole('button', { name: '从另一人复制住址、电话' })).toBeVisible()
  await page.locator('.stepper button').filter({ hasText: '工作与收入' }).click()
  await page.getByRole('button', { name: '保存并下一步', exact: true }).click()
  await page.getByRole('button', { name: '选择／添加配偶' }).click()
  await page.getByRole('button', { name: '＋ 添加新的人' }).click()
  await page.locator('#q-person-surname').fill('SPOUSE DEMO'); await page.locator('#q-person-givenNames').fill('EXAMPLE')
  await page.getByRole('button', { name: '保存资料' }).click()
  await page.getByRole('button', { name: '确认', exact: true }).click()
  await expect(page.locator('#q-spouse-surname')).toHaveValue('SPOUSE DEMO')
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('permesso-helper-v1')!).members.length)).toBe(2)
})

test('D43 name search appears above five applications and filters remain scoped by person', async ({ page }) => {
  await seed(page)
  await expect(page.getByRole('searchbox', { name: '搜索姓名' })).toHaveCount(0)
  await page.evaluate(() => {
    const store = JSON.parse(localStorage.getItem('permesso-helper-v1')!)
    store.drafts = Array.from({ length: 6 }, (_, index) => ({ ...structuredClone(store.drafts[0]), id: `fictional-${index}`, ...(index % 2 ? { generatedAt: '2026-11-05' } : {}) }))
    localStorage.setItem('permesso-helper-v1', JSON.stringify(store))
  })
  await page.reload()
  await expect(page.locator('.application-card')).toHaveCount(6)
  await page.getByRole('button', { name: '已生成', exact: true }).click()
  await expect(page.locator('.application-card')).toHaveCount(3)
  await page.getByRole('button', { name: '进行中', exact: true }).click()
  await expect(page.locator('.application-card')).toHaveCount(3)
  const search = page.getByRole('searchbox', { name: '搜索姓名' })
  await search.fill('NO SUCH PERSON'); await expect(page.locator('.application-card')).toHaveCount(0)
  await search.fill(''); await page.getByRole('button', { name: '全部', exact: true }).click()
  await expect(page.locator('.application-card')).toHaveCount(6)
})
