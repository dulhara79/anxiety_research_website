import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Github, Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const nav = [
  ['Home','/'],
  ['Research','/research'],
  ['System','/system'],
  ['Results','/evidence'],
  ['Publications','/publications'],
  ['Team','/team'],
  ['Contact','/contact'],
]

export default function Navbar() {
  const [open,setOpen]=useState(false)
  const [scrolled,setScrolled]=useState(false)

  useEffect(() => {
    const fn=()=>setScrolled(window.scrollY>18)
    fn()
    window.addEventListener('scroll',fn,{passive:true})
    return()=>window.removeEventListener('scroll',fn)
  },[])

  return (
    <header className={'site-header reference-header ' + (scrolled?'scrolled':'')}>
      <div className="nav-shell reference-nav-shell">
        <NavLink to="/" className="brand reference-brand" onClick={()=>setOpen(false)}>
          <span>
            <strong>Dulhara Kaushalya</strong>
            <small>Multimodal Mental Health Research</small>
          </span>
        </NavLink>

        <nav className={open?'nav-links reference-nav-links open':'nav-links reference-nav-links'} aria-label="Primary navigation">
          {nav.map(([label,path])=><NavLink key={path} to={path} onClick={()=>setOpen(false)}>{label}</NavLink>)}
        </nav>

        <div className="nav-actions reference-nav-actions">
          <ThemeToggle/>
          <a href="https://github.com/dulhara79/R26-DS-012" target="_blank" rel="noreferrer" className="reference-repo-link">
            <Github size={15}/> <span>Research Repository</span>
          </a>
          <button className="menu-button" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(!open)}>
            {open?<X size={18}/>:<Menu size={18}/>}
          </button>
        </div>
      </div>
    </header>
  )
}
