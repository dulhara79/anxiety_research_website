import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: .35 })
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}
