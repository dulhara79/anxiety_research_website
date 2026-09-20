import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, ShieldCheck, Layers3, FlaskConical, FileText } from 'lucide-react'
import ResearchPlate from '../components/ResearchPlate'
import { components, evidence } from '../data/research'

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
}

export default function Home() {
  return (
    <main>
      <section className="hero shell">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .72, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-meta">
            <span>R26—DS—012</span>
            <span>SLIIT · Data Science</span>
            <span>Research prototype</span>
          </div>
          <h1>
            Mapping anxiety vulnerability through <em>multimodal evidence.</em>
          </h1>
          <p className="lead">
            A research framework investigating physiological, behavioural, clinical-language and contextual signals,
            with reliability-aware fusion and near-term escalation research.
          </p>
          <div className="hero-actions">
            <Link className="button primary" to="/research">
              Explore research <ArrowRight size={16} />
            </Link>
            <Link className="button ghost" to="/documents">
              <FileText size={16} /> Research documents
            </Link>
          </div>
          <p className="hero-note">
            Research and clinical decision support only. The project is not presented as a validated diagnostic device.
          </p>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: .97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .8, delay: .12, ease: [0.22, 1, 0.36, 1] }}
        >
          <ResearchPlate />
        </motion.div>
      </section>

      <section className="principles-band">
        <div className="shell principles-grid">
          <motion.article {...reveal}>
            <Layers3 size={20} />
            <span>01</span>
            <h2>Multimodal by design</h2>
            <p>Signals are studied on their own terms before they are combined.</p>
          </motion.article>
          <motion.article {...reveal} transition={{ ...reveal.transition, delay: .08 }}>
            <FlaskConical size={20} />
            <span>02</span>
            <h2>Validation before influence</h2>
            <p>Evidence quality determines whether a modality is allowed to affect fusion.</p>
          </motion.article>
          <motion.article {...reveal} transition={{ ...reveal.transition, delay: .16 }}>
            <ShieldCheck size={20} />
            <span>03</span>
            <h2>Uncertainty stays visible</h2>
            <p>Missing or unreliable evidence is not silently converted into a reassuring score.</p>
          </motion.article>
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
              transition={{ ...reveal.transition, delay: index * .06 }}
            >
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

      <section className="evidence-section">
        <div className="shell">
          <motion.div className="section-heading" {...reveal}>
            <div className="section-index">03 / Evidence record</div>
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
              >
                <span>{item.component}</span>
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
          <div className="section-index">04 / Research record</div>
          <h2>A public-facing research record, not a product landing page.</h2>
          <p>
            Methodology, evidence, publications, project documents and the research team are separated into clear,
            citable sections so reviewers can move from overview to detail without losing context.
          </p>
        </motion.div>

        <div className="portal-links">
          <motion.div {...reveal}>
            <Link to="/methodology">
              <BookOpen size={21} />
              <span><b>Methodology</b><small>Research design, leakage controls, fusion logic and safety boundary.</small></span>
              <ArrowRight size={17} />
            </Link>
          </motion.div>
          <motion.div {...reveal} transition={{ ...reveal.transition, delay: .08 }}>
            <Link to="/documents">
              <FileText size={21} />
              <span><b>Documents</b><small>Project repositories and research-facing technical records.</small></span>
              <ArrowRight size={17} />
            </Link>
          </motion.div>
          <motion.div {...reveal} transition={{ ...reveal.transition, delay: .16 }}>
            <Link to="/team">
              <Layers3 size={21} />
              <span><b>Team</b><small>Researchers, component ownership and supervision.</small></span>
              <ArrowRight size={17} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="safety-section">
        <div className="shell safety-layout">
          <div className="safety-icon"><ShieldCheck size={26} /></div>
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
