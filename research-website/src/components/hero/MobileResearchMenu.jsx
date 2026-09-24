import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export const fullNavigation = [
  ['Home', '/'],
  ['Research', '/components'],
  ['Methodology', '/methodology'],
  ['Evidence', '/results'],
  ['Team', '/team'],
  ['Publications', '/publications'],
  ['Documents', '/documents'],
  ['Contact', '/contact'],
]

export default function MobileResearchMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-research-menu"
          className="mobile-research-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.nav
            className="mobile-menu-inner"
            aria-label="Mobile research navigation"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.32, delay: 0.04 }}
          >
            <p className="mobile-menu-label">R26—DS—012 / Navigation</p>
            <div className="mobile-menu-links">
              {fullNavigation.map(([label, path], index) => (
                <NavLink key={path} to={path} end={path === '/'} onClick={onClose}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{label}</strong>
                </NavLink>
              ))}
            </div>
            <a className="mobile-repository-link" href="https://github.com/dulhara79/R26-DS-012" target="_blank" rel="noreferrer">
              <span>Research repository</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
