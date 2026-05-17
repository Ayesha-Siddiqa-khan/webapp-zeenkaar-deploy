import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SplineScene from './SplineScene'
import Spotlight from './Spotlight'

const springTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
}

export default function Hero3D() {
  return (
    <section className="relative w-full min-h-[100dvh] md:min-h-[85vh] bg-canvas-night overflow-hidden mx-4 mt-4">
      <Spotlight
        className="-top-20 left-0 md:left-[30%]"
        fill="white"
      />

      <div className="grid md:grid-cols-[1fr_1.2fr] h-full relative z-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="p-8 md:p-16 flex flex-col justify-center"
        >
          <motion.p variants={fadeInUp} className="eyebrow-cap text-shade-40 mb-4">
            Interactive Experience
          </motion.p>

          <motion.h1 variants={fadeInUp} className="display-xl text-on-primary max-w-xl leading-tight">
            Crafted for those who{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-shade-40">
              dream bigger
            </span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="body-lg text-shade-40 mt-6 max-w-lg">
            Discover our curated selection of luxury fashion and beauty essentials.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-4">
            <Link to="/products" className="btn-outline-dark group relative overflow-hidden">
              <span className="relative z-10">Explore Collection</span>
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
            <Link to="/dashboard" className="btn-primary-pill group">
              Track Orders
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-16 flex items-center gap-12 border-t border-hairline-dark pt-8">
            <div className="group">
              <p className="heading-xl text-on-primary group-hover:scale-105 transition-transform" style={{ transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                50+
              </p>
              <p className="caption text-shade-50 mt-1">Premium Brands</p>
            </div>
            <div className="group">
              <p className="heading-xl text-on-primary group-hover:scale-105 transition-transform" style={{ transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                10k+
              </p>
              <p className="caption text-shade-50 mt-1">Curated Items</p>
            </div>
            <div className="group">
              <p className="heading-xl text-on-primary group-hover:scale-105 transition-transform" style={{ transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                24/7
              </p>
              <p className="caption text-shade-50 mt-1">Concierge</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:block relative"
        >
          <div className="absolute inset-0 bg-gradient-to-l from-canvas-night via-transparent to-transparent z-10" />
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 md:hidden"
      >
        <div className="w-6 h-10 rounded-full border-2 border-on-primary/50 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 bg-on-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}