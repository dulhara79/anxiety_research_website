import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Layers3, Activity, Boxes, CircleDot, ShieldCheck } from 'lucide-react'

const miniStats = [
  { icon: Boxes, number: '4', label: 'Modalities' },
  { icon: CircleDot, number: '1', label: 'Unified Framework' },
  { icon: ShieldCheck, number: '', label: 'Personalized Risk Assessment' },
  { icon: Activity, number: '', label: 'Real-world Clinical Relevance' },
]

export default function ResearchHero() {
  const reduce = useReducedMotion()

  return (
    <section className="showcase-hero pixel-hero">
      <div className="pixel-hero-background" aria-hidden="true" />
      <div className="shell pixel-hero-shell">
        <div className="pixel-hero-copy">
          <motion.div
            className="pixel-hero-kicker"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span>R26–DS–012</span>
            <b>MULTIMODAL AI FOR MENTAL HEALTH</b>
          </motion.div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .06 }}
          >
            From Signals to
            <br />
            Safer <em>Tomorrows</em>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .12 }}
          >
            A multimodal digital biomarker framework for personalized vulnerability mapping and acute escalation forecasting in young adults with anxiety disorders.
          </motion.p>

          <motion.div
            className="pixel-hero-actions"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .18 }}
          >
            <Link to="/research" className="pixel-primary">
              Explore the Research <ArrowRight size={17} />
            </Link>
            <Link to="/system" className="pixel-secondary">
              <Layers3 size={17} /> View System Architecture
            </Link>
          </motion.div>

          <motion.div
            className="pixel-hero-stats"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .24 }}
          >
            {miniStats.map(({ icon: Icon, number, label }) => (
              <article key={label}>
                <Icon size={15} />
                <div>
                  {number && <strong>{number}</strong>}
                  <span>{label}</span>
                </div>
              </article>
            ))}
          </motion.div>
        </div>

        <div className="pixel-hero-visual">
          <motion.div
            className="pixel-device-block"
            initial={reduce ? false : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: .18, duration: .7 }}
          >
            <div className="pixel-device-label">
              <strong>Physiological</strong>
              <strong>Sensing</strong>
              <span>(Chest Strap)</span>
            </div>
            <img
              src="/images/research/chest-strap-reference.webp"
              alt="Chest strap physiological sensing hardware used as the research hardware reference"
            />
          </motion.div>

          <motion.div
            className="pixel-evidence-copy"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .42 }}
          >
            <span>MULTIMODAL EVIDENCE</span>
            <b>HUMAN-CENTRED CARE</b>
            <ul>
              <li>Physiological</li>
              <li>Behavioral</li>
              <li>Clinical Language</li>
              <li>Contextual</li>
            </ul>
          </motion.div>

          <motion.div
            className="pixel-ai-humanity"
            initial={reduce ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: .48 }}
          >
            <strong>AI + HUMANITY</strong>
            <span>FOR MENTAL WELLBEING</span>
          </motion.div>

          <motion.div
            className="pixel-risk-card"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .55 }}
          >
            <div className="risk-left">
              <strong>Anxiety Risk Analysis</strong>
              <svg viewBox="0 0 130 38" aria-hidden="true">
                <path d="M2 21 L14 21 L20 9 L26 30 L33 15 L40 21 L54 21 L61 12 L67 28 L76 17 L84 21 L98 21 L104 14 L112 26 L120 20 L128 20" />
              </svg>
              <small><i /> Demo UI</small>
            </div>
            <div className="risk-dial">
              <div className="dial-ring"><span>—</span></div>
              <small>NO LIVE DATA</small>
            </div>
          </motion.div>

          <p className="pixel-script-note">
            Better Understanding
            <br />
            Brighter Tomorrows
          </p>
        </div>
      </div>

      <div className="pixel-scroll-cue">
        <i />
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}
