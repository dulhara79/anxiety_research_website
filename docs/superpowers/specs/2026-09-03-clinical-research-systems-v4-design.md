# Clinical Research Systems V4 — Design Specification

**Date:** 2026-09-03  
**Repository:** `dulhara79/anxiety_research_website`  
**Branch:** `feature/premium-research-website-redesign`  
**Research source of truth:** `dulhara79/R26-DS-012/main`  
**Status:** Approved for implementation

---

## 1. Objective

Rebuild the research website so it reads as a serious biomedical/AI research system rather than a student portfolio, SaaS landing page, Tailwind showcase, or design experiment.

The desired impression is:

1. serious research first;
2. exceptionally clear presentation second;
3. visual polish as a consequence of restraint, not effects.

The website must not try to impress with decoration. Evidence, typography, research figures, provenance, and whitespace are the visual identity.

---

## 2. Positioning

### 2.1 Direction: Clinical Research Systems

The site combines:

- Swiss/institutional information design;
- modern biomedical research publishing;
- restrained AI-product clarity;
- production-quality engineering.

It must not resemble:

- a Behance case study;
- a student portfolio;
- a startup conversion funnel;
- a futuristic healthcare concept;
- a magazine with decorative serif typography;
- a collection of equal rounded cards.

### 2.2 Core rule

**Default to nothing. Add only what the research requires.**

If removing an element makes the page more serious without reducing comprehension or usability, remove it.

---

## 3. Visual System

### 3.1 Typography

Use only two families:

- `Inter Tight`: display, interface, navigation, body, labels;
- `IBM Plex Mono`: project IDs, datasets, metrics, figure annotations, provenance.

Do not use Source Serif 4, Plus Jakarta Sans, Outfit, or ornamental display typography.

Hierarchy comes from size, measure, spacing, alignment, weight, and rules.

Recommended scale:

- homepage display: `clamp(3.4rem, 6.7vw, 6.8rem)`;
- internal page title: `clamp(2.8rem, 5vw, 5rem)`;
- section title: `clamp(2rem, 3.6vw, 3.6rem)`;
- body lead: 20–24px;
- body: 16–18px;
- mono metadata: 11–12px.

Avoid repeated 800-weight headings. Use 500–700 primarily.

### 3.2 Palette

The interface is nearly monochrome.

- Canvas: `#F7F7F4`
- Surface: `#FFFFFF`
- Primary ink: `#111111`
- Secondary ink: `#666763`
- Muted ink: `#8A8B86`
- Rule: `#D8D8D2`
- Strong rule: `#B9BAB4`
- Research blue: `#2547B8`
- Deep blue: `#18317F`

Scientific accent colours may appear only inside actual charts, signal traces, legends, or data/status marks. Components do not receive decorative page colours.

### 3.3 Shape and depth

- most page content has no container;
- no universal cards;
- no universal shadows;
- controls use 4–8px radius;
- selected figure/device frames may use 8–12px radius;
- primary content separation uses whitespace and 1px rules;
- shadows are reserved for true floating layers or device screenshots.

### 3.4 Icons

Decorative icon boxes are prohibited.

Use text notation such as `C1`, `C2`, `C3`, `C4` instead of heart/brain/network/phone icons. Utility icons are permitted only where they improve action recognition, such as external-link or menu controls.

---

## 4. Imagery

### 4.1 No stock-image visual language

Remove all Unsplash/Pexels/stock brain, doctor, student, analytics, and office-team photography.

### 4.2 Asset priority

1. real research framework figures;
2. real model-output plots;
3. real wearable/device imagery;
4. real ClinAnx/mobile/clinician UI screenshots;
5. real team portraits;
6. original AI-authored vector scientific plates derived from the actual methodology;
7. contextual photography only when genuinely informative.

### 4.3 AI-authored scientific imagery

The implementation may include custom SVG/vector plates authored specifically for this project. They must use:

- off-white/white background;
- graphite line work;
- restrained cobalt marks;
- high negative space;
- scientific-publication composition;
- no embedded fake text;
- no neon;
- no holograms;
- no fake doctors/patients;
- no glowing brains;
- no cyberpunk/3D blob aesthetic.

The main hero visual should be a custom signal/evidence plate, not a raster stock image.

---

## 5. Motion

Motion is exceptional, not default.

- normal hover/focus: 140–200ms;
- mobile navigation: <=220ms;
- no scroll-triggered fade-up on every section;
- no parallax;
- no particles;
- no floating badges;
- no animated counters;
- no gradient animation;
- no bouncy springs;
- no card lifting;
- no ambient animation unless it directly explains data flow.

Respect `prefers-reduced-motion`.

---

## 6. Grid and Composition

Desktop uses a restrained 12-column system with a visual canvas around 1360px and generous gutters.

Prefer:

- full-width statements;
- 7/5 and 8/4 research/figure splits;
- figure with annotation column;
- evidence rows;
- flat publication lists;
- people directory rows;
- tables only when comparison benefits from them.

Avoid repeated three-column feature grids and repeated equal cards.

Internal pages should not all have oversized marketing heroes. They begin with compact publication-style page intros and move into content quickly.

---

## 7. Information Architecture

Primary navigation:

- Research
- System
- Evidence
- Methodology
- Publications
- People

Secondary/footer utilities:

- Documents
- Contact
- Repository

Routes:

- `/` — Research
- `/components` — System
- `/results` — Evidence
- `/methodology` — Methodology
- `/publications` — Publications
- `/team` — People
- `/documents` — Documents
- `/contact` — Contact

Brand treatment is textual:

