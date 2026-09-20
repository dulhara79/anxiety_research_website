import { motion } from 'framer-motion'
import { components } from '../data/researchData'
import StatusBadge from '../components/StatusBadge'

export default function Components() {
  return (
    <main className="internal shell">
      <header className="page-intro">
        <p className="eyebrow">RESEARCH / FOUR STREAMS</p>
        <h1>Each modality is a separate research claim before it becomes a system input.</h1>
        <p>The public record keeps the question, method, data, evidence state and limitation together.</p>
      </header>
      <div className="component-ledger">
        {components.map((component,index)=>(
          <motion.section key={component.id} className="component-case" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.18}}>
            <div className="case-index">{String(index+1).padStart(2,'0')}<strong>{component.id}</strong></div>
            <div className="case-copy">
              <div className="case-meta"><span>{component.owner}</span><StatusBadge status={component.status} label={component.statusLabel}/></div>
              <h2>{component.title}</h2>
              <h3>{component.question}</h3>
              <dl>
                <div><dt>Method</dt><dd>{component.method}</dd></div>
                <div><dt>Data</dt><dd>{component.data.join(' · ')}</dd></div>
                <div><dt>Timescale</dt><dd>{component.timescale}</dd></div>
                <div><dt>Evidence</dt><dd>{component.evidence}</dd></div>
                {component.limitation&&<div><dt>Limitation</dt><dd>{component.limitation}</dd></div>}
              </dl>
            </div>
            <div className={'case-visual visual-'+component.id.toLowerCase()} aria-hidden="true">
              <span>{component.id}</span><i/><i/><i/><i/>
            </div>
          </motion.section>
        ))}
      </div>
    </main>
  )
}
