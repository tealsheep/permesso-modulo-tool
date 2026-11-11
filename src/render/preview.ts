import { getDocument, GlobalWorkerOptions, PDFWorker } from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

GlobalWorkerOptions.workerSrc = workerUrl
// Keep one worker for the viewer lifetime; switching pages never reloads its script.
const worker = new PDFWorker()

/** Local bytes only; worker is packaged by Vite, never loaded from a CDN. */
export async function renderPage(bytes: Uint8Array, canvas: HTMLCanvasElement, pageNumber = 1) {
  const task = getDocument({ data: bytes.slice(), worker, useSystemFonts: true })
  try {
    const doc = await task.promise
    const page = await doc.getPage(pageNumber)
    const viewport = page.getViewport({ scale: 1.5 })
    canvas.width = Math.ceil(viewport.width)
    canvas.height = Math.ceil(viewport.height)
    await page.render({ canvas, viewport }).promise
    const base = page.getViewport({ scale: 1 })
    return { width: base.width, height: base.height, transform: base.transform }
  } finally { await task.destroy() }
}

export const renderFirstPage = renderPage
