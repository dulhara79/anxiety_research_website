import { motion } from 'framer-motion'
import { CheckCircle2, GitBranch, ShieldCheck } from 'lucide-react'

const sections = [
  {
    id: '01',
    title: 'Research design',
    body: 'The framework evaluates modalities separately because physiology, passive behaviour and clinical text operate on different timescales and have different validation contracts.',
  },
  {
    id: '02',
    title: 'Leakage control',
    body: 'Behavioural evaluation is participant-grouped across GLOBEM cohorts. Clinical NLP uses patient-disjoint support/query construction, frozen episode plans and explicit leakage certificates.',
  },
  {
    id: '03',
    title: 'Reliability-weighted fusion',
    body: 'Eligible modality weights combine deployment-relevant informativeness, recency and reliability. Unavailable modalities are masked rather than interpreted as zero risk.',
    formula: ['w_m(t) = ω_m × ρ_m(Δt) × c_m', 'α_m = w_m / Σw', 'S(t) = Σ α_m × p_m'],
  },
  {
    id: '04',
    title: 'Decision rule',
    body: 'A contextual prior cannot produce a tier by itself. The system may return insufficient evidence when eligible evidence is not adequate.',
  },
  {
    id: '05',
    title: 'CARE-AnxRAG',
    body: 'Hybrid dense + lexical retrieval, reranking, authority/freshness scoring, contradiction checks, provenance and calibrated abstention support evidence-aware retrieval.',
  },
  {
    id: '06',
    title: 'Research safety',
    body: 'The integrated framework is research / clinical decision support, not a diagnostic device.',
  },
]

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: .2 },
  transition: { duration: .58, ease: [0.22, 1, 0.36, 1] },
}

export default function Methodology() {
  return (
    <main className="internal shell">
      <header className="page-intro">
        <p className="eyebrow">Methodology / evidence before integration</p>
        <h1>Evaluation first. Integration second.</h1>
        <p>
          A modality earns influence through evidence rather than through architectural symmetry.
          The public record separates methodology, validation status and system integration.
        </p>
      </header>

      <div className="method-rail">
        <aside className="method-aside">
          <div className="method-sticky">
            <span>Research logic</span>
            <strong>Measure → validate → qualify → integrate → interpret</strong>
            <p>Each step keeps provenance and uncertainty visible.</p>
          </div>
        </aside>

        <section className="method-list">
          {sections.map((section) => (
            <motion.article key={section.id} {...reveal}>
              <div className="method-index">{section.id}</div>
              <div className="method-content">
                <h2>{section.title}</h2>
                <p>{section.body}</p>
                {section.formula && (
                  <div className="formula-card">
                    <span>Current fusion notation</span>
                    {section.formula.map(line => <code key={line}>{line}</code>)}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </section>
      </div>

      <section className="method-principles">
        <article>
          <GitBranch size={19} />
          <h3>Current ≠ forecast</h3>
          <p>Present-state assessment and near-term prediction should remain distinct concepts.</p>
        </article>
        <article>
          <CheckCircle2 size={19} />
          <h3>Missing ≠ low</h3>
          <p>Unavailable or stale evidence should be explicit, not silently converted into zero.</p>
        </article>
        <article>
          <ShieldCheck size={19} />
          <h3>Research-safe language</h3>
          <p>Future-risk wording should express potential escalation rather than guaranteed exact-time events.</p>
        </article>
      </section>
    </main>
  )
}
