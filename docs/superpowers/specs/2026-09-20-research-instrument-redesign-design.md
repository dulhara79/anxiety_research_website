# R26-DS-012 Research Instrument Website Redesign

Date: 2026-09-20  
Branch: `redesign/research-instrument-2026`  
Status: Design specification for review before implementation planning

## 1. Purpose

Redesign the public R26-DS-012 research website so it presents the work as a credible, distinctive scientific research system rather than a generic AI/healthcare landing page.

The website must:
- explain the research quickly to supervisors, reviewers, conference visitors, students, engineers and research collaborators;
- showcase real research artefacts, methods, evidence, documents and team ownership;
- use motion to explain the scientific system rather than to decorate it;
- remain visually premium and unique without compromising research accuracy, accessibility or performance;
- preserve a light-first presentation with user-selectable dark mode;
- remain faithful to the system integration handbook and never present TARGET or PROPOSED behavior as CURRENT behavior.

## 2. Source-of-truth and research-safety rules

The website follows the handbook hierarchy:
1. CURRENT = verified running/repository behavior.
2. TARGET = required target-state behavior that may not be implemented.
3. PROPOSED = remediation/recommendation that must not be described as already implemented.

The website must visibly preserve these handbook invariants:
- one patient -> one canonical backend identity -> one authoritative fusion result -> audience-specific views;
- no client-side authoritative multimodal fusion;
- current assessment and near-term forecast remain separate concepts and visual objects;
- C1 future trajectory is labelled physiological unless a true multimodal forecasting method has been specified and validated;
- C2 remains visibly experimental/excluded where current evidence requires active fusion weight 0.0;
- stale/missing/unavailable evidence is never visually represented as low risk or zero;
- unavailable/insufficient evidence must be explicit;
- CARE-AnxRAG failure/abstention must not be rendered as fabricated guidance;
- no exact-time anxiety-attack guarantee or diagnostic-device claim;
- target AttentionEvent/event-lifecycle visualizations must carry a TARGET label until implementation is verified;
- publication/acceptance/indexing/DOI status is only shown when externally verified.

## 3. Design concept: "Multimodal Research Instrument"

The site should feel like an interactive scientific instrument and research record.

It must not resemble:
- a SaaS startup landing page;
- a generic gradient AI site;
- a dashboard pretending to show live patient data;
- a collection of identical feature cards;
- a cyberpunk/neon medical product.

The identity comes from the actual research:
- chest-strap physiological sensing;
- multimodal timescales;
- clinical-note language;
- behavioural sensing;
- contextual priors;
- evidence eligibility;
- provenance;
- recency;
- reliability-aware fusion;
- current-vs-forecast separation;
- shared backend results with audience-specific projections.

## 4. Visual language

### 4.1 Core aesthetic
- light-first scientific editorial design;
- restrained biomedical teal as the primary accent;
- modality-specific secondary accents;
- off-white / cool-neutral surfaces instead of pure white everywhere;
- dark mode uses the same semantic tokens, not an inverted gimmick;
- fine measurement grids, timestamp marks, signal traces and provenance labels;
- large typography used selectively, not on every section;
- asymmetrical editorial compositions to avoid repeated card grids.

### 4.2 Typography
Use a three-role type system:
- display / editorial serif for selected thesis statements;
- clean condensed/tight sans-serif for interface and headings;
- mono for evidence IDs, model/version labels, timestamps and status metadata.

### 4.3 Research status language
Every content object that can be misunderstood must support:
- CURRENT
- TARGET
- PROPOSED
- EXPERIMENTAL / EXCLUDED
- UNAVAILABLE
- VERIFIED PUBLIC RECORD

These are semantic states, not decoration.

## 5. Information architecture

Primary navigation:
1. Overview
2. Research
3. Methodology
4. Evidence
5. System
6. Publications
7. Documents
8. Team

Secondary actions:
- repository
- theme toggle
- contact / research access where appropriate

### 5.1 Overview / landing page
The landing page is a continuous research story:

#### Scene A — Hero: real research first
- primary research title and concise thesis;
- actual chest-strap imagery as the principal tangible artefact;
- the latest generated multimodal artwork may appear as a supporting layer, not the sole proof of the project;
- research-use boundary visible but not visually dominant;
- CTA: Explore research / View evidence.

#### Scene B — Research problem
Explain why anxiety-related change cannot be represented by one signal.
Use a split timescale composition rather than cards.

