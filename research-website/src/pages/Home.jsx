import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown, ShieldCheck } from "lucide-react";
import CinematicHero from "../components/hero/CinematicHero";
import Reveal from "../components/ui/Reveal";
import ImageSlot from "../components/ui/ImageSlot";
import SectionHead from "../components/ui/SectionHead";
import ArchitectureDiagram from "../components/research/ArchitectureDiagram";
import ContactSection from "../components/layout/ContactSection";
import { homeContext, timescales } from "../data/research";
import { team } from "../data/team";
import { components } from "../data/components";
import { homeEvidenceHighlights, homeFusionHighlight } from "../data/homeResearch.js";
import "../styles/home-research.css";

const headlineResults = [
  {
    value: "0.9979",
    label: "C1 WESAD AUROC",
    note: "WESAD laboratory evaluation · subject-held-out",
  },
  {
    value: "0.8757",
    label: "C1 AffectiveROAD macro AUROC",
    note: "AffectiveROAD · external evaluation",
  },
  {
    value: "0.5205",
    label: "C2 held-out GATv2 AUROC, not distinguishable from chance",
    note: "GLOBEM held-out · weight 0.0 in fusion",
  },
  {
    value: "≈0.738",
    label: "C3 clinical-note AUROC",
    note: "Archived experiment · independent clean-benchmark verification required",
  },
];

