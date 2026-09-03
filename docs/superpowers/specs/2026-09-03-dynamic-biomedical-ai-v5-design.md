# Dynamic Biomedical AI V5 — Design Specification

**Date:** 2026-09-03  
**Repository:** `dulhara79/anxiety_research_website`  
**Branch:** `feature/premium-research-website-redesign`  
**Pull request:** #3  
**Research source of truth:** `dulhara79/R26-DS-012/main`  
**Status:** Approved design direction; implementation pending plan review

---

## 1. Objective

Transform the current clean but visually plain research website into a modern, immersive biomedical AI experience with substantially richer color, purposeful animation, route/scroll transitions, stronger visual depth, and multiple research-specific figures.

The site should feel:

- premium;
- modern;
- dynamic;
- technically credible;
- visually memorable;
- research-led rather than marketing-led.

The goal is not minimalism. The goal is controlled visual richness.

---

## 2. Design Position

### 2.1 Direction

**V5 — Dynamic Biomedical AI**

This direction deliberately moves beyond V4/V4.1 restraint.

It combines:

- modern biomedical AI product design;
- research-publication clarity;
- cinematic dark/light chapter contrast;
- interactive scientific visualization;
- contemporary motion design.

### 2.2 What V5 is not

It must not become:

- a student portfolio;
- a generic SaaS landing page;
- a neon cyberpunk AI website;
- a collection of glass cards;
- a particle-effects showcase;
- a marketing dashboard;
- a stock-healthcare website.

---

## 3. Verified Starting Point

The existing branch already has:

- React + Vite;
- HashRouter routes;
- Framer Motion installed;
- centralized `src/data/research.js`;
- `scripts/validate-content.mjs`;
- `ResearchPlate.jsx`;
- Home, Components, Results, Methodology, Team, Publications, Documents, Contact pages;
- Inter Tight + IBM Plex Mono;
- correct current C2/C3/C4 scientific story.

The current site is visually underpowered because:

- Home relies on large text, one static SVG, flat research rows, evidence rows, and one dark safety section;
- System uses the same generic placeholder mini-figure for all four components;
- Evidence is primarily a flat table;
- there is almost no route/scroll animation;
- color is limited to a single research blue and grayscale interface.

V5 replaces that visual layer without weakening scientific accuracy.

---

## 4. Color System

### 4.1 Core palette

- Deep Navy: `#081426`
- Midnight: `#0E1A2B`
- Warm White: `#F8FAFC`
- Canvas: `#F5F7FB`
- Surface: `#FFFFFF`
- Ink: `#0F172A`
- Secondary Ink: `#64748B`
- Rule: `#D8E0EA`
- Indigo: `#5856E8`
- Electric Blue: `#3B82F6`
- Cyan: `#22C7E8`
- Teal: `#16A69A`
- Coral: `#EF6C78`

### 4.2 Component visual language

- C1 Physiology: teal + cyan
- C2 Behaviour: electric blue + cyan
- C3 Clinical NLP: coral + indigo
- C4 Fusion/RAG: indigo + electric blue with small teal/coral inputs

Component colors belong mainly to scientific visuals and data accents, not full-page decorative branding.

### 4.3 Atmospheric color

Use large, soft, low-opacity radial/aurora fields only in high-impact zones:

- hero;
- C4 dark section;
- selected architecture moments.

No full-site rainbow gradient.

---

## 5. Typography

Keep:

- `Inter Tight` for display, interface, navigation, body;
- `IBM Plex Mono` for project IDs, datasets, evidence labels, annotations.

Do not add a third font family.

Hero title:

```css
font-size: clamp(3.8rem, 7vw, 7.2rem);
line-height: .9;
letter-spacing: -.055em;
```

Internal pages remain slightly smaller and more editorial.

---

## 6. Homepage Architecture

The current flat sequence is replaced by a visually distinct journey.

### 6.1 Chapter sequence

