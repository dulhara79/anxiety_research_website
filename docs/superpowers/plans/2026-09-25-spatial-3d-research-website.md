# Spatial 3D Research Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a performant hybrid 3D scientific experience to the existing R26-DS-012 research website without changing its research claims, route structure, or readable HTML narrative.

**Architecture:** Keep the current React/Vite/Framer Motion application as the primary document layer and add an isolated React Three Fiber subsystem for selected sections only. Each 3D scene is lazy-loaded behind a shared `SpatialSceneBoundary`, uses a common quality/material policy, exposes a deterministic 2D fallback, and never owns essential research text.

**Tech Stack:** React 18, Vite 5, Framer Motion 11, Three.js, React Three Fiber 8, Drei 9, React Router 6, Node built-in test runner, existing validator.

**Spec:** `docs/superpowers/specs/2026-09-25-spatial-3d-research-website-design.md`

## Global Constraints

- Branch: `redesign/spatial-3d-research-2026`, based on current `main`.
- Keep all important research text in semantic HTML outside WebGL canvases.
- Preserve the current light scientific visual identity; no dark cyberpunk redesign.
- Preserve the existing hero video and hero copy.
- TC-WPN remains labeled `Clinical NLP signal`; never call it overall patient risk.
- C2 remains excluded from active fusion with active fusion weight `0.0`.
- Missing or unavailable evidence is not low anxiety or zero risk.
- Current assessment remains distinct from forward forecasting.
- The system remains a research / clinical decision-support prototype, not a diagnostic device.
- No fabricated screenshots, metrics, datasets, publications, citations, people, or clinical capabilities.
- No unrestricted `OrbitControls`, physics, VR/AR, audio-reactive effects, or user-controlled free camera.
- Honor `prefers-reduced-motion` by disabling continuous camera drift, pointer parallax, idle rotation, and scroll-scrubbed scene travel.
- Below-fold 3D scenes must be lazy-loaded and mounted only near the viewport.
- WebGL failure must render a deliberate fallback, not a blank canvas.
- Mobile must prioritize text and use simplified or 2D fallback visuals.

## Review Focus

1. **WebGL unavailable or context creation fails:** the section must render its deterministic fallback, preserve height, and leave all HTML content usable. Covered in Task 2.
2. **Reduced-motion user:** no camera drift, no pointer parallax, no infinite scene motion, and all content remains complete. Covered in Tasks 2, 3, 4, 5, 6, and 7.
3. **Low-power/mobile device:** scene quality drops without removing semantic content or causing horizontal overflow. Covered in Task 2 and final Task 9.
4. **Scientific state mismatch:** C2 exclusion, C3 wording, missing-evidence semantics, and current-vs-forward separation must not change during visual work. Covered in Tasks 1, 6, 7, and 9.
5. **Below-fold bundle growth:** 3D scenes must be code-split and not eagerly loaded by `Home.jsx`. Covered in Tasks 2 and 9.

---

## File Structure

### New spatial subsystem

```text
research-website/src/components/three/
├── SpatialCanvas.jsx
├── SpatialSceneBoundary.jsx
├── SpatialErrorBoundary.jsx
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
├── useSpatialMotion.js
└── spatialQuality.test.js
```

### Existing files to modify

```text
research-website/package.json
research-website/package-lock.json
research-website/scripts/validate-content.mjs
research-website/src/main.jsx
research-website/src/index.css
research-website/src/motion.css
research-website/src/context.css
research-website/src/components/hero/ResearchHero.jsx
research-website/src/components/story/AnxietyContext.jsx
research-website/src/components/story/ObservationTimeline.jsx
research-website/src/components/story/SnapshotProblem.jsx
research-website/src/components/research/ModalityOverview.jsx
research-website/src/components/research/ComponentFeature.jsx
research-website/src/components/research/FusionStory.jsx
research-website/src/components/research/ArchitectureStory.jsx
research-website/src/pages/Home.jsx
```

---

### Task 1: Lock scientific invariants and install the 3D runtime

**Files:**
- Modify: `research-website/package.json`
- Modify: `research-website/package-lock.json`
- Modify: `research-website/scripts/validate-content.mjs`

**Interfaces:**
- Consumes: current research copy and validation rules on `main`.
- Produces: installed `three`, `@react-three/fiber`, `@react-three/drei`; validator rules that protect the spatial redesign from changing scientific content.

