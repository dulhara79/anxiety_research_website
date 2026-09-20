import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, FlaskConical } from 'lucide-react'
import DeviceSignalStage from './DeviceSignalStage'

export default function ResearchHero() {
  const reduce = useReducedMotion()
  return (
    <section className="research-hero shell">
      <div className="hero-copy">
        <motion.div className="hero-kicker" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span>R26—DS—012</span>
          <span>SLIIT · DATA SCIENCE</span>
          <span>2026</span>
        </motion.div>
        <motion.h1 initial={reduce ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }}>
          Anxiety vulnerability is a <em>multimodal evidence problem.</em>
        </motion.h1>
        <motion.p className="hero-lead" initial={reduce ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .16 }}>
          A research framework investigating physiological, behavioural, clinical-language and contextual evidence across different timescales, with validation-aware fusion and a distinct near-term physiological forecast.
        </motion.p>
        <motion.div className="hero-actions" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .24 }}>
          <Link className="btn btn-primary" to="/research">Explore research <ArrowRight size={16}/></Link>
          <Link className="btn btn-secondary" to="/evidence">View evidence</Link>
        </motion.div>
        <div className="research-boundary-chip"><FlaskConical size={14}/><span>Research prototype · not a diagnostic device</span></div>
      </div>
      <motion.div className="hero-instrument" initial={reduce ? false : { opacity: 0, scale: .985 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .18, duration: .8 }}>
        <DeviceSignalStage />
        <figure className="editorial-figure">
          <img src="/images/research/multimodal-editorial.webp" alt="Editorial illustration supporting the multimodal anxiety research concept" />
          <figcaption>EDITORIAL ILLUSTRATION · SUPPORTING VISUAL</figcaption>
        </figure>
      </motion.div>
    </section>
  )
}
