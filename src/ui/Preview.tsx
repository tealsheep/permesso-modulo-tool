import { useEffect, useRef, useState } from 'react'
import { renderPage } from '../render/preview'
import type { Reference } from './reference'
import { instructionsFor } from './reference'
import { Header } from './components'
import { Thumbnails } from './Thumbnails'

export function Preview({ reference, back }: { reference: Reference; back: () => void }) {
  const [page, setPage] = useState(0), [zoom, setZoom] = useState(1), [status, setStatus] = useState('正在显示页面…')
  const downloadLink = useRef<HTMLAnchorElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const pinch = useRef<{ distance: number; zoom: number } | null>(null)
  useEffect(() => {
    const url = URL.createObjectURL(new Blob([new Uint8Array(reference.bytes)], { type: 'application/pdf' }))
    if (downloadLink.current) downloadLink.current.href = url
    return () => URL.revokeObjectURL(url)
  }, [reference])
  useEffect(() => {
    let cancelled = false
    const staging = document.createElement('canvas')
    void renderPage(reference.bytes, staging, page + 1).then(() => {
      if (cancelled || !canvas.current) return
      canvas.current.width = staging.width; canvas.current.height = staging.height
      canvas.current.getContext('2d')!.drawImage(staging, 0, 0)
      setStatus('')
    }).catch((error: unknown) => { if (!cancelled) setStatus(error instanceof Error ? error.message : '预览失败，可下载 PDF 查看') })
    return () => { cancelled = true }
  }, [reference, page])
  function go(index: number) {
    setZoom(1)
    if (index === page) return
    setPage(index); setStatus('正在显示页面…')
  }
  const current = reference.pages[page]!
  const groups = [...new Set(reference.pages.map((p) => p.group))]
  return <>
    <Thumbnails reference={reference} current={page} go={go} />
    <Header title="参考件" back={back} action={<a ref={downloadLink} className="text-action" download="permesso-reference.pdf">下载 PDF</a>} />
    <div className="document-tabs" aria-label="跳到文件">{groups.map((group) => <button key={group} aria-current={current.group === group ? 'page' : undefined} onClick={() => go(reference.pages.findIndex((p) => p.group === group))}>{group}</button>)}</div>
    {reference.warnings.length > 0 && <div className="notice" role="status"><h2>填写提醒 · {reference.warnings.length} 项</h2><ul>{reference.warnings.map((w, i) => <li key={i}>{w}</li>)}</ul></div>}
    <p className="hint">供照着手写，不用于提交 · 双指缩放，也可用下面按钮</p>
    {current.group === '须知' && <details className="card readable-instructions"><summary>查看须知文字（便于手机阅读）</summary><ul>{instructionsFor(reference.stampExempt).map((text) => <li key={text}>{text}</li>)}</ul></details>}
    <div className="zoom-controls"><button className="secondary" aria-label="缩小页面" onClick={() => setZoom((z) => Math.max(1, z - .25))} disabled={zoom === 1}>−</button><span>{Math.round(zoom * 100)}%</span><button className="secondary" aria-label="放大页面" onClick={() => setZoom((z) => Math.min(3, z + .25))} disabled={zoom === 3}>＋</button></div>
    {!reference.stampExempt && current.group === 'Modulo 1' && current.name.endsWith('第 1 页') && <p className="notice">印花税票：贴上方中间 MARCA DA BOLLO 框。右上 Codice Istanza 留空，不贴、不写。</p>}
    <p role="status" className="preview-status">{status}</p>
    <div className="paper-viewport" onPointerDown={(e) => {
      e.currentTarget.setPointerCapture(e.pointerId)
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
      if (pointers.current.size === 2) { const [a, b] = [...pointers.current.values()]; pinch.current = { distance: Math.hypot(a!.x - b!.x, a!.y - b!.y), zoom } }
    }} onPointerMove={(e) => {
      if (!pointers.current.has(e.pointerId)) return
      const previous = pointers.current.get(e.pointerId)!
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
      if (pinch.current && pointers.current.size === 2) { const [a, b] = [...pointers.current.values()]; setZoom(Math.max(1, Math.min(3, pinch.current.zoom * Math.hypot(a!.x - b!.x, a!.y - b!.y) / pinch.current.distance))) }
      else if (pointers.current.size === 1) {
        e.currentTarget.scrollLeft += previous.x - e.clientX
        if (e.currentTarget.scrollHeight > e.currentTarget.clientHeight) e.currentTarget.scrollTop += previous.y - e.clientY
        else window.scrollBy(0, previous.y - e.clientY)
      }
    }} onPointerUp={(e) => { pointers.current.delete(e.pointerId); pinch.current = null }} onPointerCancel={(e) => { pointers.current.delete(e.pointerId); pinch.current = null }}>
      <canvas ref={canvas} style={{ width: `${zoom * 100}%`, maxWidth: 'none' }} aria-label={current.name} role="img" />
    </div>
    <nav className="pager bottom-bar" aria-label="参考件翻页"><button className="secondary" disabled={page === 0} onClick={() => go(page - 1)}>上一页</button><div aria-live="polite"><strong>{page + 1} / {reference.pages.length}</strong><small>{current.name}</small></div><button className="primary" disabled={page === reference.pages.length - 1} onClick={() => go(page + 1)}>下一页</button></nav>
  </>
}
