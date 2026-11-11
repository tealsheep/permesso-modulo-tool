import { execFileSync } from 'node:child_process'
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { basename, dirname, join, resolve } from 'node:path'
import { expect, it } from 'vitest'

it.each(['allowed', 'unexpected-pdf', 'restricted-name', 'private-image'])('deployment artifact check: %s', async (scenario) => {
  const fixture = await mkdtemp(join(tmpdir(), 'modulo-dist-fixture-'))
  if (resolve(dirname(fixture)) !== resolve(tmpdir()) || !basename(fixture).startsWith('modulo-dist-fixture-')) {
    throw new Error('Refusing to use a directory outside the artifact-test fixture root')
  }
  try {
    await mkdir(join(fixture, 'official')); await mkdir(join(fixture, 'dist'))
    const pdf = 'Fictional artifact guard test, not an official document'
    await writeFile(join(fixture, 'official/2026-11-05_Modulo_1.pdf'), pdf)
    await writeFile(join(fixture, 'dist/modulo1.pdf'), pdf)
    await writeFile(join(fixture, 'LICENSE'), 'Fictional test license')
    await writeFile(join(fixture, 'LICENSE-SCOPE.md'), 'Fictional test scope')
    if (scenario === 'unexpected-pdf') await writeFile(join(fixture, 'dist/extra.pdf'), 'unexpected bytes')
    if (scenario === 'restricted-name') await writeFile(join(fixture, 'dist/official_Modulo_2.pdf'), pdf)
    if (scenario === 'private-image') {
      await mkdir(join(fixture, 'docs/design'), { recursive: true })
      await writeFile(join(fixture, 'docs/design/2026-11-05_ui-reference.webp'), 'fictional private image fixture')
      await writeFile(join(fixture, 'dist/renamed-image.asset'), 'fictional private image fixture')
    }
    const run = () => execFileSync(process.execPath, ['--import', import.meta.resolve('tsx'), resolve('scripts/verify-dist.ts')], { cwd: fixture, stdio: 'pipe' })
    if (scenario === 'allowed') {
      expect(run().toString()).toContain('Deployment verified')
      expect(await readFile(join(fixture, 'dist/LICENSE-SCOPE.md'), 'utf8')).toBe('Fictional test scope')
    } else expect(run).toThrow()
  } finally {
    await rm(fixture, { recursive: true, force: true })
  }
})
