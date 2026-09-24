import { motion, useReducedMotion } from 'framer-motion'

export default function MotionReveal({ children, className = '', delay = 0, as = 'div' }) {
  const reduceMotion = useReducedMotion()
  const Component = motion[as] || motion.div
  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22, filter: 'blur(8px)' }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  )
}
