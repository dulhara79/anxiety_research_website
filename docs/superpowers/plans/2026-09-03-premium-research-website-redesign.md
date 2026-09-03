# Immersive Scientific Editorial V4.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the already-implemented V4 research website on `feature/premium-research-website-redesign` into the approved V4.1 Immersive Scientific Editorial direction with richer color, multiple bespoke scientific visuals, restrained Framer Motion, stronger section rhythm, and no invented asset dependencies.

**Architecture:** Start from the branch exactly as it exists now. Keep the current compact React structure, `HashRouter`, centralized `src/data/research.js`, `scripts/validate-content.mjs`, and the existing page routes. Do not recreate the abandoned V2/V3 architecture (`components/layout/*`, `components/motion/*`, Vitest harness, `/research` route, Manrope/Instrument Serif). Add only a few focused visual/motion components where they reduce duplication.

**Tech Stack:** React 18.3.1, Vite 5.4.1, React Router 6.26.1, Framer Motion 11.3.19, Tailwind CSS 3.4.10, existing Node validation script. No new test framework is required for this redesign delta.

**Spec:** `docs/superpowers/specs/2026-09-03-immersive-scientific-editorial-v4-1-design.md`

## Global Constraints

- Work only on `feature/premium-research-website-redesign`; PR #3 remains the review surface.
- `R26-DS-012/main` remains the scientific source of truth.
- Preserve current component mapping: C1 physiological, C2 final GLOBEM behavioural study, C3 clinical NLP / TC-WPN, C4 contextual modelling + reliability-weighted fusion + CARE-AnxRAG.
- C2 remains excluded from active fusion with active fusion weight `0.0`.
- Keep `Inter Tight` and `IBM Plex Mono`; do not add Manrope, Instrument Serif, Plus Jakarta Sans, Outfit, or JetBrains Mono.
- Keep Framer Motion as the only animation library.
- No generic stock medical imagery, Unsplash, Pexels, fake doctors/patients, glowing brains, particle backgrounds, glassmorphism system, bouncy cards, or animated counters.
- The website repository currently has no committed website image asset directory, ClinAnx screenshots, wearable photographs, or team portraits. Do not invent paths or remote assets. Use bespoke SVG/React scientific visuals until real files are explicitly committed.
- `.github/workflows/sync-to-main-repo.yml` stays unchanged.
- `npm run validate` and `npm run build` must pass before the PR is considered ready.

---

## Verified Current Baseline

The following files **exist now** on the branch and are the starting point:

```text
research-website/
  package.json
  package-lock.json
  tailwind.config.js
  vite.config.js
  scripts/
    validate-content.mjs
  src/
    App.jsx
    index.css
    main.jsx
    components/
      Navbar.jsx
      Footer.jsx
      ResearchPlate.jsx
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
```

The following items from the old plan **do not exist and are no longer assumed**:

```text
src/pages/Research.jsx
src/App.test.jsx
src/data/research.test.js
src/test/setup.js
src/components/layout/*
src/components/motion/*
src/components/research/*
src/components/ui/*
Vitest / Testing Library configuration
public/ or src/assets/ image library
committed ClinAnx screenshots
committed team portrait assets
```

This plan is a V4 → V4.1 delta. It does not pretend those abandoned files are present.

## Files Planned for Creation

Only these new code files are planned:

```text
research-website/src/components/MotionReveal.jsx
research-website/src/components/PageTransition.jsx
research-website/src/components/ArchitectureVisual.jsx
research-website/src/components/ComponentVisual.jsx
research-website/src/components/TechnologyStrip.jsx
```

`ResearchPlate.jsx` remains the hero visual file and will be upgraded rather than replaced by another hero component.

---

### Task 1: Fix configuration drift and make validation cover it

**Files:**
- Modify: `research-website/scripts/validate-content.mjs`
- Modify: `research-website/tailwind.config.js`

**Interfaces:**
- `npm run validate` must scan both active `src` files and `tailwind.config.js`.
- Tailwind tokens must match the V4.1 typography/color system even if most styling remains authored in `index.css`.

- [ ] **Step 1: Expand the validator before changing Tailwind**

Update the validator input set so it scans `src/**/*.{js,jsx,css}` **and** `tailwind.config.js`.

