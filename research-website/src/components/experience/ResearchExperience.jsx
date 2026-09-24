import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { researchStates } from '../../data/research'
import ResearchPreloader from './ResearchPreloader'
import ResearchLens from './ResearchLens'
import ResearchStateNav from './ResearchStateNav'
import ResearchStateContent from './ResearchStateContent'

const keys = ['overview','c1','c2','c3','c4']

export default function ResearchExperience() {
  const reduceMotion = useReducedMotion()
  const navigate = useNavigate()
  const [activeKey,setActiveKey] = useState('overview')
  const [targetKey,setTargetKey] = useState(null)
  const [transitioning,setTransitioning] = useState(false)
  const [preloading,setPreloading] = useState(() => {
    try { return !window.matchMedia('(prefers-reduced-motion: reduce)').matches && sessionStorage.getItem('r26-preloaded') !== '1' } catch { return true }
  })
  const state = researchStates[activeKey]
  const next = state.next === 'evidence' ? null : researchStates[state.next]

  const completePreloader = useCallback(() => { try{sessionStorage.setItem('r26-preloaded','1')}catch{} setPreloading(false) },[])

  const transitionTo = useCallback((key) => {
    if (!researchStates[key] || key===activeKey || transitioning) return
    if (reduceMotion) { setActiveKey(key); return }
    setTargetKey(key); setTransitioning(true)
    window.setTimeout(()=>setActiveKey(key),520)
    window.setTimeout(()=>{setTransitioning(false);setTargetKey(null)},1120)
  },[activeKey,transitioning,reduceMotion])

  const activate = () => {
    if (state.next === 'evidence') { navigate('/results'); return }
    transitionTo(state.next)
  }

  const index = useMemo(()=>keys.indexOf(activeKey),[activeKey])
  useEffect(()=>{ document.documentElement.dataset.researchState = activeKey },[activeKey])

  return (
    <section className="research-experience" aria-label="The multimodal signal journey">
      <AnimatePresence>{preloading && <ResearchPreloader onComplete={completePreloader}/>}</AnimatePresence>
      <div className="experience-grid-bg" aria-hidden="true" />
      <div className="experience-field-glow" style={{ '--state-accent': state.accent }} aria-hidden="true" />
      <div className="experience-inner shell-wide">
        <ResearchStateNav activeKey={activeKey} onSelect={transitionTo} disabled={transitioning}/>
        <div className="experience-copy">
          <AnimatePresence mode="wait">
            <motion.div key={state.key} initial={reduceMotion?false:{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}} transition={{duration:.55,ease:[.16,1,.3,1]}}>
              <p className="eyebrow light">{activeKey==='overview'?'R26—DS—012 / SLIIT / 2026':`${state.id} / ${state.id==='04'?'INTEGRATION':'RESEARCH SIGNAL'}`}</p>
              <h1>{state.headline || state.title}</h1>
              {activeKey==='overview' && <p className="experience-lead">A multimodal research framework combining physiological forecasting, leakage-audited behavioural evaluation, clinical language modelling and reliability-aware evidence fusion.</p>}
            </motion.div>
          </AnimatePresence>
          {activeKey==='overview' && <a href="#research-thesis" className="framework-entry" data-cursor="ENTER">ENTER THE FRAMEWORK <span>↓</span></a>}
        </div>
        <div className="lens-column">
          <AnimatePresence mode="wait">
            <motion.div className="next-signal" key={`${activeKey}-${state.next}`} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}>
              <span>{state.next==='evidence'?'NEXT':'NEXT SIGNAL'}</span>
              {state.next==='evidence'?<Link to="/results" data-cursor="VIEW">Evidence Record ↗</Link>:<button onClick={()=>transitionTo(state.next)} disabled={transitioning}>{next.id} &nbsp; {next.shortName}</button>}
            </motion.div>
          </AnimatePresence>
          <ResearchLens state={state} onActivate={activate} transitioning={transitioning} actionLabel={state.next==='evidence'?'View evidence record from Fusion':`Explore next research layer from ${state.shortName}`}/>
          <div className="lens-index" aria-hidden="true"><span>{String(index).padStart(2,'0')}</span><i style={{transform:`scaleX(${(index+1)/5})`}}/><span>04</span></div>
        </div>
        <div className="state-title-wrap" aria-hidden="true"><AnimatePresence mode="wait"><motion.div key={state.title} className={`state-title ${state.key==='c3'?'long':''}`} initial={reduceMotion?false:{y:'105%'}} animate={{y:0}} exit={{y:'-105%'}} transition={{duration:.72,ease:[.16,1,.3,1]}}>{state.title}</motion.div></AnimatePresence></div>
        <ResearchStateContent state={state}/>
      </div>
      {transitioning && <div className="transition-status" aria-live="polite">Opening {researchStates[targetKey]?.shortName || 'research layer'}</div>}
    </section>
  )
}
