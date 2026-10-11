import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Footprints, MapPinned } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import { milestones, assessmentWeights, milestoneSources } from "../data/documents";

export default function Milestones() {
  const [selected, setSelected] = useState(milestones[0]?.id ?? null);
  const activeIndex = milestones.findIndex((item) => item.id === selected);
  const milestone = milestones[activeIndex] ?? milestones[0];
  const weights = assessmentWeights.filter((item) => milestone.weights.includes(item.id));

  return (
    <>
      <PageHero
        eyebrow="Milestones"
        title="Research project trail."
        lead="A mapped view of the 2026 research-project schedule, with assessment weights from the supplied IT4010 module outline."
        image="bannerDocuments"
      />

      <section className="section" aria-labelledby="assessment-title">
        <div className="shell">
          <p className="eyebrow">Project pathway</p>
          <h2 className="display" id="assessment-title">Milestone trail.</h2>
          <p className="muted milestone-trail-intro">
            Follow the numbered research journey. Select any stop to view its scheduled deadline, assessment weight and source notes.
          </p>

          <div className="milestone-trail-layout">
            <nav className="milestone-trail" aria-label="Research milestone trail">
              <div className="milestone-trail-head">
                <MapPinned size={22} aria-hidden="true" />
                <div>
                  <strong>Research pathway</strong>
                  <p>{milestones.length} stops · select one to explore</p>
                </div>
              </div>

              <ol className="milestone-trail-list">
                {milestones.map((item, index) => {
                  const active = item.id === milestone.id;
                  return (
                    <li className={"trail-stop" + (active ? " is-active" : "")} key={item.id}>
                      <button
                        type="button"
                        className="trail-stop-button"
                        aria-current={active ? "step" : undefined}
                        aria-controls="milestone-detail"
                        onClick={() => setSelected(item.id)}
                      >
                        <span className="trail-stop-marker" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="trail-stop-copy">
                          <strong>{item.title}</strong>
                          <span>{item.deadline ?? "Date not specified"}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              <div className="trail-footprints" aria-hidden="true">
                <Footprints size={18} />
                <Footprints size={18} />
                <Footprints size={18} />
              </div>
            </nav>

            <article
              className="card assessment-detail milestone-detail-panel"
              id="milestone-detail"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="assessment-detail-heading">
                <span className="assessment-step-badge">
                  Stop {String((activeIndex < 0 ? 0 : activeIndex) + 1).padStart(2, "0")} / {milestones.length}
                </span>
                <h3 className="serif-title">{milestone.title}</h3>
              </div>
              <p>{milestone.detail}</p>
              <dl className="assessment-facts">
                <div>
                  <dt>2026 scheduled deadline</dt>
                  <dd>{milestone.deadline ?? "Not specified"}</dd>
                </div>
                <div>
                  <dt>Assessment weight · 2019 outline</dt>
                  <dd>
                    {weights.length
                      ? weights.map((item) => item.percent + "% — " + item.title).join("; ")
                      : "No separate weight specified"}
                  </dd>
                </div>
                <div>
                  <dt>Sources</dt>
                  <dd>RP Team 2026 timeline · IT4010 module outline v2019-0</dd>
                </div>
              </dl>
              {milestone.href && (
                <Link className="button button--ink" to={milestone.href}>
                  View related records <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              )}
              <p className="source-note milestone-detail-disclaimer">
                Dates indicate scheduled deadlines, not confirmed completion. The assessment
                percentages are from the 2019-0 outline; they are not independently
                reconfirmed for the 2026 batch. Shared assessment categories are not
                counted twice.
              </p>
              <div className="assessment-sources">
                <strong>Documented sources</strong>
                <p>{milestoneSources.dates}</p>
                <p>{milestoneSources.weights}</p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
