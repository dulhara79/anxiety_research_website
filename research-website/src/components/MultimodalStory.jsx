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
  MessageSquare,
  Moon,
  ShieldCheck,
  Smartphone,
  Users,
} from 'lucide-react'

const cards = [
  {
    id: 'C1',
    title: 'Physiological Signals',
    subtitle: 'Short-term · Real-time',
    duration: 'Seconds – Minutes',
    image: '/images/research/chest-strap-reference.webp',
    imageType: 'real',
    tone: 'blue',
    trace:
      'M2 24 L15 24 L19 10 L24 37 L30 16 L36 24 L49 24 L54 13 L60 34 L66 19 L73 24 L84 24 L89 15 L95 32 L103 22 L112 24 L121 16 L127 30 L135 23 L145 24',
    items: [
      [HeartPulse, 'Heart Rate & HRV'],
      [Activity, 'Respiration Patterns'],
      [Brain, 'Physiological Arousal'],
      [ShieldCheck, 'Real-time Monitoring'],
    ],
  },
  {
    id: 'C2',
    title: 'Behavioral Patterns',
    subtitle: 'Medium-term · Daily',
    duration: 'Hours – Weeks',
    image: '/images/research/ai-behavioural-concept.webp',
    imageType: 'concept',
    tone: 'violet',
    trace:
      'M2 25 C16 25 18 17 30 17 S46 34 60 24 S78 16 91 24 S107 34 121 24 S136 15 146 21',
    items: [
      [Moon, 'Activity & Sleep Patterns'],
      [Smartphone, 'Mobile Usage Patterns'],
      [Users, 'Social Interaction Signals'],
      [ShieldCheck, 'Currently Experimental'],
    ],
    note: 'Current fusion weight: 0.0',
  },
  {
    id: 'C3',
    title: 'Clinical Language',
    subtitle: 'Episodic · Clinical Context',
    duration: 'Days – Weeks',
    image: '/images/research/multimodal-editorial.webp',
    imageType: 'concept',
    tone: 'teal',
    trace:
      'M2 26 L14 26 L20 18 L25 30 L31 19 L37 27 L44 24 L50 12 L56 33 L63 20 L70 28 L77 18 L84 26 L92 14 L100 31 L108 21 L116 25 L124 17 L132 28 L146 22',
    items: [
      [FileText, 'Clinical Note Analysis'],
      [Brain, 'Few-shot Learning (TC-WPN)'],
      [MessageSquare, 'Semantic Understanding'],
      [ShieldCheck, 'Confidence-weighted'],
    ],
  },
  {
    id: 'C4',
    title: 'Contextual Information',
    subtitle: 'Long-term · Static/Dynamic',
    duration: 'Weeks – Months',
    image: '/images/research/ai-neural-concept.webp',
    imageType: 'concept',
    tone: 'orange',
    trace:
      'M2 30 C26 30 44 29 59 27 S85 24 99 23 S119 18 146 17',
    items: [
      [Users, 'Demographic Factors'],
      [History, 'Environmental Context'],
      [MapPinned, 'Lifestyle Information'],
      [ShieldCheck, 'Risk Modifiers'],
    ],
  },
]

export default function MultimodalStory() {
  const rail = useRef(null)
  const reducedMotion = useReducedMotion()

  function move(direction) {
    rail.current?.scrollBy({
      left: direction * 400,
      behavior: 'smooth',
    })
  }

  return (
    <section className="exact-timescales">
      <div className="exact-timescales-inner">
        <header className="exact-timescale-header">
          <div>
            <div className="exact-section-kicker">
              <i />
              <span>Our Research Foundation</span>
            </div>

            <h2>
              Multimodal <strong>Timescales</strong>
            </h2>

            <p>
              Anxiety is complex. No single signal tells the whole story. We
              integrate multiple modalities, each with its own timescale, to
              build a more complete and reliable understanding.
            </p>
          </div>

          <aside className="exact-timescale-intro">
            <i />

            <div>
              <p>
                Different signals, different timescales,
                <br />
                a unified understanding.
              </p>

              <div className="exact-timescale-arrows">
                <button
                  type="button"
                  onClick={() => move(-1)}
                  aria-label="Previous modality"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => move(1)}
                  aria-label="Next modality"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </aside>
        </header>

        <div className="exact-timescale-cards" ref={rail}>
          {cards.map((card, index) => (
            <motion.article
              key={card.id}
              className={`exact-timescale-card ${card.tone}`}
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 18,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                delay: index * 0.07,
              }}
            >
              <div className="exact-card-image">
                <img
                  src={card.image}
                  alt={
                    card.imageType === 'real'
                      ? 'Chest strap physiological sensing research artefact'
                      : `${card.title} AI-generated conceptual illustration`
                  }
                />

                <small>
                  {card.imageType === 'real'
                    ? 'REAL RESEARCH ARTEFACT'
                    : 'AI-GENERATED CONCEPT'}
                </small>
              </div>

              <div className="exact-card-body">
                <span className="exact-component-chip">
                  {card.id}
                </span>

                <h3>{card.title}</h3>

                <p className="exact-card-subtitle">
                  {card.subtitle}
                </p>

                <span className="exact-duration-pill">
                  {card.duration}
                </span>

                <svg
                  className="exact-card-wave"
                  viewBox="0 0 148 44"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d={card.trace} />
                </svg>

                <ul>
                  {card.items.map(([Icon, label]) => (
                    <li key={label}>
                      <Icon size={13} />
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>

                {card.note && (
                  <small className="exact-card-note">
                    {card.note}
                  </small>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="exact-fusion-row">
          <div className="exact-connector connector-1" />
          <div className="exact-connector connector-2" />
          <div className="exact-connector connector-3" />
          <div className="exact-connector connector-4" />

          <div className="exact-fusion-icon">
            <svg viewBox="0 0 24 24">
              <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Zm-8 9 8 4.5 8-4.5M4 16.5l8 4.5 8-4.5" />
            </svg>
          </div>

          <div className="exact-fusion-copy">
            <strong>
              Integrated through evidence-aware fusion
            </strong>

            <span>
              Different timescales. One comprehensive understanding.
            </span>
          </div>

          <a href="#/system" className="exact-fusion-button">
            See Fusion Process
            <ChevronRight size={15} />
          </a>
        </div>
      </div>
    </section>
  )
}
