import { motion } from 'framer-motion'

export default function PageTransition({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="container-shell py-10 md:py-16"
    >
      {children}
    </motion.main>
  )
}
