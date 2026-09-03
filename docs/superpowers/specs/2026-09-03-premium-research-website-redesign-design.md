# Premium Research Website Redesign — Design Specification

**Date:** 2026-09-03  
**Repository:** `dulhara79/anxiety_research_website`  
**Branch:** `feature/premium-research-website-redesign`  
**Research source of truth:** `dulhara79/R26-DS-012`  
**Status:** Approved design direction, pending implementation-plan approval

## 1. Objective

Redesign the existing research website into a premium, light-theme, motion-rich scientific experience that feels closer to a polished AI/health research product launch than a conventional university project template.

The redesign must improve both visual quality and scientific correctness. Existing website content that reflects superseded research directions must be replaced with the current architecture and results in `R26-DS-012`.

Primary goals:

- Create an immediate visual “wow” effect without sacrificing scientific credibility.
- Use smooth, intentional animation and motion rather than decorative effects with no information value.
- Present the research architecture and component relationships interactively.
- Centralize research facts so pages do not drift out of sync.
- Correct outdated component descriptions, datasets, metrics, and deployment claims.
- Preserve strong usability on desktop, tablet, and mobile.
- Keep performance, accessibility, and maintainability at production quality.

## 2. Design Direction

### 2.1 Visual language

The site will use premium scientific minimalism:

- warm clinical white / soft neutral canvas
- soft blue, cyan, teal, and lavender atmospheric gradients
- electric blue as the primary research signal
- teal for physiological content
- blue/cyan for behavioural research
- rose/coral for clinical NLP
- violet for multimodal fusion and RAG
- graphite / slate typography
- restrained glass surfaces and luminous borders
- large editorial typography with generous whitespace
- diagrams and data visualizations as primary visual assets

The design must not become a generic glassmorphism template. Glass, blur, glow, and gradient treatments must support hierarchy and depth rather than dominate every element.

### 2.2 Motion language

Motion will follow a single consistent system:

- page transitions: opacity + small vertical translation
- section reveals: opacity + blur + transform
- large headings: masked / staggered text reveal
- research architecture: line drawing, signal travel, scroll-linked transitions
- cards: subtle elevation, cursor spotlight, optional low-amplitude tilt
- buttons: spring hover, arrow travel, slight magnetic response on pointer devices
- images: mask reveal + low-amplitude parallax
- metrics: count-up, graph draw, confidence-interval reveal
- navigation: shared-layout active indicator
- backgrounds: extremely slow ambient gradient / orbital movement

Animations must use transforms and opacity where possible to minimize layout thrashing.

## 3. Information Architecture

The website remains multi-page because the research contains substantial technical depth and visitors need direct access to specific topics.

Primary navigation:

1. Home
2. Research
3. Components
4. Methodology
5. Results
6. Team
7. Publications
8. Documents
9. Contact

A new `Results` page will be added so validated outcomes, confidence intervals, limitations, deployment decisions, and component-level evidence have a dedicated home.

### 3.1 Home

The home page becomes the flagship experience.

Sections:

1. cinematic multimodal hero
2. concise research problem and motivation
3. animated multimodal architecture
4. four component story panels
5. evidence / validation highlights
6. reliability and abstention philosophy
7. end-to-end workflow / methodology preview
8. research team preview
9. documents/publications CTA
10. final research CTA

### 3.2 Research

A dedicated overview experience for:

- problem definition
- research gap
- objectives
- multimodal rationale
- intended users / research context
- safety and research-use boundaries

If introducing a separate `Research.jsx` page creates unnecessary navigation complexity, the same content may remain distributed between Home and Methodology, but the data layer and visual system must support this hierarchy.

### 3.3 Components

Four technically accurate component sections/cards:

- C1 — physiological / wearable forecasting
- C2 — spatio-temporal behavioural graph study
- C3 — clinical NLP / TC-WPN
- C4 — contextual modelling, reliability-weighted multimodal fusion, and CARE-AnxRAG

Each component should include:

- objective
- research gap
- methodology
- datasets
- architecture / flow
- metrics
- current evidence
- limitations
- deployment / fusion status where applicable
- technologies
- component lead

### 3.4 Methodology

The methodology page should use an animated stepwise research pipeline rather than static text-heavy blocks.

High-level flow:

`Data → Preprocessing → Modality Models → Leakage-Aware Validation → Reliability Gating → Fusion → Evidence Retrieval / Decision Support`

A sticky or progress-aware side navigation may be used on large screens.

### 3.5 Results

The Results page will explicitly separate:

- component-level validation
- held-out / external validation
- confidence intervals / permutation tests where available
- fusion eligibility decisions
- negative / non-significant findings
- engineering validation versus clinical validation

The site must not visually imply that software scenario tests are clinical validation.

