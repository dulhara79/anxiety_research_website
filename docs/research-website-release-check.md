# Research Website Release Check

Date: 2026-09-20  
Branch: `redesign/research-instrument-2026`

## Automated verification

Verified implementation commit: `05060dccecc9964c12e8ab566cc9cb21295ad3d7`

GitHub Actions run: `35502797769`

- `npm ci` — PASS
- `npm test` — PASS
- `npm run validate` — PASS
- `npm run build` — PASS

The automated semantic checks cover:
- explicit CURRENT / TARGET / PROPOSED system states;
- C2 `EXPERIMENTAL / EXCLUDED` state and current active fusion weight `0.0`;
- C2 excluded from the CURRENT fusion eligibility set;
- `Current multimodal assessment` kept separate from `Near-term physiological forecast`;
- physiological forecast scope is not labelled as a multimodal forecast;
- patient and clinician projections use `fusion_result_id` and do not recompute authoritative fusion;
- unavailable evidence is represented as unavailable rather than as zero/low;
- required research-instrument components and routes exist;
- reduced-motion and coarse-pointer CSS fallbacks exist;
- light/dark theme selectors exist;
- required research image assets exist.

## Research integrity

- The site presents itself as a research prototype / clinical decision-support research system, not a diagnostic medical device.
- CURRENT and TARGET architecture are separate views.
- TARGET AttentionEvent lifecycle content is explicitly labelled TARGET.
- C2 remains visibly experimental/excluded in the current validation/fusion story.
- Current assessment and future physiological forecast remain separate.
- The public document index contains public repositories only.
- The manuscript remains labelled `Research manuscript / project output`; no acceptance, indexing or DOI status was added.

## Image provenance

### Real research artefact
`public/images/research/chest-strap-reference.webp`

Derived from the user-supplied photograph of the chest-strap physiological sensing hardware reference.

### Editorial illustration
`public/images/research/multimodal-editorial.webp`

AI-generated supporting editorial artwork. The website labels it `EDITORIAL ILLUSTRATION` and does not present it as a real application screenshot or experimental result.

## Visual / device verification status

Not marked as passed in this environment:
- interactive browser visual review at 1440 px / 1024 px;
- interactive browser mobile review at 390 px / 360 px;
- real-device pointer/hover feel;
- dark-mode visual contrast by human inspection.

Responsive CSS, mobile fallback rules and reduced-motion rules are present and the production build is verified, but these manual visual checks should be performed before merging to `main`.

## Known infrastructure observation

The GitHub Actions dependency-install step reported existing npm audit findings in the repository dependency tree. This redesign did not add a new animation framework or change the existing React/Vite/Framer Motion dependency versions.

## Scope confirmation

This branch changes public research-site presentation, research-content schemas, tests, assets and documentation only. It does not modify the central backend, model implementations, fusion equations, patient app or clinician app behavior.
