import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, ShieldCheck, Layers3, FlaskConical, FileText, MoveRight } from 'lucide-react'
import HeroVisual from '../components/HeroVisual'
import ResearchFlow from '../components/ResearchFlow'
import { components, evidence } from '../data/research'

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.16 },
  transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
}

const textReveal = {
  hidden: { opacity: 0, y: 34, filter: 'blur(8px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: .72, delay: .08 + i * .08, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Home() {
  return (
    <main className="home-page">
      <section className="hero shell">
        <motion.div className="hero-copy" initial="hidden" animate="visible">
          <motion.div className="hero-meta" custom={0} variants={textReveal}>
            <span>R26—DS—012</span>
            <span>SLIIT · Data Science</span>
            <span>Research prototype</span>
          </motion.div>

          <motion.h1 custom={1} variants={textReveal}>
            Mapping anxiety vulnerability through <em>multimodal evidence.</em>
          </motion.h1>

          <motion.p className="lead" custom={2} variants={textReveal}>
            A research framework investigating physiological, behavioural, clinical-language and contextual signals,
            with reliability-aware fusion and near-term escalation research.
          </motion.p>

          <motion.div className="hero-actions" custom={3} variants={textReveal}>
            <Link className="button primary" to="/research">
              Explore research <ArrowRight size={16} />
            </Link>
            <Link className="button ghost" to="/documents">
              <FileText size={16} /> Research documents
            </Link>
          </motion.div>

          <motion.div className="hero-evidence-note" custom={4} variants={textReveal}>
            <span className="status-dot" />
            <p>Research and clinical decision support only. Not a validated diagnostic device.</p>
          </motion.div>
        </motion.div>

        <HeroVisual />
      </section>

      <section className="signal-marquee" aria-label="Research modalities">
        <div className="signal-marquee-track">
          {[0, 1].map(copy => (
            <div className="signal-marquee-set" key={copy} aria-hidden={copy === 1}>
              <span>PHYSIOLOGICAL SIGNALS</span><i />
              <span>BEHAVIOURAL PATTERNS</span><i />
              <span>CLINICAL NLP</span><i />
              <span>CONTEXTUAL PRIOR</span><i />
              <span>RELIABILITY WEIGHTING</span><i />
              <span>EVIDENCE-AWARE FUSION</span><i />
            </div>
          ))}
        </div>
      </section>

      <section className="principles-band">
        <div className="shell principles-grid">
          {[
            [Layers3, '01', 'Multimodal by design', 'Signals are studied on their own terms before they are combined.'],
            [FlaskConical, '02', 'Validation before influence', 'Evidence quality determines whether a modality is allowed to affect fusion.'],
            [ShieldCheck, '03', 'Uncertainty stays visible', 'Missing or unreliable evidence is not silently converted into a reassuring score.'],
          ].map(([Icon, number, title, copy], index) => (
            <motion.article
              key={title}
              {...reveal}
              transition={{ ...reveal.transition, delay: index * .09 }}
              whileHover={{ y: -6 }}
            >
              <motion.div
                className="principle-icon"
                animate={{ rotate: index === 1 ? [0, 3, -3, 0] : 0 }}
                transition={{ duration: 5, repeat: Infinity, repeatDelay: 4 }}
              >
                <Icon size={20} />
              </motion.div>
              <span>{number}</span>
              <h2>{title}</h2>
              <p>{copy}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <motion.section className="shell thesis-section" {...reveal}>
        <div className="section-index">01 / Research thesis</div>
        <div>
          <h2>Anxiety-related change is not expressed through one signal.</h2>
          <p>
            The project studies different timescales and evidence sources rather than assuming physiological,
            behavioural, clinical-language and contextual signals are interchangeable.
          </p>
          <motion.div
            className="thesis-rule"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.section>

      <section className="shell streams-section">
        <motion.div className="section-heading" {...reveal}>
          <div className="section-index">02 / Research system</div>
          <div>
            <h2>Four streams. One evidence-aware framework.</h2>
            <p>Each component is presented with its research question, method, data source and current evidence status.</p>
          </div>
        </motion.div>

        <div className="stream-grid">
          {components.map((component, index) => (
            <motion.article
              className="stream-card"
              key={component.id}
              {...reveal}
              transition={{ ...reveal.transition, delay: index * .07 }}
              whileHover={{ y: -8, transition: { duration: .22 } }}
            >
              <motion.div
                className="stream-ambient"
                animate={{ x: ['-10%', '12%', '-10%'], y: ['8%', '-6%', '8%'] }}
                transition={{ duration: 10 + index, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              />
              <div className="stream-top">
                <span className="stream-id">{component.id}</span>
                <span className="stream-status">{component.status}</span>
              </div>
              <h3>{component.title}</h3>
              <p>{component.question}</p>
              <div className="stream-data">{component.data}</div>
              <Link to="/research" className="inline-link">
                View component <ArrowRight size={14} />
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <ResearchFlow />

      <section className="evidence-section">
        <div className="shell">
          <motion.div className="section-heading" {...reveal}>
            <div className="section-index">04 / Evidence record</div>
            <div>
              <h2>Results stay attached to their evaluation context.</h2>
              <p>
                The site avoids turning isolated metrics into promotional claims. Evidence, status and limitations are shown together.
              </p>
            </div>
          </motion.div>

          <div className="metric-grid">
            {evidence.slice(0, 5).map((item, index) => (
              <motion.article
                className="metric-card"
                key={item.metric}
                {...reveal}
                transition={{ ...reveal.transition, delay: index * .06 }}
                whileHover={{ y: -8, scale: 1.015 }}
              >
                <motion.span
                  animate={{ opacity: [.55, 1, .55] }}
                  transition={{ duration: 3.4, delay: index * .35, repeat: Infinity }}
                >
                  {item.component}
                </motion.span>
                <small>{item.metric}</small>
                <strong>{item.value}</strong>
                <p>{item.context}</p>
                <em>{item.note}</em>
              </motion.article>
            ))}
          </div>

          <Link className="section-cta" to="/evidence">
            Open evidence record <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="shell portal-section">
        <motion.div className="portal-copy" {...reveal}>
          <div className="section-index">05 / Research record</div>
          <h2>A public-facing research record, not a product landing page.</h2>
          <p>
            Methodology, evidence, publications, project documents and the research team are separated into clear,
            citable sections so reviewers can move from overview to detail without losing context.
          </p>
        </motion.div>

        <div className="portal-links">
          {[
            [BookOpen, '/methodology', 'Methodology', 'Research design, leakage controls, fusion logic and safety boundary.'],
            [FileText, '/documents', 'Documents', 'Project repositories and research-facing technical records.'],
            [Layers3, '/team', 'Team', 'Researchers, component ownership and supervision.'],
          ].map(([Icon, to, title, copy], index) => (
            <motion.div key={to} {...reveal} transition={{ ...reveal.transition, delay: index * .09 }}>
              <Link to={to}>
                <Icon size={21} />
                <span><b>{title}</b><small>{copy}</small></span>
                <motion.span className="portal-arrow" whileHover={{ x: 5 }}><MoveRight size={17} /></motion.span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="safety-section">
        <div className="shell safety-layout">
          <motion.div
            className="safety-icon"
            animate={{ boxShadow: ['0 0 0 0 rgba(95,208,203,.0)', '0 0 0 12px rgba(95,208,203,.08)', '0 0 0 0 rgba(95,208,203,.0)'] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          >
            <ShieldCheck size={26} />
          </motion.div>
          <div>
            <div className="section-index">Research-use boundary</div>
            <h2>Evidence-aware, conservative by design.</h2>
          </div>
          <p>
            The integrated system is research / clinical decision support. It does not treat unavailable evidence as zero risk,
            and future escalation language must remain probabilistic rather than an exact-time guarantee.
          </p>
        </div>
      </section>
    </main>
  )
}
