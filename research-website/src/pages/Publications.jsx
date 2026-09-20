import { ExternalLink } from 'lucide-react'

export default function Publications() {
  return (
    <main className="internal shell">
      <header className="page-intro">
        <p className="eyebrow">Publications & outputs</p>
        <h1>A publication record should distinguish status from intent.</h1>
        <p>
          This page avoids claiming acceptance, indexing or publication status that is not explicitly verified in the public record.
        </p>
      </header>

      <section className="publication-ledger">
        <article>
          <span className="publication-year">2026</span>
          <div>
            <span className="publication-status">Research manuscript / project output</span>
            <h2>A Multimodal Digital Biomarker Framework for Personalized Vulnerability Mapping and Acute Escalation Forecasting in Young Adults with Anxiety Disorders</h2>
            <p>R26-DS-012</p>
          </div>
          <a href="https://github.com/dulhara79/R26-DS-012" target="_blank" rel="noreferrer">
            Repository <ExternalLink size={15} />
          </a>
        </article>
      </section>

      <section className="publication-note">
        <h2>Why the status wording is conservative</h2>
        <p>
          Conference or journal acceptance, indexing, DOI assignment and publication metadata should only appear here once they are verifiable from an official public source.
        </p>
      </section>
    </main>
  )
}
