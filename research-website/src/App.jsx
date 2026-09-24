import { lazy, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/experience/CustomCursor'
import PageTransition from './components/motion/PageTransition'

const Home=lazy(()=>import('./pages/Home'))
const Components=lazy(()=>import('./pages/Components'))
const Results=lazy(()=>import('./pages/Results'))
const Methodology=lazy(()=>import('./pages/Methodology'))
const Publications=lazy(()=>import('./pages/Publications'))
const Team=lazy(()=>import('./pages/Team'))
const Documents=lazy(()=>import('./pages/Documents'))
const Contact=lazy(()=>import('./pages/Contact'))

function RouteSet(){return <><Navbar/><PageTransition><Suspense fallback={<div className="route-loading" role="status">Loading research record…</div>}><Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/components" element={<Components/>}/>
  <Route path="/results" element={<Results/>}/>
  <Route path="/methodology" element={<Methodology/>}/>
  <Route path="/publications" element={<Publications/>}/>
  <Route path="/team" element={<Team/>}/>
  <Route path="/documents" element={<Documents/>}/>
  <Route path="/contact" element={<Contact/>}/>
</Routes></Suspense><Footer/></PageTransition><CustomCursor/></>}

export default function App(){return <HashRouter><RouteSet/></HashRouter>}
