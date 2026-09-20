import { useState } from 'react'
import StatusBadge from '../components/StatusBadge'
import { currentSystemNodes, systemStates, targetSystemNodes } from '../data/systemStatus'

export default function System(){
  const [mode,setMode]=useState('current')
  const target=mode==='target'
  const nodes=target?targetSystemNodes:currentSystemNodes
  const state=target?systemStates.target:systemStates.current

  return (
    <main className="internal shell">
      <header className="page-intro">
        <p className="eyebrow">SYSTEM ARCHITECTURE</p>
        <h1>Current implementation and target architecture are different views.</h1>
        <p>The target view is deliberately labelled so planned behavior is not mistaken for verified running behavior.</p>
      </header>
      <div className="system-toggle" role="tablist" aria-label="Architecture state">
        <button className={!target?'active':''} onClick={()=>setMode('current')}>CURRENT</button>
        <button className={target?'active':''} onClick={()=>setMode('target')}>TARGET</button>
      </div>
      <section className="system-board" data-mode={mode}>
        <div className="system-board-head"><StatusBadge status={state.status} label={state.label}/><p>{state.description}</p></div>
        <div className="system-nodes">
          {nodes.map((node,index)=><article key={node.id}><span>{String(index+1).padStart(2,'0')}</span><strong>{node.label}</strong><StatusBadge status={node.status} label={node.status.toUpperCase()}/></article>)}
        </div>
        {!target&&<div className="system-invariant"><b>Canonical principle</b><p>One patient → one canonical backend identity → one authoritative fusion result → audience-specific views.</p></div>}
        {target&&<div className="system-invariant target"><b>TARGET attention lifecycle</b><p>ForecastResult → policy → OPEN → ACKNOWLEDGED → RESOLVED. This panel describes target architecture, not verified current behavior.</p></div>}
      </section>
    </main>
  )
}
