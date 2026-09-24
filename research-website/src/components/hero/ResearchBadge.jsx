import { motion, useReducedMotion } from 'framer-motion'

const dots = ['C1', 'C2', 'C3', 'C4']

export default function ResearchBadge() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="research-badge liquid-glass-light"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="badge-dots" aria-hidden="true">
        {dots.map((dot, index) => (
          <motion.span
            key={dot}
            className={`badge-dot badge-dot-${index + 1}`}
            animate={reduceMotion ? undefined : { opacity: [0.35, 1, 0.35], scale: [0.9, 1, 0.9] }}
            transition={{ duration: 3.8, delay: index * 0.35, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </span>
      <span>04 research streams</span>
      <span className="badge-separator" aria-hidden="true">·</span>
      <span>multimodal digital biomarkers</span>
    </motion.div>
  )
}
