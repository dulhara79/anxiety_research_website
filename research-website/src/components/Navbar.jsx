import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import useSectionNavigation from '../hooks/useSectionNavigation'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { activeSection, goToSection, sections } = useSectionNavigation()

  useEffect(() => {
    const close = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  const select = (id) => {
    setOpen(false)
    goToSection(id)
  }

  return <header className="site-header">
    <div className="nav-shell shell">
      <motion.button className="brand brand-button" type="button" onClick={() => select('overview')} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
        <strong>R26—DS—012</strong><span>Multimodal Anxiety Research</span>
      </motion.button>
      <button className="menu" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={20}/> : <Menu size={20}/>}</button>
      <nav aria-label="Primary" className={open ? 'nav-links open' : 'nav-links'}>
        {sections.map(({ id, label }) => <motion.button
          type="button"
          key={id}
          className={`nav-section-link ${activeSection === id ? 'active' : ''}`}
          aria-current={activeSection === id ? 'location' : undefined}
          onClick={() => select(id)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <span>{label}</span>
          {activeSection === id && <motion.span className="nav-active-indicator" layoutId="nav-active-indicator" transition={{ type: 'spring', stiffness: 420, damping: 36 }}/>} 
        </motion.button>)}
        <motion.button className="explore-link explore-button" type="button" onClick={() => select('context')} whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>Explore Research</motion.button>
      </nav>
    </div>
  </header>
}
