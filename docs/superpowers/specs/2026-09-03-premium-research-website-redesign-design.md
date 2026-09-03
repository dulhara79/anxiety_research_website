# Premium Research Website Redesign — Design Specification v3

**Date:** 2026-09-03  
**Repository:** `dulhara79/anxiety_research_website`  
**Branch:** `feature/premium-research-website-redesign`  
**Research source of truth:** `dulhara79/R26-DS-012`  
**Status:** V3 direction approved; written specification pending final user review before implementation

---

## 1. Objective

Redesign the research website into a **publication-grade scientific experience** that can credibly represent the project to researchers, clinicians, conference reviewers, supervisors, industry engineers, and prospective collaborators.

The finished website must not look like:

- a student portfolio;
- a generic AI/SaaS landing page;
- a Tailwind component showcase;
- a healthcare stock-photo template;
- a collection of glass cards, floating badges, gradients, and novelty animations.

The target is a restrained **scientific editorial identity**: strong typography, disciplined spacing, real research evidence, bespoke figures, consistent visual grammar, and subtle motion that supports understanding.

### 1.1 Success criteria

The redesign is successful when:

1. the first screen communicates a serious research identity without relying on stock photography;
2. the research itself becomes the visual brand;
3. typography and layout establish hierarchy before colour or effects are used;
4. every page feels part of one designed system rather than a separate template;
5. motion is calm and purposeful;
6. scientific figures, validation evidence, and limitations are easier to understand than decorative UI;
7. the current scientific source of truth in `R26-DS-012` is represented accurately;
8. responsive, accessibility, and performance quality are maintained at production level.

---

## 2. Design Positioning

### 2.1 Chosen direction: Scientific Editorial

The approved visual direction combines three qualities:

- **research-publication discipline** — strong grids, clear hierarchy, captions, evidence, rules, and typographic rhythm;
- **modern healthcare-AI confidence** — precise interfaces, contemporary typography, restrained interaction design;
- **institutional credibility** — neutral palette, authentic project imagery, no visual gimmicks.

The site should feel closer to a contemporary research organization or high-quality digital journal than to a startup landing page.

### 2.2 Core principle: research is the brand

The visual identity is built from the actual research concepts:

- physiological waveform and wearable sensing;
- temporal behavioural graph structure;
- clinical-note embeddings and few-shot prototype geometry;
- reliability-weighted multimodal fusion;
- evidence retrieval and provenance;
- confidence intervals, null comparisons, abstention, and validation decisions.

A user should be able to recognize the project from its scientific visual grammar even if the logo is removed.

---

## 3. Explicit Anti-Patterns

The following patterns are **not allowed** in the V3 implementation unless a later design review explicitly approves a narrow exception.

### 3.1 Remove entirely

- generic Unsplash/Pexels brain imagery;
- generic doctor/patient/team-collaboration stock imagery used as filler;
- gradient brain logo tiles;
- animated gradient headline text;
- floating bubbles and blurred colour blobs;
- particle backgrounds;
- floating statistic badges;
- shimmer on normal content;
- glow rings;
- conic-gradient decorative borders;
- infinite decorative rotation;
- constant card bobbing;
- parallax on ordinary section photography;
- springy or bouncy interface motion;
- magnetic buttons or novelty cursor effects;
- universal glassmorphism;
- universal `rounded-2xl` / `rounded-3xl` styling;
- hover effects that lift every card several pixels;
- icon boxes attached to every heading;
- colourful pills used as the default metadata treatment;
- animated counters used simply to make numbers look dynamic.

### 3.2 Restricted patterns

The following may be used only when the information model genuinely benefits:

- cards;
- shadows;
- gradients;
- pills/tags;
- icons;
- accent colours;
- ambient animation.

Every such use must satisfy at least one of these jobs:

1. clarify hierarchy;
2. explain research;
3. provide interaction feedback.

If it does none of those, remove it.

---

## 4. Typography System

The current `Plus Jakarta Sans + Outfit + JetBrains Mono` stack contributes to the generic portfolio/template feel and will be replaced.

### 4.1 Type families

**Primary display / interface: `Inter Tight`**

Use for:

- hero headlines;
- page titles;
- section headings;
- navigation;
- buttons;
- short interface labels.

