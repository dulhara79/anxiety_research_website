import test from 'node:test'
import assert from 'node:assert/strict'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const moduleUrl = pathToFileURL(path.resolve('src/data/research.js')).href
const data = await import(`${moduleUrl}?v=${Date.now()}`)

test('research state model covers the complete signal journey', () => {
  assert.deepEqual(Object.keys(data.researchStates), ['overview', 'c1', 'c2', 'c3', 'c4'])
  assert.equal(data.researchStates.overview.next, 'c1')
  assert.equal(data.researchStates.c1.next, 'c2')
  assert.equal(data.researchStates.c2.next, 'c3')
  assert.equal(data.researchStates.c3.next, 'c4')
  assert.equal(data.researchStates.c4.next, 'evidence')
})

test('C2 evidence gate preserves the verified weak held-out result', () => {
  const c2 = data.components.find((component) => component.id === 'C2')
  assert.equal(c2.metrics.auroc, '0.5205')
  assert.equal(c2.metrics.ci, '0.485–0.560')
  assert.equal(c2.metrics.null, '0.4991')
  assert.equal(c2.metrics.p, '0.255')
  assert.equal(c2.metrics.fusionWeight, '0.0')
  assert.match(c2.limitation, /not distinguishable from chance/i)
})

test('C3 is contextualized as patient-disjoint rather than marketed as a diagnostic claim', () => {
  const c3 = data.components.find((component) => component.id === 'C3')
  assert.equal(c3.metrics.auroc, '≈0.738')
  assert.match(c3.evidence, /Patient-disjoint/i)
})

test('research safety principles remain first-class content', () => {
  assert.ok(data.safetyPrinciples.includes('This framework is for research and clinical decision support. It is not a diagnostic device.'))
  assert.ok(data.safetyPrinciples.includes('Unavailable evidence must not automatically become zero risk.'))
  assert.ok(data.safetyPrinciples.includes('The framework may return insufficient evidence rather than manufacture certainty.'))
})

import fs from 'node:fs'

const read = (file) => fs.readFileSync(path.resolve(file), 'utf8')

test('immersive experience files preserve accessibility and route behavior', () => {
  const app = read('src/App.jsx')
  const experience = read('src/components/experience/ResearchExperience.jsx')
  const lens = read('src/components/experience/ResearchLens.jsx')
  const css = read('src/index.css') + read('src/styles/responsive.css')
  assert.match(app, /HashRouter/)
  for (const route of ['/components', '/results', '/methodology', '/publications', '/team', '/documents', '/contact']) {
    assert.ok(app.includes(`path="${route}"`), `missing ${route}`)
  }
  assert.match(experience, /useReducedMotion/)
  assert.match(lens, /aria-label=/)
  assert.match(lens, /aria-hidden="true"/)
  assert.match(css, /prefers-reduced-motion: reduce/)
  assert.match(css, /pointer: coarse/)
})

test('metadata is research-specific and avoids unsupported marketing language', () => {
  const html = read('index.html')
  assert.match(html, /R26-DS-012 \| Multimodal Digital Biomarker Framework/)
  assert.match(html, /property="og:title"/)
  assert.match(html, /name="keywords"/)
  assert.doesNotMatch(html, /clinically proven|diagnostic AI|detects anxiety accurately|Plus Jakarta Sans|Outfit|JetBrains Mono/i)
})

test('C2 is visually gated rather than animated as an active fused modality', () => {
  const visual = read('src/components/visualizations/SignalVisual.jsx')
  const results = read('src/pages/Results.jsx')
  assert.match(visual, /WEIGHT → 0\.0/)
  assert.match(visual, /data-gated="true"/)
  assert.match(results, /C2 is excluded from active fusion/)
})
