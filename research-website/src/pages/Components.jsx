import { motion } from 'framer-motion'
import { Database, FlaskConical, Gauge, UserRound } from 'lucide-react'
import { components } from '../data/research'

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: .16 },
  transition: { duration: .6, ease: [0.22, 1, 0.36, 1] },
}

const accents = {
  C1: 'physiology',
  C2: 'behaviour',
  C3: 'clinical',
  C4: 'fusion',
}

function SignalFigure({ id }) {
  return (
    <div className={"signal-figure " + accents[id]} aria-hidden="true">
      <div className="signal-grid" />
      <span className="figure-label">{id} / SIGNAL VIEW</span>
      {id === 'C1' && <svg viewBox="0 0 360 180"><path d="M10 105h42l16-50 18 92 22-71 18 29h28l14-44 20 84 22-58 20 18h120" /></svg>}
      {id === 'C2' && <div className="graph-points"><i /><i /><i /><i /><i /><i /><i /></div>}
      {id === 'C3' && <div className="embedding-cloud"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>}
      {id === 'C4' && <div className="fusion-orbit"><i /><i /><i /><i /><b>FUSE</b></div>}
      <span className="figure-caption">research representation</span>
    </div>
  )
}

export default function Components() {
  return (
    <main className="internal shell">
      <header className="page-intro research-intro">
        <p className="eyebrow">Research system / 04 streams</p>
        <h1>One framework, four different evidence contracts.</h1>
        <p>
          Each stream addresses a different research question and operates at a different timescale.
          Architectural symmetry does not imply equal scientific reliability.
        </p>
      </header>

      <section className="research-ledger">
        {components.map((component, index) => (
          <motion.article className="research-entry" key={component.id} {...reveal}>
            <div className="entry-number">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{component.id}</strong>
            </div>

            <div className="entry-main">
              <div className="entry-meta">
                <span><UserRound size={14} /> {component.owner}</span>
                <span><Gauge size={14} /> {component.status}</span>
              </div>
              <h2>{component.title}</h2>
              <h3>{component.question}</h3>

              <div className="entry-facts">
                <div>
                  <FlaskConical size={17} />
                  <span><b>Method</b>{component.method}</span>
                </div>
                <div>
                  <Database size={17} />
                  <span><b>Data</b>{component.data}</span>
                </div>
                <div>
                  <Gauge size={17} />
                  <span><b>Evidence status</b>{component.evidence}</span>
                </div>
                {component.limitation && (
                  <div className="limitation">
                    <span className="warning-dot" />
                    <span><b>Limitation</b>{component.limitation}</span>
                  </div>
                )}
              </div>
            </div>

            <SignalFigure id={component.id} />
          </motion.article>
        ))}
      </section>

      <section className="research-boundary">
        <div className="section-index">Interpretation rule</div>
        <h2>Component outputs are evidence inputs, not interchangeable clinical conclusions.</h2>
        <p>
          The research framework keeps component provenance and evidence status visible so that a modality can be withheld,
          marked experimental, or treated as unavailable without fabricating certainty.
        </p>
      </section>
    </main>
  )
}