Weights: primarily 500, 600, and 700. Avoid repeated 800-weight typography.

**Editorial accent: `Source Serif 4`**

Use sparingly for:

- one emphasized phrase in selected major headings;
- research thesis statements;
- pull statements;
- selected page openers.

It must not be used as a decorative font across every section.

**Technical / data: `IBM Plex Mono`**

Use for:

- project IDs;
- metric labels;
- dataset names in figure metadata;
- model IDs;
- technical annotations;
- small section indices;
- provenance labels.

Long body copy may use `Inter Tight` at normal width/weight unless readability testing justifies adding a separate body face. V3 intentionally limits the number of font families.

### 4.2 Type scale

Desktop targets:

- Hero display: `clamp(4.5rem, 7vw, 6.5rem)` depending on line length;
- Page title: 64–84px;
- Section title: 44–64px;
- Subsection: 28–36px;
- Body lead: 20–24px;
- Body: 16–18px;
- Caption: 13–14px;
- Mono label: 11–12px.

Mobile targets:

- Hero: approximately 48–60px;
- Page title: approximately 44–52px;
- Section title: approximately 34–42px;
- Body: 16–17px.

### 4.3 Typography rules

- hero line length should usually remain under 11–13 words across 2–4 lines;
- long-form body measure should remain approximately 60–72 characters;
- section labels should not become decorative badges by default;
- hierarchy should come primarily from scale, spacing, alignment, and weight;
- avoid all-caps paragraphs;
- letter spacing must remain restrained except for tiny mono metadata;
- no animated text gradients.

---

## 5. Colour System

The site should be approximately **85% neutral**.

### 5.1 Core palette

- **Canvas / paper:** `#F3F1EB`
- **Primary surface:** `#FBFAF6`
- **Primary ink:** `#111315`
- **Secondary ink:** `#5D6163`
- **Muted text:** `#7A7E80`
- **Rule / border:** `#D7D3CA`
- **Strong rule:** `#BAB6AD`
- **Primary research blue:** `#3657C8`

Final values may shift slightly during contrast validation, but the character must remain warm-neutral and restrained.

### 5.2 Scientific accent colours

Component colour is treated as **data identity**, not page decoration.

- **C1 Physiology:** muted teal / sea green;
- **C2 Behaviour:** muted blue / cyan;
- **C3 Clinical NLP:** restrained coral / rose;
- **C4 Fusion / RAG:** muted violet / indigo.

These colours appear mainly in:

- chart marks;
- waveform traces;
- diagram nodes;
- figure legends;
- tiny component indices;
- selected hover/focus accents.

They should not turn entire sections into different coloured templates.

### 5.3 Gradient policy

Large blue-violet-teal gradients are prohibited.

Permitted cases:

- extremely subtle tonal transition inside a research figure;
- a low-contrast data-density field;
- a technically meaningful colour scale.

Gradients are never used simply to make text or buttons look more exciting.

---

## 6. Layout System

### 6.1 Grid

Desktop uses a 12-column editorial grid.

- maximum visual canvas: approximately 1440px;
- main content width: approximately 1320–1360px;
- text measure: much narrower;
- minimum desktop gutter: 32px;
- section spacing: typically 120–176px;
- vertical rhythm: 8px base increments.

The site must use large negative space intentionally.

### 6.2 Composition

Preferred compositions:

- asymmetric 7/5 or 8/4 editorial splits;
- figure-first sections;
- wide visual with narrow annotation column;
- typography-led full-width statements;
- alternating component narratives;
- narrow evidence tables with strong rules;
- occasional full-bleed scientific figure moments.

Avoid repeated `grid md:grid-cols-3 gap-6` card layouts as the default solution.

### 6.3 Borders, radius, shadow

Radii:

- controls: 6–10px;
- selected compact surfaces: 10–14px;
- major figure/device frame: 0–16px depending on source;
- no universal 20–24px radius.

Borders:

- prefer 1px neutral rules;
- use alignment and whitespace before container borders.

Shadows:

- most content receives no shadow;
- use only for navigation elevation, device screenshots, modal/lightbox layers, or true floating interaction surfaces.

---

## 7. Imagery and Asset Strategy

