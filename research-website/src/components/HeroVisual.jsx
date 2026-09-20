import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'

const orbitTransition = {
  duration: 11,
  repeat: Infinity,
  ease: 'linear',
}

export default function HeroVisual() {
  const ref = useRef(null)
  const pointerX = useMotionValue(.5)
  const pointerY = useMotionValue(.5)
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 18, mass: .4 })
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 18, mass: .4 })

  const rotateY = useTransform(smoothX, [0, 1], [-2.4, 2.4])
  const rotateX = useTransform(smoothY, [0, 1], [2.1, -2.1])
  const lensX = useTransform(smoothX, [0, 1], ['7%', '93%'])
  const lensY = useTransform(smoothY, [0, 1], ['9%', '91%'])
  const glowX = useTransform(smoothX, value => String(Math.round(value * 100)) + '%')
  const glowY = useTransform(smoothY, value => String(Math.round(value * 100)) + '%')

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 72])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.09])
  const overlayY = useTransform(scrollYProgress, [0, 1], [0, -28])

  const onPointerMove = (event) => {
    if (event.pointerType === 'touch') return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width)
    pointerY.set((event.clientY - rect.top) / rect.height)
  }

  const onPointerLeave = () => {
    pointerX.set(.5)
    pointerY.set(.5)
  }

  return (
    <motion.div
      ref={ref}
      className="hero-media-frame"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      initial={{ opacity: 0, clipPath: 'inset(8% 8% 8% 8% round 28px)' }}
      animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
      transition={{ duration: 1.05, delay: .18, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
    >
      <motion.img
        className="hero-research-image"
        src="/images/multimodal-research-hero.webp"
        alt="Multimodal anxiety research illustration showing chest-strap physiological sensing, behavioural patterns, clinical language and contextual signals converging into an evidence-aware framework."
        width="1000"
        height="563"
        loading="eager"
        fetchPriority="high"
        style={{ y: imageY, scale: imageScale }}
        animate={{ filter: ['saturate(.94) contrast(1)', 'saturate(1.04) contrast(1.02)', 'saturate(.94) contrast(1)'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div className="hero-pointer-glow" style={{ '--gx': glowX, '--gy': glowY }} aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-grid-overlay" aria-hidden="true" />
      <motion.div className="hero-scan-line" aria-hidden="true" animate={{ x: ['-12%', '112%'] }} transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.4 }} />

      <motion.div className="hero-orbit orbit-one" aria-hidden="true" animate={{ rotate: 360 }} transition={orbitTransition}>
        <i /><i /><i />
      </motion.div>
      <motion.div className="hero-orbit orbit-two" aria-hidden="true" animate={{ rotate: -360 }} transition={{ ...orbitTransition, duration: 16 }}>
        <i /><i />
      </motion.div>

      <motion.div className="hero-data-pulse pulse-a" aria-hidden="true" animate={{ opacity: [.2, 1, .2], scale: [.8, 1.22, .8] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="hero-data-pulse pulse-b" aria-hidden="true" animate={{ opacity: [.25, .9, .25], scale: [.85, 1.18, .85] }} transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut', delay: .8 }} />
      <motion.div className="hero-data-pulse pulse-c" aria-hidden="true" animate={{ opacity: [.2, .8, .2], scale: [.8, 1.2, .8] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.3 }} />

      <motion.div className="evidence-lens" style={{ left: lensX, top: lensY }} aria-hidden="true">
        <i className="lens-h" />
        <i className="lens-v" />
        <b />
        <span>EVIDENCE LENS</span>
      </motion.div>

      <motion.div className="hero-tech-caption" style={{ y: overlayY }}>
        <span>LIVE RESEARCH MODEL</span>
        <strong>Multimodal evidence architecture</strong>
      </motion.div>

      <div className="hero-signal-rail" aria-hidden="true">
        <span>C1 / physiological</span><b />
        <span>C2 / behavioural</span><b />
        <span>C3 / clinical NLP</span><b />
        <span>C4 / contextual</span>
      </div>
    </motion.div>
  )
}