#### Scene C — Multimodal scrollytelling
Pinned/sticky scientific visual with four stages:
- C1 physiological: fast signal trace / short horizon;
- C2 behavioural: slow behavioural rhythm with experimental/excluded state;
- C3 clinical NLP: note fragments -> encoded representation -> few-shot/prototype concept;
- C4 contextual: stable/static contextual prior.

Each stage uses its own motion language.

#### Scene D — Validation gate
Visual gate that shows:
- status,
- freshness,
- eligibility,
- evidence quality.

C2 must visibly stop before active fusion in the CURRENT view.

#### Scene E — Authoritative fusion
Only eligible evidence converges.
Show provenance and weighting concepts without fabricating live patient numbers.

#### Scene F — Current vs forecast
Two clearly separated lanes:
- CURRENT multimodal assessment;
- near-term PHYSIOLOGICAL forecast.

Never merge these visually into one score.

#### Scene G — One result, two audiences
Show one canonical fusion result branching into:
- patient-safe projection;
- clinician projection.

No client recomputation.

#### Scene H — Research evidence
Metrics shown with:
- component,
- evaluation setting,
- result,
- interpretation,
- limitation,
- evidence status.

#### Scene I — Research artefacts
Use actual project artefacts when public/approved:
- patient app screenshots;
- ClinAnx screenshots;
- architecture diagrams;
- TC-WPN visualizations;
- evaluation plots;
- posters / documents;
- conference/publication records only when verified.

#### Scene J — Methodology / documents / team / timeline
Provide a direct path to deeper academic material.

### 5.2 Research page
Individual component sections should read like scientific mini case studies:
- research question;
- hypothesis / problem;
- data source;
- method;
- evaluation design;
- result;
- current evidence status;
- limitation;
- implementation / repository links where public.

No unsupported performance claims.

### 5.3 Methodology page
Organize around:
- research design;
- leakage controls;
- validation gates;
- fusion equation;
- timebase caveat;
- current vs forecast;
- abstention / insufficient evidence;
- target attention-event architecture clearly labelled TARGET;
- reproducibility / versioning.

### 5.4 Evidence page
Evidence ledger instead of promotional statistics.
Support:
- metric;
- population/dataset;
- split/evaluation setting;
- value;
- interpretation;
- limitation;
- current fusion eligibility.

### 5.5 System page
A dedicated architecture page replaces generic architecture fragments.
Provide toggle/tab views:
- CURRENT system;
- TARGET architecture.

The TARGET view must never be the default unlabeled representation.

### 5.6 Publications
Publication states must be conservative:
- project output;
- submitted;
- accepted;
- published;
- indexed;
only when verified.

### 5.7 Documents
Only approved public artefacts are downloadable.
Internal implementation handbooks, credentials, sensitive operational details and unpublished restricted material are not automatically exposed.

### 5.8 Team
Show:
- researcher;
- component ownership;
- supervisors;
- verified affiliations;
- optional approved photographs.

## 6. Motion architecture

Motion must explain research state.

### 6.1 Primary motion primitives
Use existing Framer Motion plus custom SVG/CSS:
- scroll-linked pinned storytelling;
- path drawing;
- evidence packets moving on SVG paths;
- signal traces;
- clip/mask reveals;
- subtle image parallax;
- view-transition-like route changes;
- state transitions for CURRENT/TARGET/EXCLUDED/UNAVAILABLE.

Avoid adding a second large animation framework unless implementation proves Motion insufficient.

### 6.2 Signature interactions

#### Physiological acquisition
Chest strap -> signal trace -> C1 node.
No fake live measurements.

#### Multimodal timebase
Each modality has a different visual cadence:
- C1 fast;
- C2 slow;
- C3 event/document-based;
- C4 nearly static.

#### Validation gate
Evidence packets encounter gate rules.
C2 CURRENT packet stops and becomes "experimental / excluded".

#### Fusion
Eligible evidence converges only after passing the gate.

#### Current / forecast split
A visual fork explicitly separates:
- current assessment;
- future physiological forecast.

#### Shared result
One FusionResult object branches to patient and clinician views.

#### TARGET attention lifecycle
If shown:
ForecastResult -> policy -> OPEN -> ACKNOWLEDGED -> RESOLVED.
Must carry TARGET labeling until verified CURRENT.

### 6.3 Micro-interactions
Use sparingly:
- magnetic/soft CTA response;
- active navigation indicator;
- document preview hover;
- modality trace focus;
- evidence-row highlight;
- screenshot annotation reveal;
- subtle device tilt.

