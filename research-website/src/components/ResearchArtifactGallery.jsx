import { artifacts } from '../data/documentsData'

const labels = {
  real: 'REAL RESEARCH ARTEFACT',
  diagram: 'RESEARCH DIAGRAM',
  editorial: 'EDITORIAL ILLUSTRATION',
  'public-record': 'VERIFIED PUBLIC RECORD',
}

export default function ResearchArtifactGallery() {
  return (
    <section className="artifact-gallery shell">
      <header>
        <p className="eyebrow">07 / RESEARCH ARTEFACTS</p>
        <h2>Show the research, not a synthetic substitute for it.</h2>
        <p>Real hardware and approved project material are identified separately from supporting editorial imagery.</p>
      </header>
      <div className="artifact-grid">
        {artifacts.map((artifact) => (
          <figure key={artifact.id} className={'artifact artifact-' + artifact.kind}>
            <img src={artifact.source} alt={artifact.alt} loading="lazy" />
            <figcaption><span>{labels[artifact.kind]}</span><strong>{artifact.title}</strong></figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
