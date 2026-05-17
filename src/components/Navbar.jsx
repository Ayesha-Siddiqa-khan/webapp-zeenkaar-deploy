import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore.js'

const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Shop' },
  { to: '/dashboard', label: 'Dashboard' },
]

const navClass = ({ isActive }) =>
  `body-md relative transition ${
    isActive
      ? "text-ink after:absolute after:-bottom-2 after:left-0 after:h-[1px] after:w-full after:bg-ink after:content-['']"
      : 'text-shade-50 hover:text-ink'
  }`

export default function Navbar() {
  const itemCount = useCartStore((state) => state.getItemCount())

  return (
    <header className="sticky top-0 z-40 border-b border-hairline-light bg-canvas-light/90 backdrop-blur-md">
      <nav className="container-shell flex h-16 items-center justify-between">
        <NavLink to="/" className="display-lg text-ink">
          Zeenkaar
        </NavLink>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <NavLink to="/cart" className="btn-outline-light relative inline-flex items-center gap-2">
            <span>Cart</span>
            <span className="body-md font-medium">{itemCount}</span>
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-ink" />
            )}
          </NavLink>
        </motion.div>
      </nav>
    </header>
  )
}
