import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Github, Menu, Moon, Sun, X } from 'lucide-react'

const nav = [
  ['Home', '/'],
  ['Research', '/research'],
  ['System', '/system'],
  ['Results', '/evidence'],
  ['Publications', '/publications'],
  ['Team', '/team'],
  ['Contact', '/contact'],
]

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  return window.localStorage.getItem('research-theme') || 'light'
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('research-theme', theme)
  }, [theme])

  return (
    <header className="pixel-header">
      <div className="pixel-nav-shell">
        <NavLink to="/" className="pixel-brand" onClick={() => setOpen(false)}>
          <strong>Dulhara Kaushalya</strong>
          <span>Multimodal Mental Health Research</span>
        </NavLink>

        <nav className={open ? 'pixel-nav open' : 'pixel-nav'} aria-label="Primary navigation">
          {nav.map(([label, path]) => (
            <NavLink key={path} to={path} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="pixel-nav-actions">
          <div className="pixel-theme-group" aria-label="Theme controls">
            <button type="button" aria-label="Light theme" onClick={() => setTheme('light')} className={theme === 'light' ? 'active' : ''}>
              <Sun size={15} />
            </button>
            <button type="button" aria-label="Theme status" className="theme-dot" tabIndex="-1">
              <i />
            </button>
            <button type="button" aria-label="Dark theme" onClick={() => setTheme('dark')} className={theme === 'dark' ? 'active' : ''}>
              <Moon size={15} />
            </button>
          </div>

          <a className="pixel-repo" href="https://github.com/dulhara79/R26-DS-012" target="_blank" rel="noreferrer">
            <Github size={15} />
            <span>Research Repository</span>
          </a>

          <button className="pixel-menu" type="button" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>
  )
}
