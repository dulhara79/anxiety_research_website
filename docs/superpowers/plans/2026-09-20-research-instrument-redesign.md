# Research Instrument Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a distinctive, research-first R26-DS-012 public website that uses real artefacts and research-native motion to explain acquisition, validation, fusion, current assessment, physiological forecasting, and audience-specific projections without violating the handbook.

**Architecture:** Keep the existing React 18 + Vite application, but split factual content from presentation and split the landing-page experience into focused research-story components. Framer Motion remains the only primary animation framework; custom SVG/CSS handles scientific traces and flow paths. CURRENT/TARGET/PROPOSED/EXPERIMENTAL states are explicit structured data rendered by shared status components so visual storytelling cannot silently overclaim implementation state.

**Tech Stack:** React 18.3.1, React Router 6.26.1, Framer Motion 11.3.19, Lucide React 0.439.0, Vite 5.4.1, CSS/Tailwind pipeline already present, Vitest + Testing Library for component tests.

**Spec:** `docs/superpowers/specs/2026-09-20-research-instrument-redesign-design.md`

## Global Constraints

- The site must distinguish `CURRENT`, `TARGET`, `PROPOSED`, `EXPERIMENTAL / EXCLUDED`, `UNAVAILABLE`, and `VERIFIED PUBLIC RECORD` when those states matter.
- Do not present TARGET or PROPOSED system behavior as already implemented.
- Keep current multimodal assessment and near-term forecast as separate visual and semantic objects.
- A C1 future trajectory is labelled physiological unless a true multimodal forecasting method has been specified and validated.
- C2 must remain visibly experimental/excluded where the current evidence gate requires active fusion weight `0.0`.
- Missing/stale/unavailable evidence must never be rendered as low risk or zero.
- No client-side authoritative multimodal fusion may be implied.
- No exact-time anxiety-attack guarantee or diagnostic-device claim.
- AI-generated imagery may support the visual narrative but must not be presented as real application/system evidence.
- Real/approved research artefacts get visual priority.
- Keep React/Vite; keep Framer Motion as the primary animation dependency; do not add GSAP, Three.js, Lenis, Lottie or Rive in this implementation.
- Continuous animation should use transforms/opacity where possible.
- Honor `prefers-reduced-motion`; the reduced-motion path must preserve research meaning.
- Light theme is default; dark mode remains available and persists locally.
- Mobile must not depend on hover, pointer lens, or pinned desktop-only interaction.
- Publication/acceptance/indexing/DOI status must only be shown when verified.
- Internal implementation documents, credentials, private operational information, and unpublished restricted material must not be exposed as public downloads.

## Review Focus

1. **Status leakage:** a TARGET/PROPOSED object rendered without its status label must fail a component/data validation test.
2. **Forecast semantics:** any forecast object with `scope: 'physiological'` must render the word “Physiological” and never render “multimodal forecast”.
3. **Unavailable evidence:** null/unavailable evidence must render “Unavailable”/“Insufficient evidence”, never `0`, `0.0`, “Low”, or a green risk state.
4. **Reduced motion:** with `prefers-reduced-motion: reduce`, every critical research stage remains readable and no pointer/continuous animation is required to reveal content.
5. **C2 exclusion:** the CURRENT validation/fusion story must show C2 as excluded with active fusion weight `0.0`, and the fusion visualization must only mark eligible CURRENT streams as converging.

---

## File Structure

### New content/data modules
- `research-website/src/data/researchData.js` — component definitions, questions, methods, data sources, ownership.
- `research-website/src/data/evidenceData.js` — evidence records and current eligibility.
- `research-website/src/data/systemStatus.js` — CURRENT/TARGET/PROPOSED architecture objects, current/forecast semantics, audience projections.
- `research-website/src/data/documentsData.js` — public-only document/repository records.
- `research-website/src/data/publicationsData.js` — conservative publication/output records.
- `research-website/src/data/teamData.js` — researchers and supervisors.

### New reusable UI
- `research-website/src/components/StatusBadge.jsx`
- `research-website/src/components/ThemeToggle.jsx`
- `research-website/src/components/ScrollProgress.jsx`
- `research-website/src/components/SectionChapter.jsx`
- `research-website/src/components/ResearchHero.jsx`
- `research-website/src/components/DeviceSignalStage.jsx`
- `research-website/src/components/MultimodalStory.jsx`
- `research-website/src/components/ModalityStage.jsx`
- `research-website/src/components/ValidationGate.jsx`
- `research-website/src/components/FusionStage.jsx`
- `research-website/src/components/CurrentForecastSplit.jsx`
- `research-website/src/components/AudienceProjection.jsx`
- `research-website/src/components/EvidenceLedger.jsx`
- `research-website/src/components/ResearchArtifactGallery.jsx`
- `research-website/src/components/DocumentPreview.jsx`
- `research-website/src/components/ReducedMotionFallback.jsx`

### New page
- `research-website/src/pages/System.jsx` — explicit CURRENT/TARGET architecture view.

