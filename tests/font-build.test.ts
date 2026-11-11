import { mkdtemp, mkdir, writeFile, readFile, rm, realpath } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { resolve, join, dirname, basename } from 'node:path'
import fontkit from '@pdf-lib/fontkit'
import { expect, it } from 'vitest'
import { buildReferenceFont, fontInputs, fontRanges } from '../scripts/build-font'

const source = resolve('assets/fonts/ModuloSansSC-Regular.ttf')
const served = resolve('public/fonts/ModuloSansSC-Regular.ttf')
async function removeFixture(root: string, temporaryBase: string) {
  const target = await realpath(root)
  if (dirname(target) !== temporaryBase || !basename(target).startsWith('modulo-font-fixture-')) throw new Error('临时字体测试目录越界')
  await rm(target, { recursive: true, force: true })
}

it('serves a small font covering every fixed code/data character and supported Latin ranges', async () => {
  const original = fontkit.create(await readFile(source)), bytes = await readFile(served)
  const actual = new Set(fontkit.create(bytes).characterSet), originalSet = new Set(original.characterSet)
  expect(bytes.length).toBeLessThan(500_000)
  expect(bytes.length).toBeLessThan((await readFile(source)).length / 20)
  for (const input of await fontInputs(process.cwd())) for (const char of input.text) {
    const point = char.codePointAt(0)!
    if (originalSet.has(point)) expect(actual.has(point), `${input.path}: ${char}`).toBe(true)
  }
  for (const point of originalSet) if (fontRanges.some(([first, last]) => point >= first && point <= last)) expect(actual.has(point), `Latin/punctuation U+${point.toString(16)}`).toBe(true)
})

it('rebuilds on changed JSON copy and decoded TS literals, and caches unchanged inputs', async () => {
  const temporaryBase = await realpath(tmpdir())
  const root = await mkdtemp(join(temporaryBase, 'modulo-font-fixture-'))
  try {
    await mkdir(join(root, 'src')); await mkdir(join(root, 'data'))
    await writeFile(join(root, 'src/copy.ts'), 'export const title = "\\u4e2d"')
    await writeFile(join(root, 'data/copy.json'), JSON.stringify({ text: '文' }))
    const options = { root, source }
    const first = await buildReferenceFont(options)
    expect(first.rebuilt).toBe(true)
    let glyphs = new Set(fontkit.create(await readFile(join(root, 'public/fonts/ModuloSansSC-Regular.ttf'))).characterSet)
    expect(glyphs.has('中'.codePointAt(0)!)).toBe(true)
    expect(glyphs.has('文'.codePointAt(0)!)).toBe(true)
    expect(glyphs.has('国'.codePointAt(0)!)).toBe(false)
    expect((await buildReferenceFont(options)).rebuilt).toBe(false)
    await writeFile(join(root, 'data/copy.json'), '{"text":"\\u56fd"}')
    const second = await buildReferenceFont(options)
    expect(second.rebuilt).toBe(true); expect(second.fontChanged).toBe(true)
    expect(second.manifest.inputHash).not.toBe(first.manifest.inputHash)
    glyphs = new Set(fontkit.create(await readFile(join(root, 'public/fonts/ModuloSansSC-Regular.ttf'))).characterSet)
    expect(glyphs.has('国'.codePointAt(0)!)).toBe(true)
  } finally { await removeFixture(root, temporaryBase) }
})
