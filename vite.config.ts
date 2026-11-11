import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { buildReferenceFont, isFontInput } from './scripts/build-font.ts'
import { pagesBase } from './scripts/deployment.ts'

export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? pagesBase(process.env.VITE_BASE_PATH) : '/',
  plugins: [
    {
      name: 'reference-font-subset',
      async buildStart() { await buildReferenceFont() },
      configureServer(server) {
        const update = (file: string) => {
          if (isFontInput(file)) void buildReferenceFont().then((result) => {
            if (result.fontChanged) server.ws.send({ type: 'full-reload' })
          }).catch((error: unknown) => server.config.logger.error(String(error)))
        }
        server.watcher.on('add', update).on('change', update).on('unlink', update)
        server.httpServer?.once('close', () => { server.watcher.off('add', update).off('change', update).off('unlink', update) })
      },
    },
    {
      name: 'd35-no-official-modulo2', enforce: 'pre',
      load(id) {
        if (/\/official\/[^/]*Modulo_2\.pdf(?:\?|$)/i.test(id.replaceAll('\\', '/'))) {
          this.error('D35: 不允许读取或打包官方 Modulo 2 PDF，请使用 modulo2-layout.json')
        }
      },
    },
    react(),
  ],
  test: { environment: 'node', include: ['tests/**/*.test.ts'] },
}))
