import { motion, useReducedMotion } from 'framer-motion'
import StatusBadge from './StatusBadge'

const paths = {
  C1: 'M4 45 L50 45 L62 18 L74 72 L88 31 L103 45 L151 45 L166 23 L180 65 L194 36 L211 45 L280 45',
  C2: 'M4 45 C42 42 60 49 92 45 S151 41 184 45 S246 49 280 45',
  C3: 'M4 62 C58 62 74 24 119 24 S177 70 218 42 S253 26 280 34',
  C4: 'M4 45 C72 45 105 43 142 45 S218 47 280 45',
}

export default function ModalityStage({ component, active = false }) {
  const reduce = useReducedMotion()
  return (
    <motion.article
      className={'modality-stage modality-' + component.id.toLowerCase() + (active ? ' active' : '')}
      data-status={component.status}
      animate={reduce ? undefined : { opacity: active ? 1 : .48, scale: active ? 1 : .985 }}
      transition={{ duration: .35 }}
    >
      <div className="modality-head">
        <span className="modality-code">{component.id}</span>
        <StatusBadge status={component.status} label={component.statusLabel} />
      </div>
      <h3>{component.title}</h3>
      <p>{component.question}</p>
      <div className="modality-trace" aria-hidden="true">
        <svg viewBox="0 0 284 90" preserveAspectRatio="none">
          <motion.path
            d={paths[component.id]}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={reduce ? false : { pathLength: .15 }}
            animate={{ pathLength: active ? 1 : .45 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
      </div>
      <dl>
        <div><dt>Timescale</dt><dd>{component.timescale}</dd></div>
        <div><dt>Data</dt><dd>{component.data.join(' · ')}</dd></div>
      </dl>
    </motion.article>
  )
}
