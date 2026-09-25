import { researchNarrative } from "../../data/research";
import TextReveal from "../motion/TextReveal";
import DiagonalMediaBand from "../media/DiagonalMediaBand";

export default function AnxietyContext() {
  const c = researchNarrative.context;

  return (
    <section className="story-section context-section" id="context" data-section="context">
      <div className="shell context-layout">
        <div className="context-copy-column">
          <TextReveal as="p" preset="eyebrow" className="eyebrow">
            {c.label}
          </TextReveal>
          <TextReveal as="h2" preset="heading" delay={0.04}>
            {c.headline}
          </TextReveal>
        </div>

        <div className="context-detail-column">
          <TextReveal as="p" preset="body" className="large-copy context-large-copy" delay={0.08}>
            {c.body}
          </TextReveal>
        </div>

        <DiagonalMediaBand
          variant="context"
          className="context-diagonal-media"
          imageSrc="/media/context-diagonal-image.svg"
        />

        <div className="context-section-endcap" aria-hidden="true" />
      </div>
    </section>
  );
}
