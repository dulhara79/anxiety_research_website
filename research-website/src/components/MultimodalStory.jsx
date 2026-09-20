import { useState } from 'react'
import { motion } from 'framer-motion'
import { components } from '../data/researchData'
import ModalityStage from './ModalityStage'
import SectionChapter from './SectionChapter'

export default function MultimodalStory() {
  const [active, setActive] = useState('C1')
  return (
    <section className="multimodal-story">
      <div className="shell">
        <SectionChapter index="02" label="MULTIMODAL TIMESCALES" title="Different signals move differently—and should be judged differently.">
          <p>Each stream keeps its own timebase, evidence status and interpretation before integration.</p>
        </SectionChapter>
        <div className="story-layout">
          <div className="story-instrument">
            {components.map((component) => <ModalityStage key={component.id} component={component} active={active === component.id} />)}
          </div>
          <div className="story-chapters">
            {components.map((component, index) => (
              <motion.article
                key={component.id}
                className="story-chapter"
                onViewportEnter={() => setActive(component.id)}
                viewport={{ amount: .6 }}
              >
                <span>{String(index + 1).padStart(2,'0')} / {component.id}</span>
                <h3>{component.title}</h3>
                <p>{component.method}</p>
                <small>{component.evidence}</small>
                {component.limitation && <em>{component.limitation}</em>}
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
