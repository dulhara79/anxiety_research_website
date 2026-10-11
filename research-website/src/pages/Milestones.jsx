import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import { milestones } from "../data/documents";

export default function Milestones() {
  const [selected, setSelected] = useState(milestones[0].id);
  const milestone = milestones.find((item) => item.id === selected) ?? milestones[0];
  return (
    <>
      <PageHero eyebrow="Milestones" title="Research assessment milestones."
        lead="Assessment stages and the documents we can verify. Dates and mark allocations not supported by an official schedule are clearly identified." image="bannerDocuments" />
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
              <div><dt>Assessment date</dt><dd>{milestone.assessmentDate ?? "Not verified"}</dd></div>
              <div><dt>Allocated marks</dt><dd>{milestone.marks === null ? "Not provided in verified records" : milestone.marks}</dd></div>
              <div><dt>Document date (where known)</dt><dd>{milestone.documentDate ?? "Not verified"}</dd></div>
            </dl>
            {milestone.href && <Link className="button button--ink" to={milestone.href}>
              View related records <ArrowUpRight size={16} aria-hidden="true" />
            </Link>}
            {milestone.conditional && <p className="source-note">This assessment's applicability is not confirmed for R26-DS-012.</p>}
          </article>
          <p className="source-note">The university website guide requests assessment dates and allocated marks. Values are deliberately left unverified until the official marking scheme and timetable are provided.</p>
        </div>
      </section>
    </>
  );
}
