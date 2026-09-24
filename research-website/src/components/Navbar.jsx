import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Github, Menu, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import MobileResearchMenu from './hero/MobileResearchMenu'

const desktopNavigation = [
  ['Home', '/'],
  ['Research', '/components'],
  ['Methodology', '/methodology'],
  ['Evidence', '/results'],
  ['Team', '/team'],
]

function ResearchMark() {
  return (
    <svg className="research-mark" viewBox="0 0 36 36" aria-hidden="true">
      <path d="M4 18h6l2.8-7 4.2 14 3.5-10 3 6H32" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <circle cx="30" cy="18" r="2" />
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className="site-header">
      <div className="nav-shell">
        <NavLink to="/" end className="brand" onClick={() => setOpen(false)} aria-label="R26-DS-012 home">
          <ResearchMark />
          <span className="brand-copy">
            <strong>R26—DS—012</strong>
            <small>Multimodal Anxiety Research</small>
          </span>
        </NavLink>

        <nav className="desktop-nav liquid-glass-light" aria-label="Primary research navigation">
          {desktopNavigation.map(([label, path]) => (
            <NavLink key={path} to={path} end={path === '/'} className="desktop-nav-link">
              {({ isActive }) => (
                <>
                  <span>{label}</span>
                  {isActive && <motion.span className="desktop-nav-active" layoutId="desktop-nav-active" transition={{ type: 'spring', stiffness: 360, damping: 32 }} />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <a
            className="nav-icon-control liquid-glass-light desktop-repository"
            href="https://github.com/dulhara79/R26-DS-012"
            target="_blank"
            rel="noreferrer"
            aria-label="Open the R26-DS-012 GitHub repository"
          >
            <Github size={17} strokeWidth={1.8} />
          </a>

          <button
            type="button"
            className="mobile-menu-button liquid-glass-light"
            aria-label={open ? 'Close research navigation' : 'Open research navigation'}
            aria-expanded={open}
            aria-controls="mobile-research-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'close' : 'menu'}
                initial={{ opacity: 0, rotate: -22, scale: 0.82 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 22, scale: 0.82 }}
                transition={{ duration: 0.22 }}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <MobileResearchMenu open={open} onClose={() => setOpen(false)} />
    </header>
  )
}
