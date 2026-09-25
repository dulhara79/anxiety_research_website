import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'
export default function HeroMedia({webmSrc='/media/research-hero.webm',mp4Src='/media/research-hero.mp4',posterSrc='/media/research-hero-poster.webp'}){
  const [failed,setFailed]=useState(false); const reduced=useReducedMotion()
  return <div className="hero-media" aria-hidden="true">
    <div className="hero-fallback"><i/><i/><i/><i/></div>
    {!failed && !reduced && <video autoPlay muted loop playsInline preload="metadata" poster={posterSrc} onError={()=>setFailed(true)}><source src={webmSrc} type="video/webm"/><source src={mp4Src} type="video/mp4"/></video>}
  </div>
}