### Modified shell/pages
- `research-website/src/App.jsx`
- `research-website/src/components/Navbar.jsx`
- `research-website/src/components/Footer.jsx`
- `research-website/src/pages/Home.jsx`
- `research-website/src/pages/Components.jsx`
- `research-website/src/pages/Methodology.jsx`
- `research-website/src/pages/Results.jsx`
- `research-website/src/pages/Documents.jsx`
- `research-website/src/pages/Publications.jsx`
- `research-website/src/pages/Team.jsx`
- `research-website/src/pages/Contact.jsx`
- `research-website/src/index.css`
- `research-website/scripts/validate-content.mjs`
- `research-website/package.json`

### New tests
- `research-website/src/test/setup.js`
- `research-website/src/test/status.test.jsx`
- `research-website/src/test/forecast-semantics.test.jsx`
- `research-website/src/test/validation-gate.test.jsx`
- `research-website/src/test/unavailable-evidence.test.jsx`
- `research-website/src/test/navigation.test.jsx`
- `research-website/src/test/reduced-motion.test.jsx`

### Public assets
- `research-website/public/images/research/chest-strap-reference.webp` — derived from the user-supplied real chest-strap image, not generated.
- `research-website/public/images/research/multimodal-editorial.webp` — optional supporting AI-generated editorial artwork, explicitly decorative.
- Additional screenshots/figures are only added if an approved real source is available during implementation.

---

### Task 1: Establish test harness and handbook-aware content schema

**Files:**
- Modify: `research-website/package.json`
- Create: `research-website/src/test/setup.js`
- Create: `research-website/src/data/researchData.js`
- Create: `research-website/src/data/evidenceData.js`
- Create: `research-website/src/data/systemStatus.js`
- Create: `research-website/src/data/documentsData.js`
- Create: `research-website/src/data/publicationsData.js`
- Create: `research-website/src/data/teamData.js`
- Modify: `research-website/scripts/validate-content.mjs`
- Test: `research-website/src/test/status.test.jsx`

**Interfaces:**
- Consumes: current factual content from `src/data/research.js` and the approved design spec.
- Produces:
  - `components: ResearchComponent[]`
  - `evidenceRecords: EvidenceRecord[]`
  - `systemStates: { current, target, proposed }`
  - `documents: DocumentRecord[]`
  - `publications: PublicationRecord[]`
  - `people`, `supervisors`
  - explicit `status` fields used by all later tasks.

- [ ] **Step 1: Add the component-test dependencies and scripts**

Update `package.json` scripts/dependencies with these exact additions while preserving existing versions:

```json
{
  "scripts": {
    "dev": "vite",
    "validate": "node scripts/validate-content.mjs",
    "test": "vitest run",
    "test:watch": "vitest",
    "build": "npm run validate && vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.2",
    "jsdom": "^25.0.1",
    "vitest": "^2.1.8"
  }
}
```

Also add a Vitest section to `vite.config.js`:

```js
export default defineConfig({
  plugins: [react()],
  base: '/',
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
})
```

- [ ] **Step 2: Add the shared test setup**

Create `src/test/setup.js`:

```js
import '@testing-library/jest-dom/vitest'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})
```

- [ ] **Step 3: Write the failing status-schema test**

Create `src/test/status.test.jsx`:

```jsx
import { describe, expect, it } from 'vitest'
import { components } from '../data/researchData'
import { systemStates } from '../data/systemStatus'

describe('research status schema', () => {
  it('gives every research component an explicit implementation/evidence status', () => {
    for (const component of components) {
      expect(['current', 'experimental', 'unavailable']).toContain(component.status)
    }
  })

  it('keeps current, target and proposed system states explicit', () => {
    expect(systemStates.current.status).toBe('current')
    expect(systemStates.target.status).toBe('target')
    expect(systemStates.proposed.status).toBe('proposed')
  })

  it('keeps C2 excluded from current active fusion', () => {
    const c2 = components.find((item) => item.id === 'C2')
    expect(c2.fusionEligible).toBe(false)
    expect(c2.activeFusionWeight).toBe(0)
  })
})
```

- [ ] **Step 4: Run the test and verify it fails**

Run:

```bash
cd research-website
npm install
npm test -- src/test/status.test.jsx
```

Expected: FAIL because `researchData.js` and `systemStatus.js` do not exist.

- [ ] **Step 5: Create the structured content modules**

Create `researchData.js` by moving the current `components` facts without changing their factual meaning. Use this shape:

```js
export const components = [
  {
    id: 'C1',
    owner: 'Sendanayake H.D.',
    title: 'Wearable physiological forecasting',
    status: 'current',
    statusLabel: 'CURRENT research signal',
    fusionEligible: true,
    activeFusionWeight: null,
    timescale: 'short-horizon physiological',
    question: 'Can individualized physiological deviation provide useful short-horizon evidence of escalation?',
    method: 'Self-supervised LSTM autoencoder over wearable physiological windows, followed by short-horizon forecasting.',
    data: ['WESAD', 'AffectiveROAD', 'PPG-DaLiA', 'EmoWear'],
    evidence: 'Subject-level evaluation and personalization experiments.',
  },
  {
    id: 'C2',
    owner: 'Layathma B.M.A.S.',
    title: 'Leakage-free behavioural graph evaluation',
    status: 'experimental',
    statusLabel: 'EXPERIMENTAL / EXCLUDED',
    fusionEligible: false,
    activeFusionWeight: 0,
    timescale: 'longer-horizon behavioural',
    question: 'Do temporal behavioural graphs generalize beyond simpler passive-sensing baselines?',
    method: 'GATv2 on 28-day GLOBEM graphs with participant-grouped, cross-cohort evaluation.',
    data: ['GLOBEM', 'INS-W_1–4'],
    evidence: 'AUROC 0.5205 · 95% CI 0.485–0.560 · null 0.4991 · p=0.255',
    limitation: 'Final held-out result was not distinguishable from chance; the graph model did not outperform simpler baselines.',
  },
  {
    id: 'C3',
    owner: 'Kaushalya I.G.D.',
    title: 'Patient-disjoint clinical NLP / TC-WPN',
    status: 'current',
    statusLabel: 'CURRENT research signal',
    fusionEligible: true,
    activeFusionWeight: null,
    timescale: 'clinical-note event',
    question: 'Can few-shot clinical NLP learn from small support sets without patient leakage or label contamination?',
    method: 'Bio_ClinicalBERT → 256-d projection → Temporal-Consistency Weighted Prototypical Network.',
    data: ['MIMIC-IV', 'MIMIC-III transfer'],
    evidence: 'Patient-disjoint episodes · leakage certificates · frozen episode plans.',
  },
  {
    id: 'C4',
    owner: 'Seneviratne K.A.U.A.',
    title: 'Reliability-weighted fusion + CARE-AnxRAG',
    status: 'current',
    statusLabel: 'CURRENT decision-support layer',
    fusionEligible: true,
    activeFusionWeight: null,
    timescale: 'static / contextual',
    question: 'How should heterogeneous evidence be combined when modalities differ in recency, reliability and validation quality?',
    method: 'Contextual prior + eligible modality outputs → reliability-weighted fusion → evidence-aware retrieval and abstention.',
    data: ['Component outputs', 'contextual variables', 'evidence corpus'],
    evidence: 'Missing/unreliable modalities can be masked; insufficient evidence can abstain.',
  },
]
```

Create `systemStatus.js` with exact status separation:

```js
export const systemStates = {
  current: {
    status: 'current',
    label: 'CURRENT',
    description: 'Verified repository behavior used for current-state presentation.',
  },
  target: {
    status: 'target',
    label: 'TARGET',
    description: 'Required target architecture; not necessarily implemented.',
  },
  proposed: {
    status: 'proposed',
    label: 'PROPOSED',
    description: 'Engineering remediation recommendation; not current behavior.',
  },
}

export const currentAssessment = {
  kind: 'assessment',
  status: 'current',
  label: 'Current multimodal assessment',
  identity: 'fusion_result_id',
}

export const physiologicalForecast = {
  kind: 'forecast',
  status: 'current',
  scope: 'physiological',
  label: 'Near-term physiological forecast',
  identity: 'forecast_result_id',
}

export const audienceProjections = [
  { audience: 'patient', source: 'fusion_result_id', recomputesFusion: false },
  { audience: 'clinician', source: 'fusion_result_id', recomputesFusion: false },
]
```

Move existing evidence/team records into the other modules without adding unverified facts.

- [ ] **Step 6: Strengthen static content validation**

Extend `validate-content.mjs` with handbook-specific forbidden phrases:

```js
const researchSafetyForbidden = [
  'guaranteed anxiety attack',
  'predicts an anxiety attack at',
  'multimodal forecast in 10 minutes',
  'C2 active fusion',
]

const researchSafetyRequired = [
  'EXPERIMENTAL / EXCLUDED',
  'Near-term physiological forecast',
  'Current multimodal assessment',
  'fusion_result_id',
]

const badSafety = researchSafetyForbidden.filter((term) => text.toLowerCase().includes(term.toLowerCase()))
const missingSafety = researchSafetyRequired.filter((term) => !text.includes(term))

if (badSafety.length || missingSafety.length) {
  console.error('Research-safety validation failed', { badSafety, missingSafety })
  process.exit(1)
}
```

Do not remove the current GLOBEM / CARE-AnxRAG / TC-WPN / C2 validation checks.

- [ ] **Step 7: Run validation and schema tests**

Run:

```bash
npm run validate
npm test -- src/test/status.test.jsx
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add research-website/package.json research-website/vite.config.js research-website/src/test research-website/src/data research-website/scripts/validate-content.mjs
git commit -m "refactor: establish handbook-aware research content schema"
```

---

### Task 2: Build the site shell, theme system, route structure and status primitives

**Files:**
- Create: `research-website/src/components/StatusBadge.jsx`
- Create: `research-website/src/components/ThemeToggle.jsx`
- Create: `research-website/src/components/ScrollProgress.jsx`
- Create: `research-website/src/components/SectionChapter.jsx`
- Modify: `research-website/src/components/Navbar.jsx`
- Modify: `research-website/src/components/Footer.jsx`
- Modify: `research-website/src/App.jsx`
- Create: `research-website/src/pages/System.jsx`
- Test: `research-website/src/test/navigation.test.jsx`
- Test: `research-website/src/test/status.test.jsx`

**Interfaces:**
- Consumes: `systemStates`.
- Produces:
  - `<StatusBadge status label />`
  - persistent theme via localStorage key `research-theme`
  - routes: `/`, `/research`, `/methodology`, `/evidence`, `/system`, `/publications`, `/documents`, `/team`, `/contact`.

- [ ] **Step 1: Write navigation and status-badge tests**

