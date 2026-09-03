# Immersive Scientific Editorial V4.1 — Design Specification

**Date:** 2026-09-03  
**Repository:** `dulhara79/anxiety_research_website`  
**Branch:** `feature/premium-research-website-redesign`  
**Pull request:** #3  
**Research source of truth:** `dulhara79/R26-DS-012/main`  
**Status:** Approved direction; implementation pending written-spec review

---

## 1. Objective

Evolve the V4 Clinical Research Systems redesign into a more visually rich, memorable, and modern biomedical AI research website without returning to the original student-portfolio/SaaS aesthetic.

The final experience should feel:

- premium;
- contemporary;
- research-led;
- visually immersive;
- technically credible;
- calm rather than sterile;
- animated rather than noisy.

The website should have enough color, imagery, motion, and section variation to sustain attention across a long research narrative, while preserving scientific seriousness.

---

## 2. Design Position

### 2.1 Direction

**V4.1 — Immersive Scientific Editorial**

The target is the midpoint between:

- V4's institutional restraint; and
- the visual richness seen in modern research/product sites such as BetelCare.

It must not become:

- a student portfolio;
- a generic health-tech landing page;
- a neon AI concept site;
- a card catalogue;
- a motion showcase;
- a marketing-first SaaS page.

### 2.2 Visual ratio

Approximate balance:

- **65–70% sophisticated neutral foundation**
- **30–35% controlled color, imagery, and motion**

Color and motion must have a clear purpose: communicate research streams, evidence, hierarchy, depth, or interaction.

---

## 3. Typography

Keep the disciplined two-family system from V4:

- `Inter Tight` — headings, navigation, body, UI;
- `IBM Plex Mono` — data labels, project IDs, datasets, evidence annotations, technical metadata.

Do not reintroduce decorative serif typography.

Recommended hierarchy:

- homepage hero: `clamp(3.6rem, 6.6vw, 6.6rem)`;
- page title: `clamp(2.8rem, 5vw, 5rem)`;
- section title: `clamp(2rem, 3.5vw, 3.5rem)`;
- lead: 20–24px;
- body: 16–18px;
- mono metadata: 11–12px.

Use 500–700 weights primarily. Avoid repeated 800-weight headings.

---

## 4. Color System

The interface stays mostly neutral, but color becomes more visible and intentional.

### 4.1 Core palette

- Canvas: `#F7F8FA`
- Surface: `#FFFFFF`
- Ink: `#101828`
- Secondary ink: `#5E6673`
- Rule: `#D9DEE7`
- Navy: `#132A4A`
- Deep navy: `#0E1A2B`
- Research indigo: `#4658D9`
- Physiology teal: `#16A6A0`
- Clinical coral: `#DB6B68`
- Evidence cyan: `#4A9CC7`

### 4.2 Usage rules

Color belongs primarily to:

- scientific figures;
- signal traces;
- component diagrams;
- evidence charts;
- major section backgrounds;
- one or two high-impact visual moments.

Do not color every heading, card, pill, or control.

Suggested scientific identities:

- C1 — teal signal language;
- C2 — cyan/blue temporal graph language;
- C3 — coral/indigo embedding language;
- C4 — indigo/cyan fusion and evidence language.

These accents should not become large decorative component themes.

---

## 5. Section Rhythm

A long research site should not use one background and one composition repeatedly.

Recommended homepage sequence:

1. Hero — warm/light neutral
2. Research thesis — white
3. System architecture — pale blue-grey
4. C1 — light neutral
5. C2 — cool blue-grey
6. C3 — white
7. C4 — deep navy feature section
8. Evidence — light neutral
9. ClinAnx — pale indigo/blue
10. Technology — white
11. People — light neutral
12. Footer — deep navy

Background changes must be subtle and chapter-like, not rainbow bands.

---

## 6. Hero

The V4 hero is too austere. V4.1 should restore visual impact while staying research-specific.

### 6.1 Layout

Use an asymmetric 7/5 or 6.5/5.5 split.

Left:

```text
R26—DS—012 / SLIIT / 2026

MULTIMODAL ANXIETY RESEARCH

Understanding anxiety
vulnerability across
multiple timescales.

Physiological forecasting, behavioural evidence,
clinical NLP and reliability-aware multimodal fusion.

Explore research →     View evidence ↗
```

Right:

A large custom scientific hero composition derived from the actual system.

### 6.2 Hero artwork

