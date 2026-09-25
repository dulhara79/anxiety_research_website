import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { researchNarrative } from "../../data/research";
import TextReveal from "../motion/TextReveal";
import DiagonalMediaBand from "../media/DiagonalMediaBand";
import SpatialSceneBoundary from "../three/SpatialSceneBoundary";

const TimescaleScene = React.lazy(() => import("../three/TimescaleScene"));

export default function ObservationTimeline() {
  const reduced = useReducedMotion();
  return (
    <section className="story-section observation-section" data-section="observation">
      <div className="shell observation-spatial-layout">
        <div className="observation-copy">
          <TextReveal as="p" preset="eyebrow" className="eyebrow">
            WHAT MAKES CONTINUOUS OBSERVATION DIFFICULT?
          </TextReveal>
          <TextReveal as="h2" preset="heading" delay={0.04}>
            What we can observe is only part of the picture.
          </TextReveal>
        </div>

        <DiagonalMediaBand variant="timescale" className="observation-diagonal-media">
          <SpatialSceneBoundary
            scene={TimescaleScene}
            fallbackVariant="timescale"
            className="observation-spatial-stage"
            minHeight={330}
            camera={{ position: [0, 0, 6.8], fov: 42 }}
          />
        </DiagonalMediaBand>

        <div className="observation-tracks">
          {researchNarrative.timescales.map(([time, label], i) => (
            <motion.article
              key={time}
              initial={reduced ? false : { opacity: 0, x: -24 }}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.65, margin: "-8% 0px -10% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={reduced ? undefined : { x: 6 }}
            >
              <span className="track-index">0{i + 1}</span>
              <div className="track-line"><i /></div>
              <div><small>{time}</small><h3>{label}</h3></div>
            </motion.article>
          ))}
        </div>
        <TextReveal as="p" preset="support" className="section-note" delay={0.08}>
          Different evidence operates at different timescales.
        </TextReveal>
      </div>
    </section>
  );
}
