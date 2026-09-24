import { motion, useReducedMotion } from 'framer-motion'

const paths = {
  C1: 'M126 142 C 270 142, 300 238, 458 272',
  C2: 'M126 244 C 280 244, 322 268, 458 286',
  C3: 'M126 352 C 286 352, 330 314, 458 302',
  CONTEXT: 'M126 454 C 276 454, 330 350, 458 318',
}

const streamStroke = (id, activeStream) => {
  if (id === 'C2') return activeStream === 'C2' ? '#527E9B' : '#91A6AA'
  if (!activeStream || activeStream === id || (id === 'CONTEXT' && activeStream === 'C4')) return '#3A8178'
  return '#AFC8C4'
}

export default function ResearchVisualization({ activeStream }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="research-visualization liquid-glass-light"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.985, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="visualization-topline">
        <span>Multimodal evidence field</span>
        <span>Reliability / recency / eligibility</span>
      </div>

      <svg viewBox="0 0 760 560" role="img" aria-labelledby="research-viz-title research-viz-desc">
        <title id="research-viz-title">Multimodal research evidence converging into reliability-aware fusion</title>
        <desc id="research-viz-desc">Physiological, behavioural, clinical-language and contextual evidence converge into a fusion stage. Behavioural evidence is shown as validation-gated. The output can proceed to evidence support or abstain when evidence is insufficient.</desc>

        <defs>
          <radialGradient id="fusionGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#DDEFEA" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#EAF5F2" stopOpacity="0" />
          </radialGradient>
          <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>

        <g className="viz-grid" aria-hidden="true">
          {[120, 220, 320, 420].map((y) => <line key={y} x1="72" y1={y} x2="690" y2={y} />)}
          {[180, 300, 420, 540, 660].map((x) => <line key={x} x1={x} y1="74" x2={x} y2="486" />)}
        </g>

        <circle cx="516" cy="296" r="108" fill="url(#fusionGlow)" filter="url(#softBlur)" opacity="0.7" />

        <g className="viz-source viz-source-c1">
          <text x="78" y="112" className="viz-kicker">C1</text>
          <text x="78" y="132" className="viz-label">PHYSIOLOGY</text>
          <path d="M78 166 h18 l8 -20 10 42 10 -35 9 13 h28" className="mini-signal" />
          <text x="78" y="198" className="viz-note">personal baseline · short horizon</text>
        </g>

        <g className="viz-source viz-source-c2">
          <text x="78" y="216" className="viz-kicker">C2</text>
          <text x="78" y="236" className="viz-label">BEHAVIOUR</text>
          <g className="mini-graph">
            <line x1="82" y1="267" x2="111" y2="252" /><line x1="111" y1="252" x2="142" y2="274" /><line x1="111" y1="252" x2="153" y2="246" />
            <circle cx="82" cy="267" r="3.5" /><circle cx="111" cy="252" r="3.5" /><circle cx="142" cy="274" r="3.5" /><circle cx="153" cy="246" r="3.5" />
          </g>
          <text x="78" y="302" className="viz-note">validation-gated · active weight 0.0</text>
        </g>

        <g className="viz-source viz-source-c3">
          <text x="78" y="326" className="viz-kicker">C3</text>
          <text x="78" y="346" className="viz-label">CLINICAL NLP</text>
          <line x1="78" y1="370" x2="151" y2="370" className="note-line" />
          <line x1="78" y1="381" x2="135" y2="381" className="note-line note-line-soft" />
          <line x1="78" y1="392" x2="158" y2="392" className="note-line note-line-soft" />
          <text x="78" y="418" className="viz-note">patient-disjoint · TC-WPN</text>
        </g>

        <g className="viz-source viz-source-context">
          <text x="78" y="438" className="viz-kicker">CTX</text>
          <text x="78" y="458" className="viz-label">CONTEXT</text>
          <path d="M82 478 C105 461 128 495 154 474" className="context-contour" />
          <path d="M82 488 C108 472 130 506 158 483" className="context-contour context-contour-soft" />
          <text x="78" y="520" className="viz-note">contextual prior · cannot tier alone</text>
        </g>

        {Object.entries(paths).map(([id, d], index) => {
          const active = !activeStream || activeStream === id || (id === 'CONTEXT' && activeStream === 'C4')
          const muted = id === 'C2'
          return (
            <motion.path
              key={id}
              d={d}
              fill="none"
              stroke={streamStroke(id, activeStream)}
              strokeWidth={active ? 2.2 : 1.15}
              strokeLinecap="round"
              strokeDasharray={muted ? '7 8' : '4 11'}
              initial={false}
              animate={reduceMotion ? undefined : { strokeDashoffset: [0, -30] }}
              transition={{ duration: 7 + index, repeat: Infinity, ease: 'linear' }}
              opacity={active ? 0.95 : 0.42}
            />
          )
        })}

        <motion.circle
          cx="516"
          cy="296"
          r="58"
          className="fusion-ring"
          animate={reduceMotion ? undefined : { r: [56, 60, 56], opacity: [0.58, 0.88, 0.58] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <circle cx="516" cy="296" r="43" className="fusion-core" />
        <text x="516" y="282" textAnchor="middle" className="fusion-kicker">C4</text>
        <text x="516" y="302" textAnchor="middle" className="fusion-label">FUSION</text>
        <text x="516" y="318" textAnchor="middle" className="fusion-note">reliability-aware</text>

        <path d="M560 296 C604 296 620 296 654 296" className="output-path" />
        <circle cx="662" cy="296" r="5" className="output-node" />
        <text x="618" y="270" className="viz-kicker">OUTPUT</text>
        <text x="618" y="330" className="viz-label viz-label-output">EVIDENCE</text>
        <text x="618" y="347" className="viz-note">or abstention</text>
      </svg>

      <div className="mobile-fusion-map" aria-label="Simplified multimodal evidence flow">
        <div className="mobile-signal-stack">
          <span><b>C1</b> Physiology</span>
          <span className="is-gated"><b>C2</b> Behaviour <small>validation-gated</small></span>
          <span><b>C3</b> Clinical NLP</span>
          <span><b>CTX</b> Context</span>
        </div>
        <span className="mobile-flow-arrow" aria-hidden="true">→</span>
        <div className="mobile-fusion-node">
          <small>C4</small>
          <strong>Reliability-aware fusion</strong>
          <span>Evidence / abstention</span>
        </div>
      </div>

      <div className="evidence-micro-row" aria-label="Selected component evidence">
        <div className="evidence-micro">
          <span>C3 · held-out AUROC</span>
          <strong>≈ 0.738</strong>
          <small>clinical NLP component</small>
        </div>
        <div className="evidence-micro evidence-micro-muted">
          <span>C2 · held-out AUROC</span>
          <strong>0.5205</strong>
          <small>active fusion weight 0.0</small>
        </div>
      </div>
    </motion.div>
  )
}
