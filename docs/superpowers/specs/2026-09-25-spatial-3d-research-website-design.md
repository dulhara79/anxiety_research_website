# Spatial 3D Research Website — Design Specification

## Purpose

Transform the current R26-DS-012 research website into a premium hybrid 3D scientific experience while preserving the existing research narrative, scientific boundaries, accessibility, route structure, and readable editorial presentation.

This redesign must feel like a modern scientific exhibition with real spatial depth, not a game, not a cyberpunk interface, and not a generic 3D landing page. Three-dimensional content should clarify relationships, timescales, multimodal evidence, uncertainty, and system structure rather than exist as decoration.

## Branch and base

Implementation branch:

`redesign/spatial-3d-research-2026`

Base branch:

`main`

The branch must remain independently reviewable and must not modify `main` directly.

## Product principles

1. Keep all important research text in semantic HTML.
2. Use WebGL only where spatial depth adds explanatory value.
3. Preserve the current light scientific visual identity.
4. Never hide research content inside a 3D canvas.
5. Preserve scientific claim boundaries exactly.
6. Keep the experience usable without WebGL.
7. Reduce scene complexity on mobile and for reduced-motion users.
8. Prefer slow, controlled motion over continuous spectacle.

## Scientific boundaries that must remain unchanged

The redesign must preserve the existing public research constraints:

- research observation is not clinical diagnosis;
- current assessment is not future forecasting;
- TC-WPN is a `Clinical NLP signal`, not overall patient risk;
- unavailable or missing evidence is not low anxiety or zero risk;
- C2 remains excluded from active fusion under the current evidence rule;
- C2 active fusion weight remains `0.0`;
- the integrated system is a research / clinical decision-support prototype, not a diagnostic medical device;
- physiological forecasting must not be presented as validated multimodal future-event prediction;
- no fabricated screenshots, metrics, publications, datasets, citations, people, or clinical capabilities may be introduced.

## Chosen approach

Use a hybrid real-3D architecture based on:

- `three`
- `@react-three/fiber`
- `@react-three/drei`
- existing `framer-motion` for DOM and navigation motion

The website remains primarily React/HTML. Individual 3D experiences are embedded only in selected sections.

Do not create one giant full-page 3D world. Each major 3D section gets an isolated scene with explicit performance and fallback boundaries.

## High-level experience

The user should experience the site as a sequence of spatial scientific installations.

The flow remains:

1. Hero
2. Context
3. Observation / timescales
4. Snapshot problem
5. Literature landscape
6. Research gap
7. Research question / thesis
8. Modality overview
9. Components
10. Multimodal fusion
11. System architecture
12. Current vs forward
13. Findings
14. Interpretation
15. Evidence support
16. Methodology
17. Documents
18. Research journey
19. Team
20. Limitations

The first eleven sections carry most of the spatial treatment. Findings onward remain intentionally calmer and more editorial.

## 3D component architecture

Create a focused 3D subsystem:

```text
src/components/three/
├── SpatialCanvas.jsx
├── SpatialSceneBoundary.jsx
├── SceneFallback.jsx
├── HeroSpatialField.jsx
├── LongitudinalField3D.jsx
├── TimescaleScene.jsx
├── ModalityScene.jsx
├── ComponentScene.jsx
├── FusionScene.jsx
├── ArchitectureScene.jsx
├── spatialMaterials.js
├── spatialQuality.js
└── useSpatialMotion.js
```

### SpatialCanvas

Responsibilities:

- central wrapper around React Three Fiber `<Canvas>`;
- device-pixel-ratio cap;
- camera defaults;
- light setup;
- WebGL capability fallback;
- reduced-motion behavior;
- intersection-based activation;
- optional pointer parallax;
- explicit quality tier.

The canvas must never contain essential text content.

### SpatialSceneBoundary

Responsibilities:

- lazy-load heavy scenes;
- mount scenes only near the viewport;
- show a deterministic 2D fallback before WebGL is ready;
- prevent layout shift by reserving the final scene dimensions.

### SceneFallback

Use existing SVG/CSS visual language as the no-WebGL and low-power fallback. Fallbacks must still communicate the same concept.

## Scene design

### 1. Hero — layered spatial field

Keep the current background video as the primary visual surface.

Add a transparent 3D layer above or beside the video containing:

- a small number of translucent signal ribbons;
- softly moving particles;
- shallow layered planes;
- restrained refractive / glass-like forms;
- slow camera parallax tied to pointer position;
- slight depth movement tied to hero scroll progress.

Do not place opaque 3D objects over the face or important areas of the video.

The hero headline, supporting text, CTAs, project label, and contextual tag remain HTML.

The 3D hero layer should be atmospheric rather than attention-seeking.

### 2. Context — LongitudinalField3D

Replace the current purely flat longitudinal illustration on capable devices with a spatial version of the same concept.

Visual language:

- translucent membrane layers distributed along the Z axis;
- observation nodes suspended at different depths;
- curved temporal traces connecting partial observations;
- subtle mist-like particle clusters;
- one restrained peach trajectory among teal/cyan/lavender layers;
- a gradual increase in structural coherence across time.