Add these configuration-only stale terms to the forbidden set:

```js
'Plus Jakarta Sans',
'Outfit',
'JetBrains Mono',
'glow-blue',
'glow-teal',
'glow-violet',
'spin-slow',
'pulse-soft',
```

Keep the existing scientific stale-claim checks and required anchors.

- [ ] **Step 2: Run validation and confirm the drift is detected**

```bash
cd research-website
npm run validate
```

Expected: FAIL because the current `tailwind.config.js` still contains the old typography/glow/animation tokens.

- [ ] **Step 3: Replace stale Tailwind tokens with V4.1 tokens**

Use:

```js
fontFamily: {
  sans: ['"Inter Tight"', 'sans-serif'],
  mono: ['"IBM Plex Mono"', 'monospace'],
},
colors: {
  canvas: '#F7F8FA',
  surface: '#FFFFFF',
  ink: '#101828',
  muted: '#5E6673',
  rule: '#D9DEE7',
  navy: '#132A4A',
  deepNavy: '#0E1A2B',
  indigo: '#4658D9',
  physiology: '#16A6A0',
  clinical: '#DB6B68',
  evidence: '#4A9CC7',
},
```

Remove old glow shadows and infinite animation/keyframe definitions from Tailwind.

- [ ] **Step 4: Verify the fix**

```bash
npm run validate
npm run build
```

Expected: both exit successfully.

- [ ] **Step 5: Commit**

```bash
git add research-website/scripts/validate-content.mjs research-website/tailwind.config.js
git commit -m "fix: align redesign config with active visual system"
```

---

### Task 2: Add the restrained motion primitives to the existing app

**Files:**
- Create: `research-website/src/components/MotionReveal.jsx`
- Create: `research-website/src/components/PageTransition.jsx`
- Modify: `research-website/src/App.jsx`
- Modify: `research-website/src/index.css`

**Interfaces:**

```jsx
<MotionReveal className="..." delay={0}>...</MotionReveal>
<PageTransition>...</PageTransition>
```

Both components use `useReducedMotion()` from Framer Motion.

- [ ] **Step 1: Add `MotionReveal.jsx`**

Implement one reusable section reveal with:

- initial opacity `0`;
- initial `y: 18`;
- animate/whileInView opacity `1`, `y: 0`;
- duration about `0.55s`;
- easing `[0.22, 1, 0.36, 1]`;
- `viewport={{ once: true, amount: 0.18 }}`;
- reduced-motion path with no translation.

- [ ] **Step 2: Add `PageTransition.jsx`**

Use `motion.main` with a route-keyed opacity/8px entrance and ~0.35s duration. Reduced-motion users get opacity-only or static rendering.

- [ ] **Step 3: Integrate route transitions without adding a `/research` route**

Keep the current route set exactly:

```text
/
/components
/results
/methodology
/team
/publications
/documents
/contact
```

Do not create `Research.jsx`; the homepage remains the primary Research destination.

- [ ] **Step 4: Add CSS interaction transitions**

Add 150–200ms underline/arrow/nav transitions and ensure the existing `prefers-reduced-motion` block disables nonessential transitions.

- [ ] **Step 5: Verify**

```bash
npm run validate
npm run build
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add research-website/src/components/MotionReveal.jsx research-website/src/components/PageTransition.jsx research-website/src/App.jsx research-website/src/index.css
git commit -m "feat: add restrained research motion system"
```

---

### Task 3: Expand the scientific visual language without external image dependencies

**Files:**
- Modify: `research-website/src/components/ResearchPlate.jsx`
- Create: `research-website/src/components/ArchitectureVisual.jsx`
- Create: `research-website/src/components/ComponentVisual.jsx`
- Modify: `research-website/src/index.css`

**Interfaces:**

```jsx
<ArchitectureVisual />
<ComponentVisual component="C1" />
<ComponentVisual component="C2" />
<ComponentVisual component="C3" />
<ComponentVisual component="C4" dark={true} />
```

- [ ] **Step 1: Upgrade `ResearchPlate.jsx` instead of inventing a new hero file**

Retain the current accessible SVG role/label. Add restrained V4.1 color hierarchy:

- C1 signal: `#16A6A0`;
- C2 graph: `#4A9CC7`;
- C3 clinical/prototype marks: `#DB6B68` + `#4658D9`;
- fusion/evidence: `#4658D9` / navy.

