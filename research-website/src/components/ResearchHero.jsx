import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Boxes, Layers3, ShieldCheck, UserRoundCheck, Activity } from 'lucide-react'

const stats = [
  { icon: Boxes, value: '4', label: 'Modalities' },
  { icon: Layers3, value: '1', label: 'Unified Framework' },
  { icon: ShieldCheck, value: '', label: 'Validation-Aware Fusion' },
  { icon: UserRoundCheck, value: '', label: 'Human-Centred Research' },
]

export default function ResearchHero() {
  const reduce = useReducedMotion()

  return (
    <section className="showcase-hero">
      <motion.div
        className="showcase-hero-art"
        initial={reduce ? false : { opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />

      <div className="showcase-hero-grid shell">
        <div className="showcase-copy">
          <motion.div className="showcase-kicker" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <span>R26—DS—012</span>
            <b>Multimodal AI for Mental Health</b>
          </motion.div>

          <motion.h1 initial={reduce ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }}>
            From <span>Signals</span> to<br/>Safer <span>Tomorrows</span>
          </motion.h1>

          <motion.p initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .16 }}>
            A multimodal digital biomarker framework for personalized vulnerability mapping and acute escalation forecasting in young adults with anxiety disorders.
          </motion.p>

          <motion.div className="showcase-actions" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .24 }}>
            <Link to="/research" className="showcase-primary">Explore the Research <ArrowRight size={16}/></Link>
            <Link to="/system" className="showcase-secondary"><Layers3 size={17}/> View System Architecture</Link>
          </motion.div>

          <motion.div className="showcase-stats" initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .32 }}>
            {stats.map(({icon:Icon,value,label})=>(
              <div key={label}>
                <span className="showcase-stat-icon"><Icon size={14}/></span>
                <p>{value && <strong>{value}</strong>}<span>{label}</span></p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="showcase-visual">
          <motion.div
            className="hero-device-reference"
            initial={reduce ? false : { opacity: 0, x: 34, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ delay: .2, duration: .8 }}
          >
            <span>Physiological Sensing</span>
            <b>Chest Strap</b>
            <img src="/images/research/chest-strap-reference.webp" alt="Chest strap physiological sensing hardware used as the research hardware reference" />
            <small>REAL RESEARCH ARTEFACT</small>
          </motion.div>

          <motion.div className="hero-modality-list" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .55 }}>
            <span>MULTIMODAL EVIDENCE</span>
            <strong>HUMAN-CENTRED RESEARCH</strong>
            <ul>
              <li>Physiological</li>
              <li>Behavioural</li>
              <li>Clinical Language</li>
              <li>Contextual</li>
            </ul>
          </motion.div>

          <motion.div
            className="hero-prototype-card"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .65 }}
          >
            <div>
              <span>Fusion Research View</span>
              <svg viewBox="0 0 170 35" aria-hidden="true">
                <path d="M2 20 L18 20 L24 8 L31 29 L39 15 L47 20 L66 20 L73 11 L82 27 L91 17 L104 20 L122 20 L128 13 L136 25 L145 20 L168 20" />
              </svg>
              <small><i/> Research prototype</small>
            </div>
            <div className="prototype-dial"><Activity size={18}/><b>—</b><span>NO LIVE DATA</span></div>
          </motion.div>

          <p className="hero-annotation">AI-generated concept artwork supports the research story and is not experimental evidence.</p>
        </div>
      </div>

      <div className="hero-scroll-cue"><i/><span>Scroll to explore</span></div>
    </section>
  )
}
