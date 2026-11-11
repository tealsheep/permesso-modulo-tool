import { readdirSync, readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { cssViolations, tsxViolations } from '../scripts/style-rules'
import approvedVisual from './fixtures/approved-visual-sha.json'

describe('D42 visual values stay in tokens.css', () => {
  it('preserves the D44-approved prototype and screenshots byte for byte', () => {
    for (const [file, hash] of Object.entries(approvedVisual)) expect(createHash('sha256').update(readFileSync(file)).digest('hex'), file).toBe(hash)
  })
  it('checks every application CSS / TSX file, including inline and SVG styles', () => {
    const files = readdirSync('src', { recursive: true }).map(String).filter((file) => /\.(css|tsx)$/.test(file) && file.replaceAll('\\', '/') !== 'ui/tokens.css')
    expect(files.length).toBeGreaterThan(5)
    for (const file of files) {
      const source = readFileSync(`src/${file}`, 'utf8')
      expect(file.endsWith('.css') ? cssViolations(source) : tsxViolations(source), file).toEqual([])
    }
  })
  it.each(['color:#fff', 'background:rgb(1 2 3)', 'border:1px solid red', 'box-shadow:0 2px 4px var(--ink)', 'border-radius:14px', '--surface:pink', 'color:var(--ink, red)', 'background:linear-gradient(white, black)'])('rejects %s', (declaration) => {
    expect(cssViolations(`.sample { ${declaration} }`)).toHaveLength(1)
  })
  it('allows tokens, structural resets, and inherited SVG colors', () => {
    expect(cssViolations('.sample { color:var(--ink); border:1px solid transparent; box-shadow:var(--inset); border-radius:var(--radius-input); fill:none; stroke:currentColor; }')).toEqual([])
    expect(cssViolations('.sample { font-size:.6875rem; border:1px solid var(--line); color:var(--accent-hover); }')).toEqual([])
    expect(tsxViolations('<svg fill="none" stroke="currentColor" /><div style={{ color: "var(--ink)" }} />')).toEqual([])
  })
  it.each(['<div style={{ color: "white" }} />', '<div style={{ boxShadow: "0 2px 4px #111" }} />', '<div style={{ borderRadius: 12 }} />', '<svg fill="#fff" />'])('rejects inline styles: %s', (source) => {
    expect(tsxViolations(source)).toHaveLength(1)
  })
})