Use SVG/CSS animation only for one or two slow signal-flow details. No random particles.

- [ ] **Step 2: Create `ArchitectureVisual.jsx`**

Render a research-specific system diagram containing C1, C2, C3, C4 and a clearly visible C2 state:

```text
ACTIVE FUSION WEIGHT 0.0
```

C2 must not have a line that visually enters active fusion.

- [ ] **Step 3: Create `ComponentVisual.jsx`**

Implement four SVG branches selected by `component`:

- `C1`: waveform → feature window → forecast band;
- `C2`: day × time nodes → temporal edges → held-out evidence annotation;
- `C3`: support embeddings → prototype geometry → query point;
- `C4`: eligible evidence → reliability weighting → fusion → retrieval/provenance.

Use `aria-label` values that describe the research meaning.

- [ ] **Step 4: Verify there are no external stock-image URLs**

```bash
npm run validate
npm run build
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add research-website/src/components/ResearchPlate.jsx research-website/src/components/ArchitectureVisual.jsx research-website/src/components/ComponentVisual.jsx research-website/src/index.css
git commit -m "feat: expand bespoke scientific visual system"
```

---

### Task 4: Recompose the homepage for richer section rhythm

**Files:**
- Modify: `research-website/src/pages/Home.jsx`
- Create: `research-website/src/components/TechnologyStrip.jsx`
- Modify: `research-website/src/index.css`

**Interfaces:**
- Home continues to consume `components` and `evidence` from `src/data/research.js`.
- It consumes `ResearchPlate`, `ArchitectureVisual`, `ComponentVisual`, `MotionReveal`, and `TechnologyStrip`.

- [ ] **Step 1: Keep the hero text-led but visually stronger**

Use the existing thesis and two-link action pattern. Keep the large right-side `ResearchPlate`, now colored and animated subtly.

- [ ] **Step 2: Add chapter-level background rhythm**

Implement this sequence with CSS classes rather than per-card coloring:

```text
hero              #F7F8FA
thesis             #FFFFFF
architecture       pale blue-grey
C1                 light neutral
C2                 cool blue-grey
C3                 #FFFFFF
C4                 #0E1A2B
Evidence           light neutral
Technology         #FFFFFF
Safety/Footer      deep navy / neutral
```

- [ ] **Step 3: Add architecture and four component visual chapters**

Each chapter pairs concise research text with `ComponentVisual`. C4 is the one dramatic dark section.

- [ ] **Step 4: Create `TechnologyStrip.jsx`**

Because no official logo asset files are committed, use restrained text wordmarks/names from verified current technologies rather than inventing image paths. Keep this component ready to accept actual logo files later.

- [ ] **Step 5: Apply motion only to major visual sections**

Wrap hero-adjacent visual, architecture, component chapters, evidence section, and technology strip with `MotionReveal`. Do not animate every paragraph.

- [ ] **Step 6: Verify**

```bash
npm run validate
npm run build
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add research-website/src/pages/Home.jsx research-website/src/components/TechnologyStrip.jsx research-website/src/index.css
git commit -m "feat: add immersive homepage research chapters"
```

---

### Task 5: Bring System, Evidence, and Methodology pages into the same visual language

**Files:**
- Modify: `research-website/src/pages/Components.jsx`
- Modify: `research-website/src/pages/Results.jsx`
- Modify: `research-website/src/pages/Methodology.jsx`
- Modify: `research-website/src/index.css`

**Interfaces:**
- These pages keep existing routes and shared research data.
- They reuse `ComponentVisual` and `MotionReveal`; do not duplicate new figure components per page.

- [ ] **Step 1: Upgrade `/components`**

Keep the current chapter structure. Add one relevant `ComponentVisual` per research stream, visible validation/status language, and the dark C4 treatment without returning to equal image cards.

- [ ] **Step 2: Upgrade `/results`**

Keep evidence values and context as the primary content. Add lightweight SVG/HTML evidence graphics for C2 CI/null comparison and C3 benchmark context. Do not use gauges/donut charts.

Required visible facts remain:

```text
C2 AUROC 0.5205
C2 CI 0.485–0.560
C2 null mean 0.4991
C2 p = 0.255
C2 active fusion weight 0.0
C3 AUROC ≈ 0.738
```