1. Hero — animated biomedical AI visual
2. Research Problem — large editorial statement + subtle signal field
3. System Architecture — animated C1/C2/C3/C4 framework
4. C1 Physiology — waveform/forecast visual
5. C2 Behaviour — temporal graph visual
6. C3 Clinical NLP — embedding/prototype visual
7. C4 Fusion — full-width dark cinematic section
8. Evidence — visual metrics/CI/comparison
9. Research Framework — real project framework asset where appropriate
10. Technology — controlled modern stack strip
11. Research Safety / People bridge
12. Footer

Each chapter must feel compositionally distinct.

---

## 7. Hero

### 7.1 Layout

Use a 6.5/5.5 split on desktop.

Left:

- project metadata;
- large research thesis;
- concise supporting copy;
- two calls to action.

Right:

A dense but controlled interactive scientific composition.

### 7.2 Hero visual

Upgrade `ResearchPlate.jsx` into a more immersive composition with:

- ECG/respiration waveform;
- behavioural temporal graph nodes;
- clinical text/embedding clusters;
- eligible evidence paths;
- central reliability-aware fusion structure;
- evidence/provenance output.

C2 must not visually enter active fusion.

### 7.3 Hero atmosphere

Behind/around the figure:

- deep navy/indigo/cyan glow fields;
- subtle grain/noise texture;
- soft layered depth;
- optional very light grid/technical texture.

No floating blur balls or random particles.

### 7.4 Floating annotations

One or two selective glass research annotations are allowed, e.g.:

```text
C3 / TC-WPN
AUROC ≈ 0.738
```

or

```text
C2
ACTIVE FUSION WEIGHT 0.0
```

These must look like data annotations, not decorative floating badges.

---

## 8. Motion System

### 8.1 Route transitions

Each route change:

- old page opacity `1 → 0`;
- old page y `0 → -8px`;
- new page opacity `0 → 1`;
- new page y `12px → 0`;
- duration 300–400ms;
- no bounce.

### 8.2 Major section reveals

Major sections:

- opacity `0 → 1`;
- y `28px → 0`;
- scale `0.985 → 1`;
- duration 550–700ms;
- restrained child stagger.

Do not animate every paragraph.

### 8.3 SVG scientific motion

Use Framer Motion/SVG path drawing for:

- C1 waveform draw and forecast band reveal;
- C2 temporal-node/edge construction;
- C3 embedding/prototype formation;
- C4 eligible-signal flow and evidence retrieval;
- hero data paths.

### 8.4 Ambient hero loop

After entrance animation, run one slow 12–15 second loop:

- ECG trace moves gently;
- limited graph nodes breathe;
- eligible data path illuminates toward fusion;
- evidence node pulses subtly;
- background aurora shifts slightly.

No rapid or continuous decorative movement.

### 8.5 Micro-interactions

- navigation underline motion;
- link arrows move 3–5px;
- underline expansion;
- selected panels move 2–3px maximum;
- chart annotations fade/reveal on hover/focus;
- component visual nodes respond subtly to hover where meaningful.

### 8.6 Reduced motion

`prefers-reduced-motion` must:

- disable path loops;
- remove translations/scaling;
- keep all data meaning visible statically;
- retain simple opacity changes at most.

---

## 9. System Architecture Visual

Create a real animated architecture visual.

Structure:

```text
C1 PHYSIOLOGY ─────────────┐
                          │
C2 BEHAVIOUR ── EXCLUDED  │
                          ├→ RELIABILITY WEIGHTING → FUSION → CARE-AnxRAG
C3 CLINICAL NLP ──────────│
                          │
CONTEXT / PRIOR ──────────┘
```

C2 must visibly terminate before active fusion and show:

```text
ACTIVE FUSION WEIGHT 0.0
```

Animation must not imply otherwise.

---

## 10. C1 Visual

Use:

- ECG waveform;
- respiration trace;
- feature window;
- anomaly region;
- short-horizon forecast band.

Animation:

1. trace draws;
2. feature window highlights;
3. forecast region appears.

Use teal/cyan accents.

---

## 11. C2 Visual

Use a temporal behavioural graph:

- morning;
- afternoon;
- evening;
- night;
- across multiple days;
- within-day and across-day edges;
- missingness marks.

Animation:

1. nodes appear;
2. edges connect;
3. held-out evidence appears;
4. active fusion path remains disabled.

