import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div className="footer-identity">
          <span className="footer-kicker">R26—DS—012</span>
          <h2>Multimodal Anxiety Research</h2>
          <p>B.Sc. (Hons) Information Technology — Data Science · SLIIT · 2026</p>
        </div>

        <div className="footer-links">
          <Link to="/research">Research system</Link>
          <Link to="/methodology">Methodology</Link>
          <Link to="/evidence">Evidence</Link>
          <Link to="/documents">Documents</Link>
          <Link to="/team">Research team</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-meta">
          <a href="https://github.com/dulhara79/R26-DS-012" target="_blank" rel="noreferrer">
            Project repository <ExternalLink size={14} />
          </a>
          <p>Research and clinical decision-support work. Not a diagnostic medical device.</p>
          <span>Evidence is presented with validation context and limitations.</span>
        </div>
      </div>
    </footer>
  )
}
