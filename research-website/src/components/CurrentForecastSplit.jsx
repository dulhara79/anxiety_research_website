import { Clock3, Gauge } from 'lucide-react'

export default function CurrentForecastSplit({ assessment, forecast }) {
  return (
    <section className="state-split shell">
      <header>
        <p className="eyebrow">05 / SEMANTIC SEPARATION</p>
        <h2>What the evidence indicates now is not the same question as what may happen next.</h2>
      </header>
      <div className="split-track">
        <article className="split-current">
          <Gauge size={20}/>
          <span>CURRENT</span>
          <h3>{assessment?.label || 'Current multimodal assessment'}</h3>
          <p>Authoritative current state from the central fusion result.</p>
          <code>{assessment?.identity || 'fusion_result_id'}</code>
        </article>
        <div className="split-divider"><i/><span>DO NOT COLLAPSE</span><i/></div>
        <article className="split-forecast">
          <Clock3 size={20}/>
          <span>FORECAST · SCOPE: PHYSIOLOGICAL</span>
          <h3>{forecast?.label || 'Near-term physiological forecast'}</h3>
          <p>Potential escalation within a defined future horizon; kept distinct from current multimodal assessment.</p>
          <code>{forecast?.identity || 'forecast_result_id'}</code>
        </article>
      </div>
    </section>
  )
}
