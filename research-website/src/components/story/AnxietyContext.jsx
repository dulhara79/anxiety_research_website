import { motion, useReducedMotion } from 'framer-motion'
import { researchNarrative } from '../../data/research'
import MotionReveal from '../motion/MotionReveal'

export default function AnxietyContext() {
  const c = researchNarrative.context
  const reduced = useReducedMotion()

  return <section className="story-section context-section" id="context" data-section="context">
    <div className="shell context-layout">
      <MotionReveal className="context-copy-column" y={22}>
        <p className="eyebrow">{c.label}</p>
        <h2>{c.headline}</h2>
      </MotionReveal>

      <div className="context-detail-column">
        <MotionReveal y={22} delay={0.08}>
          <p className="large-copy context-large-copy">{c.body}</p>
        </MotionReveal>

        <motion.figure
          className="context-visual-wrap"
          initial={reduced ? false : { opacity: 0, y: 34, scale: 0.985 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.95, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className="context-art-glow"/>
          <img
            className="context-longitudinal-art context-wave-path"
            src="/media/context-longitudinal-field.svg"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </motion.figure>
      </div>
    </div>
  </section>
}