Add to `navigation.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Navbar from '../components/Navbar'

describe('primary research navigation', () => {
  it('exposes the research information architecture', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>)
    for (const label of ['Overview','Research','Methodology','Evidence','System','Publications','Documents','Team']) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    }
  })
})
```

Extend `status.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import StatusBadge from '../components/StatusBadge'

it('renders target state explicitly', () => {
  render(<StatusBadge status="target" label="TARGET" />)
  expect(screen.getByText('TARGET')).toHaveAttribute('data-status', 'target')
})
```

- [ ] **Step 2: Run tests and verify failure**

Run:

```bash
npm test -- src/test/navigation.test.jsx src/test/status.test.jsx
```

Expected: FAIL because new navigation/status primitive does not exist.

- [ ] **Step 3: Implement `StatusBadge` and `ThemeToggle`**

`StatusBadge.jsx`:

```jsx
export default function StatusBadge({ status, label }) {
  return <span className="status-badge" data-status={status}>{label}</span>
}
```

`ThemeToggle.jsx` must:
- default to `light`;
- read `research-theme` when present;
- apply `document.documentElement.dataset.theme`;
- persist changes;
- render accessible button text.

- [ ] **Step 4: Implement route shell**

Update `App.jsx` to include:
- `ScrollProgress`;
- route transition wrapper using opacity/translate only;
- new `/system` page;
- redirects from old `/components` -> `/research` and `/results` -> `/evidence`.

- [ ] **Step 5: Rebuild navbar/footer around research IA**

Navbar order:

```js
[
  ['Overview', '/'],
  ['Research', '/research'],
  ['Methodology', '/methodology'],
  ['Evidence', '/evidence'],
  ['System', '/system'],
  ['Publications', '/publications'],
  ['Documents', '/documents'],
  ['Team', '/team'],
]
```

Keep repository as a secondary external action.

- [ ] **Step 6: Implement `System.jsx` skeleton with explicit state controls**

The first render must default to CURRENT and show:

```jsx
<StatusBadge status="current" label="CURRENT" />
```

TARGET content is only displayed after selecting the TARGET tab and always includes:

```jsx
<StatusBadge status="target" label="TARGET" />
```

- [ ] **Step 7: Run tests**

```bash
npm test -- src/test/navigation.test.jsx src/test/status.test.jsx
npm run validate
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add research-website/src/App.jsx research-website/src/components research-website/src/pages/System.jsx research-website/src/test
git commit -m "feat: build research site shell and explicit status navigation"
```

---

### Task 3: Build the real-hardware-first research hero

**Files:**
- Add: `research-website/public/images/research/chest-strap-reference.webp`
- Add: `research-website/public/images/research/multimodal-editorial.webp`
- Create: `research-website/src/components/ResearchHero.jsx`
- Create: `research-website/src/components/DeviceSignalStage.jsx`
- Modify: `research-website/src/pages/Home.jsx`
- Modify: `research-website/src/index.css`
- Test: `research-website/src/test/reduced-motion.test.jsx`

**Interfaces:**
- Consumes: user-supplied real chest-strap image and already-generated multimodal editorial artwork.
- Produces: `ResearchHero` with real device as the primary tangible visual and AI artwork as clearly supporting/editorial imagery.

- [ ] **Step 1: Add the two approved image assets**

Use the exact user-supplied chest-strap image for `chest-strap-reference.webp`; do not redraw it or substitute a smartwatch.

Use the latest generated chest-strap-aware multimodal illustration for `multimodal-editorial.webp`.

Optimize both to WebP while preserving enough resolution for desktop display. Do not add stock imagery.

- [ ] **Step 2: Write the reduced-motion hero test**

```jsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ResearchHero from '../components/ResearchHero'

describe('ResearchHero', () => {
  it('identifies the real chest strap as research hardware', () => {
    render(<ResearchHero reducedMotion />)
    expect(screen.getByRole('img', { name: /chest strap/i })).toBeInTheDocument()
    expect(screen.getByText(/research prototype/i)).toBeInTheDocument()
  })

  it('keeps the thesis and CTAs visible without motion', () => {
    render(<ResearchHero reducedMotion />)
    expect(screen.getByRole('heading', { level: 1 })).toBeVisible()
    expect(screen.getByRole('link', { name: /explore research/i })).toBeVisible()
    expect(screen.getByRole('link', { name: /view evidence/i })).toBeVisible()
  })
})
```

- [ ] **Step 3: Run the test and verify failure**

```bash
npm test -- src/test/reduced-motion.test.jsx
```

Expected: FAIL because `ResearchHero` does not exist.

- [ ] **Step 4: Implement `DeviceSignalStage`**

Use:
- a real chest-strap image;
- a custom SVG line emerging from the sensor;
- no numerical physiological readings;
- labels such as `PHYSIOLOGICAL ACQUISITION` and `C1`;
- pointer tilt only when `(hover: hover) and (pointer: fine)`;
- transform/opacity animation only.

The signal path should animate from `pathLength: 0` to `1` and then settle. It must not imply continuous real-time data from the visitor.

- [ ] **Step 5: Implement `ResearchHero`**

Required visible copy:
- project ID `R26—DS—012`;
- title based on the existing research title/thesis;
- concise multimodal description;
- `Research prototype · not a diagnostic device`;
- links to `/research` and `/evidence`.

