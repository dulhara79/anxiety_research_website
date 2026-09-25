# Immersive Light Scientific Research Website — Design Specification

## Purpose

Redesign `research-website/` into an immersive, light-themed scientific publication and research exhibition for project **R26-DS-012**: *A Multimodal Digital Biomarker Framework for Personalized Vulnerability Mapping and Acute Escalation Forecasting in Young Adults with Anxiety Disorders*.

The website must help a visitor understand **why the research exists before learning how it was engineered**. It must not read like a university template, SaaS landing page, hospital portal, wellness site, generic AI startup, clinical dashboard, or cyberpunk interface.

## Scientific truth and public-claim boundary

All public claims must be traceable to the R26-DS-012 repository or an explicitly approved public project artifact. The site must not invent metrics, dataset sizes, publications, validation outcomes, diagnoses, clinical capabilities, citations, or future-event guarantees.

The public framing must consistently preserve these distinctions:

- research observation is not clinical diagnosis;
- current assessment is not future forecasting;
- TC-WPN is a Clinical NLP signal, not overall patient risk;
- missing or unavailable evidence is not low anxiety or zero risk;
- the integrated system is a research / clinical decision-support prototype, not a diagnostic device;
- weak, stale, unavailable, or excluded modalities must remain visibly distinct states;
- C2 must retain its current evidence state, including active fusion weight `0.0` while excluded under the current validation rule.

## Experience strategy

The website should feel like a quiet, premium scientific editorial experience with cinematic moments. The first half of the homepage is a research narrative rather than a component catalogue.

### Homepage order

1. Hero — “Understanding anxiety beyond a single moment.”
2. Context — anxiety changes across people and time.
3. Observation difficulty — different evidence appears at different timescales.
4. Snapshot limitation — important observations can occur between encounters.
5. Literature landscape — concise theme-based synthesis from project sources.
6. Research gap — reliability, personalization, missingness, timescale mismatch, generalization and validation.
7. Research question / thesis — then reveal the full academic title.
8. Conceptual approach — physiology, behaviour, clinical language and context.
9. Components — C1 through C4, only after the conceptual framing.
10. Why multimodal — availability, recency, coverage, reliability and validation evidence determine usable contribution.
11. System architecture — progressive SVG disclosure rather than one static image.
12. Current assessment vs forecast — visually and semantically separate.
13. Findings — journal-like, with evaluation context and limitations.
14. Interpretation — conservative research-level insights.
15. System experience — real application screenshots only.
16. Evidence support — CARE-AnxRAG with provenance, authority, contradiction handling, citation validation, abstention and safety routing.
17. Methodology — project-level research sequence.
18. Research documents — categorized project, presentation, publication and individual research outputs.
19. Research journey — actual milestones only.
20. Team and supervision — real approved photos or typographic portraits only.
21. Limitations and research boundary.
22. Deep navigation / footer.

## Hero

The first viewport is a full-height cinematic research hero using the supplied Google Flow project only as the **visual source**. A Google Flow viewing/project URL must never be assigned directly to `<video src>` unless it resolves to a browser-playable media file.

Production media paths are:

- `/public/media/research-hero.webm`
- `/public/media/research-hero.mp4`
- `/public/media/research-hero-poster.webp`

The hero component keeps these paths configurable and provides poster fallback for reduced motion, autoplay restrictions or unavailable media.

The video must remain visually dominant. Do not add a full-screen dark overlay, gradient overlay, color wash, global blur or artificial dimming. Readability is solved through placement, local glass, responsive object positioning, restrained text shadow, and light/dark text selection where necessary.

Hero content:

- project mark: `R26—DS—012` or `ANX / 012`;
- headline: `Understanding anxiety beyond a single moment.`;
- supporting copy: `A multimodal digital-biomarker research framework investigating how physiological, behavioural, clinical and contextual evidence can contribute to personalized vulnerability mapping and escalation assessment.`;
- primary CTA: `Explore the Research`;
- secondary CTA: `View Findings`;
- contextual tag: `Multimodal AI · Digital Biomarkers · Anxiety Research`;
- marker: `RESEARCH PROTOTYPE · 2026`.

The hero heading uses line-based character staggering: initial opacity `0`, `translateX(-18px)`, approximately `30ms` per character, `200ms` initial delay and `500ms` transition duration. Reduced-motion mode removes the stagger.

## Visual system

### Canvas

Use a warm scientific light canvas, not pure white. Preferred palette:

- `#F3F6F4`
- `#EEF3F2`
- `#E8F0EE`
- `#F4F1EC`

Primary text uses deep graphite / blue-black such as `#10201F`, `#142625`, `#223331`.

Supporting accents are muted teal, mineral cyan, sea-glass green, mist blue, restrained lavender and very limited soft peach/coral. Color should encode state, relationship, emphasis and data rather than make each component a rainbow identity.

### Typography

Use **Inter globally**, weights `300`, `400`, `500`, `600`. Major display headings are editorial, mostly weight `400`, with approximate letter spacing `-0.04em`. Avoid excessive bold text.

### Glass

Use localized neutral glass only for navbar, compact tags, buttons and small interface surfaces. Never place glass across the entire viewport.

### Motion

Motion explains relationships:

- Hero: character stagger.
- Context: slow editorial reveal.
- Timescale: scroll-linked observation timeline.
- Research gap: fragmented information resolves.
- Components: independent signal paths.
- Fusion: convergence tied to scroll.
- Findings: restrained chart motion.
- Documents: simple interaction.

Avoid constant fade-up repetition, oversized cursor followers, decorative 3D, excessive parallax, bouncing UI and exaggerated magnetic buttons.

## Navigation and route architecture

Desktop navigation:

