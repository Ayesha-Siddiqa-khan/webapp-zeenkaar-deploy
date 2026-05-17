import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import { useCartStore } from '../store/useCartStore.js'

export default function CartPage() {
  const cartItems = useCartStore((state) => state.cartItems)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const subtotal = useCartStore((state) => state.getSubtotal())
  const shipping = cartItems.length > 0 ? 12 : 0
  const total = subtotal + shipping

  return (
    <PageTransition>
      <h1 className="mb-8 heading-xl md:text-4xl">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="card-surface rounded-xl p-10 text-center">
          <p className="body-md text-shade-50">Your cart is currently empty.</p>
          <Link to="/products" className="btn-primary-pill mt-5 inline-block">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="space-y-4">
            {cartItems.map((item) => (
              <article key={item.id} className="card-surface flex gap-4 rounded-xl p-4">
                <img src={item.image} alt={item.name} className="h-28 w-24 rounded-lg object-cover" />
                <div className="flex flex-1 flex-col">
                  <Link to={`/products/${item.slug}`} className="heading-md leading-tight hover:opacity-80">
                    {item.name}
                  </Link>
                  <p className="mt-2 body-md text-shade-50">${item.price} each</p>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-hairline-light bg-canvas-light">
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 body-md">
                        -
                      </button>
                      <span className="w-8 text-center body-md">{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 body-md">
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs uppercase tracking-[0.12em] text-shade-50 hover:text-ink"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="card-surface h-fit rounded-xl p-6">
            <h2 className="heading-md">Summary</h2>
            <div className="mt-5 space-y-3 body-md">
              <div className="flex items-center justify-between">
                <span className="text-shade-50">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-shade-50">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-hairline-light pt-3 heading-md">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Link to="/checkout" className="btn-primary-pill mt-6 block text-center">
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      )}
    </PageTransition>
  )
}
