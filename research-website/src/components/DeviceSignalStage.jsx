import { motion, useReducedMotion } from 'framer-motion'

const trace = 'M8 78 L54 78 L69 38 L82 115 L99 58 L118 78 L151 78 L166 47 L180 104 L194 66 L211 78 L252 78 L267 52 L281 96 L296 78 L352 78'

export default function DeviceSignalStage() {
  const reduce = useReducedMotion()
  return (
    <div className="device-stage">
      <div className="device-photo-wrap">
        <motion.img
          src="/images/research/chest-strap-reference.webp"
          alt="Black chest strap and sensor module used as the physiological sensing hardware reference"
          className="device-photo"
          whileHover={reduce ? undefined : { rotate: -1.5, scale: 1.015 }}
          transition={{ type: 'spring', stiffness: 170, damping: 18 }}
        />
        <span className="asset-label">REAL RESEARCH ARTEFACT</span>
      </div>
      <div className="device-trace" aria-label="Conceptual physiological acquisition trace">
        <div className="trace-meta">
          <span>C1 / PHYSIOLOGICAL ACQUISITION</span>
          <b>conceptual signal path</b>
        </div>
        <svg viewBox="0 0 360 150" role="img" aria-label="Conceptual signal trace without patient measurements">
          <path className="trace-baseline" d="M0 78 H360" />
          <motion.path
            d={trace}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={reduce ? false : { pathLength: 0, opacity: .2 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: .55 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <p>No live or patient-specific measurement is shown here.</p>
      </div>
    </div>
  )
}
