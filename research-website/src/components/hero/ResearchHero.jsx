import { Link } from 'react-router-dom'
import HeroMedia from './HeroMedia'
import AnimatedHeading from './AnimatedHeading'
import { researchNarrative } from '../../data/research'
export default function ResearchHero(){return <section className="research-hero" id="overview"><HeroMedia/><div className="hero-inner shell"><div className="hero-copy-panel"><p className="eyebrow hero-eyebrow">R26—DS—012 · SLIIT · 2026</p><AnimatedHeading/><p className="hero-lead">{researchNarrative.hero.supporting}</p><div className="hero-actions"><a className="button primary" href="#context">Explore the Research</a><Link className="button glass-button" to="/findings">View Findings</Link></div></div><div className="hero-context glass"><span>Multimodal AI · Digital Biomarkers · Anxiety Research</span><small>RESEARCH PROTOTYPE · 2026</small></div></div></section>}
