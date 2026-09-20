import { motion, useReducedMotion } from 'framer-motion'

const visuals = [
  {
    src: '/images/research/ai-neural-concept.webp',
    title: 'Human-centred multimodal intelligence',
    text: 'Concept artwork used to communicate the relationship between human context and multimodal evidence.',
  },
  {
    src: '/images/research/ai-behavioural-concept.webp',
    title: 'Behavioural sensing concept',
    text: 'Concept artwork representing passive behavioural and mobile-interaction signals. It is not a production-app screenshot.',
  },
  {
    src: '/images/research/multimodal-editorial.webp',
    title: 'Multimodal research concept',
    text: 'Supporting editorial artwork for the wider research narrative; it is not experimental evidence.',
  },
]

export default function AiConceptGallery() {
  const reduce = useReducedMotion()

  return (
    <section className="ai-concept-gallery shell">
      <header>
        <p className="eyebrow">03 / CONCEPT VISUALS</p>
        <h2>AI-generated imagery supports the story—without pretending to be data.</h2>
        <p>These visuals are explicitly separated from real research artefacts, model outputs and application screenshots.</p>
      </header>

      <div className="ai-concept-grid">
        {visuals.map((visual, index) => (
          <motion.figure
            key={visual.src}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: .25 }}
            transition={{ delay: index * .08 }}
          >
            <div className="ai-concept-image">
              <img src={visual.src} alt={visual.title + ' — AI-generated conceptual illustration'} loading="lazy" />
              <span>AI-GENERATED CONCEPT · NOT DATA</span>
            </div>
            <figcaption>
              <strong>{visual.title}</strong>
              <p>{visual.text}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}
