# Immersive Light Scientific Research Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the R26-DS-012 research website into a light, cinematic scientific narrative that explains the research problem and evidence boundaries before introducing the four technical components.

**Architecture:** Keep the existing React/Vite/React Router/Framer Motion stack, but replace the current page-first composition with structured research data plus focused narrative components. `Home.jsx` becomes a composition layer; reusable hero, story, research, evidence, document and team components own individual sections. Deep routes reuse the same source data so homepage copy and technical pages cannot silently diverge.

**Tech Stack:** React 18, Vite 5, Tailwind CSS 3, React Router 6, Framer Motion 11, Lucide React, Vitest + React Testing Library for focused UI/behavior tests.

**Spec:** `docs/superpowers/specs/2026-09-25-immersive-light-research-website-design.md`

## Global Constraints

- Maintain React, Vite, Tailwind CSS, React Router, Framer Motion and Lucide React.
- Use Inter globally with weights 300, 400, 500 and 600.
- Main theme is light, warm and scientific; do not use a full-screen dark hero overlay or global video dimming.
- The Google Flow URL is a source reference only; hero playback uses configurable local `/media/research-hero.webm`, `/media/research-hero.mp4` and `/media/research-hero-poster.webp` assets.
- Do not fabricate metrics, datasets, publications, citations, clinical capabilities, application screenshots or researcher photos.
- Research observation is not diagnosis; current assessment is not future forecasting.
- TC-WPN is a Clinical NLP signal, not overall patient risk.
- Missing/unavailable evidence is not low anxiety or zero risk.
- Preserve C2’s current excluded evidence state and active fusion weight `0.0` until the research source changes.
- Honor `prefers-reduced-motion` and simplify interaction on mobile.
- The site must pass `npm run validate`, focused tests and `npm run build` before completion.

## Review Focus

1. **Hero media missing or autoplay blocked:** the poster/ambient fallback must preserve readable hero content without a broken-video surface. Covered in Task 3 tests.
2. **Reduced-motion user:** character stagger, scroll-scrubbed movement and decorative motion must be disabled or simplified while content remains complete. Covered in Tasks 3 and 10 tests.
3. **Unavailable/excluded modality:** UI must render an explicit state rather than a numeric zero or “low” interpretation. Covered in Tasks 1 and 6 tests.
4. **Mobile navigation / long research title:** menu, hero copy and research-title reveal must remain usable without horizontal overflow. Covered in Tasks 2, 5 and 10 tests.
5. **Unverified/publication data absent:** document/publication views must omit or label unavailable material rather than manufacture placeholder claims. Covered in Task 8 tests.

---

### Task 1: Split research content into auditable domain modules

**Files:**
- Modify: `research-website/src/data/research.js`
- Create: `research-website/src/data/components.js`
- Create: `research-website/src/data/literature.js`
- Create: `research-website/src/data/findings.js`
- Create: `research-website/src/data/documents.js`
- Create: `research-website/src/data/publications.js`
- Create: `research-website/src/data/timeline.js`
- Create: `research-website/src/data/people.js`
- Modify: `research-website/scripts/validate-content.mjs`
- Create: `research-website/src/data/research.test.js`
- Modify: `research-website/package.json`

**Interfaces:**
- Produces: exported objects/arrays `researchMeta`, `researchNarrative`, `components`, `literatureThemes`, `findings`, `documents`, `publications`, `timeline`, `people`, `supervisors`, `researchStates`.
- Consumers: all homepage and deep-route components in later tasks.

- [ ] **Step 1: Add focused data tests that encode the scientific boundaries**

Create `src/data/research.test.js` with assertions that:

```js
import { describe, expect, it } from 'vitest'
import { components } from './components'
import { findings } from './findings'

const byId = Object.fromEntries(components.map(item => [item.id, item]))

describe('research content invariants', () => {
  it('keeps C2 excluded from active fusion', () => {
    expect(byId.C2.fusionState).toBe('excluded')
    expect(byId.C2.activeFusionWeight).toBe(0)
  })

  it('describes C3 as a clinical NLP signal rather than overall risk', () => {
    expect(byId.C3.outputLabel).toBe('Clinical NLP signal')
    expect(byId.C3.claimBoundary).toMatch(/not overall patient risk/i)
  })

  it('does not encode unavailable evidence as zero risk', () => {
    expect(byId.C4.missingEvidenceMeaning).toMatch(/not.*low|not.*zero/i)
  })

  it('keeps findings paired with evaluation context', () => {
    expect(findings.every(item => item.metric && item.value && item.context && item.interpretation)).toBe(true)
  })
})
```

- [ ] **Step 2: Add Vitest as a development dependency and a `test` script**

Update `package.json` with:

```json
"scripts": {
  "dev": "vite",
  "test": "vitest run",
  "validate": "node scripts/validate-content.mjs",
  "build": "npm run validate && vite build",
  "preview": "vite preview"
}
```

and add `vitest` to `devDependencies`.

- [ ] **Step 3: Run the new test and verify it fails before the split**

Run:

```bash
npm test -- src/data/research.test.js
```

Expected: FAIL because `components.js` and `findings.js` do not exist.

- [ ] **Step 4: Move existing verified component/evidence/team data into focused modules and add narrative metadata**

Implement the exported structures listed above. Keep every numeric result already present in `research.js` unchanged unless independently verified against R26-DS-012 during implementation. Add `source`/`provenance` strings to externally visible claim records where practical.

- [ ] **Step 5: Strengthen `validate-content.mjs`**

Fail validation if:

- C2 active fusion weight is not `0` while state is `excluded`;
- C3 output label is missing;
- a finding lacks evaluation context or interpretation;
- a publication is marked published without a public URL/DOI/citation source;
- a document marked confidential appears in the exported public document list.

- [ ] **Step 6: Run tests and validation**

```bash
npm test -- src/data/research.test.js
npm run validate
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add research-website/package.json research-website/package-lock.json research-website/scripts/validate-content.mjs research-website/src/data
git commit -m "refactor: structure auditable research content"
```

---

### Task 2: Build the global editorial shell and responsive navigation

**Files:**
- Modify: `research-website/index.html`
- Modify: `research-website/src/index.css`
- Modify: `research-website/src/App.jsx`
- Modify: `research-website/src/components/Navbar.jsx`
- Modify: `research-website/src/components/Footer.jsx`
- Create: `research-website/src/components/shared/PageShell.jsx`
- Create: `research-website/src/components/Navbar.test.jsx`
- Modify: `research-website/package.json`

**Interfaces:**
- Produces: global visual tokens, accessible navigation behavior and route shell.
- Consumes: route list from `App.jsx` and research identity from `researchMeta`.

- [ ] **Step 1: Add React Testing Library dependencies and write a failing navigation test**

The test renders `Navbar` inside a memory router, opens the compact menu, and verifies `aria-expanded`, route labels and the `Explore Research` action.

- [ ] **Step 2: Run the navigation test and verify the current navbar fails the new labels/behavior**

```bash
npm test -- src/components/Navbar.test.jsx
```

- [ ] **Step 3: Load Inter in `index.html` and define the warm scientific token system in `index.css`**

Define root variables for canvas, ink, muted text, borders, glass, teal/cyan/lavender/peach accents and spacing. Keep display heading weight near 400 and letter spacing near `-0.04em`.

- [ ] **Step 4: Rebuild `Navbar.jsx`**

Desktop labels:

`Overview`, `Research`, `Components`, `System`, `Findings`, `Documents`, `Team`.

Include brand `R26—DS—012`, compact mobile menu with Escape/route-close behavior, focus-visible styles, and a final `Explore Research` CTA.

- [ ] **Step 5: Update `App.jsx` route names without creating empty routes**

Keep currently useful routes working while introducing aliases/new routes only when their page content exists in later tasks. `Navbar` must never point at a route that only renders a blank shell.

- [ ] **Step 6: Run navigation tests**

```bash
npm test -- src/components/Navbar.test.jsx
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add research-website/index.html research-website/src/index.css research-website/src/App.jsx research-website/src/components/Navbar.jsx research-website/src/components/Footer.jsx research-website/src/components/shared research-website/src/components/Navbar.test.jsx research-website/package.json research-website/package-lock.json
git commit -m "feat: add scientific editorial shell"
```

