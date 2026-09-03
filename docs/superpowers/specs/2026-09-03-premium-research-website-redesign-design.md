# Premium Research Website Redesign — Design Specification v2

**Date:** 2026-09-03  
**Repository:** `dulhara79/anxiety_research_website`  
**Branch:** `feature/premium-research-website-redesign`  
**Research source of truth:** `dulhara79/R26-DS-012`  
**Status:** Revised after design-quality feedback; pending user approval

## 1. Objective

Redesign the research website into a premium, publication-grade scientific experience that feels credible enough for researchers, clinicians, conference reviewers, industry engineers, and supervisors.

The website must not look like a student portfolio, a generic SaaS template, or a collection of animated Tailwind cards. It should feel deliberate, restrained, editorial, and technically sophisticated.

The visual standard is closer to contemporary healthcare-AI and research organizations that use strong typography, editorial spacing, real evidence, and bespoke scientific graphics rather than stock photography and decorative effects.

Primary goals:

- create a strong first impression through composition and typography, not visual noise;
- make the research itself the visual identity;
- use custom scientific diagrams and real project assets as primary imagery;
- remove generic stock-photo dependence;
- replace repeated glass cards / pills / gradients with a disciplined component system;
- keep motion smooth and meaningful rather than constant or playful;
- accurately present the current science in `R26-DS-012`;
- preserve excellent accessibility, performance, responsiveness, and maintainability.

## 2. Design Principles

### 2.1 Premium means restraint

The design will deliberately avoid the common signals of amateur AI-generated websites:

- no floating decorative bubbles around every section;
- no random particles;
- no excessive neon gradients;
- no rainbow glassmorphism;
- no spinning rings for decoration;
- no shimmer on ordinary badges;
- no large number of rounded cards with identical shadows;
- no excessive pill tags;
- no icon on every heading;
- no stock doctor/patient imagery used merely to fill space;
- no fake medical dashboards;
- no animation simply because Framer Motion is available;
- no gratuitous 3D tilt or magnetic effects across the interface.

Every visual effect must have one of three jobs: establish hierarchy, explain research, or improve interaction feedback.

### 2.2 Editorial scientific composition

The site will use large negative space, asymmetric editorial layouts, strong typographic hierarchy, thin rules, precise alignment, restrained borders, and selected full-width visual moments.

Pages should resemble a high-quality research publication translated to the web rather than a card dashboard.

### 2.3 Research is the brand

The four modalities and the multimodal fusion architecture become the main visual system.

Instead of relying on generic healthcare photos, the website should repeatedly reinterpret real research concepts:

- physiological waveform and wearable signals;
- temporal graph structure;
- clinical-note embedding / prototype geometry;
- weighted multimodal fusion;
- evidence retrieval and provenance;
- confidence intervals, validation decisions, and abstention states.

## 3. Typography System

The existing `Plus Jakarta Sans + Outfit + JetBrains Mono` combination will be replaced. It currently contributes to a generic portfolio / template feel.

### 3.1 Proposed type stack

**Primary display / interface:** `Manrope`

- clean but more distinctive than a default system sans;
- suitable for large technical headlines and navigation;
- controlled weights: 500, 600, 700 only.

**Editorial accent:** `Instrument Serif`

- used sparingly for selected words, section openers, pull statements, and major editorial moments;
- never used for dense technical content;
- typically 400 / italic.

**Body / long-form:** `Inter`

- used for research explanations, captions, documents, and dense information;
- optimized for readability and neutral enough not to compete with the science.

**Data / technical labels:** `IBM Plex Mono`

- used for model names, IDs, metric labels, timestamps, equations, and dataset metadata;
- no oversized monospace decorative text.

### 3.2 Typography rules

- Hero display: 64–96px desktop depending on viewport, tightly controlled line length.
- Section headings: 44–64px desktop.
- Body text: 16–18px with approximately 1.6 line height.
- Long text line length: approximately 60–72 characters.
- Labels: 11–13px mono with deliberate letter spacing.
- Maximum three font families on any page, each with a clearly defined role.
- Avoid excessive font weights; hierarchy comes from scale, spacing, and contrast.

## 4. Colour System

The palette will move away from the current bright blue/violet/teal startup-gradient look.

### 4.1 Core palette

