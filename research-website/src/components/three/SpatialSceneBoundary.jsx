import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import SpatialCanvas from './SpatialCanvas'
import SpatialErrorBoundary from './SpatialErrorBoundary'
import SceneFallback from './SceneFallback'
import useSpatialMotion from './useSpatialMotion'
import { getSpatialQuality, readSpatialEnvironment } from './spatialQuality'

export default function SpatialSceneBoundary({ scene: Scene, fallbackVariant = 'context', className = '', minHeight = 360, camera, pointerParallax = true, sceneProps = {} }) {
  const hostRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const [nearViewport, setNearViewport] = useState(false)
  const [ready, setReady] = useState(false)
  const [environment, setEnvironment] = useState(() => readSpatialEnvironment(Boolean(reducedMotion)))
  const motion = useSpatialMotion(hostRef)

  useEffect(() => {
    setEnvironment(readSpatialEnvironment(Boolean(reducedMotion)))
    const resize = () => setEnvironment(readSpatialEnvironment(Boolean(reducedMotion)))
    window.addEventListener('resize', resize, { passive: true })
    return () => window.removeEventListener('resize', resize)
  }, [reducedMotion])

  useEffect(() => {
    const node = hostRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setNearViewport(true)
      return undefined
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setNearViewport(true)
    }, { rootMargin: '40% 0px' })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const quality = useMemo(() => getSpatialQuality(environment), [environment])
  const useFallbackOnly = quality.tier === 'fallback' || (quality.tier === 'low' && environment.width < 640)
  const style = { minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }
  const fallback = <SceneFallback variant={fallbackVariant}/>

  return <div ref={hostRef} className={`spatial-stage ${className}`.trim()} style={style} data-spatial-quality={quality.tier}>
    {(!ready || useFallbackOnly || !nearViewport) && fallback}
    {nearViewport && !useFallbackOnly && <SpatialErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <SpatialCanvas quality={quality} camera={camera} pointerParallax={pointerParallax} onReady={() => setReady(true)}>
          <Scene quality={quality} motion={motion} {...sceneProps}/>
        </SpatialCanvas>
      </Suspense>
    </SpatialErrorBoundary>}
  </div>
}