---

### Task 3: Implement the cinematic hero with robust media fallback

**Files:**
- Create: `research-website/src/components/hero/ResearchHero.jsx`
- Create: `research-website/src/components/hero/HeroMedia.jsx`
- Create: `research-website/src/components/hero/AnimatedHeading.jsx`
- Create: `research-website/src/components/hero/HeroNavbarContext.jsx`
- Create: `research-website/src/components/hero/ResearchHero.test.jsx`
- Modify: `research-website/src/index.css`
- Create: `research-website/public/media/.gitkeep`

**Interfaces:**
- `HeroMedia({ webmSrc, mp4Src, posterSrc, objectPosition })` renders the video/fallback surface.
- `AnimatedHeading({ lines, initialDelay = 200, charDelay = 30, duration = 500 })` renders character spans and disables stagger when reduced motion is active.
- `ResearchHero` consumes hero text from `researchNarrative.hero`.

- [ ] **Step 1: Write hero tests**

Tests verify:

- local media paths are used rather than a Google Flow viewing URL;
- the `<video>` has `autoPlay`, `muted`, `loop`, `playsInline`, `preload="metadata"` and poster;
- hero headline and both CTAs render even when video playback is unavailable;
- reduced-motion mode exposes the full heading without stagger delays.

- [ ] **Step 2: Run hero tests and verify they fail**

```bash
npm test -- src/components/hero/ResearchHero.test.jsx
```

- [ ] **Step 3: Implement `HeroMedia` and `AnimatedHeading`**

Use `/media/research-hero.webm`, `/media/research-hero.mp4`, `/media/research-hero-poster.webp` as defaults. Do not add a full-screen tint/gradient overlay. Keep a CSS-only atmospheric fallback when no media exists.

- [ ] **Step 4: Implement `ResearchHero`**

Use the required headline, support copy, CTA row, bottom-right contextual glass tag and `RESEARCH PROTOTYPE · 2026` marker. Position copy toward the lower-left at desktop sizes.

- [ ] **Step 5: Add responsive and reduced-motion CSS**

Use `100svh`, object-cover, responsive object-position, localized glass only, subtle text shadow when required, and reduced-motion fallbacks.

- [ ] **Step 6: Run hero tests**

```bash
npm test -- src/components/hero/ResearchHero.test.jsx
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add research-website/src/components/hero research-website/src/index.css research-website/public/media
git commit -m "feat: add cinematic research hero"
```

---

### Task 4: Build the pre-component research narrative

**Files:**
- Create: `research-website/src/components/story/SectionLabel.jsx`
- Create: `research-website/src/components/story/AnxietyContext.jsx`
- Create: `research-website/src/components/story/ObservationTimeline.jsx`
- Create: `research-website/src/components/story/SnapshotProblem.jsx`
- Create: `research-website/src/components/story/StorySections.test.jsx`
- Modify: `research-website/src/index.css`

**Interfaces:**
- Consumes: `researchNarrative.context`, `researchNarrative.timescales`, `researchNarrative.snapshotProblem`.
- Produces: first three story sections after the hero.

- [ ] **Step 1: Write failing narrative tests**

Verify section order and copy semantics:

1. context appears before any `C1`/`C2`/`C3`/`C4` label;
2. timescale labels include `NOW`, `DAYS / WEEKS`, `CLINICAL ENCOUNTERS`, `BACKGROUND`;
3. snapshot copy explicitly preserves the value of clinical encounters and does not claim sensing replaces clinicians.

- [ ] **Step 2: Run the tests and verify failure**

- [ ] **Step 3: Implement the quiet context section**

Use large editorial typography and a custom CSS/SVG signal field rather than mental-health stock imagery.

- [ ] **Step 4: Implement the observation timeline**

Use four observation tracks with restrained scroll-linked activation. Provide a static stacked version for reduced motion/mobile.

- [ ] **Step 5: Implement the snapshot comparison**

