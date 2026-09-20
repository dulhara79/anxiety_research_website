import { publications } from '../data/publicationsData'

export default function Publications(){
  return (
    <main className="internal shell">
      <header className="page-intro"><p className="eyebrow">PUBLICATIONS & OUTPUTS</p><h1>Status is a fact, not a visual flourish.</h1><p>Acceptance, indexing and DOI information are only added when verified from an official public record.</p></header>
      <section className="publication-list">
        {publications.map(item=><article key={item.title}><span>{item.year}</span><div><small>{item.statusLabel}</small><h2>{item.title}</h2><p>{item.project}</p></div><a href={item.url} target="_blank" rel="noreferrer">Repository ↗</a></article>)}
      </section>
    </main>
  )
}
