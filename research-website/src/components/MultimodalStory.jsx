import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Activity,
  Brain,
  ChevronLeft,
  ChevronRight,
  FileText,
  HeartPulse,
  History,
  MapPinned,
  MessageSquareText,
  Moon,
  ShieldCheck,
  Smartphone,
  Users,
  UserRound,
} from 'lucide-react'
import { components } from '../data/researchData'

const cards = {
  C1: {
    title: 'Physiological Signals',
    subtitle: 'Short-term · Real-time',
    pill: 'Seconds – Minutes',
    image: '/images/research/chest-strap-reference.webp',
    imageLabel: 'REAL RESEARCH ARTEFACT',
    imageClass: 'contain',
    color: 'blue',
    bullets: [
      ['Heart Rate & HRV', HeartPulse],
      ['Respiration Patterns', Activity],
      ['Physiological Arousal', Brain],
      ['Real-time Monitoring', ShieldCheck],
    ],
  },
  C2: {
    title: 'Behavioral Patterns',
    subtitle: 'Medium-term · Daily',
    pill: 'Hours – Weeks',
    image: '/images/research/ai-behavioural-concept.webp',
    imageLabel: 'AI-GENERATED CONCEPT',
    color: 'violet',
    bullets: [
      ['Activity & Sleep Patterns', Moon],
      ['Mobile Usage Patterns', Smartphone],
      ['Social Interaction Signals', Users],
      ['Currently Experimental', ShieldCheck],
    ],
  },
  C3: {
    title: 'Clinical Language',
    subtitle: 'Episodic · Clinical Context',
    pill: 'Days – Weeks',
    image: '/images/research/multimodal-editorial.webp',
    imageLabel: 'AI-GENERATED CONCEPT',
    color: 'teal',
    bullets: [
      ['Clinical Note Analysis', FileText],
      ['Few-shot Learning (TC-WPN)', Brain],
      ['Semantic Understanding', MessageSquareText],
      ['Confidence-weighted', ShieldCheck],
    ],
  },
  C4: {
    title: 'Contextual Information',
    subtitle: 'Long-term · Static/Dynamic',
    pill: 'Weeks – Months',
    image: '/images/research/ai-neural-concept.webp',
    imageLabel: 'AI-GENERATED CONCEPT',
    color: 'orange',
    bullets: [
      ['Demographic Factors', UserRound],
      ['Environmental Context', MapPinned],
      ['Lifestyle Information', History],
      ['Risk Modifiers', ShieldCheck],
    ],
  },
}

function Trace({ id }) {
  const d = {
    C1: 'M2 25 L14 25 L20 9 L26 36 L33 17 L40 25 L53 25 L60 13 L67 34 L75 19 L83 25 L97 25 L103 14 L111 32 L120 22 L133 25 L146 25',
    C2: 'M2 26 C15 22 23 31 37 26 S60 20 75 26 S98 31 112 26 S132 20 146 25',
    C3: 'M2 25 L12 25 L17 13 L22 33 L28 17 L34 25 L44 25 L50 14 L56 32 L63 18 L70 25 L80 25 L87 11 L93 35 L101 17 L109 25 L121 25 L128 14 L135 31 L146 25',
    C4: 'M2 30 C20 30 31 29 47 28 S74 27 92 26 S119 23 146 21',
  }[id]
  return (
    <svg className="pixel-trace" viewBox="0 0 148 44" preserveAspectRatio="none" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

export default function MultimodalStory() {
  const rail = useRef(null)
  const reduce = useReducedMotion()

  const scroll = (direction) => {
    rail.current?.scrollBy({ left: direction * 360, behavior: 'smooth' })
  }

  return (
    <section className="timescale-rail-section">
      <div className="shell">
        <header className="pixel-timescale-heading">
          <div className="pixel-timescale-title">
            <span><i /> OUR RESEARCH FOUNDATION</span>
            <h2>Multimodal <em>Timescales</em></h2>
            <p>
              Anxiety is complex. No single signal tells the whole story. We investigate multiple modalities, each with its own timescale, to build a more complete and reliable understanding.
            </p>
          </div>

          <div className="pixel-timescale-controls">
            <i />
            <p>Different signals, different timescales,<br />a unified understanding.</p>
            <div>
              <button type="button" aria-label="Previous modalities" onClick={() => scroll(-1)}><ChevronLeft size={18} /></button>
              <button type="button" aria-label="Next modalities" onClick={() => scroll(1)}><ChevronRight size={18} /></button>
            </div>
          </div>
        </header>

        <div className="timescale-rail pixel-card-grid" ref={rail}>
          {components.map((component, index) => {
            const view = cards[component.id]
            return (
              <motion.article
                key={component.id}
                className={'pixel-modality-card card-' + view.color}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: .2 }}
                transition={{ delay: index * .05 }}
                whileHover={reduce ? undefined : { y: -5 }}
              >
                <div className={'pixel-card-image ' + (view.imageClass || '')}>
                  <img src={view.image} alt={component.id === 'C1' ? 'Chest strap physiological sensing research artefact' : view.title + ' conceptual illustration'} />
                  <span>{view.imageLabel}</span>
                </div>

                <div className="pixel-card-body">
                  <span className="pixel-component-chip">{component.id}</span>
                  <h3>{view.title}</h3>
                  <p className="pixel-card-subtitle">{view.subtitle}</p>
                  <span className="pixel-pill">{view.pill}</span>
                  <Trace id={component.id} />

                  <ul>
                    {view.bullets.map(([label, Icon]) => (
                      <li key={label}><Icon size={12} /><span>{label}</span></li>
                    ))}
                  </ul>

                  {component.id === 'C2' && (
                    <small className="pixel-c2-note">Current fusion weight 0.0 · experimental/excluded</small>
                  )}
                </div>
              </motion.article>
            )
          })}
        </div>

        <div className="pixel-fusion-bridge">
          <div className="bridge-wire wire-a" />
          <div className="bridge-wire wire-b" />
          <div className="bridge-wire wire-c" />
          <div className="bridge-wire wire-d" />
          <span className="bridge-dot dot-a" />
          <span className="bridge-dot dot-b" />
          <span className="bridge-dot dot-c" />

          <div className="bridge-badge">◇</div>
          <div className="bridge-copy">
            <strong>Integrated through evidence-aware fusion</strong>
            <span>Different timescales. One comprehensive understanding.</span>
          </div>
          <a href="#/system">See Fusion Process <ChevronRight size={14} /></a>
        </div>
      </div>
    </section>
  )
}