### 7.1 Approved imagery hierarchy

Primary visual assets must be selected in this order:

1. real research architecture / framework figures from `R26-DS-012`;
2. real model-output plots and validation figures;
3. real wearable hardware imagery;
4. real ClinAnx / mobile / clinician application screenshots;
5. real team portraits;
6. bespoke React/SVG scientific diagrams derived from the actual methods;
7. custom graphical-abstract style illustrations when a real figure does not exist;
8. contextual photography only when it adds information that cannot be communicated better through real project material.

### 7.2 Stock photography policy

Stock photography is not a primary visual language.

Do not use:

- brain scans as generic AI imagery;
- doctors looking at tablets;
- abstract medical teams;
- anonymous students;
- generic hospital corridors;
- unrelated data-center imagery.

A page is allowed to contain **zero photography**.

### 7.3 Figure treatment

Scientific figures should use:

- consistent captions;
- source/provenance labels when useful;
- minimal chrome;
- clear legends;
- neutral framing;
- optional expanded view only where detail requires it.

Do not put every figure inside a shadowed rounded card.

### 7.4 Application screenshots

Use real screenshots with:

- consistent device/window treatment;
- restrained shadow only when necessary to separate the UI from the page;
- meaningful captions;
- no fake dashboard mockups.

### 7.5 Team portraits

Use real portraits only.

Treatment:

- consistent 4:5 or 3:4 crop;
- natural colour or mild low-saturation normalization;
- simple caption below or beside image;
- no floating role pill over faces;
- no gradient overlay unless text genuinely overlays the image;
- no fake replacement portraits.

If a supervisor portrait is unavailable, use a refined text-only profile rather than an avatar with giant initials inside a coloured box.

---

## 8. Motion System

Motion must feel calm enough that the site still reads as a research publication.

### 8.1 Interaction motion

Duration: **180–240ms**

Used for:

- navigation state;
- buttons and links;
- focus/hover feedback;
- disclosures;
- mobile navigation.

Preferred easing: restrained cubic-bezier / ease-out. Avoid spring bounce.

### 8.2 Content motion

Duration: **500–650ms**

Default section reveal:

```text
opacity: 0 → 1
translateY: 12px → 0
```

No dramatic slide distances.

### 8.3 Scientific figure animation

Duration: approximately **700–1100ms** for initial drawing/reveal.

Permitted:

- waveform path drawing;
- graph edge reveal;
- confidence interval line expansion;
- data-flow route reveal;
- prototype point appearance;
- fusion weight interpolation.

These motions must communicate a method or relationship.

### 8.4 Ambient motion

Use at most a small number of slow ambient scientific motions across the whole site.

Duration: approximately **18–24 seconds**.

Examples:

- extremely slow signal drift;
- quiet data-flow loop in the hero graphical abstract.

No floating particles, bubbles, spinning rings, or continuous card motion.

### 8.5 Reduced motion

All non-essential animation must respect `prefers-reduced-motion`.

The site must remain fully understandable when animation is disabled.

---

## 9. Design-System Primitives

The current site uses large page files with many one-off treatments. V3 introduces reusable primitives so pages share one visual grammar without becoming repetitive.

Recommended primitives:

- `PageShell`
- `PageIntro`
- `Section`
- `SectionHeader`
- `EditorialSplit`
- `FigureFrame`
- `FigureCaption`
- `ResearchFigure`
- `MetricLine`
- `MetricGroup`
- `EvidenceBlock`
- `ResearchStatus`
- `ComponentIndex`
- `PublicationRow`
- `PersonProfile`
- `SourceNote`
- `InlineArrowLink`

### 9.1 Primitive philosophy

Primitives provide:

- spacing;
- type hierarchy;
- grid placement;
- rule styling;
- accessibility behaviour;
- figure/caption consistency.

They should **not** force every section into an identical card.

---

## 10. Navigation

### 10.1 Desktop

Primary navigation:

`Research  Components  Methodology  Results  Team  Publications`

`Documents` and `Contact` move to the footer or a quiet utility area.

Brand treatment:

```text
R26 / DS / 012
MULTIMODAL ANXIETY RESEARCH
```

No brain icon.
No gradient logo tile.

Active state:

- subtle underline;
- text-weight/ink change;
- optional shared layout motion;
- never a large rounded blue background.

Repository link should remain secondary.

### 10.2 Mobile

Use a full-height or near-full-height editorial navigation sheet.

- large navigation typography;
- clear active state;
- simple close control;
- no tiny accordion dropdown styling;
- body scroll lock while open;
- accessible focus management.

---

## 11. Homepage

The homepage should read like a research launch story, not a conversion funnel.

### 11.1 Hero

Remove the current dark stock brain image completely.

Approved structure:

```text
R26 / DS / 012                                  SLIIT · 2026

MULTIMODAL DIGITAL BIOMARKERS

A multimodal framework
for understanding anxiety
vulnerability over time.

Physiological forecasting, behavioural research,
clinical NLP, and reliability-aware fusion.

Explore research  →      Methodology

                                   [bespoke graphical abstract]
```

The graphical abstract should combine:

- a physiological waveform;
- behavioural temporal structure;
- clinical-note / embedding geometry;
- central reliability-weighted fusion;
- evidence retrieval/provenance output.

It should be drawn as a fine-line scientific composition, not a cartoon infographic.

### 11.2 Research thesis

A wide typography-led section explains why one modality is insufficient.

No cards.

The narrative should emphasize that physiology, passive behaviour, clinical text, and contextual evidence operate on different timescales and have different validation/reliability characteristics.

### 11.3 Architecture

A dedicated architecture section presents the current system accurately.

The website must visually distinguish:

- C1 physiological forecasting;
- C2 behavioural research/evaluation;
- C3 TC-WPN clinical NLP;
- C4 reliability-weighted fusion + CARE-AnxRAG.

C2 must be visibly marked as **excluded from active fusion under current evidence**, not presented as a validated active risk signal.

### 11.4 Four research streams

Do not use four equal cards.

Use four large editorial sections with different figure compositions but shared typographic rules.

Each component section includes:

- component index;
- research question;
- method;
- one primary figure;
- one or two evidence statements;
- status / limitation where relevant;
- link to full component detail.

### 11.5 Validation / results preview

Present results as evidence, not marketing statistics.

Preferred format:

```text
EXTERNAL VALIDATION

AUROC
0.8757

F1
0.5362

AffectiveROAD
────────────────────────────
Interpretation / limitation
```

No circular progress meters.
No animated counters.

### 11.6 Safety and limitations

A dedicated section communicates:

- research use only;
- not a diagnostic device;
- modality reliability differs;
- missing/unreliable modalities can be masked;
- C2 is currently excluded from active fusion;
- broader clinical validation remains required.

This section should look intentional and important, not like legal fine print.

### 11.7 Team / publications preview

Use restrained editorial previews that link to full pages.

No stock collaboration banner.

---

## 12. Research / Components Page

The Components page becomes a **research atlas** rather than a feature grid.

### 12.1 Overview index

Use a simple numbered index:

```text
01  Physiological forecasting
02  Behavioural graph evaluation
03  Clinical NLP / TC-WPN
04  Fusion + CARE-AnxRAG
```

Each item includes status and short scope.

### 12.2 Component detail sections

Each component receives:

- question;
- data source;
- method flow;
- primary scientific figure;
- evaluation protocol;
- key evidence;
- limitations;
- implementation/deployment status where appropriate.

Avoid technology-logo walls.

Technologies may appear as compact metadata only when useful.

---

## 13. Methodology Page

The Methodology page should feel like a visual methods section from a strong paper.

Structure:

1. study architecture;
2. datasets and cohort boundaries;
3. component-specific evaluation;
4. leakage prevention;
5. calibration/reliability logic;
6. fusion eligibility;
7. RAG evidence flow;
8. research-safety constraints.

Use diagrams, equations, timelines, and tables rather than repeated cards.

The fusion equation should be displayed clearly and explained in plain language.

---

## 14. Results Page

A dedicated `/results` route is required.

### 14.1 Purpose

Results is an evidence report, not a dashboard.

It must distinguish:

- within-dataset performance;
- external evaluation;
- held-out evaluation;
- confidence intervals;
- null/permutation comparisons;
- deployment/fusion eligibility decisions;
- limitations.

