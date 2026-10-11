// Documents and milestones. Only list items that exist; set `url` once a file is
// published (put PDFs in public/documents/ and use "/documents/<file>.pdf").

import { components } from "./components.js";

const driveFile = (id) => `https://drive.google.com/file/d/${id}/view`;
const proposalPdf = {
 C1: "1YMUy37Rg4co5sEGKX2eTDBJT4hJbrBN2",
 C2: "1QIXzKF3jqaezolvh8-jrY03ZYKJDNaee",
 C3: "1X35rkxxdf6gfhgKRdqVXt6EoNX80NY0d",
 C4: "1YbCryp0gpOo79RnUZbWPb5vuY1_ClPUe",
};
export const documents = [
  ...components.map((component) => ({
    group: "Project proposals", type: "Proposal report",
    title: component.proposalTitle,
    meta: `${component.id} · ${component.owner} · March 2026`,
    url: proposalPdf[component.id] ? driveFile(proposalPdf[component.id]) : null,
  })),
  { group: "Project proposals", type: "Presentation slides",
    title: "R26-DS-012 proposal presentation", meta: "Proposal presentation",
    url: driveFile("1ApTHMyhwy_7qyqKdU8I2nJRCmJH1xrsz") },
  { group: "Project registration", type: "Approved form",
    title: "Topic Assessment Form · R26-DS-012", meta: "Project registration",
    url: driveFile("1-Bdz4Qmgo4yoitX5S87QHpEKhIWpM-q1") },
  { group: "Progress Presentation 1", type: "Presentation slides",
    title: "R26-DS-012 progress presentation 1", meta: "March 2026",
    url: driveFile("1d0QkKTgOnnZ8BQhqOKrd6PtT-kcIIXmw") },
  { group: "Progress Presentation 2", type: "Presentation slides",
    title: "R26-DS-012 progress presentation 2", meta: "June 2026",
    url: driveFile("1JXDryh9IUuU4EOtHUDQ9rJEmxSJaDY_v") },
  { group: "Final Presentation", type: "Presentation slides",
    title: "R26-DS-012 final presentation",
    meta: "September 2026 · Not published in Drive yet", url: null },
  {
    group: "Source and artefacts",
    type: "Diagram",
    title: "Project framework diagram",
    meta: "full.png in the research repository",
    url: "https://github.com/dulhara79/R26-DS-012/blob/main/full.png",
  },
  {
    group: "Source and artefacts",
    type: "Repository",
    title: "Research website source",
    meta: "This website",
    url: "https://github.com/dulhara79/anxiety_research_website",
  },
];

export const publicationNote =
  "No publications are listed yet. Entries are added here once a publication and its status are verified.";

// Scope changes between the March 2026 proposals and the current repository.
export const scopeChanges = [
  {
    id: "C2",
    before:
      "StudentLife, GPS/DBSCAN, hourly-risk and phenotype-deployment pipeline",
    after:
      "Final v8 GLOBEM spatio-temporal graph study with leakage-free, cross-cohort evaluation",
  },
  {
    id: "C3",
    before: '"Confidence" weight in the prototypical network',
    after:
      "Renamed prototype-consistency weight; it is not a calibrated confidence",
  },
  {
    id: "C4",
    before:
      "Continuously learning intervention engine (GBDT → KNN case-based reasoning)",
    after:
      "DCAR contextual prior, reliability-weighted fusion and CARE-AnxRAG decision support",
  },
];

// Add dated milestones here as they are confirmed (e.g. progress presentations).
export const milestones = [
  {
    date: "March 2026",
    title: "Project proposals submitted",
    detail:
      "Four individual proposal reports under the shared R26-DS-012 framework.",
  },
  {
    date: "April 2026",
    title: "Component 1 physiological evaluation reported",
    detail:
      "Corrected 13-participant WESAD LOSO evaluation and external AffectiveROAD evaluation, with direct +5 and +10 minute Ridge forecasting.",
  },
  {
    date: "2026",
    title: "Final component evaluations and integration",
    detail:
      "C2 final v8 study, publication-clean TC-WPN benchmark, and reliability-weighted fusion with CARE-AnxRAG.",
  },
];
