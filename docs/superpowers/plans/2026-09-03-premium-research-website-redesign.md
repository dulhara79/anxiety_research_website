# Premium Research Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the current research website into a premium, publication-grade, light-theme scientific website with bespoke research visuals, restrained motion, centralized scientific content, a dedicated Results page, and corrected C1–C4 research claims sourced from `R26-DS-012/main`.

**Architecture:** Keep the existing Vite + React application and HashRouter, but replace the current page-level duplicated content and generic card-heavy UI with a centralized research-data layer, focused layout/motion primitives, bespoke SVG/React research figures, and editorial page compositions. Framer Motion remains the only animation library. Validation combines component/content tests, route smoke tests, production builds, and the existing GitHub Actions PR build.

**Tech Stack:** React 18.3.1, Vite 5.4.1, React Router 6.26.1, Framer Motion 11.3.19, Tailwind CSS 3.4.10, Lucide React 0.439.0, Vitest + Testing Library for regression/content tests.

**Spec:** `docs/superpowers/specs/2026-09-03-premium-research-website-redesign-design.md`

## Global Constraints

- Implement only on `feature/premium-research-website-redesign`; never write directly to `main`.
- `R26-DS-012/main` is the scientific source of truth.
- Current component mapping must be C1 physiological, C2 final GLOBEM behavioural study, C3 clinical NLP / TC-WPN, C4 contextual modelling + reliability-weighted fusion + CARE-AnxRAG.
- Remove StudentLife-as-final C2 claims, validated C2 phenotype/high-risk-window claims, active C2 fusion contribution, KNN/NHANES as current C4 architecture, archived/inflated TC-WPN claims, and unsupported clinical-validation language.
- Use Manrope for primary display/interface typography, Instrument Serif only as a selective editorial accent, Inter for long-form/body content, and IBM Plex Mono for technical metadata.
- Use a warm ivory/off-white canvas, near-black graphite text, restrained cobalt primary signal, and muted modality colours.
- Generic stock photography must not be the primary visual language.
- No random particles, floating decorative bubbles, infinite spins, shimmer badges, universal glassmorphism, excessive pill tags, or repeated `rounded-3xl` card grids.
- Motion must be restrained and research-specific; honor `prefers-reduced-motion`.
- Framer Motion remains sufficient; do not add Three.js or a second animation framework.
- Production `npm run build` must pass before PR creation.
- `.github/workflows/sync-to-main-repo.yml` must remain unchanged by redesign work.
- The implementation PR must be opened for human review and must not be auto-merged.

---

## File Structure Map

### New files

- `research-website/src/data/research.js` — canonical website-facing research content and validated status flags.
- `research-website/src/data/research.test.js` — scientific-content invariants and stale-claim regression tests.
- `research-website/src/components/layout/PageShell.jsx` — shared page wrapper and route-level spacing contract.
- `research-website/src/components/layout/Section.jsx` — editorial section width and spacing primitive.
- `research-website/src/components/layout/EditorialGrid.jsx` — 12-column responsive editorial grid primitive.
- `research-website/src/components/motion/Reveal.jsx` — reduced-motion-aware section reveal.
- `research-website/src/components/motion/TextReveal.jsx` — restrained masked text reveal.
- `research-website/src/components/motion/RouteTransition.jsx` — route transition wrapper.
- `research-website/src/components/research/MultimodalFigure.jsx` — hero graphical abstract.
- `research-website/src/components/research/PhysiologicalFigure.jsx` — C1 waveform/forecast figure.
- `research-website/src/components/research/BehavioralGraphFigure.jsx` — C2 temporal graph figure.
- `research-website/src/components/research/TCWPNFigure.jsx` — C3 few-shot prototype figure.
- `research-website/src/components/research/FusionFigure.jsx` — C4 reliability-weighted fusion/RAG figure.
- `research-website/src/components/research/MetricFigure.jsx` — publication-like metric / CI presentation.
- `research-website/src/components/ui/Button.jsx` — consistent primary/secondary CTA primitive.
- `research-website/src/components/ui/FigureCaption.jsx` — scientific figure caption primitive.
- `research-website/src/components/ui/SectionLabel.jsx` — restrained mono eyebrow label.
- `research-website/src/pages/Results.jsx` — dedicated evidence/results page.
- `research-website/src/pages/Research.jsx` — concise research problem/gap/objectives page.
- `research-website/src/test/setup.js` — Testing Library/Vitest DOM setup.
- `research-website/src/App.test.jsx` — route smoke/navigation tests.