Scroll interaction:

- entering the section separates layers slightly;
- mid-section progress reveals more observation nodes;
- later progress aligns several traces into a clearer field;
- scrolling upward reverses the progression naturally.

The section headline and explanatory paragraph remain external DOM text.

### 3. Observation / timescales — TimescaleScene

Represent four observation scales in spatial depth:

- NOW — closest plane;
- DAYS / WEEKS — middle-near plane;
- CLINICAL ENCOUNTERS — middle-far plane;
- BACKGROUND — far plane.

Each plane contains restrained signal geometry related to its role. Scroll progress moves the virtual camera through the planes without changing the meaning of the existing labels.

The scene must not imply that one timescale is always more important than another.

### 4. Snapshot problem

Keep this section primarily 2D.

Add only subtle depth:

- clinical snapshot point appears on a shallow foreground plane;
- life-between-encounters timeline extends deeper into the background;
- no separate heavy scene is required unless implementation profiling shows it is cheap.

### 5. Literature / research gap / thesis

These sections remain mostly editorial.

Allowed depth treatment:

- slow CSS/Framer perspective shifts;
- subtle layered background planes;
- no dedicated WebGL canvas required.

The research gap may use a lightweight fragment-to-structure spatial transition only if it remains performant and does not compete with reading.

### 6. Modality overview — ModalityScene

Create four distinct 3D visual grammars that share materials and lighting:

**Physiology**
- smooth oscillating waveform ribbons;
- soft pulse deformation;
- no literal heart or ECG icon.

**Behaviour**
- sparse point-cloud / graph trajectories;
- nodes reorganize slowly across time;
- avoid dense neural-network clichés.

**Clinical language**
- layered translucent text-like strips or token planes;
- abstract and unreadable;
- no fake patient records.

**Context**
- broad low-frequency field planes and environmental layers;
- visually slower than the other modalities.

The four objects stay separated until the fusion section.

### 7. Component sections — ComponentScene

Replace or enhance current abstract component visuals with small 3D installations.

Each component receives a scene variant, but all share one implementation component and material system.

Interaction:

- subtle pointer tilt;
- slow idle motion;
- slight depth response on hover;
- no OrbitControls;
- no user-driven camera rotation.

Component text, status, methods, data sources, evidence notes, and boundaries remain standard HTML.

### 8. Fusion — FusionScene

This is the primary explanatory 3D transition.

Start with separated streams representing eligible modality evidence.

Each stream carries state visually:

- strong;
- stale;
- incomplete;
- unavailable;
- excluded.

Unavailable or excluded streams must remain visible as distinct states instead of disappearing.

The active streams converge only after quality / eligibility gates.

The final object represents a governed current research state, not certainty and not diagnosis.

C2 must be visibly excluded from the active convergence path while preserving its existence as a research stream.

### 9. Architecture — ArchitectureScene

Create a spatial pipeline based on the existing canonical architecture sequence:

`Participant → Signals → Component models → Canonical backend state → Quality / eligibility checks → Reliability-aware fusion → Current research assessment → Evidence support → Audience-specific interfaces`

Use shallow Z depth rather than an unrestricted 3D graph.

Scroll moves the camera through stages in order.

The DOM must contain a readable equivalent architecture description or existing 2D representation for accessibility and fallback.

Forecasting remains visually separated from the current-assessment lane.

## Non-3D sections

The following remain intentionally readable and mostly 2D:

- Findings
- Research interpretation
- CARE-AnxRAG evidence-support details
- Methodology
- Documents
- Publications
- Research journey
- Team and supervision
- Limitations

These sections may use light CSS perspective, hover depth, or Framer transitions, but no heavy WebGL scene is required.

## Materials and lighting

Use a shared material language:

- frosted translucent glass;
- soft resin-like surfaces;
- semi-transparent membranes;
- thin luminous line geometry;
- matte pearl particles;
- very restrained bloom-like perception through material brightness rather than heavy post-processing.

Primary palette:

- pearl white;
- pale grey;
- mist blue;
- mineral cyan;
- muted teal;
- pale lavender;
- restrained peach.

Avoid:

- black backgrounds;
- neon cyberpunk lighting;
- chrome-heavy materials;
- rainbow gradients;
- aggressive bloom;
- gaming-style lens flares.

Lighting should use bright ambient / hemisphere illumination with one or two soft directional sources.

## Camera and interaction rules

Default camera movement must be intentionally limited.

Pointer movement:

- max approximately 1–2 degrees equivalent camera/object response;
- ease slowly;
- disable on touch devices.

Scroll movement:

- controls scene progression and shallow camera travel;
- reversible when scrolling upward;
- must not trap scroll;
- must not change page scroll physics.

Hover:

- slight elevation / rotation / material response;
- no bouncing;
- no exaggerated magnetic behavior.

Do not use unrestricted `OrbitControls` in production sections.

## Motion accessibility

Honor `prefers-reduced-motion`.

For reduced-motion users:

- no continuous camera drift;
- no idle object rotation;
- no pointer parallax;
- no scroll-scrubbed camera travel;
- scenes render a stable composed state or fallback image;
- all research content remains visible.

Existing DOM text reveals may simplify or disable under reduced motion.

## Performance strategy

### Lazy loading

All 3D scene modules must be code-split using `React.lazy` or equivalent dynamic imports.

Only scenes close to the viewport should mount.

### Device quality tiers

Create three quality levels:

**High**
- desktop;
- moderate particle counts;
- full transparent layers;
- DPR capped around 1.5–1.75.

**Medium**
- tablets / lower-power desktop;
- fewer particles;
- simplified geometry;
- DPR near 1.25.

**Low / fallback**
- mobile, reduced-motion, unsupported WebGL, or constrained devices;
- minimal geometry or 2D fallback;
- no expensive transparency stacks.

Do not identify device capability using fragile user-agent-only logic. Prefer viewport, pixel ratio, pointer capability, WebGL availability, and measured constraints.

### Rendering

- use demand / controlled invalidation where possible for static scenes;
- avoid unnecessary per-frame React state changes;
- mutate Three objects through refs for continuous motion;
- reuse geometries and materials;
- use instancing for repeated particles/nodes;
- avoid heavy post-processing initially;
- cap particle counts;
- dispose resources on unmount.

### Bundle discipline

The initial route should not eagerly load every 3D scene.

The hero may load its scene early; below-fold scenes must be deferred.

## Responsive behavior

### Desktop

Full hybrid spatial treatment.

### Tablet

Same narrative with reduced geometry, less parallax, and simpler scene composition.

### Mobile

Prioritize text and scroll performance.

Use either:

- very lightweight static 3D states; or
- existing 2D fallback visuals.

No horizontal camera navigation or oversized canvas overflow.

## WebGL failure behavior

If WebGL initialization fails:

- do not show a blank canvas;
- do not throw an uncaught error;
- render the matching `SceneFallback`;
- preserve the section height;
- keep all HTML content functional.

The site must remain useful with JavaScript/WebGL scene failure after core React content has loaded.

## Error boundaries

Wrap spatial scenes in a dedicated error boundary.

A scene failure must not break the rest of the page.

Log development diagnostics without exposing technical error text in the public UI.

## Testing strategy

The implementation plan must include tests/validation for:

1. 3D dependencies are installed and importable.
2. `SpatialCanvas` renders a fallback when WebGL is unavailable.
3. reduced-motion disables scene animation paths.
4. semantic text exists outside the canvas.
5. C2 remains excluded and active fusion weight remains `0.0`.
6. C3 retains `Clinical NLP signal` wording.
7. current assessment and forward forecasting remain separated.
8. lazy-loaded scene boundaries exist for below-fold 3D sections.
9. mobile / fallback paths do not require WebGL.
10. production build succeeds.

Where browser-level WebGL behavior cannot be reliably unit-tested, validate scene architecture structurally and keep runtime fallbacks explicit.

## Files expected to change

Likely modifications:

```text
research-website/package.json
research-website/package-lock.json
research-website/src/pages/Home.jsx
research-website/src/index.css
research-website/src/motion.css
research-website/src/context.css
research-website/src/components/hero/*
research-website/src/components/story/AnxietyContext.jsx
research-website/src/components/story/ObservationTimeline.jsx
research-website/src/components/story/SnapshotProblem.jsx
research-website/src/components/research/ModalityOverview.jsx
research-website/src/components/research/ComponentFeature.jsx
research-website/src/components/research/FusionStory.jsx
research-website/src/components/research/ArchitectureStory.jsx
research-website/src/components/three/*
research-website/scripts/validate-content.mjs
```

Deep content/data files should not change unless required for scene metadata. Scientific values must not be changed as part of the visual redesign.

## Out of scope

- replacing the entire site with one WebGL canvas;
- VR / AR mode;
- user-controlled free camera;
- 3D avatars;
- game controls;
- physics interactions;
- audio-reactive effects;
- dark cyberpunk redesign;
- changing research findings or scientific claims;
- fabricating clinical or research content;
- converting the codebase to TypeScript;
- replacing React Router or the existing information architecture.

## Acceptance criteria

The redesign is accepted when:

1. the new branch is based on current `main`;
2. selected research sections contain real Three.js / React Three Fiber scenes;
3. the hero still uses the current video and remains readable;
4. the context section communicates longitudinal change through meaningful spatial depth;
5. observation timescales are spatially distinguishable without implying unsupported importance;
6. modalities have distinct spatial grammars;
7. fusion visibly represents quality gating and explicit excluded/unavailable states;
8. the architecture scene follows the canonical research pipeline and keeps forecasting separate;
9. important research text remains semantic HTML outside the canvas;
10. findings/documents/team/limitations remain readable and restrained rather than over-3D;
11. mobile and reduced-motion users receive a functional simplified experience;
12. WebGL failure produces a deliberate fallback rather than a blank area;
13. below-fold 3D scenes are lazy-loaded;
14. scientific boundaries and frozen evidence values remain unchanged;
15. validation and production build pass before the branch is presented for PR review.
