import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ResearchPreloader({ onComplete }) {
  const reduceMotion = useReducedMotion()
  const [progress, setProgress] = useState(reduceMotion ? 100 : 0)

  useEffect(() => {
    if (reduceMotion) { onComplete(); return }
    let frame; const duration = 2600; const start = performance.now()
    const tick = (now) => {
      const value = Math.min(100, Math.round(((now-start)/duration)*100)); setProgress(value)
      if (value < 100) frame = requestAnimationFrame(tick)
      else window.setTimeout(onComplete, 180)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [onComplete, reduceMotion])

  if (reduceMotion) return null
  return (
    <motion.div className="research-preloader" exit={{ opacity: 0 }} transition={{ duration: .38 }} aria-hidden="true">
      <div className="preloader-code">R26—DS—012</div>
      <svg viewBox="0 0 640 260" className="preloader-signals">
        {[
          ['M30 52 C130 20 218 86 305 128','#6FD6E8'],['M30 208 C128 238 218 170 305 132','#C9A86A'],
          ['M610 52 C512 20 422 86 335 128','#A99AF4'],['M610 208 C514 238 420 170 335 132','#C7F0D5']
        ].map(([d,c],i)=><motion.path key={i} d={d} fill="none" stroke={c} strokeWidth="1.4" strokeDasharray="6 10" initial={{ pathLength:0 }} animate={{ pathLength:1 }} transition={{ duration:1.2, delay:.25+i*.12, ease:[.16,1,.3,1] }}/>) }
        <motion.circle cx="320" cy="130" r="34" fill="none" stroke="rgba(244,245,242,.35)" initial={{ scale:.4, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ delay:1.25, duration:.6 }} />
      </svg>
      <div className="preloader-progress"><span>{String(progress).padStart(2,'0')}</span><i style={{ transform: `scaleX(${progress/100})` }}/></div>
    </motion.div>
  )
}
