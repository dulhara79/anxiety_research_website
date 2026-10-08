import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import SectionHead from "../components/ui/SectionHead";
import { components } from "../data/components";

const byId = Object.fromEntries(components.map((component) => [component.id, component]));

const findings = [
  {
    component: byId.C3,
    eyebrow: "C3 · Clinical NLP · Kaushalya",
    title: "Clinical text was the strongest validated signal.",
    lead:
      "Kaushalya's publication-clean TC-WPN benchmark used patient-disjoint few-shot episodes and strict index-time rules. Across five seeds, the final K=5 model remained stable while avoiding patient and label leakage.",
    results: [
      ["0.7377", "Mean AUROC across five seeds"],
      ["0.0031", "AUROC standard deviation"],
      ["0.767", "Final F1"],
      ["0.790", "Final AUPRC"],
    ],
    detail:
      "The temporal-consistency weighting did not produce a statistically significant improvement over the auxiliary-only configuration. The paper therefore presents TC-WPN as a validated clinical-language signal, not as a complete patient-risk score.",
  },
  {
    component: byId.C2,
    eyebrow: "C2 · Behavioural Phenotyping · Senuvi",
    title: "The behavioural graph did not survive the validation gate.",
    lead:
      "Senuvi's final GLOBEM study used 28 days of passive sensing, participant-grouped evaluation and a prevalence-preserving permutation null. The GATv2 graph representation did not outperform simpler flat behavioural baselines.",
    results: [
      ["0.5205", "Held-out GATv2 AUROC"],
      ["0.485–0.560", "95% participant-clustered CI"],
      ["0.4991", "50-permutation null mean"],
      ["0.255", "Empirical permutation p-value"],
    ],
    detail:
      "The final result was not distinguishable from chance. The pre-registered exclusion rule therefore gives Component 2 an active fusion weight of 0.0. Earlier vulnerability, hourly-risk and phenotype outputs remain exploratory rather than validated clinical outputs.",
    baselines: true,
  },
  {
    component: byId.C1,
    eyebrow: "C1 · Physiology · Dewdu",
    title: "Personalized physiology showed strong benchmark discrimination and usable short-horizon forecasting.",
    lead:
      "The final physiological pipeline learns a participant-specific baseline from a three-minute seated calibration, then uses self-supervised reconstruction anomalies and two consecutive five-minute history blocks for direct +5 and +10 minute forecasting.",
    results: [
      ["0.9979", "WESAD AUROC under corrected 13-participant LOSO"],
      ["0.9233", "WESAD F1 under corrected LOSO"],
      ["0.8757", "AffectiveROAD macro AUROC"],
      ["0.5362", "AffectiveROAD F1"],
    ],
    detail:
      "The direct Ridge forecaster improved participant-macro MAE from 0.1364 to 0.1226 at +5 minutes and from 0.1599 to 0.1291 at +10 minutes, compared with persistence. External AffectiveROAD forecasting also improved over persistence at both horizons.",
  },
  {
    component: byId.C4,
    eyebrow: "C4 · Fusion + RAG · Senuvi",
    title: "Fusion is selective, and evidence is allowed to abstain.",
    lead:
      "Component 4 combines eligible signals using informativeness, recency and reliability/coverage rather than treating every modality as equally trustworthy. The contextual prior is kept separate from live escalation signals, while CARE-AnxRAG adds evidence-aware retrieval and safety checks.",
    results: [
      ["0.6220", "C4 contextual / demographic AUROC"],
      ["0.565–0.674", "Reported 95% confidence interval"],
      ["0.0023", "Expected calibration error"],
      ["0.000", "C2 behavioural base fusion weight"],
    ],
    detail:
      "The fusion design gives C2 zero base weight after its permutation-null failure, while eligible streams are weighted above chance and adjusted for recency and coverage. CARE-AnxRAG uses dense + lexical retrieval, reranking, evidence authority/freshness checks, contradiction detection, citation validation and calibrated abstention when evidence is weak or conflicting.",
  },
];

const lessons = [
  "Personalization matters.",
  "Leakage-free validation matters.",
  "Complex models are not automatically superior.",
  "Modalities should not receive equal influence simply because they exist.",
  "Missing evidence is not evidence of low anxiety.",
  "Uncertainty must be represented explicitly.",
];

const limitations = [
  "Research prototype; not a diagnostic device.",
  "Datasets do not represent every population.",
  "Modalities may be absent, stale or unreliable.",
  "Behavioural generalization remains limited under current evidence.",
  "Forecasting scope is defined and should not be exaggerated.",
  "Further external and prospective validation is required where applicable.",
];

export default function Findings() {
  return (
    <>
      <PageHero
        eyebrow="Findings"
        title="What held up, and what did not."
        lead="Each result is shown with its dataset, protocol and stage. Negative results are reported with the same weight as positive ones."
        image="bannerFindings"
      />

      {findings.map((finding, index) => {
        const c = finding.component;

        return (
          <section
            className={`section ${index % 2 ? "section--paper2" : ""}`}
            key={c.id}
            aria-labelledby={`${c.id}-results`}
          >
            <div className="shell">
              <SectionHead
                id={`${c.id}-results`}
                eyebrow={finding.eyebrow}
                title={finding.title}
                lead={finding.lead}
              />

              <Reveal className="grid-4">
                {finding.results.map(([value, label]) => (
                  <div className="stat" key={label}>
                    <span className="stat-value">{value}</span>
                    <span className="stat-label">{label}</span>
                  </div>
                ))}
              </Reveal>

              {finding.baselines && (
                <Reveal className="table-wrap" style={{ marginTop: 48 }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th scope="col">Model</th>
                        <th scope="col" className="num">
                          Held-out AUROC
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {c.baselines.map(([model, auroc]) => (
                        <tr
                          key={model}
                          className={model === "GATv2" ? "highlight" : undefined}
                        >
                          <td>{model}</td>
                          <td className="num">{auroc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Reveal>
              )}

              <p className="source-note">
                {finding.detail}{" "}
                <Link to={`/components/${c.slug}`}>Component details →</Link>
              </p>
            </div>
          </section>
        );
      })}

      <section
        className="section section--dark"
        aria-labelledby="fusion-finding"
      >
        <div className="shell split" style={{ alignItems: "start" }}>
          <Reveal>
            <p className="eyebrow">Cross-component decision</p>
            <h2 className="display" id="fusion-finding">
              A failed validation gate means zero weight.
            </h2>
            <p className="lead">
              Component outputs are not treated as equally reliable. A stream
              must clear its own validation criteria before it can influence
              fusion, and missing or weak evidence can leave the system without
              enough evidence to issue a tier.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">What the results teach</p>
            <ul className="check-list">
              {lessons.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="limits-title">
        <div className="shell">
          <SectionHead
            id="limits-title"
            eyebrow="Limitations"
            title="Where the claims stop."
          />
          <Reveal className="grid-3">
            {limitations.map((item, i) => (
              <div className="card" key={item}>
                <span className="card-kicker">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p style={{ marginTop: 0, color: "var(--ink)" }}>{item}</p>
              </div>
            ))}
          </Reveal>
          <div className="button-row">
            <Link className="button button--ink" to="/documents">
              Documents and sources <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
