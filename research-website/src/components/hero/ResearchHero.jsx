import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import HeroMedia from "./HeroMedia";
import AnimatedHeading from "./AnimatedHeading";
import SpatialSceneBoundary from "../three/SpatialSceneBoundary";
import { researchNarrative } from "../../data/research";

const HeroSpatialField = React.lazy(() => import("../three/HeroSpatialField"));

export default function ResearchHero() {
  const reduced = useReducedMotion();
  const scrollToResearch = () =>
    document
      .getElementById("context")
      ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  const entrance = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 26 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 0.8,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1],
        },
      };
  return (
    <section className="research-hero" id="overview">
      <HeroMedia />
      <div className="hero-spatial-layer" aria-hidden="true">
        <SpatialSceneBoundary
          scene={HeroSpatialField}
          fallbackVariant="hero"
          minHeight="100%"
          camera={{ position: [0, 0, 6.4], fov: 42 }}
          pointerParallax
        />
      </div>
      <div className="hero-inner shell">
        <motion.div className="hero-copy-panel" {...entrance}>
          <p className="eyebrow hero-eyebrow">R26—DS—012 · SLIIT · 2026</p>
          <AnimatedHeading />
          <p className="hero-lead">{researchNarrative.hero.supporting}</p>
          <div className="hero-actions">
            <motion.button
              className="button primary"
              type="button"
              onClick={scrollToResearch}
              whileHover={reduced ? undefined : { y: -3, scale: 1.02 }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
            >
              Explore the Research
            </motion.button>
            <motion.div
              className="button-wrap"
              whileHover={reduced ? undefined : { y: -3, scale: 1.02 }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
            >
              <Link className="button glass-button" to="/findings">
                View Findings
              </Link>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          className="hero-context glass"
          initial={reduced ? false : { opacity: 0, x: 24 }}
          animate={reduced ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          <span>Multimodal AI · Digital Biomarkers · Anxiety Research</span>
          <small>RESEARCH PROTOTYPE · 2026</small>
        </motion.div>
      </div>
    </section>
  );
}
