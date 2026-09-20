import { motion, useReducedMotion } from 'framer-motion'
import { components } from '../data/researchData'

export default function FusionStage() {
  const reduce = useReducedMotion()
  const eligible = components.filter((component) => component.fusionEligible)
  return (
    <section className="fusion-section">
      <div className="shell fusion-layout">
        <div className="fusion-copy">
          <p className="eyebrow">04 / AUTHORITATIVE FUSION</p>
          <h2>Only eligible evidence converges.</h2>
          <p>Current fusion combines deployment-relevant informativeness, recency and reliability. Missing or excluded evidence is not replaced with zero.</p>
          <pre>{'w_m(t) = ω_m × ρ_m(Δt) × c_m\nα_m = w_m / Σw\nS(t) = Σ α_m × p_m'}</pre>
        </div>
        <div className="fusion-instrument" role="img" aria-label="Eligible current evidence streams converging toward one authoritative FusionResult">
          {eligible.map((component, index) => (
            <motion.div key={component.id} className={'fusion-input fusion-input-' + index} initial={reduce ? false : { opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .12 }}>
              <span>{component.id}</span><b>{component.timescale}</b>
            </motion.div>
          ))}
          <svg className="fusion-lines" viewBox="0 0 600 360" aria-hidden="true">
            {['M125 72 C250 72 260 170 350 180','M125 180 C240 180 265 180 350 180','M125 288 C250 288 260 190 350 180'].map((d,i)=>(
              <motion.path key={d} d={d} fill="none" stroke="currentColor" strokeWidth="1.6" initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once:true }} transition={{ duration: 1, delay: .25 + i*.15 }} />
            ))}
          </svg>
          <motion.div className="fusion-result" animate={reduce ? undefined : { boxShadow: ['0 0 0 0 rgba(18,111,112,.08)','0 0 0 18px rgba(18,111,112,0)','0 0 0 0 rgba(18,111,112,0)'] }} transition={{ duration: 3.6, repeat: Infinity }}>
            <small>AUTHORITATIVE</small><strong>FusionResult</strong><span>fusion_result_id</span>
          </motion.div>
          <div className="fusion-exclusion"><span>C2</span><b>EXCLUDED</b><small>weight 0.0</small></div>
        </div>
      </div>
    </section>
  )
}