### 3.6 Team

Use real team images already referenced by the project where stable and appropriate.

Correct component ownership and descriptions to the current architecture.

Cards should support:

- name
- student ID
- component role
- current technical focus
- short bio
- GitHub / relevant profile links if already present in existing source content

Supervisor information must remain prominent and accurate.

## 4. Scientific Source-of-Truth Rules

`R26-DS-012/main` is the scientific source of truth. The current website must not preserve outdated claims merely because they are already implemented.

### 4.1 Component mapping

The website must use this mapping:

- **C1:** Wearable physiological sensing, self-supervised anomaly detection, short-horizon forecasting.
- **C2:** Spatio-temporal behavioural graph learning using the final GLOBEM pipeline and leakage-free evaluation.
- **C3:** Clinical NLP / TC-WPN using patient-disjoint few-shot benchmark design.
- **C4:** Contextual modelling + reliability-weighted fusion + CARE-AnxRAG decision support.

### 4.2 Required corrections

Remove or clearly mark as historical any website claims that still present:

- StudentLife as the final C2 evaluation source
- validated high-risk behavioural windows or phenotypes from the old C2 pipeline
- active C2 contribution to fusion
- KNN/NHANES intervention engine as the current C4 architecture
- inflated or archived TC-WPN benchmark claims
- clinical-validation language unsupported by the current repository evidence

### 4.3 Current research facts to surface

Where supported by the current main repo, the redesign should surface facts such as:

- C2 held-out GATv2 AUROC around `0.5205`
- participant-clustered 95% CI around `0.485–0.560`
- permutation null around `0.4991`
- empirical p-value around `0.255`
- active C2 fusion base weight `0.0`
- clean TC-WPN five-seed benchmark around `0.7377 ± 0.0031` AUROC
- C4 reliability-weighted fusion using modality informativeness, recency, and reliability / coverage
- CARE-AnxRAG evidence-quality, contradiction, provenance, abstention, and safety-aware retrieval safeguards

Exact displayed values must be taken from current repository sources during implementation rather than copied from stale website code.

## 5. Data Architecture

Introduce a centralized research-data module, tentatively:

`src/data/research.js`

This module becomes the website content source for repeated facts such as:

- project metadata
- component definitions
- team ownership
- metrics
- datasets
- methodology summaries
- validation status
- tech stack
- supervisor information

Pages and visual components should render from this shared data where practical instead of duplicating values in multiple files.

This reduces the risk of component descriptions drifting out of sync across Home, Components, Methodology, Results, and Team.

## 6. Component Architecture

Introduce reusable visual and motion primitives rather than duplicating animation logic across pages.

Suggested structure:

```text
src/
├── components/
│   ├── motion/
│   │   ├── Reveal.jsx
│   │   ├── TextReveal.jsx
│   │   ├── ParallaxMedia.jsx
│   │   ├── MagneticButton.jsx
│   │   ├── SpotlightCard.jsx
│   │   ├── ScrollProgress.jsx
│   │   └── PageTransition.jsx
│   ├── visuals/
│   │   ├── MultimodalOrbital.jsx
│   │   ├── ECGSignal.jsx
│   │   ├── BehavioralGraph.jsx
│   │   ├── TCWPNVisualizer.jsx
│   │   └── FusionVisualizer.jsx
│   └── ui/
│       ├── SectionHeader.jsx
│       ├── MetricCard.jsx
│       ├── ResearchBadge.jsx
│       └── GlassPanel.jsx
├── data/
│   └── research.js
└── pages/
    ├── Home.jsx
    ├── Components.jsx
    ├── Methodology.jsx
    ├── Results.jsx
    ├── Team.jsx
    ├── Publications.jsx
    ├── Documents.jsx
    └── Contact.jsx
```

Names may be adjusted during implementation if the existing codebase suggests cleaner boundaries.

## 7. Homepage Hero

The hero must be visually distinctive and research-specific.

Concept:

- large project title / short research thesis
- lightweight animated multimodal network/orbital diagram
- four modality nodes around a fusion core
- signal particles / lines moving into fusion
- cursor-responsive low-amplitude depth effect on pointer devices
- very subtle scroll-linked separation as the user leaves the hero
- clear CTA to Components / Methodology / Results

No autoplay video background and no heavy WebGL by default.

## 8. Research Visualizations

### 8.1 C1

Use ECG / physiological waveform motifs, wearable sensor callouts, and forecast trajectory visualizations.

### 8.2 C2

Use a temporal graph visualization that accurately represents the final graph concept. It must not imply that C2 is a validated clinical predictor.

### 8.3 C3

Visualize the few-shot flow:

`Clinical Note → ClinicalBERT Embedding → Projection → Support Prototypes → Weighted Prototype Classification`

Use careful labels so prototype consistency is not misrepresented as calibrated confidence.

### 8.4 C4

Visualize multiple eligible modality scores entering a reliability-weighted fusion core, then producing Low / Medium / High or insufficient-evidence states, followed by evidence-aware retrieval.

The demographic/context prior must not be shown as independently producing a clinical tier.

## 9. Navigation

Desktop:

- floating glass navigation bar slightly inset from viewport edges
- shared-layout active indicator
- compact project mark / identity
- direct GitHub repository link
- optionally a primary CTA for research documents

Mobile:

- animated full-screen or large-sheet navigation
- large touch targets
- body scroll locking while open
- reduced animation complexity compared with desktop

## 10. Imagery Strategy

Avoid making the site a stock-photo collage.

Priority order:

1. real project figures / architecture imagery from the main repo where suitable
2. real team portraits already used by the project
3. custom SVG research diagrams
4. generated visual motifs / data visualizations implemented in code
5. carefully selected medical/scientific photography as supporting media only

Images must have descriptive alt text and responsive sizing.

## 11. Accessibility

Required:

- `prefers-reduced-motion` support
- keyboard navigation
- visible focus states
- semantic headings
- sufficient text/background contrast
- descriptive alt text
- non-motion-dependent communication of research meaning
- interactive cards/buttons operable without pointer hover
- no important information communicated by color alone

Motion-intensive sections must degrade gracefully when reduced motion is enabled.

## 12. Performance

Performance is part of the premium experience.

Requirements:

- continue using Framer Motion already installed unless another dependency has a clear measurable benefit
- avoid unnecessary Three.js / WebGL
- lazy-load non-critical images
- use responsive image dimensions where possible
- only animate elements when relevant / in viewport
- avoid permanent high-frequency animation on many DOM nodes
- use transform/opacity for animation where possible
- keep mobile effects simpler
- avoid large autoplay video assets
- run production `npm run build` before PR completion

## 13. Responsive Behaviour

The design must be deliberately adapted rather than merely shrunk.

Desktop:

- full architecture visualizations
- richer parallax and pointer effects
- sticky methodology navigation where useful

Tablet:

- reduced density and simplified grid arrangements
- maintain primary architecture motions

Mobile:

- stacked narrative
- simplified diagrams
- fewer simultaneous animations
- no pointer-dependent interaction requirements
- large readable typography and controls

## 14. Error / Fallback Handling

- External images should not break page layout if unavailable.
- Research diagrams implemented in SVG/React should be usable without remote media.
- Links to external documents/repositories should use safe external-link attributes.
- Components must have stable static fallback states if animation APIs are unavailable.

## 15. Testing and Verification

Minimum implementation verification:

1. `npm ci`
2. `npm run build`
3. verify all routes render
4. verify new Results route
5. verify mobile navigation
6. verify reduced-motion behaviour
7. verify no console-breaking runtime errors in representative interactions
8. verify no stale StudentLife/KNN-intervention claims remain as current architecture
9. verify component mappings against current `R26-DS-012/main`
10. verify all metric claims displayed on the site are sourced from current repository evidence
11. verify navigation / CTAs resolve correctly
12. verify source sync workflow files are not accidentally changed by redesign work

## 16. Git / Delivery Workflow

Implementation branch:

`feature/premium-research-website-redesign`

The redesign must remain isolated from `main` until review.

Delivery flow:

```text
anxiety_research_website/main
        ↓
feature/premium-research-website-redesign
        ↓
implementation + validation
        ↓
Pull Request to anxiety_research_website/main
        ↓
human review / merge
        ↓
existing cross-repository sync workflow
        ↓
R26-DS-012/mirror/research-website/main
        ↓
automatically created/updated PR to R26-DS-012/main
```

The redesign PR must not directly modify `R26-DS-012`.

## 17. Non-Goals

This redesign will not:

- turn the public research website into the clinician application
- expose patient or research-participant data
- add a production clinical prediction interface
- claim clinical validation where only benchmark or engineering validation exists
- use animations that materially damage accessibility or mobile performance
- auto-merge either repository PR

## 18. Definition of Done

The redesign is complete when:

- the website has a coherent premium light visual system
- all major pages use the new design system
- the homepage contains a high-impact multimodal animated research story
- research diagrams are interactive / motion-enhanced but understandable statically
- current research architecture and results replace stale content
- repeated project facts are centralized where practical
- Results is a first-class page
- reduced-motion and responsive behaviour are implemented
- production build passes
- changed files are reviewed for content accuracy and scope
- a PR is opened from `feature/premium-research-website-redesign` to `main`
- the PR is left for human review rather than auto-merged