export default function Home() {
  return (
    <>
      <CinematicHero />

      <section className="section" id="context" aria-labelledby="context-title">
        <div className="shell split">
          <Reveal>
            <p className="eyebrow">Why this research</p>
            <h2 className="display" id="context-title">
              Anxiety is not a single moment.
            </h2>
            <p className="lead">{homeContext.lead}</p>
            <div className="body-copy" style={{ marginTop: 20 }}>
              {homeContext.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="button-row">
              <Link className="button button--ink" to="/research">
                Read the research <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ImageSlot name="homeContext" alt="" />
          </Reveal>
        </div>
        <div className="shell">
          <Reveal className="timescale-row">
            {timescales.map((item) => (
              <div className="timescale" key={item.stream}>
                <span className="timescale-when">{item.when}</span>
                <strong>{item.stream}</strong>
                <span className="muted">{item.detail}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--paper2 home-research-section" id="components-overview" aria-labelledby="components-title">
        <div className="shell">
          <SectionHead
            id="components-title"
            eyebrow="Explore the research"
            title="Different signals. One evidence-aware framework."
            lead="Physiology, behaviour and clinical language are studied separately. A fourth component explores how eligible findings and contextual evidence can be integrated without hiding uncertainty."
          />

          <div className="home-research-group-heading">
            <span className="home-research-step">01 / Evidence streams</span>
            <p>Three investigations. Different datasets, timescales and validation boundaries.</p>
          </div>

          <div className="home-research-evidence-grid">
            {components.filter((component) => component.id !== "C4").map((component, index) => {
              const highlight = homeEvidenceHighlights[component.id];
              return (
                <Reveal className="home-research-evidence-card" key={component.id} delay={index * 0.07}>
                  <div className="home-research-card-visual">
                    <ImageSlot name={component.image} alt={highlight.imageAlt} className="home-research-card-image" />
                    <span className="home-research-image-label">{component.id} · {component.modality}</span>
                  </div>
                  <div className="home-research-card-body">
                    <span className="home-research-timescale">{component.timescale}</span>
                    <h3 className="serif-title">{highlight.title}</h3>
                    <p className="home-research-description">{highlight.description}</p>
                    <div className="home-research-card-evidence">
                      <span className="home-research-dataset">{highlight.dataset}</span>
                      <span className={"home-research-status home-research-status--" + highlight.statusType}>
                        {highlight.status}
                      </span>
                    </div>
                    <Link className="home-research-card-action" to={"/components/" + component.slug}>
                      Explore {component.id}
                      <ArrowRight size={17} aria-hidden="true" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="home-research-bridge" aria-label="Evidence is checked for eligibility before integration">
            <span className="home-research-bridge-line" aria-hidden="true" />
            <div className="home-research-bridge-copy">
              <ShieldCheck size={19} aria-hidden="true" />
              <span>Only eligible, sufficiently reliable evidence can contribute</span>
              <ArrowDown size={18} aria-hidden="true" />
            </div>
            <span className="home-research-bridge-line" aria-hidden="true" />
          </div>

          <Reveal className="home-research-integration">
            <div className="home-research-integration-copy">
              <p className="home-research-integration-eyebrow">02 / Integration & evidence · C4</p>
              <h3 className="serif-title">Multimodal fusion & CARE-AnxRAG</h3>
              <p className="home-research-integration-lead">{homeFusionHighlight.description}</p>
              <ul className="home-research-feature-list">
                {homeFusionHighlight.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <p className="home-research-integration-note">
                {homeFusionHighlight.boundary}
              </p>
              <div className="home-research-integration-actions">
                <Link className="button button--paper" to="/components/fusion-and-rag">
                  Explore C4 <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link className="home-research-system-link" to="/system">
                  View system architecture <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="home-research-integration-image">
              <ImageSlot name={components.find((component) => component.id === "C4").image}
                alt="Abstract illustration of eligible evidence streams and source-grounded retrieval" />
            </div>
          </Reveal>

          <p className="home-research-section-note">
            Research streams are evaluated on different datasets; this is an overview of the framework, not a unified clinical validation result.
          </p>
        </div>
      </section>

      <section className="section" id="home-system" aria-labelledby="home-system-title">
        <div className="shell">
          <SectionHead
            id="home-system-title"
            eyebrow="How the system connects"
            title="From component evidence to supported output."
            lead="A central integration layer checks signal availability and validation status before fusion. Unavailable evidence is not assumed to mean low risk."
          />
          <Reveal><ArchitectureDiagram /></Reveal>
          <div className="button-row">
            <Link className="button button--ink" to="/system">Explore the system <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>


      <section className="section" aria-labelledby="results-title">
        <div className="shell">
          <SectionHead
            id="results-title"
            eyebrow="What the evidence shows so far"
            title="Results reported with their context."
            lead="Positive and negative findings are shown the same way. Each number keeps its dataset and evaluation protocol attached."
          />
          <Reveal className="grid-4">
            {headlineResults.map((result) => (
              <div className="stat home-evidence-stat" key={result.label}>
                <span className="stat-value">{result.value}</span>
                <span className="stat-label">{result.label}</span>
                <span className="stat-note">{result.note}</span>
              </div>
            ))}
          </Reveal>
          <p className="home-evidence-note">Results are dataset-specific research findings, not clinical performance guarantees. The behavioural model remains excluded from active fusion.</p>
          <div className="button-row">
            <Link className="button button--ink" to="/findings">
              All findings <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--paper2" aria-labelledby="home-apps-title">
        <div className="shell">
          <SectionHead
            id="home-apps-title"
            eyebrow="Research applications"
            title="Two interfaces, one research framework."
            lead="Explore the participant and clinician application prototypes, their responsibilities, and their documented safety boundaries."
          />
          <div className="grid-2 home-app-grid">
            <Reveal className="home-app-card">
              <ImageSlot name="appAura" alt="Research participant application preview" />
              <div>
                <p className="card-kicker">Participant application</p>
                <h3 className="serif-title">Aura</h3>
                <p>Participant-side sensing and research data collection. Not a diagnostic app.</p>
              </div>
            </Reveal>
            <Reveal className="home-app-card" delay={0.08}>
              <ImageSlot name="appClinAnx" alt="Clinician application preview" />
              <div>
                <p className="card-kicker">Clinician application</p>
                <h3 className="serif-title">ClinAnx</h3>
                <p>Research decision-support interface for eligible signals and evidence review. Not a substitute for clinical judgment.</p>
              </div>
            </Reveal>
          </div>
          <div className="button-row">
            <Link className="button button--ink" to="/system">View the applications <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="team-title">
        <div className="shell">
          <SectionHead
            id="team-title"
            eyebrow="Team and supervision"
            title="Meet the four researchers."
          />
          <Reveal className="people-strip">
            {team.map((person) => {
              const content = (
                <>
                  <ImageSlot
                    name={person.photo}
                    alt=""
                    className="person-chip-photo"
                  />
                  <div>
                    <strong>{person.name}</strong>
                    <span>
                      {person.component
                        ? `${person.component} · ${person.role}`
                        : person.role}
                    </span>
                  </div>
                </>
              );
              // Supervisors link out to their institutional profiles.
              return person.profile ? (
                <a
                  className="person-chip person-chip--link"
                  key={person.name}
                  href={person.profile}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${person.name}, ${person.role} (profile opens in a new tab)`}
                >
                  {content}
                </a>
              ) : (
                <div className="person-chip" key={person.name}>
                  {content}
                </div>
              );
            })}
          </Reveal>
          <div className="button-row">
            <Link className="button button--ghost" to="/team">
              Meet the team <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <ContactSection variant="home" />
    </>
  );
}
