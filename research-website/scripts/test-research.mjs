import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const research = await import('../src/data/researchData.js')
const system = await import('../src/data/systemStatus.js')
const evidence = await import('../src/data/evidenceData.js')
const team = await import('../src/data/teamData.js')

assert.ok(Array.isArray(research.components), 'components must be an array')
for (const component of research.components) {
  assert.ok(['current','experimental','unavailable'].includes(component.status), component.id + ' must have an explicit status')
}
const c2 = research.components.find((item) => item.id === 'C2')
assert.ok(c2, 'C2 must exist')
assert.equal(c2.fusionEligible, false, 'C2 must be excluded from current active fusion')
assert.equal(c2.activeFusionWeight, 0, 'C2 current active fusion weight must be 0.0')
assert.equal(c2.statusLabel, 'EXPERIMENTAL / EXCLUDED')

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

assert.deepEqual(
  team.people.map((person) => person.shortName),
  ['Dulhara', 'Senuvi', 'Dewdu', 'Uvindu'],
  'researcher order must match the approved team order'
)

const root = path.resolve('src')
const requiredFiles = [
  'components/StatusBadge.jsx',
  'components/ThemeToggle.jsx',
  'components/ScrollProgress.jsx',
  'components/RouteScrollTop.jsx',
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
  'components/AiConceptGallery.jsx',
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
for (const componentName of ['ResearchHero','MultimodalStory','AiConceptGallery','ValidationGate','FusionStage','CurrentForecastSplit','AudienceProjection','ResearchArtifactGallery']) {
  assert.ok(home.includes(componentName), 'Home must compose ' + componentName)
}

const story = fs.readFileSync(path.join(root, 'components/MultimodalStory.jsx'), 'utf8')
assert.ok(story.includes('exact-timescale-cards'), 'multimodal story must use the exact reference timescale card row')
assert.ok(story.includes('components.map'), 'multimodal story must render all four modalities as separate cards')
assert.ok(!story.includes('position:absolute;inset:0'), 'multimodal story must not depend on overlapping stacked cards')

const scrollTop = fs.readFileSync(path.join(root, 'components/RouteScrollTop.jsx'), 'utf8')
assert.ok(scrollTop.includes('window.scrollTo'))
assert.ok(scrollTop.includes('location.pathname'))

assert.ok(app.includes('RouteScrollTop'), 'App must reset scroll on route changes')

const gate = fs.readFileSync(path.join(root, 'components/ValidationGate.jsx'), 'utf8')
assert.ok(gate.includes('component.statusLabel'))
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
assert.ok(fs.existsSync(path.resolve('public/images/research/ai-neural-concept.webp')))
assert.ok(fs.existsSync(path.resolve('public/images/research/ai-behavioural-concept.webp')))
assert.ok(fs.existsSync(path.resolve('public/images/research/multimodal-editorial.webp')))

const hero = fs.readFileSync(path.join(root, 'components/ResearchHero.jsx'), 'utf8')
const refinementCss = fs.readFileSync(path.join(root, 'refinement.css'), 'utf8')
assert.ok(hero.includes('exact-hero'), 'hero must use the exact reference composition')
assert.ok(refinementCss.includes('ai-neural-concept.webp'), 'hero background must use a verified AI-generated concept visual with a real repo asset')
assert.ok(refinementCss.includes('.exact-navbar'))
assert.ok(refinementCss.includes('.exact-timescale-card'))

console.log('Research semantic and presentation tests passed.')