- [ ] **Step 3: Upgrade `/methodology`**

Use `MotionReveal` only on major stages and reuse the architecture/component visuals where they clarify flow.

- [ ] **Step 4: Verify**

```bash
npm run validate
npm run build
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add research-website/src/pages/Components.jsx research-website/src/pages/Results.jsx research-website/src/pages/Methodology.jsx research-website/src/index.css
git commit -m "feat: enrich system evidence and methodology presentation"
```

---

### Task 6: Keep People and application imagery honest about available assets

**Files:**
- Modify: `research-website/src/pages/Team.jsx` only if layout changes are needed.
- Modify: `docs/superpowers/specs/2026-09-03-immersive-scientific-editorial-v4-1-design.md` if asset inventory changes during implementation.

**Interfaces:**
- No component may reference a screenshot/portrait path unless the actual file exists in the repository at implementation time.

- [ ] **Step 1: Re-check repository assets before adding image markup**

```bash
find research-website -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.webp' -o -iname '*.svg' \)
```

Current expected state: no committed raster screenshot/portrait asset library.

- [ ] **Step 2: If the state is unchanged, keep Team as an intentional text directory**

Do not generate fake human portraits and do not add broken remote profile images merely to satisfy an image count.

- [ ] **Step 3: Do not create a fake ClinAnx screenshot section**

Until real screenshot files are committed, express the research-to-interface bridge with architecture/system visuals and copy. Actual ClinAnx screenshots become a later asset-backed enhancement, not an invented dependency in this PR.

- [ ] **Step 4: Verify**

```bash
npm run validate
npm run build
```

Expected: PASS.

- [ ] **Step 5: Commit only if source changed**

```bash
git add research-website/src/pages/Team.jsx docs/superpowers/specs/2026-09-03-immersive-scientific-editorial-v4-1-design.md
git commit -m "docs: keep redesign asset requirements repository-backed"
```

---

### Task 7: Final quality audit and update PR #3

**Files:**
- No expected new files.
- Modify only defects found during verification.

**Interfaces:**
- PR #3 remains open against `main`.

- [ ] **Step 1: Run clean validation/build**

```bash
cd research-website
npm ci
npm run validate
npm run build
```

Expected: all commands exit successfully.

- [ ] **Step 2: Confirm scientific/design stale terms are absent from active code/config**

```bash
grep -RniE "images\.unsplash\.com|pexels\.com|Plus Jakarta Sans|Outfit|JetBrains Mono|Adaptive Intervention Engine|KNN BallTree" src tailwind.config.js || true
```

Expected: no current active matches.

- [ ] **Step 3: Confirm current anchors remain**

```bash
grep -RniE "GLOBEM|CARE-AnxRAG|TC-WPN|0\.5205|Active fusion weight 0\.0" src
```

Expected: all required scientific anchors are represented.

- [ ] **Step 4: Confirm sync workflow remains untouched**

```bash
git diff origin/main -- .github/workflows/sync-to-main-repo.yml
```

Expected: no output.

- [ ] **Step 5: Review PR diff scope**

```bash
git diff --stat origin/main...HEAD
git diff --name-only origin/main...HEAD
```

Expected: redesign/spec/plan files only; no unrelated removal.

- [ ] **Step 6: Update PR #3 description**

Describe V4.1 as the final direction and explicitly note that this PR uses bespoke scientific SVG/React visuals because the website repository does not currently contain real screenshot/portrait assets.

- [ ] **Step 7: Verify GitHub Actions**

Expected: `Validate research website` completes successfully after the latest head commit.

- [ ] **Step 8: Leave PR open for review**

Do not auto-merge.

---

## Plan Self-Review

- The plan starts from files verified on `feature/premium-research-website-redesign` at the V4.1 spec commit.
- Every file not currently present is explicitly marked `Create`.
- The plan does not require Vitest/Testing Library, a `/research` route, Manrope, Instrument Serif, or the abandoned directory hierarchy.
- The plan does not assume ClinAnx/team/wearable image files that are absent from the repository.
- The stale Tailwind configuration is treated as a real defect and brought under `npm run validate` so this drift cannot recur silently.
- Current C2/C3/C4 scientific constraints remain protected.