Use blue/cyan accents.

---

## 12. C3 Visual

Use an abstract clinical NLP flow:

- note/text blocks;
- embeddings;
- support points;
- class prototypes;
- query point;
- prototype-consistency weighting.

Do not fabricate patient records.

Animation:

1. text blocks enter;
2. embedding points form;
3. prototypes emerge;
4. query resolves.

Use coral + indigo.

---

## 13. C4 Cinematic Section

C4 is the strongest visual moment of the site.

### 13.1 Background

Deep navy / midnight full-width section.

### 13.2 Composition

Large title and an animated reliability/fusion architecture.

Input paths:

- C1 eligible;
- C2 excluded;
- C3 eligible;
- context/prior;
- reliability/recency/informativeness weighting;
- fused decision state;
- CARE-AnxRAG evidence retrieval/provenance.

### 13.3 Visual style

Use:

- white typography;
- indigo/electric-blue main flow;
- teal/coral modality accents;
- soft glow only on active data paths;
- subtle grid/noise background.

No neon dashboard aesthetic.

---

## 14. Evidence Page

The Evidence route remains scientifically rigorous but becomes much more visual.

### 14.1 Keep the evidence table

The table remains for precision and accessibility.

### 14.2 Add visual evidence modules

Examples:

#### C2 held-out performance

- AUROC `0.5205`;
- CI `0.485–0.560`;
- null mean `0.4991`;
- p-value `0.255`;
- animated CI line;
- explicit interpretation.

#### C2 fusion gate

Large:

```text
ACTIVE FUSION WEIGHT
0.0
```

with disabled fusion path graphic.

#### C3

Large AUROC context:

```text
≈ 0.738
```

with benchmark/evaluation note.

No gauges, donuts, speedometers, or fake live analytics.

---

## 15. System Page

Remove the current generic repeated three-circle placeholder figures.

Each component gets its actual research-specific visual from Sections 10–13.

Layout can alternate:

- text left / visual right;
- visual left / text right;
- dark full-width C4.

Add restrained sticky section navigation on desktop if it improves orientation.

---

## 16. Methodology Page

Keep the pipeline readable but add motion-assisted diagrams.

Use:

- sticky stage rail on desktop;
- animated stage connector;
- relevant scientific visual snippets;
- subtle stage reveal.

Do not turn methodology into a timeline of cards.

---

## 17. Real Research Assets

The website repository itself may not currently contain all needed images, but the main `R26-DS-012` repository contains at least a real project framework image (`full.png`).

Before adding external imagery, audit `R26-DS-012/main` for:

- framework images;
- result plots;
- architecture diagrams;
- hardware images;
- mobile/clinician screenshots;
- other project-generated visuals.

Rules:

- real project assets are preferred over AI or stock;
- copy an asset into the website repo only when its scientific meaning is clear and it is appropriate for public display;
- no fake screenshots;
- no generic stock healthcare images;
- no fake team portraits.

If real assets are unavailable for a section, use bespoke SVG/React scientific visuals.

---

## 18. Technology Section

Use a modern editorial technology strip with controlled typography and optional official marks if assets are safely available.

Current likely technologies include:

- PyTorch;
- Hugging Face;
- FastAPI;
- Flutter;
- Supabase;
- PyTorch Geometric;
- ClinicalBERT;
- ESP32.

No oversized logo cards.

---

## 19. Navigation

Keep the simplified route architecture.

Primary:

- Research
- System
- Evidence
- Methodology
- Publications
- People

Secondary:

- Documents
- Contact
- Repository

Enhance with:

- animated underline;
- subtle translucent/sticky header treatment;
- background blur only in navigation, not universal glass;
- mobile overlay transition.

---

## 20. UI Components

V5 may introduce modern UI elements selectively:

- glass research annotation panels;
- colored gradient-accent panels;
- animated data cards for evidence only;
- device/image frames;
- sticky section navigation;
- interactive scientific figures;
- metric callouts;
- hover/focus data annotations.

Do not build the entire site from rounded cards.

---

## 21. Shape, Shadow, and Depth

Use more depth than V4.

Allowed:

