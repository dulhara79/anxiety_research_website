# R26-DS-012 Multimodal Signal Journey Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the existing React research website into a state-driven immersive scientific experience while preserving verified research claims, routes, accessibility, and static-host deployment.

**Architecture:** Keep HashRouter and the current React/Vite stack. Centralize research facts in `src/data/research.js`, layer a reusable experience system over procedural Canvas/SVG visualizations, and reuse the same structured data across the home atlas and secondary research pages.

**Tech Stack:** React 18, Vite 5, React Router 6, Framer Motion 11, react-intersection-observer, Lucide React, Tailwind/PostCSS, Canvas 2D, SVG, CSS.

**Spec:** `docs/superpowers/specs/2026-09-24-multimodal-signal-journey-design.md`

## Global Constraints

- Preserve `research-website/` as the application root and keep HashRouter deployment compatibility.
- Do not add Three.js, GSAP, WebGL frameworks, videos, Lottie, or other heavy animation dependencies.
- C2 must show AUROC `0.5205`, CI `0.485–0.560`, permutation null `0.4991`, p-value `0.255`, and active fusion weight `0.0` without implying predictive validation.
- C3 must show held-out AUROC `≈0.738` with patient-disjoint context.
- Never fabricate research, publication, deployment, clinical, or patient claims.
- Missing evidence is masked rather than mapped to zero risk; abstention remains first-class.
- Respect reduced motion, coarse pointers, keyboard navigation, semantic content, and native scrolling.

## Review Focus

- Direct route navigation and browser back/forward must continue to work under HashRouter.
- C4 lens activation must reach `/results` rather than becoming an inert final state.
- Canvas loops must not duplicate and must stop/restart when offscreen.
- Reduced-motion and coarse-pointer users must receive all information without tilt/preloader/cursor dependence.
- C2 must be visually stopped at the active validation gate everywhere fusion is depicted.

---

### Task 1: Scientific data and source contracts

**Files:**
- Modify: `research-website/src/data/research.js`
- Create: `research-website/scripts/experience-contract.test.mjs`
- Modify: `research-website/scripts/validate-content.mjs`

**Interfaces:**
- Produces: `project`, `components`, `componentByKey`, `researchStates`, `evidence`, `methodology`, `fusionEquation`, `safetyPrinciples`, `people`, `supervisors`, `navItems`.

- [x] Write Node tests that assert the state sequence, exact C2 values, C3 context, and safety principles.
- [x] Run `node --test scripts/experience-contract.test.mjs` and verify the legacy data shape fails the new contract.
- [x] Add the centralized structured data and validation rules.
- [x] Re-run the tests and content validator to green.

### Task 2: Immersive experience shell

**Files:**
- Create: `research-website/src/components/experience/ResearchExperience.jsx`
- Create: `research-website/src/components/experience/ResearchLens.jsx`
- Create: `research-website/src/components/experience/ResearchPreloader.jsx`
- Create: `research-website/src/components/experience/ResearchStateNav.jsx`
- Create: `research-website/src/components/experience/ResearchStateContent.jsx`
- Create: `research-website/src/components/experience/CustomCursor.jsx`

**Interfaces:**
- Consumes: `researchStates`, `componentByKey`.
- Produces: state navigation, lens activation, preloader, cursor labels, and C4→Evidence handoff.

- [x] Add source contract assertions for lens ARIA, reduced-motion behavior, and preserved routes; watch them fail before files exist.
- [x] Implement state transitions, direct selection, pointer tilt, preloader, and custom cursor without adding dependencies.
- [x] Make C4 lens activation navigate to `/results`.
- [x] Re-run source contracts.

### Task 3: Procedural scientific visuals

**Files:**
- Create: `research-website/src/components/experience/SignalCanvas.jsx`
- Create: `research-website/src/components/visualizations/SignalVisual.jsx`

**Interfaces:**
- Consumes: state/component keys.
- Produces: decorative Canvas fields and meaningful SVG diagrams.

