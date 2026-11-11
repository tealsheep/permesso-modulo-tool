type HB = Record<string, (...args: number[]) => number> & { memory: WebAssembly.Memory }
export async function createFontSubsetter(binary: BufferSource) {
  const { instance } = await WebAssembly.instantiate(binary, {})
  const hb = instance.exports as unknown as HB
  hb._initialize!()
  return (font: Uint8Array, text: string): Uint8Array => {
    const pointer = hb.malloc!(font.length)
    if (!pointer) throw new Error('字体子集内存不足')
    let blob = 0, face = 0, input = 0, subset = 0, output = 0
    try {
      new Uint8Array(hb.memory.buffer).set(font, pointer)
      blob = hb.hb_blob_create!(pointer, font.length, 0, 0, 0) // DUPLICATE: owns its copy.
      face = hb.hb_face_create!(blob, 0)
      input = hb.hb_subset_input_create_or_fail!()
      if (!blob || !face || !input) throw new Error('字体子集初始化失败')
      const unicode = hb.hb_subset_input_unicode_set!(input)
      hb.hb_set_clear!(unicode)
      for (const char of text) hb.hb_set_add!(unicode, char.codePointAt(0)!)
      subset = hb.hb_subset_or_fail!(face, input)
      if (!subset) throw new Error('中文字体子集生成失败')
      output = hb.hb_face_reference_blob!(subset)
      const length = hb.hb_blob_get_length!(output), start = hb.hb_blob_get_data!(output, 0)
      return new Uint8Array(hb.memory.buffer, start, length).slice()
    } finally {
      if (output) hb.hb_blob_destroy!(output)
      if (subset) hb.hb_face_destroy!(subset)
      if (input) hb.hb_subset_input_destroy!(input)
      if (face) hb.hb_face_destroy!(face)
      if (blob) hb.hb_blob_destroy!(blob)
      hb.free!(pointer)
    }
  }
}