Visual hierarchy:
1. actual chest strap / acquisition;
2. thesis copy;
3. supporting multimodal editorial artwork;
4. subtle status/provenance labels.

- [ ] **Step 6: Replace the current Home hero**

`Home.jsx` should become composition only:

```jsx
export default function Home() {
  return (
    <main>
      <ResearchHero />
      {/* later research-story sections */}
    </main>
  )
}
```

Do not put hero animation internals back into `Home.jsx`.

- [ ] **Step 7: Run hero tests and build**

```bash
npm test -- src/test/reduced-motion.test.jsx
npm run build
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add research-website/public/images/research research-website/src/components/ResearchHero.jsx research-website/src/components/DeviceSignalStage.jsx research-website/src/pages/Home.jsx research-website/src/index.css research-website/src/test/reduced-motion.test.jsx
git commit -m "feat: build real-hardware-first research hero"
```

---

### Task 4: Implement multimodal scrollytelling and the CURRENT validation gate

**Files:**
- Create: `research-website/src/components/MultimodalStory.jsx`
- Create: `research-website/src/components/ModalityStage.jsx`
- Create: `research-website/src/components/ValidationGate.jsx`
- Modify: `research-website/src/pages/Home.jsx`
- Modify: `research-website/src/index.css`
- Test: `research-website/src/test/validation-gate.test.jsx`

**Interfaces:**
- Consumes: `components` from `researchData.js`.
- Produces:
  - desktop sticky/pinned four-stage research story;
  - mobile stacked fallback;
  - `ValidationGate({ components })` which only forwards `fusionEligible === true` components in CURRENT mode.

- [ ] **Step 1: Write C2 gate tests**

```jsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ValidationGate from '../components/ValidationGate'
import { components } from '../data/researchData'

describe('CURRENT validation gate', () => {
  it('marks C2 as experimental/excluded with weight 0.0', () => {
    render(<ValidationGate components={components} />)
    const c2 = screen.getByTestId('gate-C2')
    expect(c2).toHaveTextContent('EXPERIMENTAL / EXCLUDED')
    expect(c2).toHaveTextContent('0.0')
    expect(c2).toHaveAttribute('data-eligible', 'false')
  })

  it('marks eligible current streams as passing the gate', () => {
    render(<ValidationGate components={components} />)
    expect(screen.getByTestId('gate-C1')).toHaveAttribute('data-eligible', 'true')
    expect(screen.getByTestId('gate-C3')).toHaveAttribute('data-eligible', 'true')
    expect(screen.getByTestId('gate-C4')).toHaveAttribute('data-eligible', 'true')
  })
})
```

- [ ] **Step 2: Run the test and verify failure**

```bash
npm test -- src/test/validation-gate.test.jsx
```

Expected: FAIL because `ValidationGate` does not exist.

- [ ] **Step 3: Implement modality-specific visual rhythms**

`ModalityStage` uses an `id` switch:

```js
const visualMode = {
  C1: 'fast-wave',
  C2: 'slow-rhythm',
  C3: 'document-prototype',
  C4: 'static-context',
}[component.id]
```

C1:
- quick but restrained line trace.

C2:
- slow day-scale rhythm and an experimental marker.

C3:
- note/token rectangles moving toward a prototype cluster.

C4:
- near-static contextual rings / prior.

Do not use the same card animation for all four.

- [ ] **Step 4: Implement desktop sticky story with mobile fallback**

Desktop `MultimodalStory`:
- left: sticky visual field;
- right: four research chapters;
- active chapter updates visual state by `whileInView` / intersection.

Mobile:
- render each modality as a normal sequential section;
- no sticky dependency;
- all information visible without hover.

- [ ] **Step 5: Implement the CURRENT validation gate**

Every stream must render:
- status;
- freshness/eligibility concept;
- C2 exclusion state.

The gate copy must not imply the gate solves semantic incompatibility between different timescales.

- [ ] **Step 6: Integrate after hero/problem statement**

Landing order after this task:
1. ResearchHero
2. problem/thesis section
3. MultimodalStory
4. ValidationGate

- [ ] **Step 7: Run tests/build**

```bash
npm test -- src/test/validation-gate.test.jsx
npm run validate
npm run build
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add research-website/src/components/MultimodalStory.jsx research-website/src/components/ModalityStage.jsx research-website/src/components/ValidationGate.jsx research-website/src/pages/Home.jsx research-website/src/index.css research-website/src/test/validation-gate.test.jsx
git commit -m "feat: add multimodal scrollytelling and validation gate"
```

---

### Task 5: Implement authoritative fusion, current/forecast separation and audience projections

**Files:**
- Create: `research-website/src/components/FusionStage.jsx`
- Create: `research-website/src/components/CurrentForecastSplit.jsx`
- Create: `research-website/src/components/AudienceProjection.jsx`
- Modify: `research-website/src/pages/Home.jsx`
- Modify: `research-website/src/pages/Methodology.jsx`
- Modify: `research-website/src/index.css`
- Test: `research-website/src/test/forecast-semantics.test.jsx`

**Interfaces:**
- Consumes:
  - `components.filter(component => component.fusionEligible)`;
  - `currentAssessment`;
  - `physiologicalForecast`;
  - `audienceProjections`.
