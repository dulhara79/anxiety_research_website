import { motion } from 'framer-motion'

const pulse = {
  animate: {
    opacity: [0.35, 1, 0.35],
    scale: [0.9, 1.08, 0.9],
  },
  transition: {
    duration: 3.6,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}

export default function ResearchPlate() {
  return (
    <div className="signal-atlas" role="img" aria-label="Animated multimodal evidence flow showing four research streams converging into an evidence-aware fusion layer">
      <div className="atlas-grid" aria-hidden="true" />

      <div className="atlas-title">
        <span>Evidence atlas</span>
        <b>04 streams / 01 framework</b>
      </div>

      <motion.div className="atlas-node node-c1" {...pulse}>
        <span>C1</span>
        <small>Physiological</small>
      </motion.div>
      <motion.div className="atlas-node node-c2" {...pulse} transition={{ ...pulse.transition, delay: 0.8 }}>
        <span>C2</span>
        <small>Behavioural</small>
      </motion.div>
      <motion.div className="atlas-node node-c3" {...pulse} transition={{ ...pulse.transition, delay: 1.6 }}>
        <span>C3</span>
        <small>Clinical NLP</small>
      </motion.div>
      <motion.div className="atlas-node node-c4" {...pulse} transition={{ ...pulse.transition, delay: 2.4 }}>
        <span>C4</span>
        <small>Context</small>
      </motion.div>

      <svg className="atlas-lines" viewBox="0 0 640 520" aria-hidden="true">
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity=".18" />
            <stop offset="100%" stopColor="currentColor" stopOpacity=".8" />
          </linearGradient>
        </defs>
        <path d="M110 132 C 220 138, 260 210, 322 266" />
        <path d="M110 382 C 220 374, 260 320, 322 278" />
        <path d="M530 142 C 430 155, 390 220, 338 267" />
        <path d="M530 382 C 430 368, 390 320, 338 280" />
        <motion.circle
          cx="110" cy="132" r="4"
          animate={{ cx: [110, 205, 322], cy: [132, 170, 266] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="530" cy="142" r="4"
          animate={{ cx: [530, 430, 338], cy: [142, 190, 267] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: .6 }}
        />
      </svg>

      <div className="atlas-core">
        <span>Evidence-aware</span>
        <strong>FUSION</strong>
        <small>reliability · recency · eligibility</small>
      </div>

      <div className="atlas-status">
        <span className="status-dot" />
        Weak or unavailable signals can be withheld.
      </div>
    </div>
  )
}