```text
R26—DS—012
Multimodal Anxiety Research
```

No brain icon, gradient logo tile, or animated brand mark.

---

## 8. Homepage

### 8.1 Opening

The hero is typography-led and does not use a background image.

Suggested structure:

```text
R26—DS—012 / SLIIT / 2026

MULTIMODAL ANXIETY RESEARCH

Understanding anxiety
vulnerability across
multiple timescales.

A research framework combining physiological forecasting,
clinical language modelling and reliability-aware multimodal evidence.

Research ↓                       Evidence ↗
```

A custom scientific vector plate sits beside/below the text and expresses signal-to-evidence relationships without becoming a decorative infographic.

### 8.2 Research thesis

A typography-led statement explains that anxiety-related change is multimodal and modalities operate on different timescales.

No cards.

### 8.3 System overview

Use a flat architecture sequence for C1–C4. Clearly state:

- C1: wearable physiological forecasting;
- C2: leakage-free behavioural graph evaluation on GLOBEM;
- C3: patient-disjoint few-shot clinical NLP / TC-WPN;
- C4: contextual modelling + reliability-weighted fusion + CARE-AnxRAG.

C2 must show `ACTIVE FUSION WEIGHT 0.0` under current evidence.

### 8.4 Evidence preview

Show real research metrics as evidence rows, not marketing stat cards. Include dataset/evaluation context and limitations.

### 8.5 Safety

Research-use-only and abstention/insufficient-evidence behavior must be intentionally designed, visible, and readable.

---

## 9. System Page

Do not use expandable image cards.

Each component is an editorial research section containing:

- component index;
- owner;
- research question;
- method summary;
- concise model/data contract;
- one original vector/scientific figure or result figure;
- evidence/status;
- limitations.

C2 must describe GLOBEM final v8, not StudentLife as the final system.

C4 must describe reliability-weighted fusion + CARE-AnxRAG, not the historical KNN-CBR intervention engine.

---

## 10. Evidence Page

Create a dedicated `/results` route.

Evidence is presented with:

- metric name and value;
- dataset/evaluation setting;
- interpretation;
- limitation or status;
- evidence-quality status where relevant.

Required evidence includes at least:

- C2 GATv2 held-out AUROC `0.5205`;
- C2 95% participant-clustered CI `0.485–0.560`;
- C2 permutation null mean `0.4991`;
- C2 empirical p-value `0.255`;
- C3 deployment-relevant held-out AUROC approximately `0.738`;
- C2 active fusion weight `0.0`.

Physiological results may be shown only where supported by current project evidence; avoid unsourced marketing claims.

---

## 11. Methodology Page

Use publication-like sections:

1. research design;
2. component-specific evaluation;
3. leakage control;
4. reliability-weighted fusion;
5. evidence retrieval and abstention;
6. privacy/safety constraints.

Use equations/technical annotations where they improve comprehension.

---

## 12. Publications / Documents / Contact

### Publications

Use flat rows grouped by year/status. No publication cards.

### Documents

Use a structured index/table with document type, description, and action.

### Contact

Keep minimal and institutional. Do not use a large friendly-form SaaS layout. Provide project, institution, repository, and team contact pathways.

---

## 13. People

Use real portraits only where available.

- consistent crop;
- no gradient overlays;
- no role pill over faces;
- no giant coloured initials;
- flat directory composition;
- supervisors receive the same visual dignity as students.

If a portrait is unavailable, use text-only entry.

---

## 14. Engineering System

Introduce focused shared units rather than a monolithic homepage.

Recommended structure:

```text
src/
  components/
    Navbar.jsx
    Footer.jsx
    PageIntro.jsx
    SectionHeading.jsx
    ResearchPlate.jsx
    EvidenceRow.jsx
    ComponentSection.jsx
  data/
    research.js
  pages/
    Home.jsx
    Components.jsx
    Results.jsx
    Methodology.jsx
    Team.jsx
    Publications.jsx
    Documents.jsx
    Contact.jsx
  index.css
```

Centralize research claims in `src/data/research.js` so corrections propagate consistently.

---

## 15. Content Regression Rules

Build validation must fail if active source files contain deprecated visual/content patterns such as:

- `images.unsplash.com`
- `pexels.com`
- `Plus Jakarta Sans`
- `Outfit`
- `StudentLife` presented as the final C2 pipeline
- `KNN BallTree` or `Adaptive Intervention Engine` presented as current C4
- animated-gradient/glow/particle helper classes from the old design

The build should also verify that current-content anchors exist:

- `GLOBEM`
- `CARE-AnxRAG`
- `0.5205`
- `0.0` active fusion weight language
- `TC-WPN`

---

## 16. Accessibility and Performance

- semantic headings and landmarks;
- keyboard-visible focus states;
- accessible mobile navigation;
- sufficient contrast;
- `prefers-reduced-motion` support;
- no layout-critical remote stock imagery;
- no unnecessary animation runtime;
- responsive from 320px upward;
- preserve Vite production build success.

---

## 17. Acceptance Criteria

The redesign is complete when:

1. no stock imagery remains in the active website source;
2. no gradient brain/logo, particles, floating badges, glow rings, shimmer, or card-lift language remains;
3. the visual system is nearly monochrome and typography-led;
4. the homepage is no longer a conversion-funnel hero;
5. System is not a grid of expandable image cards;
6. Evidence exists as a first-class route;
7. C2/C3/C4 content matches `R26-DS-012/main`;
8. C2 is visibly excluded from active fusion under current evidence;
9. custom research-specific vector plates replace generic decorative imagery;
10. `npm run build` succeeds in the pull-request validation workflow.
