import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import { useCartStore } from '../store/useCartStore.js'

const steps = ['Address', 'Delivery', 'Review']

export default function CheckoutPage() {
  const navigate = useNavigate()
  const cartItems = useCartStore((state) => state.cartItems)
  const subtotal = useCartStore((state) => state.getSubtotal())
  const clearCart = useCartStore((state) => state.clearCart)

  const [step, setStep] = useState(0)
  const [shippingMethod, setShippingMethod] = useState('express')
  const [address, setAddress] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    line1: '',
    zipCode: '',
  })

  const shippingFee = shippingMethod === 'express' ? 18 : 10
  const total = useMemo(() => subtotal + shippingFee, [subtotal, shippingFee])

  const isAddressComplete =
    address.fullName &&
    address.email &&
    address.phone &&
    address.city &&
    address.country &&
    address.line1 &&
    address.zipCode

  if (cartItems.length === 0) {
    return (
      <PageTransition>
        <div className="card-surface rounded-xl p-10 text-center">
          <h1 className="heading-xl">Checkout unavailable</h1>
          <p className="mt-3 body-md text-shade-50">Add products to your cart before continuing.</p>
        </div>
      </PageTransition>
    )
  }

  const handlePlaceOrder = () => {
    clearCart()
    navigate('/dashboard')
  }

  return (
    <PageTransition>
    <h1 className="mb-8 heading-xl md:text-4xl">Checkout</h1>

      <div className="mb-8 grid gap-3 md:grid-cols-3">
        {steps.map((label, index) => (
          <div
            key={label}
            className={`rounded-xl border px-4 py-3 body-md ${
              index === step
                ? 'border-ink bg-ink text-on-primary'
                : 'border-hairline-light bg-canvas-light'
            }`}
          >
            {index + 1}. {label}
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <section className="card-surface rounded-xl p-6">
          {step === 0 && (
            <div className="grid gap-3 md:grid-cols-2">
              {Object.entries(address).map(([key, value]) => (
                <input
                  key={key}
                  type={key === 'email' ? 'email' : 'text'}
                  value={value}
                  onChange={(event) =>
                    setAddress((current) => ({ ...current, [key]: event.target.value }))
                  }
                  placeholder={key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, (letter) => letter.toUpperCase())}
                  className="field"
                />
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-hairline-light bg-canvas-light p-4">
                <span>
                  <p className="body-strong">Express Delivery</p>
                  <p className="body-md text-shade-50">1-2 business days</p>
                </span>
                <input
                  type="radio"
                  name="delivery"
                  checked={shippingMethod === 'express'}
                  onChange={() => setShippingMethod('express')}
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-hairline-light bg-canvas-light p-4">
                <span>
                  <p className="body-strong">Standard Delivery</p>
                  <p className="body-md text-shade-50">3-5 business days</p>
                </span>
                <input
                  type="radio"
                  name="delivery"
                  checked={shippingMethod === 'standard'}
                  onChange={() => setShippingMethod('standard')}
                />
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 body-md">
              <div className="rounded-xl border border-hairline-light bg-canvas-light p-4">
                <p className="body-strong">Shipping Address</p>
                <p className="mt-1 text-shade-50">
                  {address.fullName}, {address.line1}, {address.city}, {address.country}, {address.zipCode}
                </p>
              </div>
              <div className="rounded-xl border border-hairline-light bg-canvas-light p-4">
                <p className="body-strong">Contact</p>
                <p className="mt-1 text-shade-50">
                  {address.email} | {address.phone}
                </p>
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((current) => current - 1)}
                className="btn-outline-light"
              >
                Back
              </button>
            )}

            {step < steps.length - 1 ? (
              <button
                type="button"
                disabled={step === 0 && !isAddressComplete}
                onClick={() => setStep((current) => current + 1)}
                className="btn-primary-pill disabled:cursor-not-allowed disabled:opacity-45"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="btn-primary-pill"
              >
                Place Order
              </button>
            )}
          </div>
        </section>

        <aside className="card-surface h-fit rounded-xl p-6">
          <h2 className="heading-md">Order Summary</h2>
          <div className="mt-4 space-y-2 body-md">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <span className="max-w-[180px] truncate text-shade-50">
                  {item.name} x{item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-2 border-t border-hairline-light pt-4 body-md">
            <div className="flex items-center justify-between">
              <span className="text-shade-50">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-shade-50">Shipping</span>
              <span>${shippingFee.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between heading-md">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </PageTransition>
  )
}
