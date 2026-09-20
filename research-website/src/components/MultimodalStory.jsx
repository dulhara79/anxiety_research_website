import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { components } from '../data/researchData'
import ModalityStage from './ModalityStage'
import SectionChapter from './SectionChapter'

export default function MultimodalStory() {
  const [active, setActive] = useState('C1')
  const activeComponent = useMemo(
    () => components.find((component) => component.id === active) || components[0],
    [active],
  )

  return (
    <section className="multimodal-story">
      <div className="shell">
        <SectionChapter index="02" label="MULTIMODAL TIMESCALES" title="Different signals move differently—and should be judged differently.">
          <p>Each stream keeps its own timebase, evidence status and interpretation before integration.</p>
        </SectionChapter>

        <div className="story-layout">
          <div className="story-instrument">
            <div className="story-instrument-toolbar" aria-label="Choose modality">
              {components.map((component) => (
                <button
                  key={component.id}
                  type="button"
                  className={active === component.id ? 'active' : ''}
                  onClick={() => setActive(component.id)}
                >
                  <span>{component.id}</span>
                  <b>{component.title}</b>
                </button>
              ))}
            </div>

            <motion.div
              key={activeComponent.id}
              className="story-active-panel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .3 }}
            >
              <ModalityStage component={activeComponent} active />
            </motion.div>
          </div>

          <div className="story-chapters">
            {components.map((component, index) => (
              <motion.article
                key={component.id}
                className={active === component.id ? 'story-chapter active' : 'story-chapter'}
                onViewportEnter={() => setActive(component.id)}
                viewport={{ amount: .55 }}
                onMouseEnter={() => setActive(component.id)}
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
