import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  Boxes,
  Layers3,
  MapPin,
  ShieldCheck,
} from 'lucide-react'

const metrics = [
  {
    icon: Boxes,
    value: '4',
    text: 'Modalities',
  },
  {
    icon: Layers3,
    value: '1',
    text: 'Unified Framework',
  },
  {
    icon: ShieldCheck,
    text: 'Personalized\nRisk Assessment',
  },
  {
    icon: MapPin,
    text: 'Real-world\nClinical Relevance',
  },
]

export default function ResearchHero() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="exact-hero">
      <div className="exact-hero-ai-bg" />

      <div className="exact-hero-content">
        <motion.div
          className="exact-hero-copy"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div className="exact-hero-kicker">
            <span>R26—DS—012</span>
            <b>Multimodal AI for Mental Health</b>
          </div>

          <h1>
            From Signals to
            <br />
            Safer <strong>Tomorrows</strong>
          </h1>

          <p>
            A multimodal digital biomarker framework for personalized
            vulnerability mapping and acute escalation forecasting in young
            adults with anxiety disorders.
          </p>

          <div className="exact-hero-actions">
            <Link to="/research" className="exact-primary-button">
              Explore the Research
              <ArrowRight size={18} />
            </Link>

            <Link to="/system" className="exact-secondary-button">
              <Layers3 size={18} />
              View System Architecture
            </Link>
          </div>

          <div className="exact-hero-metrics">
            {metrics.map(({ icon: Icon, value, text }) => (
              <article key={text}>
                <div className="exact-metric-icon">
                  <Icon size={15} />
                </div>

                <div>
                  {value && <strong>{value}</strong>}
                  <span>
                    {text.split('\n').map((part) => (
                      <span key={part}>{part}</span>
                    ))}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </motion.div>

        <div className="exact-hero-visual">
          <motion.div
            className="exact-device-block"
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    x: 25,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.75,
              delay: 0.15,
            }}
          >
            <div className="exact-device-label">
              <strong>Physiological</strong>
              <strong>Sensing</strong>
              <span>(Chest Strap)</span>
            </div>

            <img
              src="/images/research/chest-strap-reference.webp"
              alt="Chest strap physiological sensing research hardware"
            />
          </motion.div>

          <div className="exact-evidence-copy">
            <span>Multimodal Evidence</span>
            <strong>Human-Centred Care</strong>

            <ul>
              <li>Physiological</li>
              <li>Behavioral</li>
              <li>Clinical Language</li>
              <li>Contextual</li>
            </ul>
          </div>

          <div className="exact-humanity-copy">
            <strong>AI + HUMANITY</strong>
            <span>FOR MENTAL WELLBEING</span>
          </div>

          <motion.article
            className="exact-risk-demo"
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 18,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.55,
            }}
          >
            <div className="exact-risk-demo-left">
              <strong>Anxiety Risk Analysis</strong>

              <svg
                className="exact-demo-wave"
                viewBox="0 0 150 40"
                aria-hidden="true"
              >
                <path d="M0 22 L14 22 L18 13 L22 32 L27 18 L34 22 L46 22 L52 10 L57 33 L62 19 L69 22 L81 22 L87 14 L93 29 L100 21 L112 22 L118 16 L124 26 L130 22 L150 22" />
              </svg>

              <small>
                <i />
                Research prototype
              </small>
            </div>

            <div className="exact-risk-demo-dial">
              <Activity size={18} />
              <strong>—</strong>
              <span>NO LIVE DATA</span>
            </div>
          </motion.article>

          <div className="exact-hero-script">
            Better Understanding
            <br />
            Brighter Tomorrows
          </div>
        </div>
      </div>

      <div className="exact-scroll-cue">
        <div className="exact-mouse">
          <i />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}