- **Canvas:** warm ivory / clinical off-white, approximately `#F5F3EE`
- **Surface:** soft white, approximately `#FCFBF8`
- **Primary ink:** near-black graphite, approximately `#111417`
- **Secondary text:** cool grey, approximately `#5E646B`
- **Rule / border:** warm grey, approximately `#D9D8D2`
- **Primary signal:** restrained cobalt, approximately `#3E5CC8`
- **Physiology:** muted sea-green / teal
- **Behavioural:** desaturated cyan-blue
- **Clinical NLP:** muted coral / rose
- **Fusion / RAG:** soft violet / indigo

Exact contrast-safe values will be finalized during implementation.

### 4.2 Colour usage

- Most of the site remains off-white, graphite, and neutral grey.
- Component colours appear mainly in diagrams, data marks, hover states, and tiny identity accents.
- Large gradients are rare and subtle.
- No section should look like a different template because it uses a different saturated colour.

## 5. Imagery Strategy

### 5.1 Remove generic stock-photo dependence

The current site uses several Unsplash medical/technology images. These will no longer define the visual identity.

Primary imagery hierarchy:

1. real project figures and architecture assets from `R26-DS-012`;
2. real hardware / wearable imagery where available;
3. real mobile / clinician application screenshots where appropriate;
4. real team portraits already referenced by the project;
5. custom React/SVG scientific visuals;
6. custom graphical-abstract style illustrations if needed;
7. carefully chosen supporting photography only when it adds genuine context.

### 5.2 Image treatment

All media must feel like one visual system:

- consistent crop ratios;
- large editorial crops rather than many small thumbnails;
- subtle tonal treatment where source images differ significantly;
- restrained border radius (not every image is a rounded 24px card);
- no image shadows unless required for device/UI screenshots;
- captions for scientific figures;
- lightbox or expanded figure viewing only where useful.

### 5.3 Team photography

Use real portraits only. No generic professional stock portraits.

Because source portraits have different backgrounds and quality, the layout should normalize them through consistent 4:5 or 3:4 crops, neutral framing, and optional low-saturation treatment rather than artificial replacement.

If a supervisor portrait is not available in the repository/source content, use an elegant text profile rather than a fake image.

## 6. Motion System

The previous direction contained too many visible motion motifs. v2 uses a restrained three-speed motion system.

### 6.1 Interaction motion

**150–260ms**

Used for:

- buttons;
- nav indicator;
- hover/focus states;
- accordion / disclosure controls;
- small UI feedback.

### 6.2 Content motion

**500–850ms**

Used for:

- section entry;
- figure reveal;
- text mask reveal;
- route transition;
- chart / confidence-interval drawing.

### 6.3 Ambient scientific motion

**10–30 seconds**

Used only for a small number of research-specific background visuals such as a slow signal field or data-flow loop.

### 6.4 Explicitly removed patterns

- floating badges;
- random particle clouds;
- constant card bobbing;
- infinite decorative spins;
- shimmer effects on regular content;
- aggressive parallax on every image;
- exaggerated spring/bounce effects;
- novelty cursor effects.

The site should feel calm even when many animations are technically present.

## 7. Global Layout System

### 7.1 Grid

- 12-column desktop editorial grid;
- max content width around 1360–1440px;
- long-form reading width much narrower;
- consistent vertical rhythm built around 8px increments;
- section spacing typically 112–176px desktop;
- large whitespace is intentional, not empty.

### 7.2 Borders and radii

- small UI: 8–12px radius;
- selected feature surfaces: 16–20px;
- large figures may use 0–16px depending on composition;
- avoid universal `rounded-3xl` treatment;
- thin 1px neutral rules preferred to shadows.

### 7.3 Shadows

Most content should have no shadow.

Shadows are reserved for:

- floating navigation;
- device screenshots;
- modal/lightbox layers;
- rare elevated interactive surfaces.

## 8. Navigation

Desktop navigation becomes visually quiet and architectural.

- compact R26/DS/012 wordmark rather than an emoji/brain-style logo;
- floating or inset neutral navigation surface;
- no colourful logo tile;
- active state indicated through typography / fine rule / subtle shared motion;
- repository link visually secondary;
- primary navigation reduced to the most important destinations.

Proposed desktop items:

`Research  Components  Methodology  Results  Team  Publications`

Documents and Contact can sit in a utility menu / footer if this produces cleaner navigation.

Mobile uses a premium full-height sheet with large typography, not a small accordion dropdown.

## 9. Homepage — Revised Composition

The homepage should feel like a research launch story, not a landing-page template.

### 9.1 Hero

No full-screen dark stock brain image.

