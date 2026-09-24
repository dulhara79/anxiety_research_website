import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import SignalCanvas from './SignalCanvas'

export default function ResearchLens({ state, onActivate, transitioning, actionLabel }) {
  const reduceMotion = useReducedMotion()
  const [finePointer, setFinePointer] = useState(false)
  const px = useMotionValue(0); const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 110, damping: 18, mass: .7 }); const sy = useSpring(py, { stiffness: 110, damping: 18, mass: .7 })
  const rotateY = useTransform(sx, [-1, 1], [-16, 16]); const rotateX = useTransform(sy, [-1, 1], [16, -16])

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)')
    const update = () => setFinePointer(media.matches)
    update(); media.addEventListener?.('change', update)
    return () => media.removeEventListener?.('change', update)
  }, [])

  const onMove = (event) => {
    if (!finePointer || reduceMotion || transitioning) return
    const rect = event.currentTarget.getBoundingClientRect()
    px.set(((event.clientX - rect.left) / rect.width - .5) * 2)
    py.set(((event.clientY - rect.top) / rect.height - .5) * 2)
  }
  const reset = () => { px.set(0); py.set(0) }

  return (
    <motion.button
      type="button"
      className={transitioning ? 'research-lens transitioning' : 'research-lens'}
      onClick={onActivate}
      onPointerMove={onMove}
      onPointerLeave={reset}
      aria-label={actionLabel || `Explore next research layer from ${state.shortName}`}
      data-cursor="ENTER"
      disabled={transitioning}
      style={finePointer && !reduceMotion && !transitioning ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      animate={transitioning && !reduceMotion ? { scale: 6.8, borderRadius: 0, rotateX: 0, rotateY: 0 } : { scale: 1, borderRadius: 88 }}
      transition={{ duration: transitioning ? .9 : .72, ease: [0.16,1,.3,1] }}
    >
      <span className="lens-screen" aria-hidden="true"><SignalCanvas stateKey={state.key} paused={transitioning} /></span>
      <span className="lens-chrome" aria-hidden="true"><i/><i/><i/></span>
      <span className="sr-only">{state.visualDescription}</span>
    </motion.button>
  )
}
