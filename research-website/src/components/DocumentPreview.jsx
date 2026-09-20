import { ExternalLink } from 'lucide-react'

export default function DocumentPreview({ document }) {
  return (
    <article className="document-preview">
      <div><span>VERIFIED PUBLIC RECORD</span><h3>{document.title}</h3><p>{document.description}</p></div>
      <a href={document.url} target="_blank" rel="noreferrer">Open <ExternalLink size={14}/></a>
    </article>
  )
}
