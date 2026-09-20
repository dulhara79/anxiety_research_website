import { HashRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import Home from './pages/Home'
import Components from './pages/Components'
import Results from './pages/Results'
import Methodology from './pages/Methodology'
import System from './pages/System'
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
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: .34, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home/>}/>
          <Route path="/research" element={<Components/>}/>
          <Route path="/components" element={<Navigate to="/research" replace/>}/>
          <Route path="/methodology" element={<Methodology/>}/>
          <Route path="/evidence" element={<Results/>}/>
          <Route path="/results" element={<Navigate to="/evidence" replace/>}/>
          <Route path="/system" element={<System/>}/>
          <Route path="/publications" element={<Publications/>}/>
          <Route path="/documents" element={<Documents/>}/>
          <Route path="/team" element={<Team/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return <Router><ScrollProgress/><Navbar/><AnimatedRoutes/><Footer/></Router>
}
