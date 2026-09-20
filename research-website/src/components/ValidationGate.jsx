import { Check, CircleSlash2 } from 'lucide-react'
import StatusBadge from './StatusBadge'

export default function ValidationGate({ components }) {
  return (
    <section className="validation-gate shell">
      <header>
        <p className="eyebrow">03 / CURRENT VALIDATION GATE</p>
        <h2>Architecture does not grant a modality influence. Evidence does.</h2>
        <p>Status, recency and validation eligibility are checked before a signal can participate in current fusion. The gate does not erase the scientific caveat that modalities operate on different timebases.</p>
      </header>
      <div className="gate-rail">
        {components.map((component) => {
          const eligible = component.fusionEligible
          return (
            <article key={component.id} data-testid={'gate-' + component.id} data-eligible={String(eligible)} className={eligible ? 'gate-pass' : 'gate-stop'}>
              <div className="gate-node">{eligible ? <Check size={18}/> : <CircleSlash2 size={18}/>}</div>
              <span>{component.id}</span>
              <strong>{component.title}</strong>
              <StatusBadge status={component.status} label={component.statusLabel} />
              <small>{eligible ? 'Eligible for CURRENT fusion when usable/fresh' : 'Stopped before CURRENT fusion · activeFusionWeight 0.0'}</small>
            </article>
          )
        })}
      </div>
    </section>
  )
}
