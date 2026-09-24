import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

function C2Metrics({ state }) {
  if (state.key !== 'c2') return null
  const rows = [
    ['HELD-OUT AUROC', state.metrics.auroc], ['95% CLUSTERED CI', state.metrics.ci],
    ['PERMUTATION NULL', state.metrics.null], ['EMPIRICAL P-VALUE', state.metrics.p],
    ['ACTIVE FUSION WEIGHT', state.metrics.fusionWeight],
  ]
  return <div className="state-metrics">{rows.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
}

function C3Metrics({ state }) {
  if (state.key !== 'c3') return null
  return <div className="state-metrics compact"><div><span>SETTING</span><strong>{state.metrics.setting}</strong></div><div><span>HELD-OUT AUROC</span><strong>{state.metrics.auroc}</strong></div></div>
}

export default function ResearchStateContent({ state }) {
  const reduceMotion = useReducedMotion()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="state-information"
        key={state.key}
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <dl>
          <div><dt>RESEARCH QUESTION</dt><dd>{state.question}</dd></div>
          <div><dt>METHOD</dt><dd>{state.method}</dd></div>
          <div><dt>DATA</dt><dd>{state.data}</dd></div>
          <div><dt>EVIDENCE</dt><dd>{state.evidence}</dd></div>
          {state.limitation && <div><dt>LIMITATION</dt><dd>{state.limitation}</dd></div>}
        </dl>
        <C2Metrics state={state} />
        <C3Metrics state={state} />
      </motion.div>
    </AnimatePresence>
  )
}
