import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('research-theme', theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <motion.header
      className={scrolled ? 'site-header scrolled' : 'site-header'}
      initial={{ y: -78 }}
      animate={{ y: 0 }}
      transition={{ duration: .65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav-shell">
        <NavLink to="/" className="brand" onClick={close} aria-label="R26-DS-012 home">
          <motion.span className="brand-mark" aria-hidden="true" whileHover={{ rotate: 18, scale: 1.06 }}>
            <i /><i /><i />
          </motion.span>
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
          <motion.button
            className="icon-button"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            whileTap={{ scale: .9, rotate: 14 }}
          >
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          </motion.button>
          <motion.button
            className="menu-button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            whileTap={{ scale: .9 }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}
