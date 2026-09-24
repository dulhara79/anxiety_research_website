import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dot = useRef(null); const ring = useRef(null); const pos = useRef({ x:-100, y:-100, rx:-100, ry:-100 })
  const [enabled, setEnabled] = useState(false); const [label, setLabel] = useState('')
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)'); const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => { const value=fine.matches && !reduced.matches; setEnabled(value); document.documentElement.classList.toggle('custom-cursor-enabled', value) }; update()
    fine.addEventListener?.('change',update); reduced.addEventListener?.('change',update)
    const move = (e) => { pos.current.x=e.clientX; pos.current.y=e.clientY; const target=e.target.closest?.('[data-cursor]'); setLabel(target?.dataset.cursor || '') }
    window.addEventListener('pointermove', move, { passive:true })
    let raf
    const loop = () => { const p=pos.current; p.rx += (p.x-p.rx)*.16; p.ry += (p.y-p.ry)*.16; if(dot.current) dot.current.style.transform=`translate3d(${p.x}px,${p.y}px,0)`; if(ring.current) ring.current.style.transform=`translate3d(${p.rx}px,${p.ry}px,0)`; raf=requestAnimationFrame(loop) }
    raf=requestAnimationFrame(loop)
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('pointermove',move);fine.removeEventListener?.('change',update);reduced.removeEventListener?.('change',update);document.documentElement.classList.remove('custom-cursor-enabled')}
  },[])
  if(!enabled) return null
  return <div className="custom-cursor" aria-hidden="true"><span ref={dot} className="cursor-dot"/><span ref={ring} className={label?'cursor-ring active':'cursor-ring'}>{label&&<b>{label}</b>}</span></div>
}
