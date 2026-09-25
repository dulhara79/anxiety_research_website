import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import TextReveal from "../motion/TextReveal";
import SpatialSceneBoundary from "../three/SpatialSceneBoundary";

const ModalityScene = React.lazy(() => import("../three/ModalityScene"));
const modalities = [
  ["physiology", "Physiology", "What is happening within the body?"],
  ["behaviour", "Behaviour", "What patterns appear across everyday activity?"],
  ["clinical", "Clinical language", "What evidence exists in clinical documentation?"],
  ["context", "Context", "What background information influences interpretation?"],
];

export default function ModalityOverview() {
  const reduced = useReducedMotion();
  return (
    <section className="research-section modality-section" data-section="approach">
      <div className="shell">
        <TextReveal as="p" preset="eyebrow" className="eyebrow">OUR APPROACH</TextReveal>
        <TextReveal as="h2" preset="heading" delay={0.04}>
          Different signals. Different timescales. Different levels of evidence.
        </TextReveal>
        <div className="modality-grid">
          {modalities.map(([type, name, q], i) => (
            <motion.article
              key={name}
              initial={reduced ? false : { opacity: 0, y: 28 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4, margin: "-8% 0px -10% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={reduced ? undefined : { y: -6, scale: 1.008 }}
            >
              <span>0{i + 1}</span>
              <SpatialSceneBoundary
                scene={ModalityScene}
                fallbackVariant="modality"
                className="modality-spatial-stage"
                minHeight={150}
                camera={{ position: [0, 0, 5.5], fov: 42 }}
                sceneProps={{ type }}
              />
              <TextReveal as="h3" preset="heading" delay={Math.min(i * 0.04, 0.12)}>{name}</TextReveal>
              <TextReveal as="p" preset="body" delay={Math.min(i * 0.04 + 0.06, 0.18)}>{q}</TextReveal>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