`R26—DS—012 | Overview | Research | Components | System | Findings | Documents | Team | Explore Research`

The navigation begins over the hero and transitions to a light frosted surface after the hero. Mobile uses a compact menu rather than squeezing desktop navigation.

Recommended routes:

```text
/
├── /research
│   ├── background
│   ├── literature
│   ├── gap
│   ├── objectives
│   └── methodology
├── /components
│   ├── /physiological
│   ├── /behavioural
│   ├── /clinical-nlp
│   └── /fusion
├── /system
├── /findings
├── /applications
├── /publications
├── /documents
├── /team
└── /about
```

Do not create routes that contain only a title and one paragraph. Deep pages should be introduced only when enough verified content exists to justify them.

## Component presentation

Components are introduced as large alternating research features rather than four small equal cards.

### C1 — Personalized Physiological Forecasting

Describe self-supervised physiological anomaly detection and short-horizon physiological forecasting. Do not imply that this alone is a multimodal future forecast.

### C2 — Behavioural Vulnerability Mapping

Describe leakage-free spatio-temporal graph evaluation using passive smartphone sensing. Visibly disclose the current final evidence state. The held-out GATv2 result remains null-like and the active fusion weight remains `0.0` under the current validation rule.

### C3 — Clinical NLP / TC-WPN

Describe patient-disjoint few-shot clinical language modelling. Clearly label the output as a Clinical NLP signal that may contribute to fusion, not an overall patient-risk prediction.

### C4 — Reliability-Aware Fusion & Evidence Support

Describe contextual modelling, reliability-aware multimodal fusion and CARE-AnxRAG evidence support. Highlight quality gating, explicit missingness and abstention where evidence is insufficient.

## Architecture visualization

Build a responsive SVG / DOM architecture visualization with progressive disclosure:

`Participant → Signals → Component models → Canonical backend state → Quality / eligibility checks → Reliability-aware fusion → Current research assessment → Evidence support → Audience-specific interfaces`

Exact relationships and labels must come from repository evidence. Provide a `View Full Architecture` action for the complete system diagram.

## Findings

The findings section switches into a quieter journal-like language: off-white background, real charts, axes, confidence intervals where available, evaluation context, datasets, metrics and limitations. Do not use giant marketing-stat tiles.

Every result must carry enough context to understand what was evaluated. C2's null-like held-out behavior must remain visible. C3 and all other component metrics must use only frozen / repository-supported values.

## Documents and outputs

Provide structured collections rather than only repository links:

- Project — proposal, charter, architecture, public ethics/approval materials, project documentation.
- Presentations — proposal, progress presentations, final presentation and posters where public.
- Publications — papers, manuscripts, abstracts and citation information with accurate status.
- Individual Research — public C1–C4 technical artifacts.

Each document item can carry type, title, date/year, authors, status, view and download links. Confidential items must not be exposed.

## Content architecture

Research copy should move out of page JSX into auditable structured data. Preferred modules:

```text
src/data/
├── research.js
├── components.js
├── literature.js
├── findings.js
├── documents.js
├── publications.js
├── timeline.js
└── people.js
```

Each structured claim should include internal provenance/source notes where practical so statements can be checked against the R26-DS-012 repository.

## Component architecture

Keep `Home.jsx` as composition only. Prefer focused groups:

```text
src/components/
├── hero/
│   ├── ResearchHero.jsx
│   ├── AnimatedHeading.jsx
│   ├── HeroNavbar.jsx
│   └── HeroMedia.jsx
├── story/
│   ├── AnxietyContext.jsx
│   ├── ObservationTimeline.jsx
│   ├── SnapshotProblem.jsx
│   ├── LiteratureLandscape.jsx
│   ├── ResearchGap.jsx
│   └── ResearchThesis.jsx
├── research/
│   ├── ModalityOverview.jsx
│   ├── ComponentFeature.jsx
│   ├── FusionStory.jsx
│   ├── ArchitectureStory.jsx
│   └── CurrentForecastSplit.jsx
├── evidence/
│   ├── FindingsPreview.jsx
│   ├── FindingChart.jsx
│   └── LimitationNote.jsx
├── documents/
├── team/
└── shared/
```

## Accessibility

Support semantic heading order, keyboard navigation, visible focus indicators, WCAG-appropriate contrast, meaningful alternative text and captions/transcripts where a meaningful video carries content.

Honor `prefers-reduced-motion` by reducing or disabling character staggering, parallax, scroll scrubbing, camera motion and cursor attraction. Mobile also reduces particle counts and pointer interactions.

## Performance

- optimized MP4/WebM hero files;
- poster fallback;
- `preload="metadata"`;
- no unnecessary 4K autoplay asset;
- AVIF/WebP for deeper images;
- explicit image dimensions;
- lazy-load below-fold media;
- dynamic-load heavy visualization code;
- use transform/opacity for motion where possible.

## Existing-stack constraint

Maintain React, Vite, Tailwind CSS, React Router, Framer Motion and Lucide React. Do not introduce a large UI component library. TypeScript migration is out of scope unless performed deliberately as a separate project.

## Acceptance criteria

The redesign is accepted when:

1. the first half of the homepage explains context, observation difficulty, literature, research gap and research question before introducing C1–C4;
2. the hero works with configurable local media and no global darkening overlay;
3. C2, C3, missing-data and current-vs-forecast boundaries remain scientifically accurate;
4. research content lives in structured, auditable data modules rather than long hard-coded JSX blocks;
5. the homepage is composed from focused sections, not one monolithic file;
6. desktop, tablet and mobile preserve the narrative with simplified interaction on smaller screens;
7. reduced-motion behavior is functional;
8. the app passes content validation and production build checks;
9. no fabricated research result, publication, citation, screenshot or person image is introduced.
