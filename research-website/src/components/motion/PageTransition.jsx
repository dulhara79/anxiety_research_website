import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const pageNames = {
  '/': 'Research', '/components': 'System', '/results': 'Evidence', '/methodology': 'Methodology',
  '/publications': 'Publications', '/team': 'People', '/documents': 'Documents', '/contact': 'Contact',
}

export default function PageTransition({ children }) {
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        className="page-transition-shell"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, filter: 'blur(8px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(8px)' }}
        transition={{ duration: reduceMotion ? 0.12 : 0.52, ease: [0.16, 1, 0.3, 1] }}
      >
        {!reduceMotion && (
          <motion.div className="route-sweep" initial={{ scaleX: 0 }} animate={{ scaleX: [0, 1, 0] }} transition={{ duration: 0.72 }} aria-hidden="true" />
        )}
        <span className="route-label" aria-hidden="true">{pageNames[location.pathname] || 'Research'}</span>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
