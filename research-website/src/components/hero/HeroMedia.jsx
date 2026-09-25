import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const SEAMLESS_LOOP_FADE_SECONDS = 1
const SEAMLESS_LOOP_FADE_MS = SEAMLESS_LOOP_FADE_SECONDS * 1000

export default function HeroMedia({ webmSrc = '/media/research-hero.webm', mp4Src = '/media/research-hero.mp4', posterSrc = '/media/research-hero-poster.webp' }) {
  const videoRefs = useRef([])
  const transitioningRef = useRef(false)
  const cleanupTimerRef = useRef(null)
  const reduced = useReducedMotion()
  const [activeLayer, setActiveLayer] = useState(0)
  const [mediaState, setMediaState] = useState('loading')

  const safelyPlay = (video) => {
    if (!video) return
    const playback = video.play()
    playback?.catch?.(() => setMediaState('blocked'))
  }

  const handoffToNextLayer = (fromLayer) => {
    if (reduced || transitioningRef.current) return

    const current = videoRefs.current[fromLayer]
    const nextLayer = fromLayer === 0 ? 1 : 0
    const next = videoRefs.current[nextLayer]
    if (!current || !next || !Number.isFinite(current.duration)) return

    transitioningRef.current = true
    next.currentTime = 0
    next.muted = true
    safelyPlay(next)
    setActiveLayer(nextLayer)

    window.clearTimeout(cleanupTimerRef.current)
    cleanupTimerRef.current = window.setTimeout(() => {
      current.pause()
      current.currentTime = 0
      transitioningRef.current = false
    }, SEAMLESS_LOOP_FADE_MS + 80)
  }

  const handleTimeUpdate = (layer) => {
    if (layer !== activeLayer || transitioningRef.current || reduced) return
    const video = videoRefs.current[layer]
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return

    const fadeWindow = Math.min(SEAMLESS_LOOP_FADE_SECONDS, Math.max(0.25, video.duration * 0.12))
    if (video.duration - video.currentTime <= fadeWindow) handoffToNextLayer(layer)
  }

  useEffect(() => {
    const videos = videoRefs.current.filter(Boolean)
    if (!videos.length) return undefined

    if (reduced) {
      videos.forEach((video) => video.pause())
      setMediaState((state) => state === 'failed' ? state : 'paused')
      return undefined
    }

    const active = videoRefs.current[activeLayer]
    safelyPlay(active)
    return undefined
  }, [reduced, activeLayer])

  useEffect(() => () => window.clearTimeout(cleanupTimerRef.current), [])

  const sources = <>
    <source src={mp4Src} type="video/mp4"/>
    {webmSrc && <source src={webmSrc} type="video/webm"/>}
  </>

  return <div className="hero-media" aria-hidden="true" data-media-state={mediaState}>
    <div className="hero-fallback"><i/><i/><i/><i/></div>
    {[0, 1].map((layer) => <motion.video
      key={layer}
      className="seamless-video-layer"
      ref={(node) => { videoRefs.current[layer] = node }}
      muted
      playsInline
      preload="auto"
      poster={posterSrc}
      initial={false}
      animate={{ opacity: activeLayer === layer ? 1 : 0 }}
      transition={{ duration: reduced ? 0 : SEAMLESS_LOOP_FADE_SECONDS, ease: [0.4, 0, 0.2, 1] }}
      onLoadedData={() => {
        if (layer === 0) setMediaState(reduced ? 'paused' : 'ready')
      }}
      onCanPlay={() => {
        if (layer === activeLayer) setMediaState(reduced ? 'paused' : 'ready')
      }}
      onPlaying={() => {
        if (layer === activeLayer) setMediaState('ready')
      }}
      onTimeUpdate={() => handleTimeUpdate(layer)}
      onEnded={() => handoffToNextLayer(layer)}
      onError={() => setMediaState('failed')}
    >
      {sources}
    </motion.video>)}
  </div>
}
