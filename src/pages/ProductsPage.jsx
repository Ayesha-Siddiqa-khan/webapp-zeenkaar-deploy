import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterSidebar from '../components/FilterSidebar.jsx'
import Modal from '../components/Modal.jsx'
import PageTransition from '../components/PageTransition.jsx'
import ProductCard from '../components/ProductCard.jsx'
import SkeletonCard from '../components/SkeletonCard.jsx'
import { products } from '../data/products.js'
import { useDelayedLoader } from '../hooks/useDelayedLoader.js'
import { useProducts } from '../hooks/useProducts.js'

const defaultFilters = {
  search: '',
  category: 'all',
  minPrice: 0,
  maxPrice: 400,
  sortBy: 'featured',
}

export default function ProductsPage() {
  const [params] = useSearchParams()
  const initialCategory = params.get('category')

  const [filters, setFilters] = useState({
    ...defaultFilters,
    category: initialCategory ?? defaultFilters.category,
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const isLoading = useDelayedLoader(700)

  const filteredProducts = useProducts(products, filters)

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.search.trim()) count += 1
    if (filters.category !== 'all') count += 1
    if (filters.minPrice !== defaultFilters.minPrice || filters.maxPrice !== defaultFilters.maxPrice) count += 1
    if (filters.sortBy !== defaultFilters.sortBy) count += 1
    return count
  }, [filters])

  const handleFilterChange = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  const handleReset = () => {
    setFilters(defaultFilters)
  }

  return (
    <PageTransition>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow-cap">Collection</p>
          <h1 className="mt-3 heading-xl md:text-4xl">All Products</h1>
        </div>
        <button
          type="button"
          onClick={() => setIsFilterOpen(true)}
          className="btn-outline-light md:hidden"
        >
          Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-[280px_1fr]">
        <div className="hidden md:block">
          <FilterSidebar filters={filters} onChange={handleFilterChange} onReset={handleReset} />
        </div>

        <div>
          <p className="mb-5 body-md text-shade-50">Showing {filteredProducts.length} products</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
              : filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>

          {!isLoading && filteredProducts.length === 0 && (
            <div className="card-surface rounded-xl p-8 text-center">
              <h2 className="heading-md">No products match your filters</h2>
              <p className="mt-2 body-md text-shade-50">Try broadening your search or reset filters.</p>
              <button
                type="button"
                onClick={handleReset}
                className="btn-outline-light mt-4"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={isFilterOpen} title="Filters" onClose={() => setIsFilterOpen(false)}>
        <FilterSidebar
          filters={filters}
          onChange={handleFilterChange}
          onReset={() => {
            handleReset()
            setIsFilterOpen(false)
          }}
        />
      </Modal>
    </PageTransition>
  )
}