- [x] Implement overview/C1/C2/C3/C4 Canvas renderers with capped DPR and viewport-aware animation.
- [x] Implement SVG physiology, behaviour, clinical NLP, fusion, architecture, and leakage-control diagrams.
- [x] Encode C2 as `data-gated="true"` with visible `WEIGHT → 0.0` and no active fused line.
- [x] Ensure C3 decorative text is explicitly synthetic.
- [x] Remove duplicate requestAnimationFrame scheduling and restore animation only when visible.

### Task 4: Route and motion shell

**Files:**
- Create: `research-website/src/components/motion/PageTransition.jsx`
- Create: `research-website/src/components/motion/MotionReveal.jsx`
- Modify: `research-website/src/App.jsx`
- Modify: `research-website/src/components/Navbar.jsx`
- Modify: `research-website/src/components/Footer.jsx`

**Interfaces:**
- Produces: lazy route rendering, route transitions, responsive navigation, secondary resources menu.

- [x] Preserve every existing HashRouter path.
- [x] Lazy-load secondary pages.
- [x] Add restrained route sweep/blur transition and scroll-aware navigation.
- [x] Keep documents, contact, research repository, and website repository discoverable.

### Task 5: Home scientific exhibition

**Files:**
- Modify: `research-website/src/pages/Home.jsx`

**Interfaces:**
- Consumes: shared component/evidence data and visualizations.
- Produces: thesis, vertical atlas, architecture, evidence preview, abstention section.

- [x] Place the full-screen ResearchExperience before editorial content.
- [x] Build non-card research streams with distinct visuals and C2 attenuation.
- [x] Animate architecture flow only conceptually; stop C2 at the validation gate.
- [x] Present evidence as records, not celebratory metrics.
- [x] Make research safety one of the strongest visual sections.

### Task 6: Research atlas, evidence, and methodology pages

**Files:**
- Modify: `research-website/src/pages/Components.jsx`
- Modify: `research-website/src/pages/Results.jsx`
- Modify: `research-website/src/pages/Methodology.jsx`

**Interfaces:**
- Consumes: centralized components/evidence/methodology/fusion equation.

- [x] Build a full research atlas with per-component visual language and limitations.
- [x] Build the evidence room and explicit C2 validation gate.
- [x] Show grouped leakage control without participant crossing.
- [x] Preserve and visually explain the reliability-weighted fusion equations.
- [x] Keep CARE-AnxRAG downstream of fusion and abstention explicit.

### Task 7: Academic records and supporting routes

**Files:**
- Modify: `research-website/src/pages/Publications.jsx`
- Modify: `research-website/src/pages/Team.jsx`
- Modify: `research-website/src/pages/Documents.jsx`
- Modify: `research-website/src/pages/Contact.jsx`

**Interfaces:**
- Consumes: project/people/supervisor data.

- [x] Present the manuscript as a research record without acceptance/indexing claims.
- [x] Render team identities typographically without fake portraits.
- [x] Preserve repository/document/contact access.

### Task 8: Visual system, metadata, responsive and accessibility pass

**Files:**
- Modify: `research-website/src/index.css`
- Modify: `research-website/tailwind.config.js`
- Modify: `research-website/index.html`
- Modify: `research-website/package.json`

**Interfaces:**
- Produces: dark immersive + warm-paper identity, responsive layouts, reduced-motion/coarse-pointer fallbacks, SEO metadata, build gates.

- [x] Implement the restrained modality palette, editorial typography, grain/grid/signal fields, focus states, and mobile layouts.
- [x] Add `@media (pointer: coarse)` and `@media (prefers-reduced-motion: reduce)` fallbacks.
- [x] Remove legacy Plus Jakarta Sans / Outfit / JetBrains Mono references.
- [x] Add research-specific title, description, OpenGraph, keywords, and canonical metadata.
- [x] Make `npm run build` execute the source contract tests and content validator before Vite.
- [x] Run `node --test scripts/experience-contract.test.mjs` and `node scripts/validate-content.mjs` successfully before publishing the branch.