### Existing files to replace/refactor

- `research-website/package.json` — add test scripts/dependencies.
- `research-website/package-lock.json` — regenerated dependency lockfile.
- `research-website/tailwind.config.js` — typography, colour, spacing, shadow/radius tokens.
- `research-website/src/index.css` — replace current generic template styling with v2 design tokens and base styles.
- `research-website/src/App.jsx` — add Research/Results routes and route transitions.
- `research-website/src/components/Navbar.jsx` — premium quiet navigation and mobile sheet.
- `research-website/src/components/Footer.jsx` — editorial institutional footer.
- `research-website/src/pages/Home.jsx` — complete redesign.
- `research-website/src/pages/Components.jsx` — replace expandable cards with research chapters.
- `research-website/src/pages/Methodology.jsx` — replace old milestone/card content with current pipeline.
- `research-website/src/pages/Team.jsx` — correct ownership/roles and use editorial portrait layout.
- `research-website/src/pages/Publications.jsx` — research-library treatment.
- `research-website/src/pages/Documents.jsx` — research-library treatment.
- `research-website/src/pages/Contact.jsx` — minimal institutional contact experience.

---

### Task 1: Add the regression-test harness and lock scientific invariants

**Files:**
- Modify: `research-website/package.json`
- Modify: `research-website/package-lock.json`
- Create: `research-website/src/test/setup.js`
- Create: `research-website/src/data/research.js`
- Create: `research-website/src/data/research.test.js`

**Interfaces:**
- Produces: `project`, `components`, `methodologyStages`, `team`, `supervisors`, `results`, `safetyStatements` exported from `src/data/research.js`.
- Later pages consume these exports instead of embedding duplicated research claims.

- [ ] **Step 1: Add test tooling and scripts**

Add development dependencies for `vitest`, `jsdom`, `@testing-library/react`, and `@testing-library/jest-dom`; add scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

Configure Vitest in `vite.config.js` or a dedicated config with `environment: 'jsdom'` and `setupFiles: './src/test/setup.js'`.

- [ ] **Step 2: Create the test setup**

```js
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 3: Write failing scientific-invariant tests before populating the data module**

`research.test.js` must assert at minimum:

```js
import { describe, expect, it } from 'vitest'
import { components, results } from './research'

