import wasmUrl from 'harfbuzzjs/dist/harfbuzz-subset.wasm?url'
import { createFontSubsetter } from './font-subset-core'
export { createFontSubsetter } from './font-subset-core'

const subsetter = fetch(wasmUrl).then(async (response) => {
  if (!response.ok) throw new Error('字体子集工具加载失败，请刷新重试')
  return createFontSubsetter(await response.arrayBuffer())
})
void subsetter.catch(() => undefined)
export async function subsetFont(font: Uint8Array, text: string) {
  return (await subsetter)(font, text)
}
