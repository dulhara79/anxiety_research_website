import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import TextReveal from "../motion/TextReveal";
import DiagonalMediaBand from "../media/DiagonalMediaBand";
import SpatialSceneBoundary from "../three/SpatialSceneBoundary";

const ComponentScene = React.lazy(() => import("../three/ComponentScene"));

export default function ComponentFeature({ component, index }) {
  const reduced = useReducedMotion();
  return (
    <motion.article
      className={`component-feature ${index % 2 ? "reverse" : ""}`}
      initial={reduced ? false : { opacity: 0, y: 34 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2, margin: "-8% 0px -10% 0px" }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="component-visual component-visual--spatial"
        aria-hidden="true"
        whileHover={reduced ? undefined : { scale: 1.008, y: -4 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
      >
        <span>{component.id}</span>
        <DiagonalMediaBand variant="component" className="component-diagonal-media">
          <SpatialSceneBoundary
            scene={ComponentScene}
            fallbackVariant="component"
            className="component-spatial-stage"
            minHeight="100%"
            camera={{ position: [0, 0, 5.7], fov: 41 }}
            sceneProps={{ componentId: component.id }}
          />
        </DiagonalMediaBand>
      </motion.div>
      <div className="component-body">
        <TextReveal preset="support" className="component-meta">
          <span>{component.id}</span><small>{component.status}</small>
        </TextReveal>
        <TextReveal as="h3" preset="heading" delay={0.04}>{component.title}</TextReveal>
        <TextReveal as="p" preset="body" className="component-question" delay={0.08}>{component.question}</TextReveal>
        <dl>
          <TextReveal as="div" preset="support" delay={0.1}><dt>Method</dt><dd>{component.method}</dd></TextReveal>
          <TextReveal as="div" preset="support" delay={0.12}><dt>Data / source</dt><dd>{component.data}</dd></TextReveal>
          <TextReveal as="div" preset="support" delay={0.14}><dt>Output</dt><dd>{component.outputLabel}</dd></TextReveal>
        </dl>
        {component.evidence && <TextReveal as="p" preset="support" className="evidence-note" delay={0.12}>{component.evidence}</TextReveal>}
        {component.claimBoundary && <TextReveal as="p" preset="support" className="boundary-note" delay={0.12}>{component.claimBoundary}</TextReveal>}
        {component.limitation && <TextReveal as="p" preset="support" className="boundary-note" delay={0.12}>{component.limitation}</TextReveal>}
        {component.id === "C2" && <TextReveal as="p" preset="support" className="state-chip excluded" delay={0.14}>Active fusion weight 0.0 · excluded</TextReveal>}
      </div>
    </motion.article>
  );
}