Left: `A clinical encounter` / one visible time point. Right: `Life between encounters` / longer incomplete timeline.

- [ ] **Step 6: Run tests**

```bash
npm test -- src/components/story/StorySections.test.jsx
```

- [ ] **Step 7: Commit**

```bash
git add research-website/src/components/story research-website/src/index.css
git commit -m "feat: explain anxiety context before components"
```

---

### Task 5: Add literature landscape, research gap and thesis reveal

**Files:**
- Create: `research-website/src/components/story/LiteratureLandscape.jsx`
- Create: `research-website/src/components/story/ResearchGap.jsx`
- Create: `research-website/src/components/story/ResearchThesis.jsx`
- Create: `research-website/src/components/story/ResearchFraming.test.jsx`
- Modify: `research-website/src/data/literature.js`
- Modify: `research-website/src/index.css`

**Interfaces:**
- Consumes: verified `literatureThemes` and `researchNarrative.gap/thesis`.
- Produces: concise theme synthesis, gap transition and full-title reveal.

- [ ] **Step 1: Add tests that prevent citation fabrication**

Require each literature theme either to have real project-source references or an explicit `sourceStatus: 'awaiting-public-source'` that suppresses citation UI. Tests must fail if a fake reference string is rendered.

- [ ] **Step 2: Implement `LiteratureLandscape`**

Themes: physiological sensing, passive behavioural sensing, clinical NLP, personalization, multimodal modelling, uncertainty/reliability, forecasting, evidence-aware decision support. Each displays `what prior research demonstrates`, `typical limitations`, `project relevance` only when supported by project literature artifacts.

- [ ] **Step 3: Implement `ResearchGap`**

Use the required reliability-centered headline and the seven research challenges. Animate fragmented signal fragments resolving into a clearer structure; reduced-motion gets the final static state.

- [ ] **Step 4: Implement `ResearchThesis`**

Reveal the research question first, then the full academic title and `R26—DS—012 · SLIIT · 2026`. Ensure the title wraps safely on 320px-wide layouts.

- [ ] **Step 5: Run tests and commit**

```bash
npm test -- src/components/story/ResearchFraming.test.jsx
git add research-website/src/components/story research-website/src/data/literature.js research-website/src/index.css
git commit -m "feat: add literature gap and thesis narrative"
```

---

### Task 6: Implement modality approach, components, fusion and current-vs-forecast distinction

**Files:**
- Create: `research-website/src/components/research/ModalityOverview.jsx`
- Create: `research-website/src/components/research/ComponentFeature.jsx`
- Create: `research-website/src/components/research/ComponentsStory.jsx`
- Create: `research-website/src/components/research/FusionStory.jsx`
- Create: `research-website/src/components/research/CurrentForecastSplit.jsx`
- Create: `research-website/src/components/research/ResearchFlow.test.jsx`
- Modify: `research-website/src/index.css`

**Interfaces:**
- `ComponentFeature({ component, index })` renders title, research question, method, evidence state and route action.
- `FusionStory` consumes explicit modality state fields: `available`, `recency`, `coverage`, `reliability`, `validationState`.
- `CurrentForecastSplit` consumes current/forecast boundary copy from structured data.

- [ ] **Step 1: Write research-flow tests**

Verify:

- four conceptual modalities appear before `C1` labels;
- C2 visibly says excluded / active fusion weight `0.0`;
- C3 visibly says `Clinical NLP signal`;
- a missing modality state renders `Unavailable`/`Insufficient evidence`, never `0 risk`;
- current and forward sections use different headings and physiological forecasting is not called validated multimodal attack prediction.

- [ ] **Step 2: Implement the modality overview**

Use four distinct signal paths that remain separate until the scroll transition toward fusion.

- [ ] **Step 3: Implement large alternating component features**

C1–C4 sections should use asymmetrical layouts, not four equal cards. C2 gets an explicit evidence-state annotation rather than warning-red marketing treatment.

- [ ] **Step 4: Implement `FusionStory`**

Visual equation:

`availability + recency + coverage + reliability + validation evidence → usable contribution`.

