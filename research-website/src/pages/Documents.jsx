import { ExternalLink, FileCode2, FileText, FolderGit2, ShieldCheck } from 'lucide-react'

const documents = [
  {
    type: 'Source',
    title: 'Integrated research repository',
    description: 'Implementation, research artefacts and source-of-truth project materials maintained in the R26-DS-012 repository.',
    url: 'https://github.com/dulhara79/R26-DS-012',
    icon: FolderGit2,
  },
  {
    type: 'Source',
    title: 'Research website repository',
    description: 'Source code, design history and public-facing website implementation.',
    url: 'https://github.com/dulhara79/anxiety_research_website',
    icon: FileCode2,
  },
]

export default function Documents() {
  return (
    <main className="internal shell">
      <header className="page-intro">
        <p className="eyebrow">Research documents</p>
        <h1>Project records with provenance.</h1>
        <p>
          Only documents with a verifiable public location are linked here. Internal or unpublished records are not presented as public downloads.
        </p>
      </header>

      <section className="document-library">
        {documents.map((doc) => {
          const Icon = doc.icon
          return (
            <article key={doc.title}>
              <div className="document-icon"><Icon size={21} /></div>
              <div>
                <span>{doc.type}</span>
                <h2>{doc.title}</h2>
                <p>{doc.description}</p>
              </div>
              <a href={doc.url} target="_blank" rel="noreferrer">
                Open source <ExternalLink size={15} />
              </a>
            </article>
          )
        })}
      </section>

      <section className="document-policy">
        <ShieldCheck size={22} />
        <div>
          <h2>Publication control</h2>
          <p>
            Technical, clinical, unpublished or institution-sensitive documents should only be added after the research team confirms that a public copy is appropriate.
          </p>
        </div>
      </section>

      <section className="document-next">
        <FileText size={18} />
        <p>
          The page is structured to accept approved proposal PDFs, posters, manuscripts, ethics-facing summaries and supplementary material later without changing the information architecture.
        </p>
      </section>
    </main>
  )
}