Preferred composition:

- off-white background;
- restrained project code / SLIIT metadata line;
- very large left-aligned editorial title;
- one Instrument Serif accent phrase at most;
- concise one- or two-sentence research thesis;
- two simple text/button CTAs;
- right or lower half occupied by a bespoke multimodal scientific graphic derived from the actual architecture.

Example visual hierarchy:

```text
R26 / DS / 012                         SLIIT · 2026

A multimodal digital
biomarker framework for
understanding anxiety
vulnerability.

Personalized physiological forecasting, behavioural
research, clinical NLP, and evidence-aware fusion.

Explore the research  →      Read methodology

                     [custom multimodal signal figure]
```

The hero visual should feel like a graphical abstract: fine lines, waveform traces, graph nodes, clinical-text fragments, and a central weighted fusion field. No cartoon brain icon.

### 9.2 Research thesis strip

A full-width typographic statement explaining why multimodal evidence is necessary. No cards.

### 9.3 Four-component narrative

Use four large alternating editorial sections rather than four equal cards.

Each section contains:

- large component number;
- concise title;
- one strong visual;
- research question;
- method summary;
- one or two validated metrics/status facts;
- link to full details.

### 9.4 Evidence section

A clean data editorial layout inspired by scientific figures:

- large metric;
- small source/context label;
- confidence interval where available;
- deployment / validation status;
- short interpretation.

No fake dashboard gauge graphics.

### 9.5 Research integrity section

A high-quality editorial section on leakage control, reliability gating, negative findings, and abstention. This distinguishes the project from ordinary student portfolios.

### 9.6 Team preview

One horizontal editorial team composition with real photos, not four identical profile cards.

## 10. Components Page

The current expandable-card interface will be replaced.

Use a research monograph structure:

- sticky component index on desktop;
- four vertically separated chapters;
- large figure at the beginning of each chapter;
- concise objective and research gap;
- architecture flow;
- datasets and validation design;
- results;
- limitations / current status;
- technologies as compact metadata rather than colourful chips.

Component identity:

- C1: waveform / wearable signal visual language;
- C2: temporal graph / missingness / validation visual language;
- C3: clinical text / embedding / prototype visual language;
- C4: weighted fusion / evidence provenance visual language.

## 11. Methodology Page

Designed like an interactive scientific methods paper.

Use a central vertical pipeline with chapter-style sections:

`Acquisition → Cleaning → Modality modelling → Leakage-aware evaluation → Reliability gating → Fusion → Evidence retrieval`

On desktop, the pipeline indicator may remain sticky while detailed content scrolls.

Animations draw or activate only the currently discussed stage.

No milestone-card timeline styling.

## 12. Results Page

The Results page should be the strongest proof of research maturity.

Visual style:

- restrained charts;
- tables with generous spacing;
- confidence intervals;
- baseline comparisons;
- negative findings presented clearly;
- deployment decisions connected directly to evidence.

Examples:

- C2 AUROC `0.5205`, 95% CI `0.485–0.560`, p=`0.255`, fusion base weight `0.0`;
- TC-WPN clean five-seed benchmark approximately `0.7377 ± 0.0031` AUROC;
- C4 eligibility / reliability logic and engineering validation separated from clinical validation.

Charts should look like publication figures, not SaaS analytics widgets.

## 13. Team Page

The Team page should feel like an editorial lab page.

Recommended layout:

- opening group / institution statement;
- large asymmetric member portraits;
- member name and role in large typography;
- technical focus in concise prose;
- student ID and component as small mono metadata;
- supervisors presented in a restrained institutional section.

Avoid colourful focus-tag clouds.

## 14. Publications / Documents

These pages should resemble a research library.

Use:

- document title;
- type;
- year/status;
- authors;
- concise abstract/description;
- clear download/open action;
- citation-style metadata.

Avoid generic download cards with oversized icons.

## 15. Contact

Minimal, credible, and institutional.

- research group contact information;
- SLIIT affiliation;
- repository link;
- simple contact form only if it has a real submission path;
- no oversized stock hero image.

## 16. Scientific Source-of-Truth

`R26-DS-012/main` is authoritative for research content.

Current mapping:

- **C1:** wearable physiological sensing, self-supervised anomaly detection, short-horizon forecasting;
- **C2:** final GLOBEM spatio-temporal behavioural graph study with leakage-free evaluation;
- **C3:** clinical NLP / TC-WPN with patient-disjoint few-shot evaluation;
- **C4:** contextual modelling + reliability-weighted fusion + CARE-AnxRAG.