- 12–18px radius for visual/media panels;
- soft layered shadows for true raised surfaces;
- inset/highlight borders;
- controlled glow on active scientific paths;
- blur on navigation/annotation overlays.

Not allowed:

- every section in a card;
- heavy shadows on text content;
- large floating SaaS feature cards.

---

## 22. Page Background Rhythm

Suggested homepage sequence:

- Hero: warm white + aurora
- Research Problem: white
- Architecture: pale blue/indigo
- C1: warm neutral
- C2: cool blue-grey
- C3: white with coral/indigo visual accents
- C4: deep navy
- Evidence: pale cool neutral
- Framework asset: white
- Technology: soft indigo-neutral
- Safety/People bridge: white
- Footer: deep navy

Transitions between chapters should feel deliberate rather than abrupt.

---

## 23. Performance

- no Three.js;
- no canvas particle engine;
- Framer Motion + SVG + CSS only;
- avoid huge raster backgrounds;
- compress copied real images;
- lazy-load below-the-fold raster assets;
- SVG figures must remain lightweight;
- prevent layout shifts with explicit image aspect ratios.

---

## 24. Accessibility

- semantic landmarks/headings;
- keyboard-operable navigation and interactive figures;
- visible focus states;
- meaningful SVG `aria-label` or captions;
- data never communicated through color alone;
- sufficient contrast in dark C4 section;
- reduced-motion behavior;
- mobile layouts from 320px upward.

---

## 25. Scientific Guardrails

The redesign must continue enforcing:

- C2 final GLOBEM story;
- C2 AUROC `0.5205`;
- C2 CI `0.485–0.560`;
- C2 null mean `0.4991`;
- C2 p-value `0.255`;
- C2 active fusion weight `0.0`;
- TC-WPN current C3 story;
- CARE-AnxRAG + reliability-weighted fusion current C4 story;
- research-use-only / not diagnostic framing.

No animation may imply unsupported clinical validation.

---

## 26. Validation Rules

`npm run validate` must continue rejecting:

- `images.unsplash.com`;
- `pexels.com`;
- Plus Jakarta Sans;
- Outfit;
- JetBrains Mono;
- obsolete StudentLife-as-final claims;
- KNN BallTree / Adaptive Intervention Engine as current C4;
- reintroduced old particle/glow utility names where they represent deprecated template styling.

Required current anchors remain:

- `GLOBEM`;
- `TC-WPN`;
- `CARE-AnxRAG`;
- `0.5205`;
- `Active fusion weight 0.0` or equivalent canonical wording.

---

## 27. Engineering Structure

Preserve the existing compact architecture and add only focused reusable components.

Likely additions:

```text
src/components/
  MotionReveal.jsx
  PageTransition.jsx
  ArchitectureVisual.jsx
  ComponentVisual.jsx
  EvidenceVisual.jsx
  TechnologyStrip.jsx
```

Upgrade rather than replace:

```text
src/components/ResearchPlate.jsx
```

Modify:

```text
src/pages/Home.jsx
src/pages/Components.jsx
src/pages/Results.jsx
src/pages/Methodology.jsx
src/components/Navbar.jsx
src/components/Footer.jsx
src/index.css
src/App.jsx
```

No `/research` route is required.

---

## 28. Acceptance Criteria

V5 is complete when:

1. the site no longer feels plain or documentation-like;
2. the homepage contains multiple visually distinct research chapters;
3. the hero has rich color, layered depth, and meaningful scientific animation;
4. route transitions are polished and restrained;
5. major scroll sections animate into view;
6. C1/C2/C3/C4 each has a unique research-specific visual;
7. the C4 section is a strong dark cinematic centerpiece;
8. Evidence includes visual CI/performance/fusion-gate presentations as well as the accessible evidence table;
9. generic repeated placeholder visuals are removed;
10. real R26-DS-012 assets are used where appropriate and verified;
11. no stock medical imagery is introduced;
12. the existing research claims remain correct;
13. reduced-motion users retain the full scientific meaning;
14. `npm run validate` passes;
15. `npm run build` passes;
16. GitHub PR #3 validation is green before merge.
