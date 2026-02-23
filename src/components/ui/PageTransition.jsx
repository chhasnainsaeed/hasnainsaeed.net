import { motion } from 'framer-motion'

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0.985 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.995 }}
      transition={{ duration: 0.14, ease: 'linear' }}
    >
      {children}
    </motion.div>
  )
}
