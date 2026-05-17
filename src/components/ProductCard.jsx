import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore.js'

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart)

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="card-surface group overflow-hidden rounded-xl"
    >
      <Link
        to={`/products/${product.slug}`}
        className="image-zoom relative block aspect-[3/4] bg-canvas-cream"
      >
        <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
        {product.badge && <span className="pill-tag-shade absolute left-4 top-4">{product.badge}</span>}
      </Link>

      <div className="space-y-3 p-5">
        <p className="text-xs uppercase tracking-[0.12em] text-shade-50">{product.brand}</p>
        <Link to={`/products/${product.slug}`} className="block heading-md leading-snug">
          {product.name}
        </Link>
        <p className="body-md text-shade-50">{product.shortDescription}</p>
        <p className="text-xs uppercase tracking-[0.12em] text-shade-50">Rating {product.rating} ({product.reviews})</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="heading-md">${product.price}</span>
            <span className="body-md text-shade-50 line-through">${product.originalPrice}</span>
          </div>
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="btn-outline-light"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </motion.article>
  )
}
