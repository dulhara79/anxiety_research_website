import test from 'node:test'
import assert from 'node:assert/strict'
import { getSpatialQuality } from './spatialQuality.js'

test('reduced motion always selects fallback quality', () => {
  assert.deepEqual(
    getSpatialQuality({ width: 1440, dpr: 2, finePointer: true, reducedMotion: true, webgl: true }),
    { tier: 'fallback', dpr: 1, particles: 0, animated: false }
  )
})

test('small touch viewport selects low quality', () => {
  assert.equal(
    getSpatialQuality({ width: 430, dpr: 3, finePointer: false, reducedMotion: false, webgl: true }).tier,
    'low'
  )
})

test('desktop fine pointer selects high quality with capped DPR', () => {
  const quality = getSpatialQuality({ width: 1600, dpr: 2.5, finePointer: true, reducedMotion: false, webgl: true })
  assert.equal(quality.tier, 'high')
  assert.equal(quality.dpr <= 1.75, true)
})

test('missing WebGL selects fallback quality', () => {
  assert.equal(
    getSpatialQuality({ width: 1600, dpr: 1, finePointer: true, reducedMotion: false, webgl: false }).tier,
    'fallback'
  )
})