- [ ] **Step 1: Add failing validator requirements for the spatial subsystem and scientific invariants**

Extend `validate-content.mjs` so the required strings/files include:

```js
const spatialRequiredFiles = [
  'src/components/three/SpatialCanvas.jsx',
  'src/components/three/SpatialSceneBoundary.jsx',
  'src/components/three/SpatialErrorBoundary.jsx',
  'src/components/three/SceneFallback.jsx',
  'src/components/three/spatialQuality.js',
]

const spatialRequiredStrings = [
  '@react-three/fiber',
  '@react-three/drei',
  'Clinical NLP signal',
  'Active fusion weight 0.0',
  'insufficient evidence',
  'CURRENT',
  'FORWARD',
]
```

Also forbid production use of:

```js
const spatialForbiddenStrings = [
  '<OrbitControls',
  'overall patient risk',
  'zero risk',
]
```

- [ ] **Step 2: Run the validator and verify RED**

Run:

```bash
cd research-website
npm run validate
```

Expected: FAIL because the spatial files and dependencies do not exist yet.

- [ ] **Step 3: Install React-18-compatible 3D dependencies**

Run:

```bash
npm install three@^0.170.0 @react-three/fiber@^8 @react-three/drei@^9
```

Keep the current React 18 dependency unchanged.

- [ ] **Step 4: Add a `test` script using Node's built-in test runner**

Update `package.json` scripts to include:

```json
"test": "node --test src/components/three/*.test.js"
```

Do not add Jest/Vitest unless later tasks demonstrate a concrete need.

- [ ] **Step 5: Commit dependency and invariant setup**

```bash
git add research-website/package.json research-website/package-lock.json research-website/scripts/validate-content.mjs
git commit -m "test: lock spatial redesign invariants"
```

---

### Task 2: Build the shared spatial runtime, quality tiers, and fallback contract

**Files:**
- Create: `research-website/src/components/three/spatialQuality.js`
- Create: `research-website/src/components/three/spatialQuality.test.js`
- Create: `research-website/src/components/three/SpatialErrorBoundary.jsx`
- Create: `research-website/src/components/three/SceneFallback.jsx`
- Create: `research-website/src/components/three/SpatialCanvas.jsx`
- Create: `research-website/src/components/three/SpatialSceneBoundary.jsx`
- Create: `research-website/src/components/three/useSpatialMotion.js`
- Create: `research-website/src/components/three/spatialMaterials.js`
- Modify: `research-website/src/index.css`
- Modify: `research-website/scripts/validate-content.mjs`

**Interfaces:**
- Produces: `getSpatialQuality(env)`, `SpatialCanvas`, `SpatialSceneBoundary`, `SceneFallback`, `SpatialErrorBoundary`, `useSpatialMotion`, `spatialPalette`.
- Later tasks consume these shared primitives rather than constructing ad hoc canvases.

- [ ] **Step 1: Write failing pure tests for quality selection**

Create `spatialQuality.test.js`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { getSpatialQuality } from './spatialQuality.js'

test('reduced motion always selects fallback quality', () => {
  assert.deepEqual(
    getSpatialQuality({ width: 1440, dpr: 2, finePointer: true, reducedMotion: true, webgl: true }),
    { tier: 'fallback', dpr: 1, particles: 0, animated: false }
  )
})

test('small touch viewport selects low quality', () => {
  assert.equal(
    getSpatialQuality({ width: 430, dpr: 3, finePointer: false, reducedMotion: false, webgl: true }).tier,
    'low'
  )
})

test('desktop fine pointer selects high quality with capped DPR', () => {
  const quality = getSpatialQuality({ width: 1600, dpr: 2.5, finePointer: true, reducedMotion: false, webgl: true })
  assert.equal(quality.tier, 'high')
  assert.equal(quality.dpr <= 1.75, true)
})