describe('research source-of-truth invariants', () => {
  it('uses the final C1-C4 component mapping', () => {
    expect(components.map(c => c.id)).toEqual(['C1', 'C2', 'C3', 'C4'])
    expect(components[1].title).toMatch(/behavio/i)
    expect(components[2].title).toMatch(/TC-WPN|clinical NLP/i)
    expect(components[3].title).toMatch(/fusion|CARE-AnxRAG/i)
  })

  it('keeps C2 excluded from active fusion', () => {
    expect(components.find(c => c.id === 'C2').fusionWeight).toBe(0)
  })

  it('records the final C2 held-out evidence', () => {
    expect(results.c2.auroc).toBeCloseTo(0.5205, 4)
    expect(results.c2.ci95).toEqual([0.485, 0.560])
    expect(results.c2.permutationP).toBeCloseTo(0.255, 3)
  })

  it('records the clean TC-WPN benchmark', () => {
    expect(results.c3.aurocMean).toBeCloseTo(0.7377, 4)
    expect(results.c3.aurocSd).toBeCloseTo(0.0031, 4)
  })

  it('does not encode obsolete current-architecture claims', () => {
    const serialized = JSON.stringify({ components, results }).toLowerCase()
    expect(serialized).not.toContain('studentlife (48 participants')
    expect(serialized).not.toContain('knn balltree')
    expect(serialized).not.toContain('adaptive intervention engine')
  })
})
```

- [ ] **Step 4: Run tests and confirm failure**

Run:

```bash
cd research-website
npm test -- src/data/research.test.js
```

Expected: FAIL because `src/data/research.js` does not yet provide the required exports/content.

- [ ] **Step 5: Implement the canonical data module from current `R26-DS-012/main` evidence**

Create structured exports with exact current values. Each component object must include at least:

```js
{
  id,
  title,
  shortTitle,
  lead,
  studentId,
  question,
  method,
  datasets,
  status,
  fusionWeight,
  technologies,
  resultSummary,
  limitations
}
```

For C2 encode the final GLOBEM result and `fusionWeight: 0`. For C3 encode clean TC-WPN benchmark values. For C4 encode reliability-weighted fusion and CARE-AnxRAG, not KNN/NHANES intervention logic.

- [ ] **Step 6: Run the scientific tests**

```bash
npm test -- src/data/research.test.js
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add research-website/package.json research-website/package-lock.json research-website/vite.config.js research-website/src/test/setup.js research-website/src/data/research.js research-website/src/data/research.test.js
git commit -m "test: lock research website source-of-truth"
```

---

### Task 2: Replace the visual foundation with the v2 editorial design system

**Files:**
- Modify: `research-website/tailwind.config.js`
- Modify: `research-website/src/index.css`
- Create: `research-website/src/components/layout/PageShell.jsx`
- Create: `research-website/src/components/layout/Section.jsx`
- Create: `research-website/src/components/layout/EditorialGrid.jsx`
- Create: `research-website/src/components/ui/Button.jsx`
- Create: `research-website/src/components/ui/FigureCaption.jsx`
- Create: `research-website/src/components/ui/SectionLabel.jsx`

**Interfaces:**
- Produces: reusable layout and UI primitives used by every page.
- `Section` props: `{ as = 'section', className = '', children, narrow = false }`.
- `EditorialGrid` props: `{ className = '', children }`.
- `Button` props: `{ to, href, variant = 'primary', children, className = '' }`.

- [ ] **Step 1: Add a failing primitive-render test**

Add a small test file adjacent to the primitives that renders `Section`, `SectionLabel`, and `Button` and checks semantic output and link destinations.

- [ ] **Step 2: Run test to verify it fails**

Expected: FAIL because primitives do not exist.

- [ ] **Step 3: Replace typography and token configuration**

Update Tailwind tokens to use:

```js
fontFamily: {
  sans: ['Inter', 'sans-serif'],
  display: ['Manrope', 'sans-serif'],
  editorial: ['Instrument Serif', 'serif'],
  mono: ['IBM Plex Mono', 'monospace'],
}
```

Define semantic colours such as `canvas`, `surface`, `ink`, `muted`, `rule`, `signal`, plus restrained modality accents.

- [ ] **Step 4: Rewrite global CSS**

Remove old `.hero-mesh`, `.card`, `.pill-*`, `floatBadge`, shimmer, spin, gradient-border, and other decorative-template utilities. Add:

- imported font families;
- off-white page canvas;
- high-quality text rendering;
- focus-visible styles;
- selection styling;
- editorial width utilities;
- subtle fine-rule utilities;
- reduced-motion media query that disables nonessential transforms/animations;
- responsive type scale through `clamp()` where appropriate.

- [ ] **Step 5: Implement primitives**

`Section` should enforce vertical rhythm and content width. `EditorialGrid` should use a 12-column desktop grid and collapse cleanly. `Button` should support internal/external links without duplicate markup.

- [ ] **Step 6: Run primitive tests and production build**

```bash
npm test
npm run build
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add research-website/tailwind.config.js research-website/src/index.css research-website/src/components/layout research-website/src/components/ui
git commit -m "feat: establish editorial research design system"
```

---

### Task 3: Implement the restrained motion layer

**Files:**
- Create: `research-website/src/components/motion/Reveal.jsx`
- Create: `research-website/src/components/motion/TextReveal.jsx`
- Create: `research-website/src/components/motion/RouteTransition.jsx`
- Create: `research-website/src/components/motion/motion.test.jsx`

**Interfaces:**
- `Reveal({ children, delay = 0, y = 20, className = '', once = true })`
- `TextReveal({ children, className = '', delay = 0 })`
- `RouteTransition({ children })`
- All components must honor `useReducedMotion()` from Framer Motion.

- [ ] **Step 1: Write reduced-motion tests**

Mock Framer Motion's reduced-motion hook and assert that `Reveal` renders without transform-heavy hidden state when reduced motion is enabled.

- [ ] **Step 2: Run the test and verify failure**

Expected: FAIL because motion primitives do not exist.

- [ ] **Step 3: Implement the three primitives**

Use a restrained easing curve such as `[0.22, 1, 0.36, 1]`. No bounce. Section reveals should use opacity plus 12–24px translation and optional light blur only.

- [ ] **Step 4: Run tests**

```bash
npm test -- src/components/motion/motion.test.jsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add research-website/src/components/motion
git commit -m "feat: add restrained reduced-motion animation primitives"
```

---

### Task 4: Build bespoke scientific figures before page redesign

**Files:**
- Create: `research-website/src/components/research/MultimodalFigure.jsx`
- Create: `research-website/src/components/research/PhysiologicalFigure.jsx`
- Create: `research-website/src/components/research/BehavioralGraphFigure.jsx`
- Create: `research-website/src/components/research/TCWPNFigure.jsx`
- Create: `research-website/src/components/research/FusionFigure.jsx`
- Create: `research-website/src/components/research/MetricFigure.jsx`
- Create: `research-website/src/components/research/researchFigures.test.jsx`

**Interfaces:**
- Figures are pure presentational React components with accessible `aria-label`/captions and no external image dependency.
- `MetricFigure({ value, label, context, ci, status, accent })`.

- [ ] **Step 1: Write semantic figure tests**

Assert each figure exposes a descriptive accessible label and that `MetricFigure` renders CI/status text when provided.

- [ ] **Step 2: Run test and verify failure**

Expected: FAIL because figures do not exist.

- [ ] **Step 3: Implement `MultimodalFigure`**

Use SVG fine lines and four research-specific signal families feeding a central fusion node:

- waveform trace for C1;
- temporal graph nodes/edges for C2;
- clinical text/prototype geometry for C3;
- contextual/evidence trace for C4.

Use very low-amplitude looped motion only for signal travel; disable it under reduced motion.

- [ ] **Step 4: Implement component figures**

`PhysiologicalFigure`: ECG/HRV-like trace + anomaly/forecast region.

`BehavioralGraphFigure`: day × time-segment nodes with within-day/across-day edges and explicit missingness marks; do not imply validated predictive success.

`TCWPNFigure`: note snippets → embedding points → support prototypes → query classification, explicitly label prototype consistency rather than confidence.

`FusionFigure`: eligible modality values → informativeness/recency/reliability weighting → Low/Medium/High or insufficient evidence → evidence retrieval/provenance.

- [ ] **Step 5: Implement `MetricFigure` as a publication figure, not a dashboard card**

Use large numeric typography, a fine baseline, optional CI line, and textual interpretation/status.

- [ ] **Step 6: Run tests and build**

```bash
npm test -- src/components/research/researchFigures.test.jsx
npm run build
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add research-website/src/components/research
git commit -m "feat: add bespoke scientific research figures"
```

---

### Task 5: Rebuild navigation, footer, routes, and page shell

**Files:**
- Modify: `research-website/src/App.jsx`
- Modify: `research-website/src/components/Navbar.jsx`
- Modify: `research-website/src/components/Footer.jsx`
- Create: `research-website/src/pages/Research.jsx`
- Create: `research-website/src/pages/Results.jsx`
- Create: `research-website/src/App.test.jsx`

**Interfaces:**
- Routes: `/`, `/research`, `/components`, `/methodology`, `/results`, `/team`, `/publications`, `/documents`, `/contact`.
- Navbar primary items: Research, Components, Methodology, Results, Team, Publications.
- Documents and Contact may be utility links.

- [ ] **Step 1: Write route smoke tests**

Using `MemoryRouter` or render `App` with HashRouter-compatible test setup, assert that Research and Results routes exist and navigation exposes the six primary destinations.

- [ ] **Step 2: Run tests and verify failure**

Expected: FAIL because new routes/pages are absent.

- [ ] **Step 3: Implement route shell and transitions**

Wrap route content with `RouteTransition`. Ensure scrolling resets appropriately on route change without breaking HashRouter.

- [ ] **Step 4: Rebuild Navbar**

Remove brain-icon gradient tile. Use text wordmark `R26 / DS / 012`, restrained off-white/white surface, fine border, active typography/rule, and a full-height mobile sheet with body-scroll lock.

- [ ] **Step 5: Rebuild Footer**

Use institutional/project metadata, concise sitemap, research-use disclaimer, SLIIT affiliation, and repository link. Avoid giant CTA-card styling.

- [ ] **Step 6: Add minimal Research/Results placeholders using production layout primitives**

These are temporary but real route shells, not blank pages.

- [ ] **Step 7: Run tests/build**

```bash
npm test -- src/App.test.jsx
npm run build
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add research-website/src/App.jsx research-website/src/components/Navbar.jsx research-website/src/components/Footer.jsx research-website/src/pages/Research.jsx research-website/src/pages/Results.jsx research-website/src/App.test.jsx
git commit -m "feat: rebuild navigation and research route architecture"
```

---

### Task 6: Rebuild the Home page as the flagship editorial experience

**Files:**
- Replace: `research-website/src/pages/Home.jsx`
- Create: `research-website/src/pages/Home.test.jsx`

**Interfaces:**
- Consumes: `project`, `components`, `results`, `team` from `data/research.js`.
- Consumes: `MultimodalFigure`, component figures, `MetricFigure`, layout/motion/UI primitives.

- [ ] **Step 1: Write home-content tests**

Assert:

- project title/thesis renders;
- all four component IDs render;
- C2 status is presented as research/non-deployment evidence;
- no old `Adaptive Intervention Engine` or `StudentLife Dataset` current claim renders;
- hero exposes links to Components and Methodology/Results.

- [ ] **Step 2: Run tests and verify failure against current Home page**

Expected: at least stale-claim and composition tests fail.

- [ ] **Step 3: Implement the new off-white hero**

Use left-aligned editorial title, minimal metadata line, concise thesis, two CTAs, and `MultimodalFigure`. Remove dark stock brain hero, floating badges, generic particles, and multiple glass CTA buttons.

- [ ] **Step 4: Implement research thesis and four alternating component chapters**

Use asymmetric layouts with large numbers `01`–`04`, one bespoke figure each, method/status copy from shared data, and restrained links.

- [ ] **Step 5: Implement evidence and research-integrity sections**

Use `MetricFigure` for C2/C3 evidence. Include an editorial explanation of leakage-aware validation, reliability gating, negative findings, and abstention.

- [ ] **Step 6: Implement team/document CTA sections without card grids**

Use real portrait references already present in project code only when stable; use clean text fallback otherwise.

- [ ] **Step 7: Run tests/build**

```bash
npm test -- src/pages/Home.test.jsx
npm run build
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add research-website/src/pages/Home.jsx research-website/src/pages/Home.test.jsx
git commit -m "feat: rebuild premium editorial homepage"
```

---

### Task 7: Rebuild Research and Components as a technical monograph

**Files:**
- Replace: `research-website/src/pages/Research.jsx`
- Replace: `research-website/src/pages/Components.jsx`
- Create: `research-website/src/pages/Research.test.jsx`
- Create: `research-website/src/pages/Components.test.jsx`

**Interfaces:**
- Research page consumes `project`, research gaps/objectives/safety statements.
- Components page consumes the canonical four `components` and the four research figures.

- [ ] **Step 1: Write tests for current architecture and stale-claim absence**

Components test must assert:

```js
expect(screen.getByText(/GLOBEM/i)).toBeInTheDocument()
expect(screen.getByText(/CARE-AnxRAG/i)).toBeInTheDocument()
expect(screen.queryByText(/Adaptive Intervention Engine/i)).not.toBeInTheDocument()
expect(screen.queryByText(/StudentLife \(48 participants/i)).not.toBeInTheDocument()
```

- [ ] **Step 2: Run tests and verify failure**

Expected: FAIL against current Components page.

- [ ] **Step 3: Implement Research page**

Sections: problem, why multimodal, research gaps, objectives, intended research context, research-use/safety boundaries. Use editorial text and one system figure rather than cards.

- [ ] **Step 4: Replace Components expandable cards with four chapters**

Each chapter must include research question, method, datasets, validation evidence, limitations, deployment/fusion status, technologies, and lead. Use compact metadata tables/lists, not chip clouds.

- [ ] **Step 5: Add sticky component index on desktop**

Use anchors `#c1`–`#c4`; degrade to a simple horizontal/stacked index on mobile.

- [ ] **Step 6: Run tests/build**

```bash
npm test -- src/pages/Research.test.jsx src/pages/Components.test.jsx
npm run build
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add research-website/src/pages/Research.jsx research-website/src/pages/Components.jsx research-website/src/pages/Research.test.jsx research-website/src/pages/Components.test.jsx
git commit -m "feat: rebuild research and component monograph pages"
```

---

### Task 8: Rebuild Methodology around the current end-to-end pipeline

**Files:**
- Replace: `research-website/src/pages/Methodology.jsx`
- Create: `research-website/src/pages/Methodology.test.jsx`

**Interfaces:**
- Consumes: `methodologyStages` from `data/research.js`.
- Stage order must be: acquisition/data → preprocessing → modality models → leakage-aware validation → reliability gating → fusion → evidence retrieval/decision support.

- [ ] **Step 1: Write methodology-order and stale-content tests**

Assert current stages appear in order and `NHANES 2017-2020 preprocessing` is not presented as a current C4 methodology step.

- [ ] **Step 2: Run test and verify failure**

Expected: FAIL against current outdated milestone content.

- [ ] **Step 3: Implement sticky stage navigation and vertical pipeline**

Desktop: sticky left progress rail + right editorial method content. Mobile: simple numbered sequence.

- [ ] **Step 4: Add restrained current-stage motion**

Only currently visible stage line/marker activates; reduced-motion users get static emphasis.

- [ ] **Step 5: Run tests/build**

```bash
npm test -- src/pages/Methodology.test.jsx
npm run build
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add research-website/src/pages/Methodology.jsx research-website/src/pages/Methodology.test.jsx
git commit -m "feat: rebuild leakage-aware methodology narrative"
```

---

### Task 9: Build the Results page as publication-grade evidence

**Files:**
- Replace: `research-website/src/pages/Results.jsx`
- Create: `research-website/src/pages/Results.test.jsx`

**Interfaces:**
- Consumes: `results` and component validation/status data.
- Must visually and textually distinguish benchmark/external validation, negative findings, engineering validation, and clinical validation.

- [ ] **Step 1: Write results tests**

Assert visible evidence includes:

- C2 `0.5205` AUROC;
- CI `0.485–0.560`;
- p-value `0.255`;
- fusion base weight `0.0` or explicit excluded-from-active-fusion wording;
- C3 `0.7377` mean AUROC and `0.0031` SD;
- text distinguishing engineering/scenario validation from clinical validation.

- [ ] **Step 2: Run tests and verify failure**

Expected: FAIL because the placeholder Results page lacks evidence.

- [ ] **Step 3: Implement overview and evidence chapters**

Use `MetricFigure` and restrained HTML/SVG publication charts. Avoid gauges, donut charts, and fake real-time dashboard visuals.

- [ ] **Step 4: Add validation-status matrix**

Rows C1–C4; columns dataset/setting, main metric, uncertainty/evidence, fusion/deployment status, limitation. Use accessible table markup.

- [ ] **Step 5: Add interpretation copy**

Explicitly explain why a negative C2 result is scientifically useful and why zero weighting prevents unsupported evidence from influencing fusion.

- [ ] **Step 6: Run tests/build**

```bash
npm test -- src/pages/Results.test.jsx
npm run build
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add research-website/src/pages/Results.jsx research-website/src/pages/Results.test.jsx
git commit -m "feat: add publication-grade research results page"
```

---

### Task 10: Rebuild Team using real identities and current ownership

**Files:**
- Replace: `research-website/src/pages/Team.jsx`
- Create: `research-website/src/pages/Team.test.jsx`
- Modify: `research-website/src/data/research.js` only if final verified profile links/portrait URLs need normalization.

**Interfaces:**
- Consumes: `team`, `supervisors`.
- Team ownership must map C1 Sendanayake, C2 Layathma, C3 Kaushalya, C4 Seneviratne.

- [ ] **Step 1: Write ownership tests**

Assert each student ID appears with the correct current component title. Assert C4 is not called Adaptive Intervention Engine and Kaushalya is not labeled M4/C4.

- [ ] **Step 2: Run test and verify failure against current page**

Expected: FAIL because current ownership labels are outdated.

- [ ] **Step 3: Implement asymmetric editorial member layout**

Use real portraits already referenced in the site where stable. Use consistent portrait aspect ratios and text fallback for failed images. Remove colourful tag clouds and identical elevated cards.

- [ ] **Step 4: Implement restrained supervisor/institution section**

No invented supervisor portraits. Use typography and institutional metadata.

- [ ] **Step 5: Run tests/build**

```bash
npm test -- src/pages/Team.test.jsx
npm run build
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add research-website/src/pages/Team.jsx research-website/src/pages/Team.test.jsx research-website/src/data/research.js
git commit -m "feat: update editorial research team page"
```

---

### Task 11: Rebuild Publications, Documents, and Contact as institutional research pages

**Files:**
- Replace: `research-website/src/pages/Publications.jsx`
- Replace: `research-website/src/pages/Documents.jsx`
- Replace: `research-website/src/pages/Contact.jsx`
- Create: `research-website/src/pages/UtilityPages.test.jsx`

**Interfaces:**
- Publications/Documents consume shared metadata from `research.js` where available.
- External links must use `target="_blank" rel="noopener noreferrer"`.

- [ ] **Step 1: Write utility-page semantic tests**

Assert documents/publications expose meaningful titles and actions; Contact exposes SLIIT/project/repository identity. Assert there is no fake form-submit success state unless a real endpoint exists.

- [ ] **Step 2: Run tests and verify expected failures**

- [ ] **Step 3: Rebuild Publications**

Use citation-style rows/list: title, authors, venue/status/year, concise summary, link/action. Avoid large icon cards.

- [ ] **Step 4: Rebuild Documents**

Use a research-library table/list with type, title, status/date, and download/open action. Keep document hierarchy clear and printable.

- [ ] **Step 5: Rebuild Contact**

Minimal institutional layout with research group/project identity, affiliation, repository, and only actionable communication methods already present in the source.

- [ ] **Step 6: Run tests/build**

```bash
npm test -- src/pages/UtilityPages.test.jsx
npm run build
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add research-website/src/pages/Publications.jsx research-website/src/pages/Documents.jsx research-website/src/pages/Contact.jsx research-website/src/pages/UtilityPages.test.jsx
git commit -m "feat: refine research library and contact pages"
```

---

### Task 12: Accessibility, responsiveness, image resilience, and stale-claim audit

**Files:**
- Modify as needed: `research-website/src/index.css`
- Modify as needed: all new page/components files
- Create: `research-website/src/contentAudit.test.js`

**Interfaces:**
- Produces a final regression audit across page source and shared data.

- [ ] **Step 1: Add global stale-claim audit**

Create a test that imports shared data and scans user-facing page modules (or a curated exported string set) for forbidden current-architecture phrases:

```js
const forbidden = [
  'Adaptive Intervention Engine',
  'StudentLife (48 participants',
  'KNN BallTree',
  '168 nodes = 42 days',
]
```

The test may allow historical mentions only when explicitly prefixed/labeled as historical; simplest implementation is to remove them from current user-facing copy entirely.

- [ ] **Step 2: Add image fallback behavior**

Every remote image should preserve layout and either hide cleanly or fall back to a neutral identity block on `onError`. Do not allow broken-image icons to remain visible.

- [ ] **Step 3: Perform responsive pass**

Verify intended breakpoints for 360px, 768px, 1024px, 1440px widths. Specifically check:

- hero title wrapping;
- mobile nav sheet;
- component chapters;
- methodology sticky rail disabled/simplified on mobile;
- result tables horizontally scroll or stack accessibly;
- team portraits/copy order;
- footer wrapping.

- [ ] **Step 4: Perform reduced-motion pass**

Use browser/devtools `prefers-reduced-motion: reduce` and verify figures retain meaning without motion.

- [ ] **Step 5: Keyboard/focus pass**

Tab through nav, CTAs, component index, documents, external links, and mobile navigation controls. Ensure visible focus ring and no keyboard trap.

- [ ] **Step 6: Run complete test suite/build**

```bash
npm test
npm run build
```

Expected: all tests PASS; production build succeeds.

- [ ] **Step 7: Confirm sync workflow untouched**

```bash
git diff origin/main -- .github/workflows/sync-to-main-repo.yml
```

Expected: no output.

- [ ] **Step 8: Commit final quality pass**

```bash
git add research-website
git commit -m "chore: complete accessibility and research content audit"
```

---

### Task 13: Final verification and Pull Request

**Files:**
- No intended source changes unless verification uncovers a defect.

**Interfaces:**
- Produces the final reviewable PR from `feature/premium-research-website-redesign` to `main`.

- [ ] **Step 1: Rebase/refresh against latest source main before final PR if main moved**

Fetch latest `main`. If it changed since branch creation, integrate it without discarding redesign commits and rerun the full verification suite.

- [ ] **Step 2: Run final verification from clean dependencies**

```bash
cd research-website
rm -rf node_modules
npm ci
npm test
npm run build
```

Expected: all tests pass and Vite production build succeeds.

- [ ] **Step 3: Review branch scope**

```bash
git diff --stat origin/main...HEAD
git diff --name-only origin/main...HEAD
```

Expected: redesign files plus spec/plan only; sync workflow unchanged; no unrelated repository content removed.

- [ ] **Step 4: Search final user-facing code for stale claims**

```bash
grep -RniE "Adaptive Intervention Engine|StudentLife \(48 participants|KNN BallTree|168 nodes = 42 days" src || true
```

Expected: no current user-facing stale claims.

- [ ] **Step 5: Create the PR**

Title:

```text
feat: redesign research website with premium scientific UI
```

PR body must summarize:

- editorial light-theme redesign;
- custom scientific figures and restrained motion;
- Research and Results routes;
- centralized research source-of-truth;
- corrected C1–C4 mapping and stale-claim removal;
- accessibility/responsive work;
- test/build results;
- confirmation that the existing cross-repository sync workflow remains unchanged.

- [ ] **Step 6: Verify GitHub Actions PR build**

Expected: `Validate research website` succeeds and the cross-repo mirror job is skipped for the pull-request event.

- [ ] **Step 7: Leave PR open for human review**

Do not merge automatically. After human merge into website `main`, the previously implemented sync workflow is responsible for creating/updating `mirror/research-website/main` and the target PR in `R26-DS-012`.
