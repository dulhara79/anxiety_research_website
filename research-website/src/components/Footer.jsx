import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <span>R26—DS—012</span>
          <h2>Multimodal Anxiety Research</h2>
          <p>B.Sc. (Hons) Information Technology — Data Science · SLIIT · 2026</p>
        </div>
        <div className="footer-nav">
          <Link to="/research">Research</Link><Link to="/methodology">Methodology</Link><Link to="/evidence">Evidence</Link>
          <Link to="/system">System</Link><Link to="/documents">Documents</Link><Link to="/team">Team</Link>
        </div>
        <div className="footer-note">
          <p>Research and clinical decision-support work. Not a diagnostic medical device.</p>
          <p>Current, target and proposed system states are presented separately.</p>
        </div>
      </div>
    </footer>
  )
}
