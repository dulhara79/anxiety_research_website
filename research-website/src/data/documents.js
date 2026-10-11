// Assessment-stage records. Only link exact files present in the shared
// project Drive folder; do not infer assessment dates from upload timestamps.
import { components } from "./components.js";

const driveFile = (id) => `https://drive.google.com/file/d/${id}/view`;
const proposalPdf = {
  C1: "1YMUy37Rg4co5sEGKX2eTDBJT4hJbrBN2",
  C2: "1QIXzKF3jqaezolvh8-jrY03ZYKJDNaee",
  C3: "1X35rkxxdf6gfhgKRdqVXt6EoNX80NY0d",
  C4: "1YbCryp0gpOo79RnUZbWPb5vuY1_ClPUe",
};

export const documentStages = [
  "TAF (Topic Assessment Form)",
  "Proposal",
  "Progress Presentation 1",
  "Progress Presentation 2",
  "Final Presentation",
];

export const documents = [
  {
    group: documentStages[0],
    type: "Topic Assessment Form",
    title: "R26-DS-012 Topic Assessment Form (TAF)",
    meta: "IT4010 Research Project · 2026",
    url: driveFile("1-Bdz4Qmgo4yoitX5S87QHpEKhIWpM-q1"),
  },
  ...components.map((component) => ({
    group: documentStages[1],
    type: "Individual proposal report",
    title: component.proposalTitle,
    meta: `${component.id} · ${component.owner} · March 2026`,
    url: proposalPdf[component.id] ? driveFile(proposalPdf[component.id]) : null,
  })),
  {
    group: documentStages[1],
    type: "Group presentation slides",
    title: "R26-DS-012 proposal presentation",
    meta: "Archived slide deck (its printed date differs from the March proposal reports)",
    url: driveFile("1ApTHMyhwy_7qyqKdU8I2nJRCmJH1xrsz"),
  },
  {
    group: documentStages[2],
    type: "Group presentation slides",
    title: "R26-DS-012 progress presentation 1",
    meta: "Slides dated 11 May 2026 · Assessment date not independently verified",
    url: driveFile("1d0QkKTgOnnZ8BQhqOKrd6PtT-kcIIXmw"),
  },
  {
    group: documentStages[3],
    type: "Group presentation slides",
    title: "R26-DS-012 progress presentation 2",
    meta: "Slides available · Assessment date not verified",
    url: driveFile("1JXDryh9IUuU4EOtHUDQ9rJEmxSJaDY_v"),
  },
  {
    group: documentStages[4],
    type: "Group presentation slides",
    title: "R26-DS-012 final presentation",
    meta: "Presentation file not yet available in shared Drive",
    url: null,
  },
];

export const publicationNote =
  "Published papers will be listed only after their publication status and links are verified.";

// The university asks for assessment details, assessment dates and marks.
// Unknown values remain null until an official assessment scheme is provided.
// Dates below identify DOCUMENT dates, NOT verified assessment dates.
export const milestones = [
  {
    id: "taf",
    title: "Topic Assessment Form (TAF)",
    detail: "R26-DS-012 topic assessment record is archived and linked under Documents. The date of formal assessment is not established in the reviewed records.",
    documentDate: null,
    assessmentDate: null,
    marks: null,
    href: "/documents#document-0",
  },
  {
    id: "proposal",
    title: "Project Proposal",
    detail: "Four individual proposal reports have March 2026 cover dates. A separate proposal slide deck exists, but its printed date differs.",
    documentDate: "March 2026 (individual report cover dates)",
    assessmentDate: null,
    marks: null,
    href: "/documents#docs-title",
  },
  {
    id: "pp1",
    title: "Progress Presentation 1",
    detail: "The archived presentation displays 11 May 2026. This is evidence of a date printed on slides, not independently proof of the assessment date.",
    documentDate: "11 May 2026 (printed on slides)",
    assessmentDate: null,
    marks: null,
    href: "/slides#slide-0",
  },
  {
    id: "pp2",
    title: "Progress Presentation 2",
    detail: "The presentation file is available. Neither the assessment date nor the allocated marks were established from the reviewed documents.",
    documentDate: null,
    assessmentDate: null,
    marks: null,
    href: "/slides#slide-1",
  },
  {
    id: "final",
    title: "Final Assessment / Presentation",
    detail: "Listed as an assessment stage in the university website guidance. The project's final presentation has not yet been published in the shared Drive folder.",
    documentDate: null,
    assessmentDate: null,
    marks: null,
    href: "/slides#slide-2",
  },
  {
    id: "viva",
    title: "Viva (if applicable)",
    detail: "The university website guidance lists viva as an example. Whether this project has a separate viva, its date and mark allocation must be confirmed from the official assessment schedule.",
    documentDate: null,
    assessmentDate: null,
    marks: null,
    href: null,
    conditional: true,
  },
];