Signals can arrive as strong, stale, incomplete, unavailable or excluded.

- [ ] **Step 5: Implement `CurrentForecastSplit`**

Use a split viewport: `CURRENT` vs `FORWARD`. Copy must state current multimodal evidence separately from defined-horizon forecast evidence.

- [ ] **Step 6: Run tests and commit**

```bash
npm test -- src/components/research/ResearchFlow.test.jsx
git add research-website/src/components/research research-website/src/index.css
git commit -m "feat: add multimodal research and fusion story"
```

---

### Task 7: Build responsive system architecture scrollytelling

**Files:**
- Create: `research-website/src/components/research/ArchitectureStory.jsx`
- Create: `research-website/src/components/research/ArchitectureDiagram.jsx`
- Create: `research-website/src/components/research/ArchitectureStory.test.jsx`
- Create: `research-website/src/data/architecture.js`
- Modify: `research-website/src/index.css`

**Interfaces:**
- `architectureStages` stores nodes/edges by progressive stage.
- `ArchitectureDiagram({ stage, compact = false })` renders exact repository-derived labels/relationships.

- [ ] **Step 1: Write architecture tests**

Assert the canonical sequence exists:

`Participant → Signals → Component models → Canonical backend state → Quality / eligibility checks → Reliability-aware fusion → Current research assessment → Evidence support → Audience-specific interfaces`.

Also assert the forecast lane is not merged into current assessment unless the verified architecture source explicitly does so.

- [ ] **Step 2: Populate `architecture.js` from verified R26-DS-012 architecture artifacts**

Do not infer undocumented service relationships.

- [ ] **Step 3: Implement responsive SVG/DOM diagram**

Desktop progressively reveals stages. Mobile renders staged vertical groups with no horizontal panning requirement.

- [ ] **Step 4: Add `View Full Architecture` expansion**

Use an accessible dialog or dedicated route, not a full-width unreadable PNG.

- [ ] **Step 5: Run tests and commit**

```bash
npm test -- src/components/research/ArchitectureStory.test.jsx
git add research-website/src/components/research/ArchitectureStory.jsx research-website/src/components/research/ArchitectureDiagram.jsx research-website/src/components/research/ArchitectureStory.test.jsx research-website/src/data/architecture.js research-website/src/index.css
git commit -m "feat: add progressive research architecture"
```

---

### Task 8: Rebuild findings, documents, publications, timeline and team sections

**Files:**
- Create: `research-website/src/components/evidence/FindingsPreview.jsx`
- Create: `research-website/src/components/evidence/FindingChart.jsx`
- Create: `research-website/src/components/evidence/LimitationNote.jsx`
- Create: `research-website/src/components/documents/DocumentCollection.jsx`
- Create: `research-website/src/components/story/ResearchTimeline.jsx`
- Create: `research-website/src/components/team/ResearchTeam.jsx`
- Create: `research-website/src/components/evidence/PublicResearchContent.test.jsx`
- Modify: `research-website/src/pages/Results.jsx`
- Modify: `research-website/src/pages/Documents.jsx`
- Modify: `research-website/src/pages/Publications.jsx`
- Modify: `research-website/src/pages/Team.jsx`
- Modify: `research-website/src/index.css`

**Interfaces:**
- Consumes the structured modules from Task 1.
- Produces homepage previews and deeper route views using the same data.

- [ ] **Step 1: Write tests for public-output safety**

Verify confidential documents are omitted, absent publication links do not generate fake DOI buttons, team entries contain no generated image URL, and every numeric finding contains evaluation context.

- [ ] **Step 2: Implement restrained findings preview and full findings page**

Use compact charts/tables with axes/context and limitations. Preserve C2’s null-like evaluation and C3’s supported held-out result only with the context stored in `findings.js`.

- [ ] **Step 3: Implement categorized document collections**

Project, Presentations, Publications, Individual Research. Only render View/Download when a real public URL exists.

- [ ] **Step 4: Implement research journey**

Use actual verified project dates only. If a milestone lacks a verified date, omit the date instead of guessing.

- [ ] **Step 5: Implement team/supervision hierarchy**

