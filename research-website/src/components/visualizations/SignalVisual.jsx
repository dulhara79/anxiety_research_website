import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]
const loop = (reduceMotion, duration = 8) => reduceMotion ? {} : { repeat: Infinity, duration, ease: 'linear' }

function Label({ x, y, children, anchor = 'start', muted = false }) {
  return <text x={x} y={y} textAnchor={anchor} className={muted ? 'viz-label muted' : 'viz-label'}>{children}</text>
}

function Overview({ compact }) {
  const reduceMotion = useReducedMotion()
  return (
    <svg viewBox="0 0 760 470" role="img" aria-label="Four independent signal families approach a common evidence core without immediately merging.">
      <defs>
        <radialGradient id="overviewCore" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#F4F5F2" stopOpacity=".2"/><stop offset="100%" stopColor="#F4F5F2" stopOpacity="0"/></radialGradient>
      </defs>
      <circle cx="380" cy="235" r="115" fill="url(#overviewCore)" />
      <circle cx="380" cy="235" r="46" className="viz-core" />
      {[
        { d: 'M40 112 C160 92 236 178 332 210', c: '#6FD6E8', label: 'PHYSIOLOGY', x: 42, y: 92 },
        { d: 'M42 352 C168 380 244 300 332 258', c: '#C9A86A', label: 'BEHAVIOUR', x: 42, y: 386 },
        { d: 'M720 112 C610 82 538 170 428 210', c: '#A99AF4', label: 'CLINICAL NLP', x: 718, y: 92, a: 'end' },
        { d: 'M720 354 C606 386 524 302 428 258', c: '#C7F0D5', label: 'CONTEXT', x: 718, y: 388, a: 'end' },
      ].map((s, i) => (
        <g key={s.label}>
          <path d={s.d} className="viz-path ghost" />
          <motion.path d={s.d} fill="none" stroke={s.c} strokeWidth="2" strokeLinecap="round" strokeDasharray="9 15" initial={{ pathLength: 0 }} animate={{ pathLength: 1, strokeDashoffset: [0, -96] }} transition={{ pathLength: { duration: .9, delay: i * .12, ease }, strokeDashoffset: loop(reduceMotion, 5 + i) }} />
          {!compact && <Label x={s.x} y={s.y} anchor={s.a}>{s.label}</Label>}
        </g>
      ))}
      <Label x="380" y="228" anchor="middle">EVIDENCE</Label>
      <Label x="380" y="246" anchor="middle" muted>not equal by default</Label>
    </svg>
  )
}

function Physiology({ compact }) {
  const reduceMotion = useReducedMotion()
  const traces = [
    { y: 118, c: '#6FD6E8', d: 'M38 118 C62 116 70 84 84 118 S112 149 126 118 S155 96 171 118 S201 140 218 118 S247 91 266 118 S295 149 313 118 S344 95 365 118 S397 142 420 118 S453 87 480 118 S516 147 545 118 S578 95 610 118 S650 140 718 118' },
    { y: 224, c: '#8ACAD4', d: 'M38 224 C102 206 142 244 203 225 S307 207 361 225 S455 244 516 224 S614 204 718 225' },
    { y: 330, c: '#B8E8EF', d: 'M38 330 C83 290 126 370 171 330 S260 290 304 330 S394 370 438 330 S527 290 573 330 S661 370 718 330' },
  ]
  return (
    <svg viewBox="0 0 760 470" role="img" aria-label="Abstract simulated physiological traces with observation windows, baseline deviation and forecast trajectories; not patient data.">
      {[94, 200, 306].map((y) => <line key={y} x1="38" y1={y + 24} x2="720" y2={y + 24} className="viz-gridline" />)}
      {traces.map((t, i) => (
        <motion.path key={i} d={t.d} fill="none" stroke={t.c} strokeWidth={i === 0 ? 2.2 : 1.5} strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1, opacity: [.66, 1, .66] }} transition={{ pathLength: { duration: 1, delay: i * .15, ease }, opacity: loop(reduceMotion, 4 + i) }} />
      ))}
      <rect x="342" y="64" width="146" height="324" className="viz-window" />
      <line x1="488" y1="64" x2="488" y2="388" className="viz-divider" />
      <motion.path d="M488 118 C520 92 543 147 570 115 S627 88 718 122" fill="none" stroke="#F4F5F2" strokeOpacity=".65" strokeWidth="1.6" strokeDasharray="5 9" animate={{ strokeDashoffset: [0, -84] }} transition={loop(reduceMotion, 6)} />
      {!compact && <><Label x="38" y="55">SIMULATED SIGNAL FIELD</Label><Label x="352" y="83">OBSERVATION WINDOW</Label><Label x="506" y="83">FORECAST HORIZON</Label><Label x="38" y="107" muted>PPG-like rhythm</Label><Label x="38" y="213" muted>EDA-like variation</Label><Label x="38" y="319" muted>breathing-like oscillation</Label></>}
    </svg>
  )
}