### 14.2 Result layouts

Use:

- large metric typography;
- thin rules;
- confidence-interval plots;
- compact evidence tables;
- comparison charts;
- explanatory captions.

Avoid:

- speedometers;
- donuts as decoration;
- progress rings;
- animated number counters;
- traffic-light cards without statistical context.

### 14.3 C2 result treatment

The behavioural result must be represented as an important scientific finding even though it is weak.

The page should state that the final leakage-free GATv2 held-out result was not distinguishable from chance and that C2 is excluded from active fusion under current evidence.

This is a credibility feature, not something to hide.

---

## 15. Team Page

Remove the generic stock team banner.

Page structure:

1. typographic page introduction;
2. research team portraits;
3. supervisor profiles;
4. institution / programme metadata.

### 15.1 Research members

Preferred composition:

- large portrait;
- name;
- component role;
- 2–3 line contribution;
- optional links.

No role pill over portrait.
No colourful skill-tag cloud.

### 15.2 Supervisors

Use real portraits if available and appropriate.

If unavailable, use high-quality text profiles with role and affiliation.

Do not use coloured initial avatars as a substitute for missing photographs.

---

## 16. Publications, Documents, Contact

### 16.1 Publications

Use journal/bibliography-style rows:

- title;
- authors;
- venue/status;
- year;
- DOI/repository/document links where available.

Minimal chrome.

### 16.2 Documents

Documents should resemble a research archive:

- document title;
- type;
- date/version;
- concise description;
- download/view action.

Avoid download cards with large icons and shadows.

### 16.3 Contact

The contact page should remain simple.

Preferred:

- research/project contact information;
- institutional context;
- repository link;
- optional minimal contact form only if already required.

No decorative stock photography.

---

## 17. Scientific Content Guardrails

The website must use `dulhara79/R26-DS-012` as the research source of truth.

### 17.1 Current component mapping

The visual and written system must reflect:

- **C1:** wearable biosensor forecasting / personalized physiological modelling;
- **C2:** GLOBEM-based spatio-temporal behavioural evaluation with leakage-free validation;
- **C3:** clinical NLP / TC-WPN;
- **C4:** contextual modelling, reliability-weighted multimodal fusion, and CARE-AnxRAG decision support.

### 17.2 Prohibited outdated claims

Do not reintroduce:

- StudentLife as the final C2 validation source;
- hourly phenotype outputs as validated final C2 outputs;
- active C2 contribution to fusion under the current evidence;
- NHANES/KNN-CBR intervention engine as the final C4 architecture;
- older GBDT/KNN intervention descriptions as the current C4 method;
- claims that all four components use the same learning paradigm;
- clinical-device or diagnostic claims.

### 17.3 C2 fusion status

Current behavioural model evidence must be represented consistently with:

```text
active fusion base weight = 0.0
```

The UI may still show C2 as a research component, but it must distinguish **research contribution** from **active fused risk contribution**.

---

## 18. Accessibility

Minimum requirements:

- WCAG 2.2 AA target for contrast and interaction;
- visible keyboard focus;
- semantic headings;
- keyboard-operable navigation and disclosures;
- descriptive alt text for informative imagery;
- empty alt text for purely decorative imagery;
- figure captions where necessary;
- no information encoded by colour alone;
- reduced-motion support;
- accessible mobile menu focus management;
- reasonable text resizing without layout failure.

Scientific charts must use labels/pattern/shape where necessary so meaning does not depend only on colour.

---

## 19. Responsive Behaviour

The design must be authored responsively, not shrunk after desktop is complete.

### 19.1 Mobile principles

- preserve whitespace, but reduce oversized empty gaps;
- keep figures readable through simplified mobile variants if required;
- stack editorial splits intentionally;
- avoid tiny chart labels;
- preserve metric hierarchy;
- avoid horizontal-scroll traps except for intentional evidence tables with clear affordance;
- use a full-screen navigation sheet.

### 19.2 Tablet

Tablet should not merely inherit desktop two-column layouts when reading width becomes uncomfortable.

Sections may switch to one-column earlier than conventional breakpoints if the scientific figure needs room.

---

## 20. Performance

### 20.1 Asset policy

