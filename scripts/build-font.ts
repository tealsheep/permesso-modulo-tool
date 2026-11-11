import { createHash } from 'node:crypto'
import { readFile, readdir, mkdir, writeFile, rename } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { resolve, relative, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import fontkit from '@pdf-lib/fontkit'
import ts from 'typescript'
import { createFontSubsetter } from '../src/render/font-subset-core.ts'

const require = createRequire(import.meta.url)
const sha = (value: string | Uint8Array) => createHash('sha256').update(value).digest('hex')
// Retain supported Latin/extended/combining characters and punctuation for names.
export const fontRanges = [[0x20, 0x7e], [0xa0, 0x36f], [0x1d00, 0x1eff], [0x2000, 0x214f], [0x2190, 0x21ff], [0x25a0, 0x25ff], [0x2c60, 0x2c7f], [0xa720, 0xa7ff], [0xab30, 0xab6f], [0xff00, 0xffef]] as const

function jsonText(value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(jsonText)
  return value && typeof value === 'object' ? Object.entries(value).flatMap(([key, entry]) => [key, ...jsonText(entry)]) : []
}
export function codeText(source: string, name: string): string {
  const pieces: string[] = []
  const file = ts.createSourceFile(name, source, ts.ScriptTarget.Latest, true, name.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS)
  function visit(node: ts.Node) {
    if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node) || ts.isJsxText(node)) pieces.push(node.text)
    ts.forEachChild(node, visit)
  }
  visit(file)
  return pieces.join('\n')
}
export async function fontInputs(root: string) {
  const files: string[] = []
  async function walk(directory: string) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = resolve(directory, entry.name)
      if (entry.isDirectory()) await walk(path)
      else if (entry.isFile() && /\.(?:json|tsx?)$/.test(entry.name)) files.push(path)
    }
  }
  await walk(resolve(root, 'src')); await walk(resolve(root, 'data'))
  return Promise.all(files.sort().map(async (file) => {
    const source = await readFile(file, 'utf8')
    return { path: relative(root, file).replaceAll('\\', '/'), hash: sha(source), text: file.endsWith('.json') ? jsonText(JSON.parse(source)).join('\n') : codeText(source, file) }
  }))
}
export function isFontInput(file: string, root = process.cwd()) {
  return /^(?:src\/.*\.tsx?|data\/.*\.json)$/.test(relative(root, file).replaceAll('\\', '/'))
}
interface Options { root?: string; source?: string }
interface Manifest { version: number; inputHash: string; sourceHash: string; sourceBytes: number; outputHash: string; outputBytes: number; characters: number; inputs: { path: string; hash: string }[] }
async function atomicWrite(path: string, bytes: Uint8Array | string) {
  await mkdir(dirname(path), { recursive: true })
  const temporary = `${path}.${process.pid}.tmp`
  await writeFile(temporary, bytes); await rename(temporary, path)
}
async function build(options: Options) {
  const root = resolve(options.root ?? process.cwd())
  const output = resolve(root, 'public/fonts/ModuloSansSC-Regular.ttf')
  const manifestPath = resolve(root, 'assets/fonts/subset-manifest.json')
  const [source, wasm, inputs] = await Promise.all([
    readFile(options.source ?? resolve(root, 'assets/fonts/ModuloSansSC-Regular.ttf')),
    readFile(require.resolve('harfbuzzjs/dist/harfbuzz-subset.wasm')),
    fontInputs(root),
  ])
  const sourceHash = sha(source), fileHashes = inputs.map(({ path, hash }) => ({ path, hash }))
  const inputHash = sha(JSON.stringify({ version: 1, sourceHash, wasm: sha(wasm), ranges: fontRanges, files: fileHashes }))
  try {
    const manifest = JSON.parse(await readFile(manifestPath, 'utf8')) as Manifest
    if (manifest.inputHash === inputHash && manifest.outputHash === sha(await readFile(output))) return { rebuilt: false, fontChanged: false, manifest }
  } catch { /* Missing/stale derived output is rebuilt from local sources. */ }
  const supported = new Set(fontkit.create(source).characterSet)
  const text = inputs.map((input) => input.text).join('\n')
  for (const char of text) if (/\p{Script=Han}/u.test(char) && !supported.has(char.codePointAt(0)!)) throw new Error(`源字体缺少固定文案汉字：${char}`)
  const characters = new Set([...text].map((char) => char.codePointAt(0)!).filter((point) => supported.has(point)))
  for (const [first, last] of fontRanges) for (let point = first; point <= last; point++) if (supported.has(point)) characters.add(point)
  const subset = await createFontSubsetter(wasm)
  const bytes = subset(source, [...characters].sort((a, b) => a - b).map((point) => String.fromCodePoint(point)).join(''))
  const actual = new Set(fontkit.create(bytes).characterSet)
  for (const point of characters) if (!actual.has(point)) throw new Error(`静态字体子集缺字：U+${point.toString(16)}`)
  const outputHash = sha(bytes)
  let fontChanged = true
  try { fontChanged = sha(await readFile(output)) !== outputHash } catch { /* First generation. */ }
  const manifest: Manifest = { version: 1, inputHash, sourceHash, sourceBytes: source.length, outputHash, outputBytes: bytes.length, characters: characters.size, inputs: fileHashes }
  if (fontChanged) await atomicWrite(output, bytes)
  await atomicWrite(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
  return { rebuilt: true, fontChanged, manifest }
}
let queue = Promise.resolve()
export function buildReferenceFont(options: Options = {}) {
  const result = queue.then(() => build(options))
  queue = result.then(() => undefined, () => undefined)
  return result
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { rebuilt, manifest } = await buildReferenceFont()
  process.stdout.write(`Reference font ${rebuilt ? 'built' : 'current'}: ${manifest.sourceBytes} -> ${manifest.outputBytes} bytes; ${manifest.characters} characters\n`)
}
