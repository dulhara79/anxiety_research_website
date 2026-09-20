import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, HeartPulse, Smartphone, FileText, Users, Moon, MessageSquareText, Brain, ShieldCheck, UserRound, History, MapPinned } from 'lucide-react'
import { components } from '../data/researchData'

const presentation = {
  C1: {
    title: 'Physiological Signals',
    subtitle: 'Short-term · Real-time',
    pill: 'Seconds – Minutes',
    image: '/images/research/chest-strap-reference.webp',
    imageClass: 'contain',
    icon: HeartPulse,
    color: 'blue',
    bullets: [
      ['Heart Rate & HRV', HeartPulse],
      ['Respiration patterns', ActivityIcon],
      ['Physiological arousal', Brain],
      ['Real-time monitoring', ShieldCheck],
    ],
  },
  C2: {
    title: 'Behavioural Patterns',
    subtitle: 'Medium-term · Daily',
    pill: 'Hours – Weeks',
    image: '/images/research/ai-behavioural-concept.webp',
    icon: Smartphone,
    color: 'violet',
    bullets: [
      ['Activity & sleep patterns', Moon],
      ['Mobile usage patterns', Smartphone],
      ['Social interaction signals', Users],
      ['Experimental / excluded', ShieldCheck],
    ],
  },
  C3: {
    title: 'Clinical Language',
    subtitle: 'Episodic · Clinical context',
    pill: 'Visits – Months',
    image: '/images/research/multimodal-editorial.webp',
    icon: FileText,
    color: 'teal',
    bullets: [
      ['Clinical note analysis', FileText],
      ['Few-shot learning (TC-WPN)', Brain],
      ['Semantic understanding', MessageSquareText],
      ['Confidence-weighted evidence', ShieldCheck],
    ],
  },
  C4: {
    title: 'Contextual Information',
    subtitle: 'Long-term · Baseline',
    pill: 'Weeks – Months',
    image: '/images/research/ai-neural-concept.webp',
    icon: UserRound,
    color: 'orange',
    bullets: [
      ['Demographic factors', UserRound],
      ['Clinical history', History],
      ['Contextual factors', MapPinned],
      ['Risk modifiers', ShieldCheck],
    ],
  },
}

function ActivityIcon(props){
  return <HeartPulse {...props}/>
}

function SignalTrace({id}){
  const paths={
    C1:'M2 23 L18 23 L23 8 L29 38 L35 16 L43 23 L58 23 L63 12 L70 34 L78 19 L86 23 L103 23 L111 14 L117 31 L126 23 L145 23',
    C2:'M2 25 C17 23 22 29 37 25 S60 20 75 25 S99 30 114 25 S132 20 146 24',
    C3:'M2 27 C17 27 26 10 42 10 S65 36 83 20 S104 11 119 21 S133 31 146 18',
    C4:'M2 29 C18 28 33 27 49 28 S78 29 97 27 S124 25 146 21',
  }
  return <svg className="timescale-trace" viewBox="0 0 148 44" preserveAspectRatio="none" aria-hidden="true"><path d={paths[id]}/></svg>
}

export default function MultimodalStory() {
  const rail=useRef(null)
  const reduce=useReducedMotion()

  const move=(direction)=>{
    rail.current?.scrollBy({left:direction*360,behavior:'smooth'})
  }

  return (
    <section className="timescale-showcase">
      <div className="shell">
        <header className="timescale-heading">
          <div>
            <span className="timescale-label"><i/> Our Research Foundation</span>
            <h2>Multimodal <strong>Timescales</strong></h2>
            <p>Anxiety is complex. No single signal tells the whole story. The framework investigates multiple modalities, each operating on its own timescale, before evidence-aware integration.</p>
          </div>
          <div className="timescale-side">
            <i/>
            <p>Different signals, different timescales,<br/>a unified understanding.</p>
            <div>
              <button type="button" aria-label="Scroll modalities left" onClick={()=>move(-1)}><ChevronLeft size={18}/></button>
              <button type="button" aria-label="Scroll modalities right" onClick={()=>move(1)}><ChevronRight size={18}/></button>
            </div>
          </div>
        </header>

        <div className="timescale-rail" ref={rail}>
          {components.map((component,index)=>{
            const view=presentation[component.id]
            const Icon=view.icon
            return (
              <motion.article
                className={'timescale-card card-'+view.color}
                key={component.id}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: .2 }}
                transition={{ delay:index*.06 }}
                whileHover={reduce ? undefined : { y:-6 }}
              >
                <div className={'timescale-image '+(view.imageClass||'')}>
                  <img src={view.image} alt={component.id==='C1' ? 'Chest strap physiological sensing research artefact' : view.title+' AI-generated conceptual illustration'} loading="lazy"/>
                  <span>{component.id==='C1'?'REAL RESEARCH ARTEFACT':'AI-GENERATED CONCEPT'}</span>
                </div>

                <div className="timescale-card-body">
                  <div className="timescale-card-title">
                    <span className="component-chip">{component.id}</span>
                    <Icon size={15}/>
                  </div>
                  <h3>{view.title}</h3>
                  <p className="timescale-subtitle">{view.subtitle}</p>
                  <span className="timescale-pill">{view.pill}</span>
                  <SignalTrace id={component.id}/>
                  <ul>
                    {view.bullets.map(([label,BulletIcon])=><li key={label}><BulletIcon size={13}/><span>{label}</span></li>)}
                  </ul>
                  {component.id==='C2' && <small className="timescale-excluded">Current fusion weight: 0.0 · experimental/excluded</small>}
                </div>
              </motion.article>
            )
          })}
        </div>

        <div className="fusion-bridge" aria-label="Evidence-aware fusion concept">
          <div className="fusion-wire wire-1"/><div className="fusion-wire wire-2"/><div className="fusion-wire wire-3"/><div className="fusion-wire wire-4"/>
          <span className="fusion-cube"><LayersIcon/></span>
          <div className="fusion-bridge-copy"><strong>Integrated through evidence-aware fusion</strong><small>Different timescales. One auditable research framework.</small></div>
          <a href="#/system">See Fusion Process <ChevronRight size={15}/></a>
        </div>
      </div>
    </section>
  )
}

function LayersIcon(){
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Zm-8 9 8 4.5 8-4.5M4 16.5l8 4.5 8-4.5"/></svg>
}
