import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Github, Menu, Moon, Sun, X } from 'lucide-react'

const navItems = [
  ['Home', '/'],
  ['Research', '/research'],
  ['System', '/system'],
  ['Results', '/evidence'],
  ['Publications', '/publications'],
  ['Team', '/team'],
  ['Contact', '/contact'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('research-theme') || 'light'
  })

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  function applyTheme(nextTheme) {
    let resolved = nextTheme

    if (nextTheme === 'system') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }

    document.documentElement.dataset.theme = resolved
    localStorage.setItem('research-theme', nextTheme)
  }

  function selectTheme(nextTheme) {
    setTheme(nextTheme)
  }

  return (
    <header className="exact-navbar">
      <div className="exact-navbar-inner">
        <NavLink
          to="/"
          className="exact-brand"
          onClick={() => setOpen(false)}
        >
          <strong>Dulhara Kaushalya</strong>
          <span>Multimodal Mental Health Research</span>
        </NavLink>

        <nav
          className={`exact-nav-links ${open ? 'open' : ''}`}
          aria-label="Primary navigation"
        >
          {navItems.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="exact-nav-actions">
          <div className="exact-theme-group">
            <button
              className={theme === 'light' ? 'selected' : ''}
              onClick={() => selectTheme('light')}
              aria-label="Light theme"
            >
              <Sun size={16} />
            </button>

            <button
              className={theme === 'system' ? 'selected' : ''}
              onClick={() => selectTheme('system')}
              aria-label="System theme"
            >
              <span className="system-theme-dot" />
            </button>

            <button
              className={theme === 'dark' ? 'selected' : ''}
              onClick={() => selectTheme('dark')}
              aria-label="Dark theme"
            >
              <Moon size={16} />
            </button>
          </div>

          <a
            href="https://github.com/dulhara79/R26-DS-012"
            target="_blank"
            rel="noreferrer"
            className="exact-repo-button"
          >
            <Github size={16} />
            <span>Research Repository</span>
          </a>

          <button
            type="button"
            className="exact-menu-button"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
    </header>
  )
}
