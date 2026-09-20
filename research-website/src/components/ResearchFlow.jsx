import { motion } from 'framer-motion'
import { Activity, BrainCircuit, Database, GitMerge, MapPinned, ShieldCheck } from 'lucide-react'

const streams = [
  { id: 'C1', label: 'Physiological', icon: Activity, note: 'Short-horizon physiological evidence' },
  { id: 'C2', label: 'Behavioural', icon: MapPinned, note: 'Longer-horizon behavioural evidence' },
  { id: 'C3', label: 'Clinical NLP', icon: BrainCircuit, note: 'Clinical-note evidence' },
  { id: 'C4', label: 'Contextual', icon: Database, note: 'Static contextual prior' },
]

export default function ResearchFlow() {
  return (
    <section className="research-flow-section">
      <div className="shell research-flow-layout">
        <motion.div
          className="research-flow-copy"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .25 }}
          transition={{ duration: .7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-index">03 / Evidence architecture</div>
          <h2>From heterogeneous signals to one auditable assessment.</h2>
          <p>
            Each stream keeps its own provenance, freshness and validation state. Eligible evidence is harmonised and weighted before an authoritative fusion result is produced.
          </p>

          <div className="flow-principles">
            <span><ShieldCheck size={15} /> Missing evidence stays missing</span>
            <span><GitMerge size={15} /> Clients do not recompute fusion</span>
          </div>
        </motion.div>

        <div className="research-flow-canvas" aria-label="Animated multimodal fusion diagram">
          <div className="flow-grid" aria-hidden="true" />

          <svg className="flow-connectors" viewBox="0 0 720 520" aria-hidden="true">
            <defs>
              <linearGradient id="flowStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity=".18" />
                <stop offset="55%" stopColor="currentColor" stopOpacity=".75" />
                <stop offset="100%" stopColor="currentColor" stopOpacity=".25" />
              </linearGradient>
            </defs>
            {[
              'M150 120 C 265 120, 270 235, 360 260',
              'M150 400 C 265 400, 275 305, 360 270',
              'M570 120 C 455 120, 450 235, 360 260',
              'M570 400 C 455 400, 445 305, 360 270',
            ].map((d, i) => (
              <motion.path
                key={d}
                d={d}
                fill="none"
                stroke="url(#flowStroke)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: .35 }}
                transition={{ duration: 1.1, delay: .18 + i * .12, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}

            {[
              { path: 'M150 120 C 265 120, 270 235, 360 260', delay: 0 },
              { path: 'M150 400 C 265 400, 275 305, 360 270', delay: 1.2 },
              { path: 'M570 120 C 455 120, 450 235, 360 260', delay: 2.1 },
              { path: 'M570 400 C 455 400, 445 305, 360 270', delay: 3.1 },
            ].map((item, index) => (
              <motion.circle
                key={index}
                r="5"
                fill="currentColor"
                initial={{ offsetDistance: '0%' }}
                animate={{ offsetDistance: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                style={{ offsetPath: `path('${item.path}')` }}
                transition={{ duration: 4.2, delay: item.delay, repeat: Infinity, ease: 'linear' }}
              />
            ))}
          </svg>

          {streams.map((stream, index) => {
            const Icon = stream.icon
            return (
              <motion.article
                key={stream.id}
                className={`flow-node flow-node-${index + 1}`}
                initial={{ opacity: 0, scale: .84 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: .45 }}
                transition={{ duration: .5, delay: .18 + index * .12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, scale: 1.025 }}
              >
                <div><Icon size={18} /></div>
                <span>{stream.id}</span>
                <strong>{stream.label}</strong>
                <small>{stream.note}</small>
              </motion.article>
            )
          })}

          <motion.div
            className="fusion-core"
            initial={{ opacity: 0, scale: .7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: .5 }}
            transition={{ duration: .7, delay: .65, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.i animate={{ scale: [1, 1.14, 1], opacity: [.3, .7, .3] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} />
            <span>Authoritative</span>
            <strong>FUSION</strong>
            <small>recency × reliability × eligibility</small>
          </motion.div>

          <motion.div
            className="flow-output"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .5, delay: 1.05 }}
          >
            <span>ASSESSMENT RESULT</span>
            <b>Auditable · versioned · shared</b>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
