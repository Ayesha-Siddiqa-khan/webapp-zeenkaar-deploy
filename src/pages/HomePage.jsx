import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import ProductCard from '../components/ProductCard.jsx'
import SkeletonCard from '../components/SkeletonCard.jsx'
import Hero3D from '../components/Hero3D.jsx'
import { categories, products } from '../data/products.js'
import { useDelayedLoader } from '../hooks/useDelayedLoader.js'

export default function HomePage() {
  const isLoading = useDelayedLoader(700)
  const featuredProducts = products.slice(0, 6)
  const heroProduct = featuredProducts[0]

  return (
    <PageTransition>
      <Hero3D />

      <section className="hero-glow relative overflow-hidden rounded-[32px] border border-hairline-light bg-canvas-cream px-8 py-10 shadow-[0_18px_45px_rgba(0,0,0,0.08)] md:px-12 md:py-14 mt-8">
        <div className="relative grid gap-10 lg:grid-cols-[1.12fr_0.88fr]">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <p className="eyebrow-cap">New Season Edit</p>
            <h1 className="display-xl mt-5 max-w-2xl text-ink">
              A curated destination for modern luxury across fashion and beauty.
            </h1>
            <p className="body-md mt-6 max-w-xl text-shade-50">
              Discover signature silhouettes, skin rituals, and atelier essentials with a confident, guided path to purchase.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/products" className="btn-primary-pill">
                Shop Collection
              </Link>
              <Link to="/dashboard" className="btn-outline-light">
                Track Orders
              </Link>
            </div>

            <div className="mt-10 grid gap-3 text-xs uppercase tracking-[0.12em] text-shade-50 sm:grid-cols-3">
              <span>Stylist picks</span>
              <span>Edition drops</span>
              <span>Complimentary wraps</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="relative"
          >
            <div className="card-surface overflow-hidden rounded-[26px]">
              <div className="image-zoom relative h-72">
                <img src={heroProduct.images[0]} alt={heroProduct.name} className="h-full w-full object-cover" loading="lazy" />
                <span className="pill-tag-shade absolute left-4 top-4">{heroProduct.badge}</span>
              </div>
              <div className="space-y-3 border-t border-hairline-light bg-canvas-light p-5">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.12em] text-shade-50">
                  <span>{heroProduct.brand}</span>
                  <span>Featured</span>
                </div>
                <p className="heading-md text-ink">{heroProduct.name}</p>
                <p className="body-md text-shade-50">{heroProduct.shortDescription}</p>
                <div className="flex items-center justify-between">
                  <span className="heading-md text-ink">${heroProduct.price}</span>
                  <Link to={`/products/${heroProduct.slug}`} className="btn-outline-light">
                    View Item
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow-cap">Curated picks</p>
            <h2 className="heading-xl mt-3">Featured Products</h2>
          </div>
          <Link to="/products" className="btn-outline-light">
            See All
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
            : featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-6">
          <p className="eyebrow-cap">Explore</p>
          <h2 className="heading-xl mt-3">Shop by Category</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category, index) => (
            <motion.article
              key={category.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: 0.05 * index }}
            >
              <Link to={`/products?category=${category.id}`} className="card-surface block overflow-hidden rounded-xl">
                <div className="image-zoom h-56">
                  <img src={category.image} alt={category.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="space-y-2 border-t border-hairline-light p-5">
                  <p className="text-xs uppercase tracking-[0.12em] text-shade-50">{category.name}</p>
                  <p className="heading-md text-ink">{category.description}</p>
                  <span className="text-xs uppercase tracking-[0.12em] text-shade-50">Explore category</span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