- avoid downloading large remote stock images;
- optimize real project images before shipping;
- use responsive image sizes;
- lazy-load below-fold media;
- use SVG for vector scientific figures where appropriate;
- avoid heavy 3D/WebGL dependencies unless they provide unique scientific value;
- avoid animation libraries for effects that CSS can perform cleanly.

### 20.2 Performance targets

Implementation should aim for strong Core Web Vitals and a fast first meaningful render on typical mobile connections.

Hero content must not depend on a multi-megabyte background photograph.

---

## 21. Implementation Architecture

### 21.1 Refactor requirement

The redesign should not continue adding one-off visual logic to large page files.

Create shared layout, figure, evidence, and typography primitives first, then rebuild pages using them.

### 21.2 Recommended implementation sequence

1. scientific-content regression tests;
2. typography / colour / spacing tokens;
3. remove legacy visual utility classes;
4. shared layout primitives;
5. navigation and footer;
6. hero graphical abstract;
7. homepage;
8. Components / Research;
9. Methodology;
10. Results route/page;
11. Team;
12. Publications / Documents / Contact;
13. responsive/accessibility pass;
14. performance and visual QA.

### 21.3 Legacy CSS cleanup

The implementation should delete or stop using legacy utilities representing the old language, including equivalents of:

- `.nav-glass`;
- universal `.card` lift/shadow treatment;
- gradient text utilities;
- floating badge animations;
- shimmer utilities;
- glow-ring utilities;
- decorative spin utilities;
- gradient-border utilities;
- universal pill variants used as default content labels.

Keep only styles that still serve the approved V3 system.

---

## 22. Visual Acceptance Checklist

Before the redesign is considered complete, verify all of the following.

### Identity

- [ ] No generic brain hero image remains.
- [ ] No gradient brain logo remains.
- [ ] Hero identity comes from typography + real research visual language.
- [ ] The site does not resemble a SaaS template.

### Typography

- [ ] Inter Tight roles are consistent.
- [ ] Source Serif 4 is sparse and intentional.
- [ ] IBM Plex Mono is limited to technical metadata.
- [ ] Heading weights are controlled.

### Imagery

- [ ] Primary homepage imagery is real research material or bespoke scientific graphics.
- [ ] Generic stock team/medical imagery is removed.
- [ ] Team portraits are authentic and consistently treated.
- [ ] Figures have useful captions/provenance where appropriate.

### UI language

- [ ] No decorative gradient headline text.
- [ ] No floating bubbles/particles.
- [ ] No shimmer/glow/spinning decoration.
- [ ] No universal glass cards.
- [ ] No repeated large-radius cards as the default section pattern.
- [ ] No unnecessary pill clouds.

### Motion

- [ ] Section motion is subtle.
- [ ] Scientific animation explains information.
- [ ] Reduced-motion mode works.
- [ ] Nothing bounces or constantly floats for decoration.

### Research accuracy

- [ ] GLOBEM is the final C2 source of truth.
- [ ] C2 weak held-out result is presented accurately.
- [ ] C2 is excluded from active fusion under current evidence.
- [ ] TC-WPN is C3.
- [ ] C4 is reliability-weighted fusion + CARE-AnxRAG, not the older KNN intervention engine.
- [ ] Research-use / non-diagnostic limitations are clear.

### Structure

- [ ] `/results` exists.
- [ ] Primary nav is reduced to Research, Components, Methodology, Results, Team, Publications.
- [ ] Documents and Contact are secondary utilities.
- [ ] Shared layout/figure/evidence primitives replace page-specific duplication.

### Quality

- [ ] Mobile layouts are intentionally designed.
- [ ] Contrast and keyboard interactions meet accessibility targets.
- [ ] Main visual assets are optimized.
- [ ] No major layout shift from hero media/fonts.
- [ ] The final website feels calm, precise, editorial, and scientifically credible.

---

## 23. Final Design Rule

When deciding between two treatments, choose the one that makes the research easier to understand with **less visual decoration**.

Premium quality in this project comes from:

- typography;
- composition;
- evidence;
- authentic assets;
- precise spacing;
- restraint.

It does not come from adding more effects.

**Implementation must not begin from this specification until the user has reviewed and approved the written V3 spec.**
