import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const currencyRound = (value) => Number(value.toFixed(2))

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existing = state.cartItems.find((item) => item.id === product.id)

          if (existing) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            }
          }

          return {
            cartItems: [
              ...state.cartItems,
              {
                id: product.id,
                slug: product.slug,
                name: product.name,
                image: product.images[0],
                price: product.price,
                quantity,
              },
            ],
          }
        })
      },
      removeFromCart: (id) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        }))
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id)
          return
        }

        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        }))
      },
      clearCart: () => set({ cartItems: [] }),
      getSubtotal: () => {
        const subtotal = get().cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        )

        return currencyRound(subtotal)
      },
      getItemCount: () =>
        get().cartItems.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: 'zeenkaar-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cartItems: state.cartItems }),
    },
  ),
)
