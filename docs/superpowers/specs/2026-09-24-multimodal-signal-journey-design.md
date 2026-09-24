# R26-DS-012 Multimodal Signal Journey — Design Specification

## Purpose

Transform the existing `research-website/` React application into an immersive scientific exhibition that communicates the research argument before a visitor reads every detail: heterogeneous signals are evaluated independently, evidence quality differs, weak or unavailable modalities can be withheld, and only eligible evidence contributes to reliability-aware decision support.

The experience must preserve scientific humility. It is not a diagnostic interface, a patient dashboard, or an AI marketing site.

## Binding scientific content

All research facts are centralized in `src/data/research.js`. The interface must preserve these verified claims:

- C1: wearable physiological forecasting; active research signal; no invented performance metric.
- C2: held-out AUROC `0.5205`, 95% participant-clustered CI `0.485–0.560`, permutation null `0.4991`, empirical p-value `0.255`, active fusion weight `0.0`. The held-out graph result is not presented as validated predictive evidence.
- C3: deployment-relevant held-out AUROC `≈0.738`, explicitly contextualized as a patient-disjoint few-shot benchmark.
- C4: reliability-weighted fusion followed by CARE-AnxRAG as an evidence-support layer, not as another prediction modality.
- Missing/unreliable evidence is masked, not interpreted as zero risk; the framework can return insufficient evidence.
- The framework is research and clinical decision support, not a diagnostic device.

## Interaction architecture

### Full-screen research experience

The home page starts with a state-driven research experience containing `overview`, `c1`, `c2`, `c3`, and `c4`. A central rounded research lens is a spatial observation window into procedural signal fields. Direct stage navigation and lens activation use the same transition model.

The lens uses pointer tilt only on fine-pointer devices and relaxes during transitions. On C4, lens activation navigates to `/results` so the journey ends in the evidence record rather than a dead-end interaction.

### Opening sequence

A short procedural preloader presents R26—DS—012, four distinguishable signal families, convergence toward a common lens, and a 00→100 counter. It is session-scoped and bypassed when reduced motion is requested.

### Procedural visual systems

- Overview: four distinct streams approach a common field without premature visual equivalence.
- C1: abstract PPG/EDA/interval/breathing-like temporal traces and moving observation windows. These are decorative simulations, never patient data.
- C2: temporal participant graph that becomes visually attenuated at a validation gate. `WEIGHT → 0.0` remains explicit.
- C3: synthetic text blocks transform into token/embedding/prototype space. No real clinical note content is displayed.
- C4: differentiated streams approach fusion; C2 visibly stops before active contribution; downstream evidence retrieval, contradiction checks, provenance, and abstention are separate.

Canvas animation uses `requestAnimationFrame`, caps DPR at 2, and pauses/restarts based on viewport visibility. Semantic SVG diagrams are paired with textual explanations.

## Page architecture

The existing HashRouter and routes remain unchanged:

- `/` — signal journey, thesis, research atlas, architecture, evidence preview, abstention statement.
- `/components` — long-form research atlas with a custom visual for every component.
- `/results` — scientific evidence room and explicit C2 validation gate.
- `/methodology` — research design, leakage control, reliability-weighted fusion equations, decision rule, CARE-AnxRAG, research safety.
- `/publications` — academic record without unverified acceptance/indexing claims.
- `/team` — typographic researcher/supervisor directory without fabricated portraits.
- `/documents` and `/contact` — project resources and contact context.

Route transitions use restrained blur/fade and a thin signal sweep; browser history remains native.

## Visual system

The immersive layer is near-black (`#07090B`) with restrained modality accents: cyan (C1), muted amber (C2), violet (C3), pale green (C4). Editorial content uses warm paper (`#F4F4EF`). Inter Tight is the display face and IBM Plex Mono is the technical face. No sci-fi fonts, stock mental-health imagery, glowing AI brains, random decorative particle fields, or repetitive glass cards are used.

Large state typography functions spatially, while rules, columns, grids, and whitespace carry information outside the hero.

## Accessibility and responsive behavior

- Semantic landmarks and heading order are preserved.
- Lens and navigation are keyboard-operable with visible focus states.
- Canvas-only information is non-essential; meaningful diagrams have textual counterparts.
- Custom cursor is disabled on coarse pointers and never replaces keyboard focus.
- `prefers-reduced-motion: reduce` bypasses the preloader, tilt, strong transitions, and parallax-like effects.
- Mobile uses a horizontal stage index, simplified composition, stacked evidence records, and touch targets of at least 44px.
- Native scrolling is retained; no scroll hijacking.

## Performance boundaries

No Three.js, GSAP, WebGL framework, video background, Lottie package, or new animation dependency is introduced. Secondary route modules are lazy-loaded. Canvas rendering is memo-light, DPR-capped, offscreen-aware, and transform/opacity are preferred for DOM motion.

## Verification

Source-level contract tests assert the research state model, exact C2/C3 evidence context, safety principles, route preservation, reduced-motion/coarse-pointer behavior, metadata constraints, and explicit C2 gating. The existing content validator remains part of `npm run build` and is expanded to reject unsupported marketing/diagnostic language and required content regressions.
