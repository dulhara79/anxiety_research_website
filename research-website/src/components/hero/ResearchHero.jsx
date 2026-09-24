import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Activity, ArrowRight, GitMerge, ShieldCheck } from 'lucide-react'
import ResearchBadge from './ResearchBadge'
import ResearchMetric from './ResearchMetric'
import ResearchVisualization from './ResearchVisualization'
import { heroStreams } from '../../data/research'

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
}

export default function ResearchHero() {
  const [activeStream, setActiveStream] = useState(null)
  const reduceMotion = useReducedMotion()
  const initial = reduceMotion ? false : 'hidden'

  return (
    <section className="research-hero" aria-labelledby="research-hero-title">
      <div className="hero-ambient hero-ambient-a" aria-hidden="true" />
      <div className="hero-ambient hero-ambient-b" aria-hidden="true" />
      <div className="hero-grid-field" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-a" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-b" aria-hidden="true" />

      <div className="shell research-hero-shell">
        <div className="research-hero-main">
          <motion.div
            className="research-hero-copy"
            initial={initial}
            animate="visible"
            transition={{ staggerChildren: reduceMotion ? 0 : 0.09, delayChildren: 0.08 }}
          >
            <motion.p className="hero-eyebrow" variants={reveal} transition={{ duration: 0.52 }}>
              R26—DS—012 / SLIIT / 2026
            </motion.p>

            <ResearchBadge />

            <motion.h1 id="research-hero-title" variants={reveal} transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}>
              Understanding Anxiety
              <span>Across Multiple Signals.</span>
            </motion.h1>

            <motion.p className="hero-description" variants={reveal} transition={{ duration: 0.58 }}>
              A multimodal digital biomarker framework for personalized vulnerability mapping and acute escalation forecasting in young adults with anxiety disorders.
            </motion.p>

            <motion.p className="hero-thesis-line" variants={reveal} transition={{ duration: 0.58 }}>
              Physiology, behaviour, clinical language and contextual evidence operate across different timescales—and should not be treated as equally reliable.
            </motion.p>

            <motion.div className="hero-actions" variants={reveal} transition={{ duration: 0.56 }}>
              <Link className="hero-cta hero-cta-primary liquid-glass-light" to="/components">
                <span>Explore the Framework</span>
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link className="hero-cta hero-cta-secondary" to="/results">
                <span>View Evidence</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </motion.div>

            <motion.div className="hero-metrics" variants={reveal} transition={{ duration: 0.56 }}>
              <ResearchMetric icon={Activity} value="04 Streams" label="Integrated research components" />
              <ResearchMetric icon={GitMerge} value="Evidence-Gated" label="Reliability-aware fusion" />
              <ResearchMetric icon={ShieldCheck} value="Abstention-Aware" label="Weak evidence can be withheld" />
            </motion.div>
          </motion.div>

          <ResearchVisualization activeStream={activeStream} />
        </div>

        <div className="research-index" aria-label="Research stream index">
          {heroStreams.map((stream) => (
            <button
              type="button"
              key={stream.id}
              className={`research-index-item ${activeStream === stream.id ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveStream(stream.id)}
              onMouseLeave={() => setActiveStream(null)}
              onFocus={() => setActiveStream(stream.id)}
              onBlur={() => setActiveStream(null)}
              onClick={() => setActiveStream((current) => current === stream.id ? null : stream.id)}
              aria-pressed={activeStream === stream.id}
            >
              <span className="research-index-number">{stream.number}</span>
              <span className="research-index-copy">
                <strong>{stream.short}</strong>
                <small>{stream.detail}</small>
              </span>
              <span className="research-index-pulse" aria-hidden="true" />
            </button>
          ))}
        </div>

        <p className="hero-safety">Research and clinical decision-support framework · Not a diagnostic device</p>
      </div>
    </section>
  )
}