test('missing WebGL selects fallback quality', () => {
  assert.equal(
    getSpatialQuality({ width: 1600, dpr: 1, finePointer: true, reducedMotion: false, webgl: false }).tier,
    'fallback'
  )
})
```

- [ ] **Step 2: Run the tests and verify RED**

```bash
npm test
```

Expected: FAIL because `spatialQuality.js` does not exist.

- [ ] **Step 3: Implement `getSpatialQuality`**

Use a pure function:

```js
export function getSpatialQuality({ width, dpr, finePointer, reducedMotion, webgl }) {
  if (!webgl || reducedMotion) return { tier: 'fallback', dpr: 1, particles: 0, animated: false }
  if (width < 640 || !finePointer) return { tier: 'low', dpr: 1, particles: 48, animated: false }
  if (width < 1100) return { tier: 'medium', dpr: Math.min(dpr, 1.25), particles: 96, animated: true }
  return { tier: 'high', dpr: Math.min(dpr, 1.75), particles: 180, animated: true }
}
```

- [ ] **Step 4: Implement the error and fallback boundary**

`SpatialErrorBoundary.jsx` must catch scene errors and render its `fallback` prop instead of breaking the page.

`SceneFallback.jsx` API:

```jsx
<SceneFallback variant="context" className="..." />
```

Supported variants initially: `hero`, `context`, `timescale`, `modality`, `component`, `fusion`, `architecture`.

- [ ] **Step 5: Implement `SpatialCanvas`**

Required API:

```jsx
<SpatialCanvas
  className="spatial-canvas"
  camera={{ position: [0, 0, 6], fov: 40 }}
  quality={quality}
  pointerParallax
>
  {children}
</SpatialCanvas>
```

Implementation requirements:

- use `<Canvas dpr={quality.dpr}>`;
- set `gl={{ alpha: true, antialias: quality.tier !== 'low', powerPreference: 'high-performance' }}`;
- transparent background;
- hemisphere + soft directional light;
- do not use OrbitControls;
- no React state updates in `useFrame`.

- [ ] **Step 6: Implement `SpatialSceneBoundary`**

Required API:

```jsx
<SpatialSceneBoundary
  scene={LazyScene}
  fallbackVariant="context"
  className="context-spatial-shell"
  minHeight={420}
/>
```

Behavior:

- `React.lazy` scene passed in by caller;
- use `IntersectionObserver` with approximately `rootMargin: '40% 0px'`;
- mount real scene only after it approaches viewport;
- render fallback before mount and on error;
- preserve `minHeight`.

- [ ] **Step 7: Implement `useSpatialMotion`**

Return normalized reversible scroll progress and pointer offsets without changing document scrolling:

```js
const { progress, pointer, reducedMotion } = useSpatialMotion(ref)
```

Pointer values stay in approximately `[-1, 1]`, but consuming scenes must scale them to very small rotation/translation values.

- [ ] **Step 8: Add shared palette/material helpers**

`spatialMaterials.js` exports:

```js
export const spatialPalette = {
  pearl: '#f3f6f4',
  teal: '#78b7b5',
  cyan: '#8cc9d3',
  mist: '#b7d2de',
  lavender: '#b8b4dd',
  peach: '#e3a487',
  ink: '#10201f',
}
```

Prefer `meshPhysicalMaterial` / `meshStandardMaterial` with modest transparency and roughness. Do not add post-processing.

- [ ] **Step 9: Add CSS for stable scene containers**

Define:

```css
.spatial-stage{position:relative;isolation:isolate;overflow:hidden}
.spatial-canvas{position:absolute;inset:0}
.spatial-fallback{position:absolute;inset:0;pointer-events:none}
@media(prefers-reduced-motion:reduce){.spatial-canvas{display:none}}
```

Do not globally hide fallback content until the canvas reports ready.

- [ ] **Step 10: Run GREEN verification**

```bash
npm test
npm run validate
```

Expected: quality tests PASS; validator now progresses beyond the shared-runtime checks.

- [ ] **Step 11: Commit**

```bash
git add research-website/src/components/three research-website/src/index.css research-website/scripts/validate-content.mjs
git commit -m "feat: add resilient spatial runtime"
```

---

### Task 3: Add the atmospheric 3D hero without replacing the current video

**Files:**
- Create: `research-website/src/components/three/HeroSpatialField.jsx`
- Modify: `research-website/src/components/hero/ResearchHero.jsx`
- Modify: `research-website/src/index.css`
- Modify: `research-website/scripts/validate-content.mjs`

**Interfaces:**
- Consumes: `SpatialCanvas`, `useSpatialMotion`, `spatialPalette`.
- Produces: `HeroSpatialField({ quality })` layered over the existing hero video.

- [ ] **Step 1: Add RED validator checks**

Require:

```js
'HeroSpatialField.jsx'
'hero-spatial-layer'
'/media/research-hero.mp4'
```

And ensure the hero still contains the existing semantic headline text.

- [ ] **Step 2: Run validator to verify failure**

```bash
npm run validate
```

Expected: FAIL because the hero spatial layer does not exist.

- [ ] **Step 3: Implement `HeroSpatialField`**

Build only lightweight geometry:

- 3–5 translucent ribbon/curve meshes;
- one instanced particle field using the quality particle count;
- 2–3 shallow translucent planes;
- small pointer parallax through group rotation, maximum about `0.025` radians;
- slow idle movement only when `quality.animated` is true.

Do not place opaque geometry across the primary video subject area.

- [ ] **Step 4: Integrate the spatial layer into `ResearchHero`**

Structure:

```jsx
<section className="research-hero" id="overview">
  <HeroMedia />
  <div className="hero-spatial-layer" aria-hidden="true">
    <SpatialCanvas ...>
      <HeroSpatialField quality={quality} />
    </SpatialCanvas>
  </div>
  <div className="hero-inner shell">...</div>
