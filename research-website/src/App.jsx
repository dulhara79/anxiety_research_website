import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import Home from './pages/Home'
import Components from './pages/Components'
import Results from './pages/Results'
import Methodology from './pages/Methodology'
import Team from './pages/Team'
import Publications from './pages/Publications'
import Documents from './pages/Documents'
import Contact from './pages/Contact'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16, filter: 'blur(5px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="route-transition-wash"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          exit={{ scaleX: 1 }}
          transition={{ duration: .52, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        />
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/research" element={<Components />} />
          <Route path="/components" element={<Navigate to="/research" replace />} />
          <Route path="/evidence" element={<Results />} />
          <Route path="/results" element={<Navigate to="/evidence" replace />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/team" element={<Team />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <Router>
      <ScrollProgress />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </Router>
  )
}
