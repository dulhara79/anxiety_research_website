import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { navItems, project } from '../data/research'

export default function Navbar(){
  const [open,setOpen]=useState(false); const [scrolled,setScrolled]=useState(false)
  useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>36);onScroll();window.addEventListener('scroll',onScroll,{passive:true});return()=>window.removeEventListener('scroll',onScroll)},[])
  return <header className={scrolled?'site-header scrolled':'site-header'}>
    <div className="nav-shell shell-wide">
      <NavLink to="/" className="brand" onClick={()=>setOpen(false)} data-cursor="EXPLORE"><strong>R26—DS—012</strong><span>Multimodal Digital Biomarker Research</span></NavLink>
      <nav className="desktop-nav" aria-label="Primary navigation">{navItems.map(([n,p])=><NavLink key={p} to={p} className={({isActive})=>isActive?'active':''} data-cursor="EXPLORE">{n}</NavLink>)}</nav>
      <button className="menu-toggle" type="button" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-controls="secondary-menu" data-cursor="EXPLORE"><span>Menu</span><i/><i/></button>
    </div>
    <div id="secondary-menu" className={open?'secondary-menu open':'secondary-menu'}>
      <div className="shell-wide secondary-menu-inner">
        <div><p className="eyebrow">PROJECT INDEX</p><NavLink to="/documents" onClick={()=>setOpen(false)}>Documents</NavLink><NavLink to="/contact" onClick={()=>setOpen(false)}>Contact</NavLink></div>
        <div><p className="eyebrow">SOURCE</p><a href={project.repository} target="_blank" rel="noreferrer" data-cursor="OPEN ↗">Research Repository ↗</a><a href={project.websiteRepository} target="_blank" rel="noreferrer" data-cursor="OPEN ↗">Website Repository ↗</a></div>
        <p className="menu-principle">Evidence first. Integration second. Unavailable evidence is not zero risk.</p>
      </div>
    </div>
  </header>
}