Outdated claims must be removed or explicitly marked historical, including:

- StudentLife as final C2 evidence;
- validated C2 high-risk windows / phenotypes;
- active C2 fusion contribution;
- KNN/NHANES intervention engine as current C4 architecture;
- archived/inflated TC-WPN results;
- unsupported clinical-validation language.

## 17. Data Architecture

Centralize repeated research content in `src/data/research.js` or a small set of domain-focused data modules.

Store:

- project metadata;
- component metadata;
- datasets;
- validated metrics;
- team mappings;
- methodology stages;
- publications/documents metadata;
- safety / validation status.

Pages consume the shared data rather than duplicating facts.

## 18. Component Architecture

Reusable primitives should be fewer and more purposeful than the original proposal.

Suggested structure:

```text
src/
├── components/
│   ├── layout/
│   │   ├── PageShell.jsx
│   │   ├── Section.jsx
│   │   └── EditorialGrid.jsx
│   ├── motion/
│   │   ├── Reveal.jsx
│   │   ├── TextReveal.jsx
│   │   └── RouteTransition.jsx
│   ├── research/
│   │   ├── MultimodalFigure.jsx
│   │   ├── PhysiologicalFigure.jsx
│   │   ├── BehavioralGraphFigure.jsx
│   │   ├── TCWPNFigure.jsx
│   │   ├── FusionFigure.jsx
│   │   └── MetricFigure.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── FigureCaption.jsx
│       └── SectionLabel.jsx
├── data/
│   └── research.js
└── pages/
```

Do not create dozens of one-purpose visual-effect components.

## 19. Accessibility

Required:

- `prefers-reduced-motion` support;
- keyboard navigation;
- visible focus styles;
- semantic headings;
- contrast-safe palette;
- descriptive alt text;
- static equivalents for animated research diagrams;
- no information conveyed solely by colour or motion;
- large touch targets on mobile.

## 20. Performance

Premium quality includes speed.

- Framer Motion remains sufficient; no Three.js unless an actual requirement emerges;
- no autoplay hero video;
- lazy-load non-critical images;
- responsive image sources;
- SVG/Canvas diagrams kept lightweight;
- permanent animations limited to a small number of elements;
- animation primarily uses transform/opacity;
- mobile gets reduced complexity;
- production bundle verified with `npm run build`.

## 21. Responsive Design

Desktop is not simply scaled down.

**Desktop:** full editorial grid, rich diagrams, sticky methods/results navigation.

**Tablet:** simplified grids and diagrams, preserved hierarchy.

**Mobile:** single-column editorial story, simplified static/low-motion diagrams, large type, no pointer-only interactions.

## 22. Verification

Before PR completion:

1. `npm ci`;
2. `npm run build`;
3. verify all routes;
4. verify Results route;
5. verify desktop/tablet/mobile layouts;
6. verify reduced-motion behavior;
7. verify navigation and keyboard focus;
8. verify external images cannot collapse layouts;
9. verify outdated StudentLife / KNN-C4 claims are removed as current claims;
10. verify all displayed result values against current `R26-DS-012/main`;
11. verify no runtime-breaking console errors in representative interactions;
12. verify `.github/workflows/sync-to-main-repo.yml` is not unintentionally changed.

## 23. Git / Delivery Workflow

Implementation remains on:

`feature/premium-research-website-redesign`

Flow:

```text
anxiety_research_website/main
        ↓
feature/premium-research-website-redesign
        ↓
implementation + validation
        ↓
PR to anxiety_research_website/main
        ↓
human review / merge
        ↓
existing sync workflow
        ↓
R26-DS-012/mirror/research-website/main
        ↓
automatic PR to R26-DS-012/main
```

No direct redesign edits will be made to `R26-DS-012`.

## 24. Definition of Done

The redesign is complete only if:

- the site no longer reads visually as a generic student project or template;
- typography is deliberate and consistent;
- generic stock imagery is no longer the primary visual language;
- custom research figures carry the visual identity;
- motion is restrained, smooth, and research-specific;
- major pages use an editorial composition rather than repeated card grids;
- current scientific content replaces stale architecture and metrics;
- the Results page presents evidence with publication-like clarity;
- real team imagery is treated consistently;
- responsive and reduced-motion behavior are intentional;
- the production build passes;
- the implementation PR is opened for human review and not auto-merged.