</section>
```

Keep all hero copy and buttons unchanged.

- [ ] **Step 5: Add CSS z-index and pointer rules**

The 3D layer must be non-interactive for clicks:

```css
.hero-spatial-layer{position:absolute;inset:0;z-index:1;pointer-events:none}
.hero-inner{z-index:2}
```

- [ ] **Step 6: Verify**

```bash
npm run validate
npm run build
```

Expected: both PASS; hero video path and semantic text remain present.

- [ ] **Step 7: Commit**

```bash
git add research-website/src/components/three/HeroSpatialField.jsx research-website/src/components/hero/ResearchHero.jsx research-website/src/index.css research-website/scripts/validate-content.mjs
git commit -m "feat: add atmospheric spatial hero"
```

---

### Task 4: Replace the context artwork with a real longitudinal 3D field

**Files:**
- Create: `research-website/src/components/three/LongitudinalField3D.jsx`
- Modify: `research-website/src/components/story/AnxietyContext.jsx`
- Modify: `research-website/src/context.css`
- Modify: `research-website/scripts/validate-content.mjs`

**Interfaces:**
- Consumes: `SpatialSceneBoundary`, `SpatialCanvas`, `useSpatialMotion`, `SceneFallback`.
- Produces: context scene with reversible scroll progression.

- [ ] **Step 1: Add RED checks for the context scene and fallback**

Require:

```js
'LongitudinalField3D.jsx'
'fallbackVariant="context"'
'context-longitudinal-art'
```

The final requirement ensures the current SVG fallback remains available.

- [ ] **Step 2: Verify RED**

```bash
npm run validate
```

- [ ] **Step 3: Implement `LongitudinalField3D`**

Use:

- 4 translucent membrane planes at distinct Z values;
- 12–20 observation nodes;
- 4–6 curve lines using `CatmullRomCurve3`;
- one peach trajectory;
- particle cluster count based on quality tier.

Map scroll progress:

```js
const separation = 0.35 + progress * 0.55
const coherence = progress
```

Use refs in `useFrame`; do not set React state per frame.

- [ ] **Step 4: Integrate with `AnxietyContext` through lazy boundary**

Use:

```jsx
const LongitudinalField3D = lazy(() => import('../three/LongitudinalField3D'))

<SpatialSceneBoundary
  scene={LongitudinalField3D}
  fallbackVariant="context"
  className="context-visual-wrap context-art-anchor"
  minHeight={360}