const graphNodes = [
  [105, 120], [184, 84], [264, 142], [138, 224], [234, 238], [318, 212],
  [446, 112], [530, 82], [612, 142], [466, 232], [558, 238], [650, 210], [382, 330]
]
const graphEdges = [[0,1],[1,2],[0,3],[3,4],[2,4],[2,5],[4,5],[6,7],[7,8],[6,9],[9,10],[8,10],[8,11],[10,11],[5,12],[9,12]]

function Behaviour({ compact, gated = false }) {
  const reduceMotion = useReducedMotion()
  return (
    <svg viewBox="0 0 760 470" role="img" aria-label="Participant-grouped temporal behavioural graph reaching a validation gate; current active fusion weight is zero.">
      <rect x="60" y="58" width="286" height="244" rx="26" className="viz-cohort" />
      <rect x="414" y="58" width="286" height="244" rx="26" className="viz-cohort" />
      <Label x="76" y="87">COHORT A</Label><Label x="430" y="87">COHORT B</Label>
      {graphEdges.map(([a,b], i) => <motion.line key={i} x1={graphNodes[a][0]} y1={graphNodes[a][1]} x2={graphNodes[b][0]} y2={graphNodes[b][1]} stroke="#C9A86A" strokeWidth="1" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: gated ? .18 : .55 }} transition={{ duration: .6, delay: i * .025, ease }} />)}
      {graphNodes.map(([x,y], i) => <motion.circle key={i} cx={x} cy={y} r={i === 12 ? 7 : 5} fill={i === 12 ? '#F4F5F2' : '#C9A86A'} initial={{ scale: 0 }} animate={{ scale: 1, opacity: gated ? .35 : .9 }} transition={{ delay: .18 + i * .025, ease }} />)}
      <line x1="60" y1="344" x2="700" y2="344" className="viz-gridline" />
      {[0,1,2,3].map(i => <line key={i} x1={92 + i*150} y1="335" x2={92 + i*150} y2="353" className="viz-tick" />)}
      <Label x="60" y="374">28-DAY TEMPORAL WINDOWS / PARTICIPANT-GROUPED SPLIT</Label>
      <g data-gated="true">
        <rect x="274" y="400" width="212" height="46" rx="23" className="viz-gate" />
        <Label x="380" y="427" anchor="middle">VALIDATION GATE · WEIGHT → 0.0</Label>
      </g>
      {!reduceMotion && <motion.line x1="380" y1="344" x2="380" y2="400" stroke="#C9A86A" strokeWidth="1.5" strokeDasharray="4 8" animate={{ strokeDashoffset: [0,-48] }} transition={loop(false, 4)} />}
      {!compact && <Label x="700" y="325" anchor="end" muted>complexity ≠ useful evidence</Label>}
    </svg>
  )
}

