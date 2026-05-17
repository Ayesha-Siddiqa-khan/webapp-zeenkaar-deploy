import { categories } from '../data/products.js'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Highest Rated' },
]

export default function FilterSidebar({ filters, onChange, onReset }) {
  return (
    <aside className="card-surface h-fit space-y-5 rounded-xl p-5">
      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.12em] text-shade-50">Search</label>
        <input
          type="text"
          value={filters.search}
          placeholder="Search products"
          onChange={(event) => onChange('search', event.target.value)}
          className="field"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.12em] text-shade-50">Category</label>
        <select
          value={filters.category}
          onChange={(event) => onChange('category', event.target.value)}
          className="field"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.12em] text-shade-50">Price Range</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            value={filters.minPrice}
            onChange={(event) => onChange('minPrice', Number(event.target.value))}
            className="field"
          />
          <span>-</span>
          <input
            type="number"
            min={0}
            value={filters.maxPrice}
            onChange={(event) => onChange('maxPrice', Number(event.target.value))}
            className="field"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.12em] text-shade-50">Sort</label>
        <select
          value={filters.sortBy}
          onChange={(event) => onChange('sortBy', event.target.value)}
          className="field"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="btn-outline-light w-full"
      >
        Reset Filters
      </button>
    </aside>
  )
}
