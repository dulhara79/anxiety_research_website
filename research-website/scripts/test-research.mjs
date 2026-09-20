import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const research = await import('../src/data/researchData.js')
const system = await import('../src/data/systemStatus.js')
const evidence = await import('../src/data/evidenceData.js')

assert.ok(Array.isArray(research.components), 'components must be an array')
for (const component of research.components) {
  assert.ok(['current','experimental','unavailable'].includes(component.status), component.id + ' must have an explicit status')
}
const c2 = research.components.find((item) => item.id === 'C2')
assert.ok(c2, 'C2 must exist')
assert.equal(c2.fusionEligible, false, 'C2 must be excluded from current active fusion')
assert.equal(c2.activeFusionWeight, 0, 'C2 current active fusion weight must be 0.0')

assert.equal(system.systemStates.current.status, 'current')
assert.equal(system.systemStates.target.status, 'target')
assert.equal(system.systemStates.proposed.status, 'proposed')
assert.equal(system.currentAssessment.label, 'Current multimodal assessment')
assert.equal(system.physiologicalForecast.scope, 'physiological')
assert.equal(system.physiologicalForecast.label, 'Near-term physiological forecast')
assert.ok(!system.physiologicalForecast.label.toLowerCase().includes('multimodal forecast'))

for (const projection of system.audienceProjections) {
  assert.equal(projection.source, 'fusion_result_id')
  assert.equal(projection.recomputesFusion, false)
}

assert.equal(evidence.unavailableEvidenceExample.value, null)
assert.equal(evidence.unavailableEvidenceExample.status, 'unavailable')

const root = path.resolve('src')
const requiredFiles = [
  'components/StatusBadge.jsx',
  'components/ThemeToggle.jsx',
  'components/ScrollProgress.jsx',
  'components/ResearchHero.jsx',
  'components/DeviceSignalStage.jsx',
  'components/MultimodalStory.jsx',
  'components/ModalityStage.jsx',
  'components/ValidationGate.jsx',
  'components/FusionStage.jsx',
  'components/CurrentForecastSplit.jsx',
  'components/AudienceProjection.jsx',
  'components/EvidenceLedger.jsx',
  'components/ResearchArtifactGallery.jsx',
  'pages/System.jsx',
]
for (const relative of requiredFiles) {
  assert.ok(fs.existsSync(path.join(root, relative)), relative + ' must exist')
}

const app = fs.readFileSync(path.join(root, 'App.jsx'), 'utf8')
for (const route of ['/research','/methodology','/evidence','/system','/publications','/documents','/team']) {
  assert.ok(app.includes(route), 'App must include route ' + route)
}

const home = fs.readFileSync(path.join(root, 'pages/Home.jsx'), 'utf8')
for (const componentName of ['ResearchHero','MultimodalStory','ValidationGate','FusionStage','CurrentForecastSplit','AudienceProjection','ResearchArtifactGallery']) {
  assert.ok(home.includes(componentName), 'Home must compose ' + componentName)
}

const gate = fs.readFileSync(path.join(root, 'components/ValidationGate.jsx'), 'utf8')
assert.ok(gate.includes('EXPERIMENTAL / EXCLUDED'))
assert.ok(gate.includes('activeFusionWeight'))

const split = fs.readFileSync(path.join(root, 'components/CurrentForecastSplit.jsx'), 'utf8')
assert.ok(split.includes('Current multimodal assessment'))
assert.ok(split.includes('Near-term physiological forecast'))
assert.ok(!split.toLowerCase().includes('multimodal forecast'))

const systemPage = fs.readFileSync(path.join(root, 'pages/System.jsx'), 'utf8')
assert.ok(systemPage.includes('CURRENT'))
assert.ok(systemPage.includes('TARGET'))

const css = fs.readFileSync(path.join(root, 'index.css'), 'utf8')
assert.ok(css.includes('prefers-reduced-motion'))
assert.ok(css.includes('(hover: none)'))
assert.ok(css.includes('[data-theme="dark"]') || css.includes("[data-theme='dark']"))

assert.ok(fs.existsSync(path.resolve('public/images/research/chest-strap-reference.webp')))
assert.ok(fs.existsSync(path.resolve('public/images/research/multimodal-editorial.webp')))

console.log('Research semantic and presentation tests passed.')
