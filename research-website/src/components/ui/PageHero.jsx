import { motion, useReducedMotion } from "framer-motion";

// Inner-page headers deliberately use high-contrast editorial typography.
// No photos, ECG waves, or decorative charts that could be mistaken for data.
const artLabels = {
  bannerResearch: ["RESEARCH / DOMAIN", "Multimodal", "Signals · context · evidence"],
  bannerComponents: ["RESEARCH / COMPONENTS", "Four streams", "Different inputs · distinct methods"],
  bannerSystem: ["RESEARCH / SYSTEM", "Integration", "Inputs · gates · outputs"],
  bannerFindings: ["RESEARCH / FINDINGS", "Evidence", "Results · limits · transparency"],
  bannerDocuments: ["PROJECT / ARCHIVE", "Research record", "Documentation · presentations"],
  bannerTeam: ["RESEARCH / PEOPLE", "Collaboration", "Researchers · supervision"],
  bannerContact: ["RESEARCH / CONTACT", "Connect", "Questions · collaboration"],
};

// Decorative geometry represents separate research streams meeting in one place.
// It makes no quantitative claims and is hidden from assistive technology.
function AbstractResearchArt({ image }) {
  const [eyebrow, center, detail] = artLabels[image] || ["R26-DS-012", "Research", "Learning · evidence"];
  return (
    <div className={"page-hero-art page-hero-art--" + (image || "default")} aria-hidden="true">
      <div className="page-hero-art-pattern" />
      <span className="page-hero-art-orbit page-hero-art-orbit--outer" />
      <span className="page-hero-art-orbit page-hero-art-orbit--inner" />
      <span className="page-hero-art-guide page-hero-art-guide--one" />
      <span className="page-hero-art-guide page-hero-art-guide--two" />
      <span className="page-hero-art-dot page-hero-art-dot--one" />
      <span className="page-hero-art-dot page-hero-art-dot--two" />
      <span className="page-hero-art-dot page-hero-art-dot--three" />
      <span className="page-hero-art-dot page-hero-art-dot--four" />
      <div className="page-hero-art-center">
        <span className="page-hero-art-monogram">R26 · DS · 012</span>
        <strong>{center}</strong>
        <span className="page-hero-art-detail">{detail}</span>
      </div>
      <span className="page-hero-art-label">{eyebrow}</span>
    </div>
  );
}

export default function PageHero({ eyebrow, title, lead, image, meta = [] }) {
  const reduced = useReducedMotion();
  const enter = reduced ? false : { opacity: 0, y: 16 };
  const animate = { opacity: 1, y: 0 };
  const transition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] };

  return (
    <header className="page-hero">
      <div className="shell page-hero-layout">
        <motion.div className="page-hero-copy" initial={enter} animate={animate} transition={transition}>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="display display--xl">{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {meta.length > 0 && (
            <div className="page-hero-meta">
              {meta.map((item) => <span className="pill" key={item}>{item}</span>)}
            </div>
          )}
        </motion.div>
        <AbstractResearchArt image={image} />
      </div>
    </header>
  );
}
