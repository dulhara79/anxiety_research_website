import { useEffect, useRef } from 'react'
import { useMotionValue, useReducedMotion, useScroll } from 'framer-motion'

export default function useSpatialMotion(targetRef) {
  const reducedMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const pointer = useRef({ x: pointerX, y: pointerY })
  const { scrollYProgress: progress } = useScroll({ target: targetRef, offset: ['start end', 'end start'] })

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined' || !window.matchMedia?.('(pointer:fine)').matches) return undefined
    const move = (event) => {
      pointerX.set((event.clientX / window.innerWidth) * 2 - 1)
      pointerY.set((event.clientY / window.innerHeight) * 2 - 1)
    }
    const reset = () => { pointerX.set(0); pointerY.set(0) }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('blur', reset)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('blur', reset)
    }
  }, [pointerX, pointerY, reducedMotion])

  return { progress, pointer: pointer.current, reducedMotion: Boolean(reducedMotion) }
}
