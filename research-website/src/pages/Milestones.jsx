import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import { milestones, assessmentWeights, milestoneSources } from "../data/documents";

export default function Milestones() {
  const [selected, setSelected] = useState(milestones[0].id);
  const milestone = milestones.find((item) => item.id === selected) ?? milestones[0];
  const weights = assessmentWeights.filter((item) => milestone.weights.includes(item.id));
  return (
    <>
      <PageHero eyebrow="Milestones" title="Research assessment milestones."
        lead="2026 research project deadlines and assessment weights from the supplied IT4010 module outline." image="bannerDocuments" />
      <section className="section" aria-labelledby="assessment-title">
        <div className="shell">
          <p className="eyebrow">Assessment record</p>
          <h2 className="display" id="assessment-title">From proposal to final assessment.</h2>
          <div className="assessment-picker">
            <label htmlFor="milestone-select">Choose an assessment</label>
            <select id="milestone-select" value={selected}
              onChange={(event) => setSelected(event.target.value)}>
              {milestones.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
            </select>
          </div>
          <article className="card assessment-detail" aria-live="polite">
            <div className="assessment-detail-heading">
              <CalendarDays size={25} aria-hidden="true" />
              <h3 className="serif-title">{milestone.title}</h3>
            </div>
            <p>{milestone.detail}</p>
            <dl className="assessment-facts">
              <div><dt>2026 scheduled deadline</dt><dd>{milestone.deadline ?? "Not specified"}</dd></div>
              <div><dt>Module outline weight (2019 version)</dt><dd>{weights.length ? weights.map((item) => item.percent + "% — " + item.title).join("; ") : "No separate weight specified"}</dd></div>
              <div><dt>Source distinction</dt><dd>Deadline: 2026 RP Team timeline; weight: IT4010 outline (2019-0)</dd></div>
            </dl>
            {milestone.href && <Link className="button button--ink" to={milestone.href}>
              View related records <ArrowUpRight size={16} aria-hidden="true" />
            </Link>}
            {milestone.conditional && <p className="source-note">This assessment's applicability is not confirmed for R26-DS-012.</p>}
          </article>
          <p className="source-note">These are scheduled deadlines, not verified completion dates. Assessment percentages come from the supplied 2019-0 module outline and have not been reconfirmed for 2026. Shared marking categories are not counted twice.</p>
          <div className="assessment-sources"><strong>Sources</strong><p>{milestoneSources.dates}</p><p>{milestoneSources.weights}</p></div>
        </div>
      </section>
    </>
  );
}
