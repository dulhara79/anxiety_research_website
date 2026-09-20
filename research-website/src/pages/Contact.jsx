import { ExternalLink, Github } from 'lucide-react'

export default function Contact() {
  return (
    <main className="internal shell">
      <header className="page-intro">
        <p className="eyebrow">Contact & research access</p>
        <h1>Use the public project record for research enquiries.</h1>
        <p>
          R26-DS-012 · B.Sc. (Hons) Information Technology — Data Science · Sri Lanka Institute of Information Technology.
        </p>
      </header>

      <section className="contact-panel">
        <div>
          <span className="contact-label">Project</span>
          <h2>Multimodal Anxiety Research</h2>
          <p>
            For implementation context, reproducibility materials or public research artefacts, start with the integrated repository.
          </p>
        </div>
        <a href="https://github.com/dulhara79/R26-DS-012" target="_blank" rel="noreferrer" className="button primary">
          <Github size={16} /> Open project repository <ExternalLink size={14} />
        </a>
      </section>
    </main>
  )
}
