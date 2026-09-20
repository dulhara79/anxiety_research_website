import { motion } from 'framer-motion'
import { AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react'
import { evidence } from '../data/research'

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: .2 },
  transition: { duration: .55, ease: [0.22, 1, 0.36, 1] },
}

export default function Results() {
  return (
    <main className="internal shell">
      <header className="page-intro">
        <p className="eyebrow">Evidence record</p>
        <h1>Metrics with context, not headline numbers.</h1>
        <p>
          Results are shown together with the setting that produced them and the limitation that changes how they should be interpreted.
        </p>
      </header>

      <section className="evidence-ledger">
        <div className="evidence-ledger-head">
          <span>Component</span>
          <span>Measure / setting</span>
          <span>Result</span>
          <span>Interpretation</span>
        </div>

        {evidence.map((item) => (
          <motion.article className="evidence-ledger-row" key={item.metric} {...reveal}>
            <span className="evidence-component">{item.component}</span>
            <div>
              <strong>{item.metric}</strong>
              <small>{item.context}</small>
            </div>
            <b>{item.value}</b>
            <p>{item.note}</p>
          </motion.article>
        ))}
      </section>

      <section className="validation-note">
        <div className="validation-icon"><AlertTriangle size={22} /></div>
        <div>
          <p className="eyebrow">Validation gate</p>
          <h2>C2 remains excluded from active fusion.</h2>
          <p>
            The final GLOBEM GATv2 result was not distinguishable from chance under the project’s leakage-free held-out evaluation.
            Its current active fusion weight is <strong>0.0</strong>.
          </p>
        </div>
      </section>

      <section className="evidence-interpretation">
        <div>
          <CheckCircle2 size={18} />
          <h3>What this page does</h3>
          <p>Records metrics, settings and evidence status without pretending every result is deployment-ready.</p>
        </div>
        <div>
          <ArrowRight size={18} />
          <h3>What comes next</h3>
          <p>Publication-facing claims should stay aligned with the exact evaluation population, split and model version used.</p>
        </div>
      </section>
    </main>
  )
}
