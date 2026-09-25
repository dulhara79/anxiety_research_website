export function getSpatialQuality({ width, dpr, finePointer, reducedMotion, webgl }) {
  if (!webgl || reducedMotion) return { tier: 'fallback', dpr: 1, particles: 0, animated: false }
  if (width < 640 || !finePointer) return { tier: 'low', dpr: 1, particles: 48, animated: false }
  if (width < 1100) return { tier: 'medium', dpr: Math.min(dpr || 1, 1.25), particles: 96, animated: true }
  return { tier: 'high', dpr: Math.min(dpr || 1, 1.75), particles: 180, animated: true }
}

export function canUseWebGL() {
  if (typeof document === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

export function readSpatialEnvironment(reducedMotion = false) {
  if (typeof window === 'undefined') {
    return { width: 0, dpr: 1, finePointer: false, reducedMotion: true, webgl: false }
  }
  return {
    width: window.innerWidth,
    dpr: window.devicePixelRatio || 1,
    finePointer: window.matchMedia?.('(pointer:fine)').matches ?? false,
    reducedMotion,
    webgl: canUseWebGL(),
  }
}
