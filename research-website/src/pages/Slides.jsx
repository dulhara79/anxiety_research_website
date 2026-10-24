import { ArrowUpRight, Presentation } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import { presentationSlides } from "../data/documents";

export default function Slides() {
  return (
    <>
      <PageHero eyebrow="Presentation slides" title="Research presentations."
        lead="Proposal, progress and final slide decks from the project presentation archive." image="bannerDocuments" />
      <section className="section" aria-labelledby="slides-title">
        <div className="shell">
          <h2 className="display" id="slides-title">Presentation archive.</h2>
          <div className="slide-grid">
            {presentationSlides.map((slide, i) => {
              return <article className="card slide-card" id={`slide-${i}`} key={slide.stage}>
                <Presentation size={25} aria-hidden="true" />
                <span className="card-kicker">{slide.stage}</span>
                <h3 className="serif-title">{slide.title}</h3>
                <p className="muted">{slide.meta}</p>
                {slide.url ? <a className="button button--ink" href={slide.url} target="_blank" rel="noopener noreferrer">
                  Open slides <ArrowUpRight size={16} />
                </a> : <span className="pill pill--outline">Not yet published</span>}
              </article>;
            })}
          </div>
        </div>
      </section>
    </>
  );
}
