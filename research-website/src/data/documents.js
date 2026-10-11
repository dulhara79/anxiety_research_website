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

export const milestones = [
  {
    date: "2026 · date unverified",
    title: "TAF (Topic Assessment Form)",
    detail: "The R26-DS-012 topic assessment document is available in the project archive. Its submission and approval dates have not been independently confirmed.",
  },
  {
    date: "March 2026 · report date",
    title: "Proposal",
    detail: "Four individual research proposal reports are dated March 2026. The separate group slide deck has a later printed date.",
  },
  {
    date: "11 May 2026 · slide date",
    title: "Progress Presentation 1",
    detail: "Progress Presentation 1 slides are available. This is the date shown on the slides, not an independently verified assessment date.",
  },
  {
    date: "2026 · date unverified",
    title: "Progress Presentation 2",
    detail: "The Progress Presentation 2 deck is available. The assessment date and marks allocation were not confirmed from the reviewed materials.",
  },
  {
    date: "Date unverified",
    title: "Final Presentation",
    detail: "The final presentation is included as an assessment stage; the shared Drive folder does not yet contain its slide deck.",
  },
];