- Produces:
  - fusion visualization that excludes C2 in CURRENT mode;
  - strict current/forecast visual fork;
  - patient/clinician views sourced from one authoritative result.

- [ ] **Step 1: Write forecast semantics tests**

```jsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import CurrentForecastSplit from '../components/CurrentForecastSplit'
import { currentAssessment, physiologicalForecast } from '../data/systemStatus'

describe('current vs forecast semantics', () => {
  it('keeps current assessment and physiological forecast separate', () => {
    render(<CurrentForecastSplit assessment={currentAssessment} forecast={physiologicalForecast} />)
    expect(screen.getByText('Current multimodal assessment')).toBeInTheDocument()
    expect(screen.getByText('Near-term physiological forecast')).toBeInTheDocument()
  })

  it('does not call a physiological forecast multimodal', () => {
    const { container } = render(<CurrentForecastSplit assessment={currentAssessment} forecast={physiologicalForecast} />)
    expect(container.textContent.toLowerCase()).not.toContain('multimodal forecast')
  })
})
```

- [ ] **Step 2: Run and verify failure**

```bash
npm test -- src/test/forecast-semantics.test.jsx
```

Expected: FAIL because `CurrentForecastSplit` does not exist.

- [ ] **Step 3: Implement `FusionStage`**

Render only eligible streams in the CURRENT convergence path.

Required conceptual labels:
- `eligibility`
- `recency`
- `reliability`
- `authoritative fusion result`

Do not fabricate patient-specific values.

Add a small equation reveal using the current method notation:

```text
w_m(t) = ω_m × ρ_m(Δt) × c_m
α_m = w_m / Σw
S(t) = Σ α_m × p_m
```

- [ ] **Step 4: Implement `CurrentForecastSplit`**

Visual layout:
- shared upstream evidence line;
- hard fork into two distinct panes;
- CURRENT pane references `fusion_result_id`;
- FORECAST pane references `forecast_result_id`, `scope: physiological`, horizon concept.

Do not show exact-time guaranteed event language.

- [ ] **Step 5: Implement `AudienceProjection`**

Show:

```text
Authoritative FusionResult
       ↙          ↘
Patient view   Clinician view
```

Both display `fusion_result_id` as a shared identity concept and explicitly show `recomputesFusion: false`.

- [ ] **Step 6: Update Methodology page**

Add explicit sections for:
- timebase caveat;
- CURRENT vs forecast;
- same-result/different-audience principle.

Do not move TARGET AttentionEvent into CURRENT methodology.

- [ ] **Step 7: Run tests/build**

```bash
npm test -- src/test/forecast-semantics.test.jsx src/test/validation-gate.test.jsx
npm run build
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add research-website/src/components/FusionStage.jsx research-website/src/components/CurrentForecastSplit.jsx research-website/src/components/AudienceProjection.jsx research-website/src/pages/Home.jsx research-website/src/pages/Methodology.jsx research-website/src/index.css research-website/src/test/forecast-semantics.test.jsx
git commit -m "feat: visualize authoritative fusion and forecast separation"
```

---

### Task 6: Build the evidence ledger and CURRENT/TARGET system architecture page

**Files:**
- Create: `research-website/src/components/EvidenceLedger.jsx`
- Modify: `research-website/src/pages/Results.jsx`
- Modify: `research-website/src/pages/System.jsx`
- Modify: `research-website/src/index.css`
- Test: `research-website/src/test/unavailable-evidence.test.jsx`
- Test: `research-website/src/test/status.test.jsx`

**Interfaces:**
- Consumes: `evidenceRecords`, `systemStates`.
- Produces: evidence ledger and architecture mode switch with permanent state labels.

- [ ] **Step 1: Write unavailable-evidence test**

```jsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import EvidenceLedger from '../components/EvidenceLedger'

describe('evidence rendering', () => {
  it('renders missing evidence as unavailable rather than zero or low', () => {
    render(<EvidenceLedger records={[{
      component: 'C3',
      metric: 'Current note evidence',
      value: null,
      status: 'unavailable',
      context: 'No current clinical note',
      note: 'Evidence is unavailable.',
    }]} />)

    expect(screen.getByText(/unavailable/i)).toBeInTheDocument()
    expect(screen.queryByText(/^0(?:\.0)?$/)).not.toBeInTheDocument()
    expect(screen.queryByText(/^low$/i)).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run and verify failure**

```bash
npm test -- src/test/unavailable-evidence.test.jsx
```

Expected: FAIL.

- [ ] **Step 3: Implement `EvidenceLedger`**

Each record displays:
- component;
- metric;
- evaluation context;
- value or `Unavailable`;
- interpretation;
- current status;
- limitation when present.

C2 row must display both:
- `EXPERIMENTAL / EXCLUDED`
- `Active fusion weight 0.0`.

- [ ] **Step 4: Redesign Evidence page**

Avoid promotional “big number” cards as the primary representation.

Use:
- evidence table/ledger;
- expandable methodology context;
- validation callouts;
- explicit caveat hierarchy.

- [ ] **Step 5: Implement CURRENT/TARGET system diagrams**

CURRENT mode includes:
- patient app;
- ClinAnx;
- central backend;
- C1–C4 services;
- current fusion;
- existing forecast distinction.

TARGET mode includes:
- target assessment/forecast contracts;
- assignment-aware authorization;
- persistent AttentionEvent lifecycle;
- shared event notifications.

Every TARGET panel must render `<StatusBadge status="target" label="TARGET" />`.

- [ ] **Step 6: Add a test that target content cannot masquerade as current**

Extend `status.test.jsx` to render `System`, activate TARGET, and assert the TARGET badge remains visible.

- [ ] **Step 7: Run tests/build**

```bash
npm test -- src/test/unavailable-evidence.test.jsx src/test/status.test.jsx
npm run validate
npm run build
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add research-website/src/components/EvidenceLedger.jsx research-website/src/pages/Results.jsx research-website/src/pages/System.jsx research-website/src/index.css research-website/src/test
git commit -m "feat: build evidence ledger and explicit system-state architecture"
```

---

### Task 7: Add real research artefact presentation and conservative academic records

**Files:**
- Create: `research-website/src/components/ResearchArtifactGallery.jsx`
- Create: `research-website/src/components/DocumentPreview.jsx`
- Modify: `research-website/src/pages/Home.jsx`
- Modify: `research-website/src/pages/Documents.jsx`
- Modify: `research-website/src/pages/Publications.jsx`
- Modify: `research-website/src/pages/Components.jsx`
- Modify: `research-website/src/pages/Team.jsx`
- Modify: `research-website/src/pages/Contact.jsx`
- Modify: `research-website/src/index.css`

**Interfaces:**
- Consumes: public/approved assets only.
- Produces: a gallery that labels artefacts as `real`, `diagram`, `editorial`, or `public-record` so decorative imagery cannot be confused with project evidence.

- [ ] **Step 1: Define artefact metadata contract**

In `documentsData.js` or a new exported `artifacts` array:

```js
export const artifacts = [
  {
    id: 'chest-strap',
    title: 'Physiological sensing hardware',
    kind: 'real',
    source: '/images/research/chest-strap-reference.webp',
    alt: 'Black chest strap and central sensor module used as the physiological sensing hardware reference.',
    public: true,
  },
  {
    id: 'multimodal-editorial',
    title: 'Multimodal research editorial illustration',
    kind: 'editorial',
    source: '/images/research/multimodal-editorial.webp',
    alt: 'Editorial illustration representing multimodal anxiety research.',
    public: true,
  },
]
```

Do not add application screenshots until an actual approved screenshot file is available.

- [ ] **Step 2: Implement `ResearchArtifactGallery`**

Every item shows a small type label:
- `REAL RESEARCH ARTEFACT`
- `RESEARCH DIAGRAM`
- `EDITORIAL ILLUSTRATION`
- `VERIFIED PUBLIC RECORD`

The generated image must render as `EDITORIAL ILLUSTRATION`.

- [ ] **Step 3: Integrate artefacts into landing/research pages**

Use the real device in prominent positions.
Use generated artwork as a secondary visual only.

- [ ] **Step 4: Redesign Documents page**

Only expose:
- R26-DS-012 public repository;
- research website repository;
- later approved public documents.

Add a clear note that internal/unpublished records are intentionally not exposed.

- [ ] **Step 5: Keep Publications conservative**

Current manuscript record uses:
- `Research manuscript / project output`
unless an official public source verifies a stronger status.

Do not add conference acceptance/indexing/DOI.

- [ ] **Step 6: Improve Team page without inventing data**

Use:
- names;
- university IDs;
- research ownership;
- supervisor roles and verified affiliations already present.

Do not generate fake portraits. Only add photographs when real approved assets exist.

- [ ] **Step 7: Run validation/build**

```bash
npm run validate
npm run build
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add research-website/src/components/ResearchArtifactGallery.jsx research-website/src/components/DocumentPreview.jsx research-website/src/pages research-website/src/data research-website/src/index.css
git commit -m "feat: present real research artefacts and academic records"
```

---

### Task 8: Complete motion system, reduced-motion fallback and responsive behavior

**Files:**
- Create: `research-website/src/components/ReducedMotionFallback.jsx`
- Modify: all motion-heavy components as required
- Modify: `research-website/src/index.css`
- Test: `research-website/src/test/reduced-motion.test.jsx`

**Interfaces:**
- Consumes: browser motion preference.
- Produces: equivalent scientific content with simplified/no continuous motion.

- [ ] **Step 1: Expand reduced-motion tests**

Mock `matchMedia('(prefers-reduced-motion: reduce)')` to return `matches: true`.

Test:
- hero remains readable;
- modality sections all exist;
- C2 exclusion remains visible;
- current/forecast labels remain visible;
- no content uses `aria-hidden` as the only source of critical information.

- [ ] **Step 2: Run test and verify any failures**

```bash
npm test -- src/test/reduced-motion.test.jsx
```

Expected before fixes: any motion-dependent reveal should fail if content is not rendered statically.

- [ ] **Step 3: Implement `ReducedMotionFallback`**

The component should render the same data as its animated counterpart using static:
- signal traces;
- labelled connectors;
- state boxes;
- no pointer interaction;
- no auto-loop.

- [ ] **Step 4: Harden CSS/media queries**

Required breakpoints:
- desktop: sticky/scrollytelling;
- tablet: shorter/static sticky sections;
- mobile: sequential stacked chapters.

Required media queries:

```css
@media (hover: none), (pointer: coarse) {
  .pointer-reactive { transform: none !important; }
  .evidence-lens { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
```

- [ ] **Step 5: Audit continuous animation**

Remove any continuous animation that:
- has no research meaning;
- continues offscreen unnecessarily;
- changes layout properties;
- creates repeated distracting motion.

Retain only:
- signal/evidence movement;
- subtle acquisition/fusion state;
- navigational transitions.

- [ ] **Step 6: Run all tests/build**

```bash
npm test
npm run validate
npm run build
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add research-website/src/components research-website/src/index.css research-website/src/test
git commit -m "fix: harden motion accessibility and responsive research storytelling"
```

---

### Task 9: Final research-integrity, performance and branch verification

**Files:**
- Modify only files that fail verification.
- Update: `docs/superpowers/specs/2026-09-20-research-instrument-redesign-design.md` only if implementation required a factual design clarification.
- Add: `docs/research-website-release-check.md` with measured verification results.

**Interfaces:**
- Consumes: complete implementation.
- Produces: a verifiable release-check record; no new feature work.

- [ ] **Step 1: Run the complete automated verification**

```bash
cd research-website
npm test
npm run validate
npm run build
```

Expected: all PASS and Vite production build succeeds.

- [ ] **Step 2: Search for research-safety violations**

Run:

```bash
grep -RniE "multimodal forecast|guaranteed anxiety attack|diagnostic device|C2 active fusion" src || true
grep -Rni "TARGET" src/pages src/components
grep -Rni "EXPERIMENTAL / EXCLUDED" src
grep -Rni "Near-term physiological forecast" src
grep -Rni "Current multimodal assessment" src
```

Review each match manually. Expected:
- no unsafe claim;
- TARGET labels appear wherever target architecture is rendered;
- C2 exclusion copy exists;
- physiological/current separation copy exists.

- [ ] **Step 3: Verify build asset behavior**

Inspect `dist/assets` and public image sizes.

Acceptance:
- no uncompressed multi-megabyte hero asset when a WebP is available;
- only hero image is eager/high-priority;
- below-fold images use lazy loading;
- no unexpected new animation framework bundle.

- [ ] **Step 4: Manual viewport checklist**

Desktop widths: 1440 and 1024.  
Mobile widths: 390 and 360.

Verify:
- no horizontal overflow;
- navigation usable;
- sticky sections do not trap scroll;
- mobile contains all scientific content;
- no hover-only information;
- current/forecast split remains clear;
- C2 excluded state remains clear.

- [ ] **Step 5: Manual theme/accessibility checklist**

Verify:
- default light;
- dark toggle persists;
- keyboard focus visible;
- reduced-motion mode readable;
- diagram labels readable in both themes;
- status is not conveyed by color alone.

- [ ] **Step 6: Create release-check record**

Create `docs/research-website-release-check.md` containing:
- branch/commit SHA;
- `npm test` result;
- `npm run validate` result;
- `npm run build` result;
- viewport checks;
- known limitations;
- list of real vs editorial images;
- confirmation that no additional publication status was claimed.

Do not mark an item passed unless actually verified.

- [ ] **Step 7: Final commit**

```bash
git add docs/research-website-release-check.md
git commit -m "docs: record research website release verification"
```

- [ ] **Step 8: Whole-branch diff review**

Compare:

```bash
git diff main...redesign/research-instrument-2026
```

Confirm that the branch changes only public research-site presentation/test/docs/assets and does not alter backend/model/mobile behavior.

---

## Plan Self-Review

### Spec coverage
- Research-first visual identity: Tasks 3–7.
- Real hardware priority: Tasks 3 and 7.
- Multimodal distinct-timescale storytelling: Task 4.
- C2 experimental/excluded: Tasks 1, 4, 6, 9.
- Validation gate: Task 4.
- Authoritative fusion: Task 5.
- Current vs physiological forecast: Tasks 1 and 5.
- One result / two audiences: Task 5.
- CURRENT/TARGET architecture: Tasks 1, 2, 6.
- Evidence ledger: Task 6.
- Publications/documents/team: Task 7.
- Performance/reduced motion/mobile: Tasks 8 and 9.
- No new backend/model/mobile behavior: global constraints + Task 9.

### Placeholder scan
No `TBD`, `TODO`, “implement later”, or unspecified test steps remain. Optional future screenshots are explicitly excluded until a real approved asset exists; this is a scope boundary, not a placeholder.

### Type/interface consistency
- `components[].fusionEligible` and `activeFusionWeight` are defined in Task 1 and consumed in Tasks 4–5.
- `currentAssessment` and `physiologicalForecast` are defined in Task 1 and consumed in Task 5.
- `systemStates` are defined in Task 1 and consumed in Tasks 2 and 6.
- `StatusBadge` is defined in Task 2 and consumed by later pages.
- `EvidenceLedger` input contract is defined/tested in Task 6.

### Review Focus coverage
1. Status leakage -> Tasks 1, 2, 6 tests.
2. Forecast semantics -> Task 5 tests.
3. Unavailable evidence -> Task 6 tests.
4. Reduced motion -> Tasks 3 and 8 tests.
5. C2 exclusion -> Tasks 1 and 4 tests.