function Clinical({ compact }) {
  const reduceMotion = useReducedMotion()
  const tokens = Array.from({ length: 12 }, (_, i) => ({ x: 54 + (i % 4) * 70, y: 102 + Math.floor(i / 4) * 32, w: 46 + (i % 3) * 9 }))
  const points = [[450,132],[476,104],[505,142],[468,162],[540,286],[574,254],[612,294],[566,322]]
  return (
    <svg viewBox="0 0 760 470" role="img" aria-label="Synthetic clinical note fragments transform into tokens, embeddings, support clusters and prototypes; no patient text is shown.">
      <Label x="50" y="61">SYNTHETIC NOTE FRAGMENTS</Label>
      {[0,1,2,3].map(i => <rect key={i} x="52" y={78+i*19} width={216 - i*24} height="5" rx="3" className="viz-text-line" />)}
      {tokens.map((t,i) => <motion.rect key={i} x={t.x} y={t.y+75} width={t.w} height="16" rx="4" fill="#A99AF4" fillOpacity=".16" stroke="#A99AF4" strokeOpacity=".5" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 + i*.035, ease }} />)}
      <path d="M328 228 C365 228 390 228 420 228" className="viz-path" />
      <Label x="370" y="212" anchor="middle" muted>256-d</Label>
      <circle cx="485" cy="137" r="70" className="viz-cluster c3" />
      <circle cx="574" cy="286" r="72" className="viz-cluster c3" />
      {points.map(([x,y],i) => <motion.circle key={i} cx={x} cy={y} r="5" fill="#A99AF4" animate={reduceMotion ? {} : { r: [4.5,6,4.5] }} transition={loop(reduceMotion, 3+i*.15)} />)}
      <circle cx="486" cy="136" r="11" fill="#F4F5F2" /><circle cx="575" cy="286" r="11" fill="#F4F5F2" />
      <Label x="486" y="141" anchor="middle" muted>P₀</Label><Label x="575" y="291" anchor="middle" muted>P₁</Label>
      <motion.circle cx="530" cy="210" r="7" fill="#C7F0D5" animate={reduceMotion ? {} : { cx: [524,536,530], cy: [214,202,210] }} transition={loop(reduceMotion, 5)} />
      {!compact && <><Label x="454" y="62">SUPPORT / QUERY SPACE</Label><Label x="454" y="392" muted>temporal + prototype-consistency weighting</Label><Label x="52" y="334" muted>No real clinical note text</Label></>}
    </svg>
  )
}

function Fusion({ compact }) {
  const reduceMotion = useReducedMotion()
  const streams = [
    { y: 112, color:'#6FD6E8', label:'C1', weight:'eligible', end:330, opacity:1 },
    { y: 190, color:'#C9A86A', label:'C2', weight:'0.0', end:255, opacity:.3 },
    { y: 268, color:'#A99AF4', label:'C3', weight:'eligible', end:330, opacity:1 },
    { y: 346, color:'#C7F0D5', label:'CTX', weight:'context', end:330, opacity:.72 },
  ]
  return (
    <svg viewBox="0 0 760 470" role="img" aria-label="Reliability-weighted fusion with unequal modality contributions, C2 masked at zero weight, followed by evidence retrieval and abstention support.">
      {streams.map((s,i) => <g key={s.label} opacity={s.opacity}>
        <Label x="46" y={s.y+5}>{s.label}</Label>
        <motion.line x1="88" y1={s.y} x2={s.end} y2={s.y} stroke={s.color} strokeWidth={i===1?1:2} strokeDasharray={i===1?'4 9':'9 14'} animate={{ strokeDashoffset:[0,-72] }} transition={loop(reduceMotion,4+i*.5)} />
        <Label x="104" y={s.y-12} muted>{s.weight}</Label>
      </g>)}
      <g data-gated="true"><line x1="260" y1="166" x2="260" y2="214" className="viz-gate-stop" /><Label x="266" y="184" muted>WEIGHT → 0.0</Label></g>
      <circle cx="390" cy="230" r="78" className="viz-fusion-core" /><Label x="390" y="225" anchor="middle">RELIABILITY</Label><Label x="390" y="244" anchor="middle">GATE + FUSION</Label>
      <motion.path d="M468 230 C500 230 516 230 540 230" fill="none" stroke="#F4F5F2" strokeWidth="1.5" strokeDasharray="5 9" animate={{ strokeDashoffset:[0,-56] }} transition={loop(reduceMotion,4)} />
      <rect x="540" y="154" width="170" height="152" rx="30" className="viz-evidence-box" />
      <Label x="625" y="185" anchor="middle">CARE-AnxRAG</Label>
      <Label x="625" y="216" anchor="middle" muted>retrieval</Label><Label x="625" y="238" anchor="middle" muted>contradiction checks</Label><Label x="625" y="260" anchor="middle" muted>provenance</Label><Label x="625" y="282" anchor="middle" muted>abstain / support</Label>
      {!compact && <><Label x="390" y="414" anchor="middle">wₘ(t) = ωₘ × ρₘ(Δt) × cₘ</Label><Label x="390" y="438" anchor="middle" muted>availability · recency · reliability · confidence</Label></>}
    </svg>
  )
}

