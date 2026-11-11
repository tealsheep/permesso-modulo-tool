import { expect, it } from 'vitest'
import { pagesBase } from '../scripts/deployment'

it('defaults to the project Pages path and supports root or another repository', () => {
  expect(pagesBase()).toBe('/permesso-modulo-tool/')
  expect(pagesBase('/')).toBe('/')
  expect(pagesBase('/another-repo/')).toBe('/another-repo/')
})
it.each(['', './', 'repo/', '/repo', '//example.com/', 'https://example.com/', '/../', '/a/../', '/a?b/', '/a#b/', '/a\\b/'])('rejects unsafe or ambiguous base %s', (base) => {
  expect(() => pagesBase(base)).toThrow()
})
