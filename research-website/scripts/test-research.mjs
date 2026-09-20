import assert from 'node:assert/strict'

const research = await import('../src/data/researchData.js')
const system = await import('../src/data/systemStatus.js')

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

for (const projection of system.audienceProjections) {
  assert.equal(projection.source, 'fusion_result_id')
  assert.equal(projection.recomputesFusion, false)
}

console.log('Research semantic tests passed.')