The hero visual combines:

- subtle human/physiological geometry;
- ECG/respiration traces;
- temporal behavioral nodes;
- clinical text/embedding structures;
- multimodal fusion paths;
- evidence/provenance nodes.

Style:

- premium biomedical editorial art;
- off-white/light base;
- deep navy structures;
- controlled indigo and teal illumination;
- small coral accents;
- high negative space;
- realistic/scientific material treatment;
- no embedded fake text;
- no glowing brain;
- no cyberpunk;
- no holographic doctor;
- no generic AI sphere/cloud.

If a raster AI asset is unavailable during implementation, use a bespoke SVG/vector hero that follows the same art direction rather than returning to stock imagery.

---

## 7. Imagery Strategy

The site should contain approximately **8–12 meaningful visual assets** across the full experience.

Priority order:

1. real research result plots;
2. real framework/architecture diagrams;
3. real wearable/device imagery;
4. real ClinAnx screenshots;
5. real team portraits;
6. AI-generated or bespoke scientific editorial illustrations;
7. technology marks/logos.

Stock medical photography remains prohibited.

### 7.1 Homepage visual moments

Target:

- hero scientific artwork;
- system architecture;
- C1 signal/forecast visual;
- C2 temporal graph visual;
- C3 TC-WPN/prototype visual;
- C4 fusion/RAG visual;
- ClinAnx screenshot/device composition;
- wearable or real project hardware image where available.

---

## 8. Motion System

Motion returns, but under a strict hierarchy.

### 8.1 Interaction motion

- hover/focus: 150–200ms;
- link arrow movement: 3–5px;
- underline expansion: 150–180ms;
- mobile navigation: 180–220ms.

### 8.2 Page transitions

Subtle route entrance:

- opacity `0 → 1`;
- translateY `8px → 0`;
- duration ~350ms;
- no bounce.

### 8.3 Section entrances

Only major visual sections:

- opacity `0 → 1`;
- translateY `16–20px → 0`;
- duration 500–650ms;
- restrained stagger for connected items.

Do not animate every paragraph or list item.

### 8.4 Scientific figure motion

Use motion to explain methodology:

- C1: waveform draw → feature window → forecast reveal;
- C2: nodes appear → temporal edges connect → evaluation mark appears;
- C3: support embeddings → prototype formation → query position;
- C4: eligible modalities → reliability weights → fusion → evidence retrieval.

Duration target: 700–1200ms for explanatory sequences.

### 8.5 Hero ambient loop

One slow scientific loop may run over ~10–15 seconds:

- signal traces drift slightly;
- a small number of nodes pulse subtly;
- one data path flows toward fusion;
- illumination changes very gently.

No floating blobs, random particles, bouncing elements, or continuous decorative rotation.

### 8.6 Reduced motion

All nonessential movement must stop or simplify under `prefers-reduced-motion`.

---

## 9. System Architecture

The architecture section should be a visual centerpiece rather than a plain text sequence.

It must clearly distinguish:

- C1 — wearable physiological forecasting;
- C2 — GLOBEM leakage-free behavioral graph evaluation;
- C3 — patient-disjoint clinical NLP / TC-WPN;
- C4 — contextual modelling + reliability-weighted fusion + CARE-AnxRAG.

C2 must visibly show:

```text
ACTIVE FUSION WEIGHT: 0.0
```

The architecture animation may reveal data flow, but it must not imply C2 is active in fusion.

---

## 10. Component Sections

Do not return to equal feature cards.

Each component receives a distinct editorial visual composition.

### C1

- wide signal figure;
- teal scientific accents;
- ECG/respiration/forecast language;
- real hardware image if available.

### C2

- temporal day/segment graph visual;
- blue/cyan nodes and edges;
- visible leakage-free evaluation status;
- visual distinction between exploratory behavior signal and active fusion eligibility.

### C3

- clinical text snippets represented abstractly, not as fake patient records;
- embedding/prototype geometry;
- coral + indigo accents;
- few-shot logic made visually understandable.

### C4

This is the strongest visual chapter.

Use a deep navy section with:

- white text;
- indigo/cyan/teal/coral evidence lines;
- animated reliability weighting;
- multimodal fusion;
- CARE-AnxRAG evidence retrieval/provenance structure.

No glowing dashboard aesthetic.

---

## 11. Evidence

Evidence remains a first-class route and should become visually richer than V4.

Use:

- large metric typography;
- clean ROC/CI/comparison figures where supported;
- dataset labels;
- evaluation context;
- limitations;
- evidence status.

Do not present metrics as marketing KPI cards.

Required C2 evidence remains:

- AUROC `0.5205`;
- 95% participant-clustered CI `0.485–0.560`;
- null mean `0.4991`;
- empirical p-value `0.255`;
- active fusion weight `0.0`.

C3 retains deployment-relevant held-out AUROC approximately `0.738`.

---

## 12. ClinAnx Section

Add a visually prominent bridge between research and application.

Use real ClinAnx screenshots where available.

Suggested composition:

- large device/screenshot frame;
- short explanation of how evidence is surfaced;
- supporting labels for risk overview, note analysis, fusion evidence, and CARE-AnxRAG;
- subtle background tint;
- restrained entrance transition.

Do not use fake app mockups when real screenshots exist.

---

## 13. Technology Section

Technology logos are allowed, but must be editorial rather than card-based.

Examples:

- PyTorch
- Hugging Face
- FastAPI
- Flutter
- Supabase
- PyTorch Geometric
- ClinicalBERT
- ESP32

Use official marks in a quiet strip/grid with controlled size and spacing.

No giant logo tiles or colorful technology cards.

---

## 14. People

Use real portraits and stronger visual presence than V4.

- consistent portrait crop;
- no gradient overlays;
- no role badges over faces;
- no colored avatar initials;
- subtle image hover only if desired;
- name, role, stream, and profile link below/adjacent.

Supervisors and students should feel part of the same institutional system.

---

## 15. Navigation and Transitions

Keep V4's simplified institutional navigation, but improve tactile quality.

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

Interactions:

- active underline/ink shift;
- 150–180ms transitions;
- no active pill background;
- no gradient nav logo.

---

## 16. What Remains Prohibited

Do not reintroduce:

- generic Unsplash/Pexels imagery;
- glowing brains;
- cyberpunk medical imagery;
- animated gradient headlines;
- floating blur blobs;
- random particle backgrounds;
- glassmorphism as a general system;
- universal rounded cards;
- bouncy spring animations;
- card hover lift;
- endless decorative rotation;
- animated counters;
- icon boxes for every section;
- rainbow component theming;
- fake doctors/patients;
- motion on every paragraph.

---

## 17. Engineering Direction

Continue using the V4 shared structure and centralized research data.

Add/refine focused visual units such as:

```text
src/components/
  MotionReveal.jsx
  PageTransition.jsx
  HeroResearchVisual.jsx
  ArchitectureVisual.jsx
  ComponentVisual.jsx
  TechnologyStrip.jsx
  ClinAnxShowcase.jsx
```

Use Framer Motion only where the spec calls for motion.

Prefer bespoke SVG/React visuals for system diagrams and animated research figures.

Keep research claims in `src/data/research.js`.

---

## 18. Validation Rules

Build validation must continue rejecting:

- `images.unsplash.com`;
- `pexels.com`;
- obsolete StudentLife-as-final content;
- historical KNN BallTree / Adaptive Intervention Engine as current C4;
- reintroduced old gradient/glow/particle utility language.

Validation must continue requiring current research anchors:

- `GLOBEM`;
- `TC-WPN`;
- `CARE-AnxRAG`;
- C2 `0.5205`;
- active fusion weight `0.0`.

---

## 19. Accessibility and Performance

- semantic headings/landmarks;
- visible keyboard focus;
- sufficient contrast;
- `prefers-reduced-motion` support;
- lazy-load heavy imagery where appropriate;
- avoid oversized uncompressed raster assets;
- preserve responsive layouts from 320px upward;
- preserve successful Vite production build.

---

## 20. Acceptance Criteria

V4.1 is complete when:

1. the website feels visually richer than V4 without returning to the old student/SaaS aesthetic;
2. the homepage contains multiple meaningful research visuals rather than one static plate;
3. section backgrounds create a deliberate visual journey;
4. one dark C4/fusion section provides a strong cinematic moment;
5. motion is present in page transitions, major entrances, and scientific diagrams but remains restrained;
6. color is visible and purposeful, primarily tied to research content;
7. real ClinAnx screenshots and real team imagery are used where available;
8. no generic stock medical imagery appears;
9. C2/C3/C4 content remains aligned with `R26-DS-012/main`;
10. GitHub PR validation (`npm ci` + `npm run build`) passes before merge.
