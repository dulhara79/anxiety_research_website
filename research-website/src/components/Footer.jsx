import { Link } from 'react-router-dom'
import { project, safetyPrinciples } from '../data/research'

export default function Footer(){return <footer className="footer"><div className="shell-wide footer-grid"><div><strong>R26—DS—012</strong><p>{project.title}</p></div><div className="footer-links"><Link to="/documents">Documents</Link><Link to="/contact">Contact</Link><a href={project.repository} target="_blank" rel="noreferrer" data-cursor="OPEN ↗">Research repository ↗</a></div><div><p className="fine">{safetyPrinciples[0]}</p><p className="fine">{safetyPrinciples[1]}</p></div></div></footer>}
