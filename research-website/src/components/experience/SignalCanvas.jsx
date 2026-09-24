import { useEffect, useRef } from 'react'

function line(ctx, points, color, alpha = 1, width = 1) {
  ctx.beginPath()
  points.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))
  ctx.strokeStyle = color
  ctx.globalAlpha = alpha
  ctx.lineWidth = width
  ctx.stroke()
  ctx.globalAlpha = 1
}

function drawOverview(ctx, w, h, t) {
  const cx = w / 2; const cy = h / 2
  const streams = [
    ['#6FD6E8', 0.18, 0.24], ['#C9A86A', 0.18, 0.76], ['#A99AF4', 0.82, 0.24], ['#C7F0D5', 0.82, 0.76],
  ]
  streams.forEach(([color, sx, sy], index) => {
    const pts = []
    for (let i = 0; i <= 42; i++) {
      const p = i / 42
      const x = sx * w + (cx - sx * w) * p
      const y = sy * h + (cy - sy * h) * p + Math.sin(t * .0015 + p * 8 + index) * 12 * (1 - p)
      pts.push([x, y])
    }
    line(ctx, pts, color, .62, 1.3)
  })
  const glow = ctx.createRadialGradient(cx, cy, 4, cx, cy, Math.min(w,h)*.28)
  glow.addColorStop(0, 'rgba(244,245,242,.18)'); glow.addColorStop(1, 'rgba(244,245,242,0)')
  ctx.fillStyle = glow; ctx.fillRect(0,0,w,h)
}

function drawPhysiology(ctx, w, h, t) {
  const colors = ['#6FD6E8', '#8CCED9', '#B7E8EF']
  const speeds = [.0024, .0012, .0017]
  for (let row = 0; row < 3; row++) {
    const base = h * (.28 + row * .23); const pts = []
    for (let x = 0; x <= w; x += 4) {
      const p = x / w
      const a = row === 0 ? 14 + 10 * Math.sin(p*12) : row === 1 ? 11 : 20
      const f = row === 0 ? 18 : row === 1 ? 5 : 3
      pts.push([x, base + Math.sin(p * Math.PI * f + t * speeds[row]) * a + Math.sin(p*34 + t*.0007)*3])
    }
    line(ctx, pts, colors[row], .74 - row*.12, row === 0 ? 1.7 : 1.1)
  }
  const marker = ((t * .055) % (w + 120)) - 60
  ctx.fillStyle = 'rgba(244,245,242,.06)'; ctx.fillRect(marker, h*.12, 110, h*.72)
  line(ctx, [[marker+110,h*.12],[marker+110,h*.84]], '#F4F5F2', .28, 1)
}

function drawBehaviour(ctx, w, h, t) {
  const nodes = Array.from({ length: 26 }, (_, i) => {
    const group = i < 13 ? .31 : .69
    return [w*(group + Math.sin(i*4.1)*.16), h*(.2 + ((i*37)%100)/150), i]
  })
  nodes.forEach(([x,y,i], idx) => {
    const next = nodes[(idx*7+5)%nodes.length]
    if ((i + next[2]) % 3 === 0) line(ctx, [[x,y],[next[0],next[1]]], '#C9A86A', .14, .8)
  })
  nodes.forEach(([x,y,i]) => {
    const pulse = 2.5 + Math.sin(t*.0015+i)*.7
    ctx.beginPath(); ctx.arc(x,y,pulse,0,Math.PI*2); ctx.fillStyle = 'rgba(201,168,106,.38)'; ctx.fill()
  })
  ctx.fillStyle = 'rgba(7,9,11,.62)'; ctx.fillRect(w*.42,0,w*.16,h)
  line(ctx, [[w*.5,h*.08],[w*.5,h*.92]], '#C9A86A', .24, 1)
}

