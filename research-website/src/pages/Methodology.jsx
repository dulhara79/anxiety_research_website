import StatusBadge from '../components/StatusBadge'

const sections=[
  ['Research design','The framework evaluates modalities separately because physiology, passive behaviour and clinical text operate on different timescales and have different validation contracts.'],
  ['Leakage control','Behavioural evaluation is participant-grouped across GLOBEM cohorts. Clinical NLP uses patient-disjoint support/query construction, frozen episode plans and explicit leakage certificates.'],
  ['Validation gate','A modality is not allowed to influence CURRENT fusion merely because its service exists. Status, usability, freshness and evidence quality remain explicit.'],
  ['Reliability-weighted fusion','Eligible modality weights combine deployment-relevant informativeness, recency and reliability. Unavailable modalities are masked rather than interpreted as zero risk.'],
  ['Timebase caveat','C1, C3 and C4 represent evidence with different temporal meanings. The fusion gate cannot by itself resolve semantic incompatibility; the methods record must state the modelling assumption.'],
  ['Current vs forecast','Current multimodal assessment and Near-term physiological forecast answer different questions and remain separate objects and labels.'],
  ['Audience projections','Patient and clinician views are projections of the same authoritative fusion_result_id. Mobile clients do not recompute the authoritative composite.'],
  ['CARE-AnxRAG','Evidence retrieval uses provenance and abstention principles; a failure or abstention must not become fabricated guidance.'],
]

export default function Methodology(){
  return (
    <main className="internal shell">
      <header className="page-intro"><p className="eyebrow">METHODOLOGY</p><h1>Evaluation first. Integration second.</h1><p>A modality earns influence through evidence rather than architectural symmetry.</p></header>
      <div className="method-layout">
        <aside><StatusBadge status="current" label="CURRENT METHOD"/><p>Measure → validate → qualify → integrate → interpret.</p></aside>
        <section className="method-list">
          {sections.map(([h,p],i)=>(
            <article key={h}><span>{String(i+1).padStart(2,'0')}</span><div><h2>{h}</h2><p>{p}</p>{h==='Reliability-weighted fusion'&&<pre>{'w_m(t) = ω_m × ρ_m(Δt) × c_m\nα_m = w_m / Σw\nS(t) = Σ α_m × p_m'}</pre>}</div></article>
          ))}
        </section>
      </div>
    </main>
  )
}