/>
```

Keep headline and paragraph outside the scene.

- [ ] **Step 5: Update context CSS**

Remove absolute-position assumptions that only fit the flat SVG, but preserve the current section height and right-side composition.

Mobile below `900px` should default to the fallback illustration.

- [ ] **Step 6: Verify**

```bash
npm test
npm run validate
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add research-website/src/components/three/LongitudinalField3D.jsx research-website/src/components/story/AnxietyContext.jsx research-website/src/context.css research-website/scripts/validate-content.mjs
git commit -m "feat: add longitudinal 3D context field"
```

---

### Task 5: Add spatial timescales and lightweight snapshot depth

**Files:**
- Create: `research-website/src/components/three/TimescaleScene.jsx`
- Modify: `research-website/src/components/story/ObservationTimeline.jsx`
- Modify: `research-website/src/components/story/SnapshotProblem.jsx`
- Modify: `research-website/src/index.css`
- Modify: `research-website/scripts/validate-content.mjs`

**Interfaces:**
- Produces: `TimescaleScene` with four depth planes matching existing timescale labels.

- [ ] **Step 1: Add RED validation**

Require the scene and all four labels to coexist in DOM source:

```js
'TimescaleScene.jsx'
'NOW'
'DAYS / WEEKS'
'CLINICAL ENCOUNTERS'
'BACKGROUND'
```

- [ ] **Step 2: Verify RED**

```bash
npm run validate
```

- [ ] **Step 3: Implement `TimescaleScene`**

Represent four planes at increasing negative Z positions. Each plane gets a restrained visual grammar but no ranking emphasis.

Scroll progress translates the camera/group through the planes by a bounded amount. Upward scroll reverses it naturally.

- [ ] **Step 4: Integrate into `ObservationTimeline`**

Keep the current HTML rows as the accessible content layer. Place the 3D scene beside/behind the rows on desktop. On mobile, do not mount the 3D scene.

- [ ] **Step 5: Add snapshot depth using CSS/Framer only**

Do not create another canvas. Add a wrapper with:

```css
.snapshot-grid{perspective:1200px}
.snapshot-grid article{transform-style:preserve-3d}
```

Use very small `translateZ` / rotate effects tied to existing Framer Motion and disabled under reduced motion.

- [ ] **Step 6: Verify**

```bash
npm run validate
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add research-website/src/components/three/TimescaleScene.jsx research-website/src/components/story/ObservationTimeline.jsx research-website/src/components/story/SnapshotProblem.jsx research-website/src/index.css research-website/scripts/validate-content.mjs
git commit -m "feat: spatialize research timescales"
```

---

### Task 6: Build distinct 3D modality and component scenes

**Files:**
- Create: `research-website/src/components/three/ModalityScene.jsx`
- Create: `research-website/src/components/three/ComponentScene.jsx`
- Modify: `research-website/src/components/research/ModalityOverview.jsx`
- Modify: `research-website/src/components/research/ComponentFeature.jsx`
- Modify: `research-website/src/index.css`
- Modify: `research-website/scripts/validate-content.mjs`

**Interfaces:**
- `ModalityScene({ type, quality })` where `type` is one of `physiology | behaviour | clinical | context`.
- `ComponentScene({ componentId, quality })` where `componentId` is `C1 | C2 | C3 | C4`.

- [ ] **Step 1: Add RED validation for all four modality types and component IDs**

Require source strings:

```js
'physiology'
'behaviour'
'clinical'
'context'
'componentId="C1"'
'componentId="C2"'
'componentId="C3"'
'componentId="C4"'
```

Also retain scientific invariants:

```js
'Clinical NLP signal'
'Active fusion weight 0.0'
```

- [ ] **Step 2: Verify RED**

```bash
npm run validate
```

- [ ] **Step 3: Implement `ModalityScene`**

Use one shared component with four internal render paths:

```jsx
switch (type) {
  case 'physiology': return <PhysiologyGeometry ... />
  case 'behaviour': return <BehaviourGeometry ... />
  case 'clinical': return <ClinicalGeometry ... />
  case 'context': return <ContextGeometry ... />
}
```

Rules:

- physiology: smooth ribbon deformation;
- behaviour: sparse instanced nodes + trajectories;
- clinical: layered unreadable token strips;
- context: slower broad planes;
- no literal medical icons.

- [ ] **Step 4: Integrate modality scenes into `ModalityOverview`**

Each modality card keeps its number, name, and question as HTML. Add a small spatial stage above the text.

- [ ] **Step 5: Implement `ComponentScene`**

Reuse the modality/material primitives rather than creating four unrelated scene systems.

Mapping:

```js
const componentVariant = {
  C1: 'physiology',
  C2: 'behaviour',
  C3: 'clinical',
  C4: 'fusion',
}
```

C2 visual state should look present but deliberately disconnected from the active fusion treatment; do not color it as an alarm/error.

- [ ] **Step 6: Replace current CSS-only component circles with lazy 3D scene boundaries**

Keep all component text, evidence notes, methods, and limitations unchanged.

- [ ] **Step 7: Verify**

```bash
npm test
npm run validate
npm run build
```

- [ ] **Step 8: Commit**

```bash
git add research-website/src/components/three/ModalityScene.jsx research-website/src/components/three/ComponentScene.jsx research-website/src/components/research/ModalityOverview.jsx research-website/src/components/research/ComponentFeature.jsx research-website/src/index.css research-website/scripts/validate-content.mjs
git commit -m "feat: add spatial modality and component scenes"
```

---

### Task 7: Implement reliability-aware 3D fusion with explicit excluded states

**Files:**
- Create: `research-website/src/components/three/FusionScene.jsx`
- Modify: `research-website/src/components/research/FusionStory.jsx`
- Modify: `research-website/src/index.css`
- Modify: `research-website/scripts/validate-content.mjs`

**Interfaces:**
- `FusionScene({ quality })` visualizes strong/stale/incomplete/unavailable/excluded streams.
- DOM remains authoritative for labels and explanatory copy.

- [ ] **Step 1: Add RED validation for state semantics**

Require:

```js
'FusionScene.jsx'
'strong'
'stale'
'incomplete'
'unavailable'
'excluded'
'Active fusion weight 0.0'
'insufficient evidence'
```

- [ ] **Step 2: Verify RED**

```bash
npm run validate
```

- [ ] **Step 3: Implement `FusionScene`**

Create five source lanes. Use shared material differences rather than arbitrary colors alone.

Behavior:

- eligible streams progress through a gate plane;
- stale/incomplete streams contribute with visibly reduced intensity;
- unavailable stream terminates before the gate;
- excluded stream remains visible beside the gate and never enters the convergence;
- final object represents a current governed research state.

C2 is the excluded stream.

- [ ] **Step 4: Integrate the scene into `FusionStory`**

Preserve the existing equation text:

`availability + recency + coverage + reliability + validation evidence → usable contribution`

The 3D scene supplements this explanation; it does not replace it.

- [ ] **Step 5: Verify reduced-motion and fallback paths structurally**

Validator should require `fallbackVariant="fusion"` and ensure `prefers-reduced-motion` still exists in the stylesheet.

- [ ] **Step 6: Verify build**

```bash
npm run validate
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add research-website/src/components/three/FusionScene.jsx research-website/src/components/research/FusionStory.jsx research-website/src/index.css research-website/scripts/validate-content.mjs
git commit -m "feat: visualize reliability-aware fusion in 3D"
```

---

### Task 8: Build the shallow-depth system architecture scene

**Files:**
- Create: `research-website/src/components/three/ArchitectureScene.jsx`
- Modify: `research-website/src/components/research/ArchitectureStory.jsx`
- Modify: `research-website/src/index.css`
- Modify: `research-website/scripts/validate-content.mjs`

**Interfaces:**
- `ArchitectureScene({ stages, quality })` consumes the existing canonical `architectureStages` array.

- [ ] **Step 1: Add RED validation for the canonical sequence**

Require every canonical architecture label:

```js
'Participant'
'Signals'
'Component models'
'Canonical backend state'
'Quality / eligibility checks'
'Reliability-aware fusion'
'Current research assessment'
'Evidence support'
'Audience-specific interfaces'
```

And require both `CURRENT` and `FORWARD` to remain separate elsewhere in source.

- [ ] **Step 2: Verify RED**

```bash
npm run validate
```

- [ ] **Step 3: Implement `ArchitectureScene`**

Render stages as shallow depth panels connected by lines. Use the provided `stages` array rather than duplicating labels inside the scene.

Camera/group travel is bounded and scroll-linked. No free orbiting.

- [ ] **Step 4: Keep a DOM-equivalent architecture representation**

Do not delete the current HTML architecture nodes. On capable desktop, present them as an accessible summary beside/below the 3D scene; on fallback/mobile they remain the primary visual.

- [ ] **Step 5: Verify**

```bash
npm run validate
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add research-website/src/components/three/ArchitectureScene.jsx research-website/src/components/research/ArchitectureStory.jsx research-website/src/index.css research-website/scripts/validate-content.mjs
git commit -m "feat: add spatial system architecture"
```

---

### Task 9: Performance, accessibility, lazy loading, and final branch verification

**Files:**
- Modify: `research-website/src/pages/Home.jsx`
- Modify: `research-website/src/motion.css`
- Modify: `research-website/src/index.css`
- Modify: `research-website/src/context.css`
- Modify: `research-website/scripts/validate-content.mjs`
- Modify: `research-website/README.md` if present

**Interfaces:**
- No new scene API. This task hardens the complete branch and verifies the spec acceptance criteria.

- [ ] **Step 1: Ensure below-fold scenes are lazy-loaded**

`Home.jsx` and section components must not eagerly import all scene modules.

Expected pattern:

```jsx
const LongitudinalField3D = lazy(() => import('../three/LongitudinalField3D'))
const TimescaleScene = lazy(() => import('../three/TimescaleScene'))
```

The hero scene may remain eagerly loaded if bundle measurement shows it is appropriate.

- [ ] **Step 2: Strengthen validator for lazy loading and fallbacks**

Require:

```js
'React.lazy'
'SpatialSceneBoundary'
'SceneFallback'
'fallbackVariant="context"'
'fallbackVariant="fusion"'
'fallbackVariant="architecture"'
```

Forbid direct essential copy inside `Canvas` components by keeping all known research headings present in their existing DOM section files.

- [ ] **Step 3: Add reduced-motion CSS hardening**

Ensure:

```css
@media(prefers-reduced-motion:reduce){
  .spatial-canvas{display:none!important}
  .spatial-fallback{display:block!important}
}
```

Do not remove the existing text-motion accessibility rules.

- [ ] **Step 4: Add mobile quality rules**

Below approximately `640px`, spatial stages should either use `SceneFallback` or low-tier static composition. No 3D canvas may force horizontal overflow.

- [ ] **Step 5: Run complete automated verification**

```bash
npm test
npm run validate
npm run build
```

Expected: all commands exit `0`.

- [ ] **Step 6: Inspect build output for code splitting**

Run:

```bash
npm run build
```

Confirm Vite emits separate scene chunks rather than placing every Three scene in the main application chunk. If all scenes collapse into one eager chunk, move imports behind dynamic boundaries before continuing.

- [ ] **Step 7: Manual browser QA checklist**

Run:

```bash
npm run dev
```

Check desktop, tablet, mobile, and reduced-motion states.

Verify:

1. Hero video still plays and remains readable.
2. Hero 3D layer does not block buttons.
3. Context 3D field reverses smoothly when scrolling upward.
4. Timescale scene preserves all four labels.
5. Modality scenes are visually distinct without literal medical icons.
6. C2 remains visibly excluded and does not enter active fusion.
7. C3 still reads `Clinical NLP signal`.
8. Architecture follows canonical order.
9. Current and forward sections remain separate.
10. Findings/documents/team/limitations remain calm and readable.
11. Reduced-motion shows stable fallbacks.
12. Mobile has no horizontal overflow.
13. Console has no uncaught WebGL or React errors.

- [ ] **Step 8: Final branch diff review**

Compare against `main`:

```bash
git diff --stat main...redesign/spatial-3d-research-2026
git diff main...redesign/spatial-3d-research-2026 -- research-website/src/data
```

Expected: no unintended research data changes.

- [ ] **Step 9: Commit final hardening**

```bash
git add research-website
git commit -m "chore: harden spatial research experience"
```

- [ ] **Step 10: Prepare PR summary, but do not merge automatically**

PR summary must state:

- hybrid 3D architecture;
- preserved semantic HTML and scientific boundaries;
- performance/fallback strategy;
- reduced-motion/mobile behavior;
- verification commands and outcomes.

---

## Plan Self-Review

### Spec coverage

- Hybrid real 3D: Tasks 2–8.
- Hero video retained: Task 3.
- Context longitudinal field: Task 4.
- Timescale depth: Task 5.
- Modality-specific spatial grammar: Task 6.
- Component spatial scenes: Task 6.
- Reliability-aware fusion with excluded states: Task 7.
- Canonical architecture in 3D: Task 8.
- Findings/documents/team/limitations remain restrained: protected by scope and Task 9 QA.
- Mobile/reduced-motion/fallback behavior: Tasks 2 and 9.
- Lazy loading: Tasks 2 and 9.
- Scientific invariants: Tasks 1, 6, 7, 8, and 9.

### Placeholder scan

No `TBD`, `TODO`, “implement later”, or unspecified error-handling steps remain. Every task names concrete files, APIs, tests, commands, and expected outcomes.

### Interface consistency

- `SpatialSceneBoundary` receives `scene`, `fallbackVariant`, `className`, `minHeight` throughout.
- `SpatialCanvas` receives `quality`, `camera`, and optional `pointerParallax` throughout.
- `getSpatialQuality` returns `{ tier, dpr, particles, animated }` throughout.
- Scene APIs remain consistent with the design spec.

### Review-focus coverage

All five review-focus failure modes are tied to explicit tests or verification steps in the owning tasks.
