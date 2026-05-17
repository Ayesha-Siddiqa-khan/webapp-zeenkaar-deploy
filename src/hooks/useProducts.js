import { useMemo } from 'react'

export function useProducts(products, filters) {
  return useMemo(() => {
    const query = filters.search.toLowerCase().trim()

    const filtered = products.filter((product) => {
      const matchesCategory =
        filters.category === 'all' || product.category === filters.category
      const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice
      const matchesSearch =
        query.length === 0 ||
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)

      return matchesCategory && matchesPrice && matchesSearch
    })

    switch (filters.sortBy) {
      case 'price-asc':
        return [...filtered].sort((a, b) => a.price - b.price)
      case 'price-desc':
        return [...filtered].sort((a, b) => b.price - a.price)
      case 'rating-desc':
        return [...filtered].sort((a, b) => b.rating - a.rating)
      default:
        return [...filtered].sort((a, b) => b.id - a.id)
    }
  }, [products, filters])
}