function drawClinical(ctx, w, h, t) {
  for (let row=0; row<7; row++) {
    for (let col=0; col<8; col++) {
      const phase = t*.001 + row*.7 + col*.4
      const x = w*.12 + col*w*.095 + Math.sin(phase)*3
      const y = h*.18 + row*h*.09 + Math.cos(phase*.8)*3
      ctx.fillStyle = `rgba(169,154,244,${.08 + ((row+col)%4)*.035})`
      ctx.fillRect(x,y,20+((row*col)%24),8)
    }
  }
  const centers = [[w*.7,h*.34],[w*.63,h*.67]]
  centers.forEach(([cx,cy],g) => {
    ctx.beginPath(); ctx.arc(cx,cy,Math.min(w,h)*.13,0,Math.PI*2); ctx.strokeStyle='rgba(169,154,244,.18)'; ctx.stroke()
    for(let i=0;i<8;i++) {
      const a=i/8*Math.PI*2+t*.00015*(g?1:-1); const r=18+(i%3)*12
      ctx.beginPath(); ctx.arc(cx+Math.cos(a)*r,cy+Math.sin(a)*r,3,0,Math.PI*2); ctx.fillStyle='rgba(169,154,244,.72)'; ctx.fill()
    }
    ctx.beginPath(); ctx.arc(cx,cy,7,0,Math.PI*2); ctx.fillStyle='rgba(244,245,242,.8)'; ctx.fill()
  })
}

function drawFusion(ctx, w, h, t) {
  const ys = [.22,.39,.56,.73].map(v=>v*h)
  const colors = ['#6FD6E8','#C9A86A','#A99AF4','#C7F0D5']
  ys.forEach((y,i) => {
    const end = i===1 ? w*.38 : w*.5
    const pts=[]
    for(let x=0;x<=end;x+=8) pts.push([x,y+Math.sin(x*.03+t*.001+i)*4])
    line(ctx,pts,colors[i],i===1?.12:.58, i===1?.8:1.4)
  })
  const cx=w*.58, cy=h*.48
  const glow=ctx.createRadialGradient(cx,cy,4,cx,cy,Math.min(w,h)*.24)
  glow.addColorStop(0,'rgba(199,240,213,.2)');glow.addColorStop(1,'rgba(199,240,213,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h)
  line(ctx,[[cx+35,cy],[w*.88,cy]],'#F4F5F2',.32,1)
  ctx.strokeStyle='rgba(244,245,242,.2)';ctx.strokeRect(w*.78,h*.3,w*.18,h*.36)
}

export default function SignalCanvas({ stateKey = 'overview', paused = false }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    let raf = 0; let visible = true
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const resize = () => {
      const rect = canvas.getBoundingClientRect(); const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(rect.width*dpr)); canvas.height = Math.max(1, Math.floor(rect.height*dpr)); ctx.setTransform(dpr,0,0,dpr,0,0)
    }
    const render = (time) => {
      const rect = canvas.getBoundingClientRect(); ctx.clearRect(0,0,rect.width,rect.height)
      const fn = stateKey === 'c1' ? drawPhysiology : stateKey === 'c2' ? drawBehaviour : stateKey === 'c3' ? drawClinical : stateKey === 'c4' ? drawFusion : drawOverview
      fn(ctx, rect.width, rect.height, media.matches ? 0 : time)
    }
    const loop = (time) => {
      render(time)
      if (!paused && visible && !media.matches) raf = requestAnimationFrame(loop)
    }
    const restart = () => {
      cancelAnimationFrame(raf)
      if (!paused && visible && !media.matches) raf = requestAnimationFrame(loop)
      else if (visible) render(0)
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; restart() }, { threshold: .01 })
    const onResize = () => { resize(); if (visible) render(0) }
    observer.observe(canvas); resize(); render(0); window.addEventListener('resize', onResize)
    if (!paused && !media.matches) raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); observer.disconnect(); window.removeEventListener('resize', onResize) }
  }, [stateKey, paused])
  return <canvas ref={ref} className="signal-canvas" aria-hidden="true" data-state={stateKey} />
}
