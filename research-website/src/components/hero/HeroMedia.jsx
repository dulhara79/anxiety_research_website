import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function HeroMedia({ webmSrc = '/media/research-hero.webm', mp4Src = '/media/research-hero.mp4', posterSrc = '/media/research-hero-poster.webp' }) {
  const videoRef = useRef(null)
  const reduced = useReducedMotion()
  const [mediaState, setMediaState] = useState('loading')

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (reduced) {
      video.pause()
      setMediaState((state) => state === 'failed' ? state : 'paused')
      return
    }
    const playback = video.play()
    playback?.catch?.(() => setMediaState('blocked'))
  }, [reduced])

  return <div className="hero-media" aria-hidden="true" data-media-state={mediaState}>
    <div className="hero-fallback"><i/><i/><i/><i/></div>
    <video
      ref={videoRef}
      autoPlay={!reduced}
      muted
      loop={!reduced}
      playsInline
      preload="metadata"
      poster={posterSrc}
      onLoadedData={() => setMediaState(reduced ? 'paused' : 'ready')}
      onCanPlay={() => setMediaState((state) => state === 'loading' ? (reduced ? 'paused' : 'ready') : state)}
      onPlaying={() => setMediaState('ready')}
      onError={() => setMediaState('failed')}
    >
      <source src={mp4Src} type="video/mp4"/>
      {webmSrc && <source src={webmSrc} type="video/webm"/>}
    </video>
  </div>
}
