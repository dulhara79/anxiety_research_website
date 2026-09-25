import { researchNarrative } from '../../data/research'
import MotionReveal from '../motion/MotionReveal'
export default function AnxietyContext(){const c=researchNarrative.context;return <section className="story-section context-section" id="context" data-section="context"><MotionReveal className="shell editorial-grid"><div><p className="eyebrow">{c.label}</p><h2>{c.headline}</h2></div><div><p className="large-copy">{c.body}</p><div className="signal-field" aria-hidden="true"><span/><span/><span/><span/></div></div></MotionReveal></section>}
