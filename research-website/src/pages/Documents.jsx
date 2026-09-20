import DocumentPreview from '../components/DocumentPreview'
import { documents } from '../data/documentsData'

export default function Documents(){
  return (
    <main className="internal shell">
      <header className="page-intro"><p className="eyebrow">DOCUMENTS</p><h1>Public research records with explicit provenance.</h1><p>Only sources that have a verified public location are exposed here.</p></header>
      <section className="document-list">{documents.map(document=><DocumentPreview key={document.id} document={document}/>)}</section>
      <aside className="publication-policy"><strong>Publication control</strong><p>Internal implementation handbooks, credentials, sensitive operational material and unpublished restricted records are not automatically exposed as downloads.</p></aside>
    </main>
  )
}
