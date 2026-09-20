import { motion } from 'framer-motion'
import { Activity, BrainCircuit, Network, Radar } from 'lucide-react'

const channels = [
  { id: 'C1', label: 'Physiological', icon: Activity, tone: 'Fast-timescale', points: [34,42,28,66,51,78,39,62,47,70,36,57,45,73,52,67,40,61] },
  { id: 'C2', label: 'Behavioural', icon: Radar, tone: 'Longer-timescale', points: [52,48,55,50,58,56,54,60,57,59,53,55,58,56,54,57,55,56] },
  { id: 'C3', label: 'Clinical NLP', icon: BrainCircuit, tone: 'Document evidence', points: [24,31,42,55,70,63,48,35,44,61,76,64,51,39,46,58,68,53] },
  { id: 'C4', label: 'Contextual', icon: Network, tone: 'Static prior', points: [45,45,45,46,45,45,45,44,45,45,45,46,45,45,45,45,45,45] },
]

function Wave({ points, index }) {
  const width = 540
  const height = 90
  const step = width / (points.length - 1)
  const d = points.map((p, i) => (i === 0 ? 'M ' : 'L ') + (i * step) + ' ' + (height - p)).join(' ')

  return (
    <svg viewBox={'0 0 ' + width + ' ' + height} preserveAspectRatio="none" aria-hidden="true">
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: .45 }}
        transition={{ duration: 1.15, delay: .18 + index * .12, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.circle
        r="3.5"
        fill="currentColor"
        initial={{ offsetDistance: '0%', opacity: 0 }}
        animate={{ offsetDistance: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
        style={{ offsetPath: "path('" + d + "')" }}
        transition={{ duration: 4.8 + index * .6, delay: index * .7, repeat: Infinity, ease: 'linear' }}
      />
    </svg>
  )
}

export default function EvidenceSignature() {
  return (
    <section className="signature-section">
      <div className="shell signature-layout">
        <motion.div
          className="signature-copy"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .28 }}
          transition={{ duration: .68, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-index">03 / Research signature</div>
          <h2>Four signals should not look the same—because scientifically, they are not.</h2>
          <p>
            The site gives each stream its own visual rhythm instead of forcing every component into the same generic AI card language.
          </p>
          <div className="signature-key">
            <span><i /> observed signal</span>
            <span><i /> evidence motion</span>
            <span><i /> fusion-ready state</span>
          </div>
        </motion.div>

        <div className="signature-console">
          <div className="console-head">
            <span>R26—DS—012 / MULTIMODAL TRACE</span>
            <b>LIVE VISUAL MODEL</b>
          </div>

          <div className="signature-channels">
            {channels.map((channel, index) => {
              const Icon = channel.icon
              return (
                <motion.article
                  key={channel.id}
                  className={'signature-channel signature-' + channel.id.toLowerCase()}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: .35 }}
                  transition={{ duration: .55, delay: index * .09, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 8 }}
                >
                  <div className="channel-meta">
                    <span className="channel-icon"><Icon size={15} /></span>
                    <span className="channel-id">{channel.id}</span>
                    <strong>{channel.label}</strong>
                    <small>{channel.tone}</small>
                  </div>
                  <div className="channel-wave">
                    <Wave points={channel.points} index={index} />
                  </div>
                  <div className="channel-tail">
                    <span>{index === 1 ? 'WITHHELD' : 'ELIGIBLE'}</span>
                    <b>{index === 1 ? 'w = 0.0' : 'tracked'}</b>
                  </div>
                </motion.article>
              )
            })}
          </div>

          <div className="console-foot">
            <span>PROVENANCE PRESERVED</span>
            <span>RECENCY AWARE</span>
            <span>UNCERTAINTY VISIBLE</span>
          </div>
        </div>
      </div>
    </section>
  )
}
