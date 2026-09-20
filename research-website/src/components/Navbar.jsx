import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Moon, Sun, X, ExternalLink } from 'lucide-react'

const nav = [
  ['Overview', '/'],
  ['Research', '/research'],
  ['Methodology', '/methodology'],
  ['Evidence', '/evidence'],
  ['Publications', '/publications'],
  ['Documents', '/documents'],
  ['Team', '/team'],
]

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem('research-theme')
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('research-theme', theme)
  }, [theme])

  const close = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="nav-shell">
        <NavLink to="/" className="brand" onClick={close} aria-label="R26-DS-012 home">
          <span className="brand-mark" aria-hidden="true">
            <i /><i /><i />
          </span>
          <span className="brand-copy">
            <strong>R26—DS—012</strong>
            <small>Multimodal Anxiety Research</small>
          </span>
        </NavLink>

        <nav className={open ? 'nav-links open' : 'nav-links'} aria-label="Primary navigation">
          {nav.map(([name, path]) => (
            <NavLink
              key={path}
              to={path}
              onClick={close}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {name}
            </NavLink>
          ))}
          <a
            className="repo-link"
            href="https://github.com/dulhara79/R26-DS-012"
            target="_blank"
            rel="noreferrer"
          >
            Repository <ExternalLink size={14} />
          </a>
        </nav>

        <div className="nav-actions">
          <button
            className="icon-button"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            title={theme === 'light' ? 'Dark mode' : 'Light mode'}
          >
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          <button
            className="menu-button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  )
}
