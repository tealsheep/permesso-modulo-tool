import { useEffect, useRef, useState } from 'react'
import type { Reference } from './reference'
import { renderPage } from '../render/preview'

export function Thumbnails({ reference, current, go }: { reference: Reference; current: number; go: (index: number) => void }) {
  const canvases = useRef(new Map<number, HTMLCanvasElement>()), [status, setStatus] = useState('')
  useEffect(() => {
    let cancelled = false
    const media = matchMedia('(min-width:768px)')
    async function render() {
      if (!media.matches || cancelled) return
      try {
        for (let index = 0; index < reference.pages.length && !cancelled; index++) {
          const staging = document.createElement('canvas'); await renderPage(reference.bytes, staging, index + 1)
          const target = canvases.current.get(index)
          if (cancelled || !target) return
          target.width = staging.width; target.height = staging.height; target.getContext('2d')!.drawImage(staging, 0, 0)
        }
      } catch { if (!cancelled) setStatus('缩略图暂不可用，可用页名跳转') }
    }
    const start = () => { void render() }; start(); media.addEventListener('change', start)
    return () => { cancelled = true; media.removeEventListener('change', start) }
  }, [reference])
  return <nav className="reference-thumbnails" aria-label="参考件缩略图"><h2>全部页面</h2>{status && <p role="status">{status}</p>}{reference.pages.map((page, index) => <button key={index} aria-current={current === index ? 'page' : undefined} onClick={() => go(index)}><canvas ref={(element) => { if (element) canvases.current.set(index, element); else canvases.current.delete(index) }} aria-hidden="true" /><small>{page.name}</small></button>)}</nav>
}