Research Team → Academic Supervision → Clinical / External Supervision where appropriate. Use initials when no approved photograph exists.

- [ ] **Step 6: Run tests and commit**

```bash
npm test -- src/components/evidence/PublicResearchContent.test.jsx
git add research-website/src/components/evidence research-website/src/components/documents research-website/src/components/team research-website/src/components/story/ResearchTimeline.jsx research-website/src/pages research-website/src/index.css
git commit -m "feat: rebuild evidence documents and team experience"
```

---

### Task 9: Compose the homepage and complete deep-route architecture

**Files:**
- Modify: `research-website/src/pages/Home.jsx`
- Create: `research-website/src/pages/Research.jsx`
- Modify: `research-website/src/pages/Components.jsx`
- Create: `research-website/src/pages/System.jsx`
- Create: `research-website/src/pages/Applications.jsx`
- Create: `research-website/src/pages/About.jsx`
- Modify: `research-website/src/pages/Methodology.jsx`
- Modify: `research-website/src/App.jsx`
- Create: `research-website/src/pages/Home.test.jsx`

**Interfaces:**
- `Home.jsx` imports and orders finished section components only.
- Deep routes consume the same structured data modules; no duplicate research constants.

- [ ] **Step 1: Write a homepage-order test**

Render `Home` and assert DOM order:

`hero < context < observation < snapshot < literature < gap < thesis < approach < components < fusion < architecture < current/forecast < findings < interpretation < applications/evidence < methodology < documents < timeline < team < limitations`.

- [ ] **Step 2: Replace current `Home.jsx` with composition-only markup**

No long research paragraphs or repeated data arrays should remain in the page file.

- [ ] **Step 3: Build useful deep pages from the shared data**

Create `/research`, `/system`, `/applications`, `/about`; update `/components`, `/methodology`, `/findings`, `/documents`, `/publications`, `/team`. Do not add empty nested routes merely to mirror the ideal tree.

- [ ] **Step 4: Update navigation/routes**

Add redirects/aliases from `/results` to `/findings` if needed so existing inbound links do not break.

- [ ] **Step 5: Run page tests**

```bash
npm test -- src/pages/Home.test.jsx
```

- [ ] **Step 6: Commit**

```bash
git add research-website/src/pages research-website/src/App.jsx
git commit -m "feat: compose complete research narrative"
```

---

### Task 10: Accessibility, responsiveness, performance and final verification

**Files:**
- Modify: `research-website/src/index.css`
- Modify: hero/story/research components as findings require
- Create: `research-website/src/accessibility.test.jsx`
- Modify: `research-website/README.md` if present, otherwise root `README.md`

**Interfaces:**
- No new product interface; this task hardens the full website.

- [ ] **Step 1: Add accessibility/reduced-motion tests**

Test keyboard-reachable nav/menu/dialog controls, visible accessible names, no duplicate landmark IDs, and reduced-motion class/behavior paths.

- [ ] **Step 2: Verify 320px, 768px and desktop layout rules in CSS**

Ensure no horizontal overflow from the full research title, architecture, evidence tables or navigation. Convert complex desktop layouts to stacked/staged mobile forms.

- [ ] **Step 3: Audit media behavior**

Ensure hero uses `preload="metadata"`, poster fallback, no raw Flow URL and no 4K requirement. Lazy-load below-fold images/screenshots and include explicit dimensions where assets exist.

- [ ] **Step 4: Run the complete verification suite**

```bash
npm test
npm run validate
npm run build
```

Expected: all tests PASS, validator exits 0, Vite production build succeeds.

- [ ] **Step 5: Inspect the generated bundle and browser console**

Run:

```bash
npm run dev
```

Manually verify desktop/mobile/reduced-motion states and confirm no console errors or broken internal routes.

- [ ] **Step 6: Commit final hardening**

```bash
git add research-website README.md
git commit -m "chore: harden research website experience"
```

- [ ] **Step 7: Final branch review**

Compare `redesign/immersive-light-research-2026` against `main`, verify no confidential/private artifacts were introduced, and open a pull request summarizing scientific-boundary and UX changes.
