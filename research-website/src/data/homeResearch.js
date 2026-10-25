// Homepage-only summaries of the published R26-DS-012 component descriptions.
// Do not imply that every modality is validated or actively contributes to fusion.
export const homeEvidenceHighlights = {
  C1: {
    title: "Wearable physiology",
    description: "Personalized anomaly detection and short-horizon forecasting from wearable measurements.",
    imageAlt: "Wearable physiological sensing research illustration",
    dataset: "WESAD · AffectiveROAD",
    status: "Laboratory and external evaluation; clinical validation pending",
    statusType: "limited",
  },
  C2: {
    title: "Behavioural graph learning",
    description: "Spatio-temporal graph analysis of longitudinal passive smartphone sensing.",
    imageAlt: "Smartphone-based longitudinal behavioural graph research illustration",
    dataset: "GLOBEM · 28-day sensing",
    status: "Held-out AUROC 0.5205 · fusion weight 0.0",
    statusType: "excluded",
  },
  C3: {
    title: "Clinical NLP · TC-WPN",
    description: "Few-shot anxiety-related classification of clinical notes using language-model representations.",
    imageAlt: "Clinical notes represented as few-shot learning prototypes",
    dataset: "MIMIC clinical notes",
    status: "Independent leakage-audited verification needed",
    statusType: "limited",
  },
};

export const homeFusionHighlight = {
  description:
    "A contextual prior and eligible component outputs are considered through reliability-aware fusion, with source-grounded evidence retrieval and explicit withholding when support is insufficient.",
  features: [
    "Reliability and recency checks",
    "Evidence provenance and relevance",
    "Insufficient-evidence safeguards",
  ],
  boundary:
    "C2 is excluded from active fusion (weight 0.0). Missing or unvalidated inputs are not treated as low risk. The framework is a research prototype, not a validated diagnostic system.",
};
