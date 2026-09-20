import { Smartphone, Stethoscope } from 'lucide-react'
import { audienceProjections } from '../data/systemStatus'

export default function AudienceProjection() {
  return (
    <section className="projection-section shell">
      <div className="projection-source">
        <span>ONE SERVER RESULT</span>
        <strong>FusionResult</strong>
        <code>fusion_result_id</code>
      </div>
      <div className="projection-branches" aria-hidden="true"><i/><i/></div>
      <div className="projection-views">
        {audienceProjections.map((item) => (
          <article key={item.audience}>
            {item.audience === 'patient' ? <Smartphone size={20}/> : <Stethoscope size={20}/>}
            <span>{item.audience.toUpperCase()} PROJECTION</span>
            <h3>{item.audience === 'patient' ? 'Patient-safe view' : 'Clinician view'}</h3>
            <p>Derived from the same authoritative result; client recomputes fusion: <strong>{String(item.recomputesFusion)}</strong>.</p>
          </article>
        ))}
      </div>
    </section>
  )
}
