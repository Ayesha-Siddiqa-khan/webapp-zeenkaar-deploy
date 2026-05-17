import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { products } from '../data/products.js'
import { useCartStore } from '../store/useCartStore.js'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const product = products.find((item) => item.slug === slug)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const addToCart = useCartStore((state) => state.addToCart)

  if (!product) {
    return (
      <PageTransition>
        <div className="card-surface rounded-xl p-10 text-center">
          <h1 className="heading-xl">Product not found</h1>
          <Link to="/products" className="btn-outline-light mt-4 inline-block">
            Back to products
          </Link>
        </div>
      </PageTransition>
    )
  }

  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3)

  return (
    <PageTransition>
      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <div className="image-zoom overflow-hidden rounded-xl border border-hairline-light bg-canvas-light">
            <img
              src={product.images[selectedIndex]}
              alt={product.name}
              className="h-[520px] w-full object-cover"
            />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {product.images.map((image, index) => (
              <button
                type="button"
                key={image}
                onClick={() => setSelectedIndex(index)}
                className={`overflow-hidden rounded-lg border ${
                  selectedIndex === index ? 'border-ink' : 'border-hairline-light'
                }`}
              >
                <img src={image} alt={`${product.name} ${index + 1}`} className="h-24 w-full object-cover" />
              </button>
            ))}
          </div>
        </section>

        <section className="card-surface h-fit rounded-xl p-6 md:p-8 lg:sticky lg:top-24">
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow-cap">{product.brand}</p>
            {product.badge && <span className="pill-tag-shade">{product.badge}</span>}
          </div>
          <h1 className="mt-3 heading-xl">{product.name}</h1>
          <p className="mt-3 body-md text-shade-50">{product.description}</p>

          <div className="mt-6 flex items-center gap-3">
            <span className="display-md">${product.price}</span>
            <span className="body-lg text-shade-50 line-through">${product.originalPrice}</span>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <p className="text-xs uppercase tracking-[0.12em] text-shade-50">Quantity</p>
            <div className="flex items-center rounded-full border border-hairline-light bg-canvas-light">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="px-4 py-2 body-md"
              >
                -
              </button>
              <span className="w-10 text-center body-md">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((value) => value + 1)}
                className="px-4 py-2 body-md"
              >
                +
              </button>
            </div>
          </div>

          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => addToCart(product, quantity)}
            className="btn-primary-pill mt-7 w-full"
          >
            Add to Cart
          </motion.button>
        </section>
      </div>

      <section className="mt-16">
        <h2 className="mb-6 heading-xl">You may also like</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