Avoid:
- random floating particles unrelated to data;
- constant bouncing;
- decorative infinite spinning;
- excessive blur;
- cursor followers on every page;
- animation on every text block.

## 7. Generated imagery policy

AI-generated imagery may support the visual narrative but cannot substitute for research evidence.

Rules:
- generated images are decorative/editorial unless based on real approved hardware references;
- no synthetic screenshot should be presented as the real app;
- no fabricated patient/clinician data;
- real chest-strap/device photography is preferred when available;
- generated artwork should not contain invented research statistics;
- real research diagrams and screenshots receive visual priority.

## 8. Component architecture

Create focused components with single responsibilities:

- `ResearchHero`
- `DeviceSignalStage`
- `MultimodalStory`
- `ModalityStage`
- `ValidationGate`
- `FusionStage`
- `CurrentForecastSplit`
- `AudienceProjection`
- `EvidenceLedger`
- `ResearchArtifactGallery`
- `StatusBadge`
- `SectionChapter`
- `DocumentPreview`
- `ThemeToggle`
- `ScrollProgress`
- `ReducedMotionFallback`

Do not put the entire landing experience in one large `Home.jsx`.

## 9. Data architecture

Move factual site content into structured data modules rather than hard-coding claims in visual components.

Suggested modules:
- `researchData.js`
- `evidenceData.js`
- `systemStatus.js`
- `publicationsData.js`
- `documentsData.js`
- `teamData.js`

Every system object that can change status should include an explicit status field:
`current | target | proposed | experimental | unavailable`.

Visual components render that state; they do not infer it.

## 10. Performance requirements

- maintain Vite/React architecture;
- retain Framer Motion as the primary animation dependency;
- prefer transform and opacity for continuous animation;
- SVG for scientific paths and traces;
- avoid WebGL/Three.js in the first implementation;
- lazy-load below-the-fold images;
- preload/priority-load only the actual hero asset;
- reserve image dimensions to reduce layout shift;
- disable pointer-heavy interaction on touch devices;
- pause or avoid expensive offscreen loops;
- keep motion smooth on normal laptop/mobile hardware;
- no background video autoplay unless a later requirement justifies it.

## 11. Accessibility

- honor `prefers-reduced-motion`;
- reduced-motion mode must preserve all scientific meaning;
- keyboard-accessible navigation and interactive states;
- visible focus styles;
- semantic headings;
- diagrams require useful accessible descriptions;
- sufficient contrast in light and dark themes;
- no important meaning conveyed through color alone;
- animated content must not flash.

## 12. Responsive behavior

Desktop:
- sticky/scrollytelling sequences;
- rich side-by-side scientific compositions.

Tablet:
- shorter sticky duration or normal stacked sequence when needed.

Mobile:
- no cursor lens;
- no dependence on hover;
- pinned sequences become stacked chapters;
- signal motion simplified;
- diagrams remain readable without horizontal overflow.

## 13. Testing and verification

### Build
- `npm run validate`
- `npm run build`

### Functional
- all routes load;
- light/dark persistence;
- navigation works;
- reduced-motion fallback works;
- document/repository links valid;
- CURRENT/TARGET labels correct.

### Research-integrity checks
- C2 CURRENT status still excluded / weight 0.0 where presented;
- no missing state rendered as low;
- no exact-time attack guarantee;
- no C1-only forecast labelled multimodal;
- current and forecast kept visually and textually separate;
- TARGET AttentionEvent flow never presented as verified CURRENT;
- no publication state invented.

### Performance
- inspect large media sizes;
- avoid continuous layout-triggering animation;
- test desktop + mobile viewport;
- check for obvious layout shift / janky pinned sections.

## 14. Implementation boundaries

This redesign does not change:
- central backend behavior;
- model behavior;
- fusion equations;
- mobile application behavior;
- research results.

It changes only how verified/project-approved information is presented publicly.

If source materials disagree, the site must show the disagreement/status rather than silently reconcile it.

## 15. Acceptance criteria

The redesign is accepted when:
- a first-time visitor can explain the research problem and four modalities after one landing-page scroll;
- the research feels tangible because real artefacts are visible;
- motion clearly maps to data acquisition, validation, fusion and projection;
- the site does not look like a generic AI SaaS template;
- CURRENT/TARGET/PROPOSED states are unambiguous;
- scientific caveats remain visible;
- performance remains smooth;
- mobile remains usable;
- reduced-motion mode remains complete;
- the site builds successfully and factual content passes validation.