function Architecture() {
  return (
    <svg viewBox="0 0 980 430" role="img" aria-label="Architecture diagram: C1 and C3 pass the reliability gate into fusion, C2 is withheld at the validation gate, contextual variables feed fusion, and CARE-AnxRAG follows fusion.">
      <Label x="40" y="56">INDEPENDENT MODALITIES</Label>
      {[['C1','Physiological',86,'#6FD6E8'],['C2','Behavioural',176,'#C9A86A'],['C3','Clinical NLP',266,'#A99AF4']].map(([id,name,y,c]) => <g key={id}><rect x="40" y={y} width="190" height="56" rx="20" className="viz-arch-node"/><circle cx="66" cy={y+28} r="5" fill={c}/><Label x="84" y={y+25}>{id}</Label><Label x="84" y={y+42} muted>{name}</Label></g>)}
      <rect x="328" y="116" width="176" height="142" rx="32" className="viz-arch-node"/><Label x="416" y="164" anchor="middle">RELIABILITY</Label><Label x="416" y="183" anchor="middle">GATE</Label><Label x="416" y="217" anchor="middle" muted>eligible evidence only</Label>
      <path d="M230 114 C276 114 292 145 328 151" className="viz-flow c1"/><path d="M230 204 L304 204" className="viz-flow c2"/><line x1="304" y1="187" x2="304" y2="221" className="viz-gate-stop"/><Label x="278" y="240" muted>0.0</Label><path d="M230 294 C276 294 292 237 328 229" className="viz-flow c3"/>
      <rect x="592" y="130" width="150" height="112" rx="56" className="viz-fusion-core"/><Label x="667" y="182" anchor="middle">FUSION</Label><Label x="667" y="202" anchor="middle" muted>normalized contribution</Label>
      <path d="M504 187 L592 187" className="viz-flow"/>
      <rect x="820" y="132" width="126" height="108" rx="28" className="viz-evidence-box"/><Label x="883" y="178" anchor="middle">CARE-</Label><Label x="883" y="197" anchor="middle">AnxRAG</Label><path d="M742 187 L820 187" className="viz-flow"/>
      <rect x="364" y="326" width="248" height="56" rx="20" className="viz-arch-node"/><Label x="488" y="350" anchor="middle">CONTEXTUAL VARIABLES</Label><Label x="488" y="369" anchor="middle" muted>prior cannot tier by itself</Label><path d="M612 354 C680 340 686 278 676 243" className="viz-flow context"/>
    </svg>
  )
}

function Leakage() {
  return (
    <svg viewBox="0 0 760 380" role="img" aria-label="Leakage-control diagram: each patient or participant is assigned to a grouped split and never crosses between train and held-out sets.">
      <circle cx="380" cy="72" r="36" className="viz-person"/><Label x="380" y="77" anchor="middle">ID</Label>
      <Label x="380" y="134" anchor="middle">PATIENT / PARTICIPANT</Label>
      <path d="M380 108 L380 174" className="viz-flow"/><rect x="286" y="174" width="188" height="54" rx="27" className="viz-gate"/><Label x="380" y="206" anchor="middle">GROUPED SPLIT</Label>
      <path d="M340 228 C310 258 256 268 220 284" className="viz-flow"/><path d="M420 228 C450 258 504 268 540 284" className="viz-flow"/>
      <rect x="120" y="284" width="200" height="62" rx="24" className="viz-arch-node"/><rect x="440" y="284" width="200" height="62" rx="24" className="viz-arch-node"/><Label x="220" y="320" anchor="middle">TRAIN</Label><Label x="540" y="320" anchor="middle">HELD-OUT</Label>
      <line x1="354" y1="270" x2="406" y2="350" className="viz-no-cross"/><line x1="406" y1="270" x2="354" y2="350" className="viz-no-cross"/>
    </svg>
  )
}

export default function SignalVisual({ type = 'overview', compact = false, className = '' }) {
  const content = {
    overview: <Overview compact={compact} />,
    c1: <Physiology compact={compact} />,
    c2: <Behaviour compact={compact} gated />,
    c3: <Clinical compact={compact} />,
    c4: <Fusion compact={compact} />,
    architecture: <Architecture />,
    leakage: <Leakage />,
  }[type] || <Overview compact={compact} />
  return <div className={`signal-visual ${className}`} data-visual={type}>{content}</div>
}
