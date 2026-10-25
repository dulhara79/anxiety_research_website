import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, ClipboardList } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import { milestones, assessmentWeights, milestoneSources } from "../data/documents";

export default function Milestones() {
  const [selected, setSelected] = useState(milestones[0]?.id ?? null);
  const detailRef = useRef(null);
  const activeIndex = Math.max(0, milestones.findIndex((item) => item.id === selected));
  const active = milestones[activeIndex];
  const weights = assessmentWeights.filter((weight) => active.weights.includes(weight.id));

  const choose = (id) => {
    setSelected(id);
    // The details sit beside the list on desktop and below it on small screens.
    if (window.matchMedia("(max-width: 800px)").matches) {
      window.requestAnimationFrame(() => {
        detailRef.current?.scrollIntoView({
          block: "start",
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        });
      });
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Research milestones"
        title="From proposal to publication evidence."
        lead="Explore the 2026 assessment timeline, related research records and the historical module assessment weights—without confusing planned deadlines with verified completion."
        image="bannerDocuments"
      />

      <section className="section" aria-labelledby="milestones-title">
        <div className="shell">
          <div className="milestone-heading">
            <div>
              <p className="eyebrow">Project timeline</p>
              <h2 className="display" id="milestones-title">Explore the milestones.</h2>
              <p className="lead">Select a stage to read its original schedule, assessment context and linked evidence.</p>
            </div>
            <span className="milestone-count"><CalendarDays size={18} aria-hidden="true" /> 14 recorded stages</span>
          </div>

          <div className="milestone-selector">
            <label htmlFor="milestone-stage">Select an assessment stage</label>
            <select
              id="milestone-stage"
              value={selected}
              onChange={(event) => choose(event.target.value)}
            >
              {milestones.map((item, i) => (
                <option key={item.id} value={item.id}>
                  {String(i + 1).padStart(2, "0")} · {item.title}
                </option>
              ))}
            </select>
          </div>

          <div className="milestone-layout">
            <nav className="milestone-rail" aria-label="Research milestone timeline">
              <ol className="milestone-list">
                {milestones.map((item, i) => (
                  <li key={item.id}>
                    <button
                      className={"milestone-select" + (item.id === selected ? " is-active" : "")}
                      type="button"
                      aria-current={item.id === selected ? "step" : undefined}
                      aria-controls="milestone-detail"
                      onClick={() => choose(item.id)}
                    >
                      <span className="milestone-number" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                      <span className="milestone-select-copy">
                        <strong>{item.title}</strong>
                        <span>{item.deadline ?? "Date not specified"}</span>
                      </span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ol>
            </nav>

            <article className="milestone-detail" id="milestone-detail" ref={detailRef} aria-live="polite" aria-atomic="true">
              <p className="milestone-detail-kicker"><ClipboardList size={18} aria-hidden="true" /> Stage {String(activeIndex + 1).padStart(2, "0")} of {milestones.length}</p>
              <h3 className="display milestone-detail-title">{active.title}</h3>
              <dl className="milestone-facts">
                <div>
                  <dt>2026 scheduled deadline</dt>
                  <dd>{active.deadline ?? "Not specified in the timeline"}</dd>
                </div>
                <div>
                  <dt>Assessment weight · 2019 module outline</dt>
                  <dd>{weights.length
                    ? weights.map((item) => item.percent + "% · " + item.title).join("; ")
                    : "No separate weighting specified"}</dd>
                </div>
              </dl>
              <h4>Evidence and interpretation</h4>
              <p>{active.detail}</p>
              {active.href && (
                <Link className="button button--ink" to={active.href}>
                  View related records <ArrowRight size={17} aria-hidden="true" />
                </Link>
              )}
              <p className="milestone-disclaimer">
                Scheduled dates do not establish actual completion. Assessment weights come from the 2019 module outline and have not been independently confirmed for 2026.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--paper2" aria-labelledby="assessment-weights-title">
        <div className="shell">
          <p className="eyebrow">Assessment reference</p>
          <h2 className="display" id="assessment-weights-title">Module weightings.</h2>
          <p className="lead">For reference only: the percentages below come from an older IT4010 module outline, not a verified 2026 grading announcement.</p>
          <div className="assessment-weight-grid">
            {assessmentWeights.map((weight) => (
              <div className="assessment-weight" key={weight.id}>
                <strong>{weight.percent}%</strong>
                <span>{weight.title}</span>
              </div>
            ))}
          </div>
          <div className="assessment-provenance">
            <strong>Source records</strong>
            <p>{milestoneSources.dates}</p>
            <p>{milestoneSources.weights}</p>
          </div>
        </div>
      </section>
    </>
  );
}
