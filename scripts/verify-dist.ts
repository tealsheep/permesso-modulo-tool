import { createHash } from 'node:crypto'
import { copyFile, readFile, readdir, lstat } from 'node:fs/promises'
import { join } from 'node:path'

const sha = (bytes: Uint8Array) => createHash('sha256').update(bytes).digest('hex')
const allowedPdf = sha(await readFile('official/2026-11-05_Modulo_1.pdf'))
let privateImage: string | undefined
try { privateImage = sha(await readFile('docs/design/2026-11-05_ui-reference.webp')) }
catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error }
async function verify(directory: string): Promise<void> {
  for (const entry of await readdir(directory)) {
    const path = join(directory, entry), stat = await lstat(path)
    if (stat.isSymbolicLink()) throw new Error(`Deployment must not contain links: ${path}`)
    if (stat.isDirectory()) await verify(path)
    else {
      const hash = sha(await readFile(path))
      if (hash === privateImage) throw new Error(`Private reference image must not be deployed: ${path}`)
      if (/\.pdf$/i.test(path) && hash !== allowedPdf) throw new Error(`Unexpected PDF in deployment: ${path}`)
      if (/Modulo_2/i.test(entry)) throw new Error(`D35: restricted official Modulo 2 must not be deployed: ${path}`)
    }
  }
}
await verify('dist')
for (const file of ['LICENSE', 'LICENSE-SCOPE.md']) await copyFile(file, join('dist', file))
console.log('Deployment verified: permitted Modulo 1 only, no known private reference image; license notices included.')
