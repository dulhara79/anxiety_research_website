import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ExternalLink, Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const nav = [
  ['Overview','/'],
  ['Research','/research'],
  ['Methodology','/methodology'],
  ['Evidence','/evidence'],
  ['System','/system'],
  ['Publications','/publications'],
  ['Documents','/documents'],
  ['Team','/team'],
]

export default function Navbar() {
  const [open,setOpen]=useState(false)
  const [scrolled,setScrolled]=useState(false)
  useEffect(() => {
    const fn=()=>setScrolled(window.scrollY>24)
    fn()
    window.addEventListener('scroll',fn,{passive:true})
    return()=>window.removeEventListener('scroll',fn)
  },[])
  return (
    <header className={'site-header ' + (scrolled?'scrolled':'')}>
      <div className="nav-shell">
        <NavLink to="/" className="brand" onClick={()=>setOpen(false)}>
          <span className="brand-symbol"><i/><i/><i/><i/></span>
          <span><strong>R26—DS—012</strong><small>Multimodal Anxiety Research</small></span>
        </NavLink>
        <nav className={open?'nav-links open':'nav-links'} aria-label="Primary navigation">
          {nav.map(([label,path])=><NavLink key={path} to={path} onClick={()=>setOpen(false)}>{label}</NavLink>)}
          <a href="https://github.com/dulhara79/R26-DS-012" target="_blank" rel="noreferrer" className="repo-link">Repository <ExternalLink size={13}/></a>
        </nav>
        <div className="nav-actions">
          <ThemeToggle/>
          <button className="menu-button" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(!open)}>
            {open?<X size={18}/>:<Menu size={18}/>}
          </button>
        </div>
      </div>
    </header>
  )
}
