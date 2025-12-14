import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
    id: number
    name: string
    price: number
    image: string
    quantity: number
    unit: string
}

interface CartState {
    items: CartItem[]
    addItem: (product: any) => void
    removeItem: (id: number) => void
    updateQuantity: (id: number, quantity: number) => void
    clearCart: () => void
    get count(): number
    get totalPrice(): number
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product) => {
                const items = get().items
                const existingItem = items.find((item) => item.id === product.id)

                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    })
                } else {
                    set({
                        items: [
                            ...items,
                            {
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.image || '', // Handle potential missing image
                                quantity: 1,
                                unit: product.unit || 'unité'
                            },
                        ],
                    })
                }
            },

            removeItem: (id) => {
                set({ items: get().items.filter((item) => item.id !== id) })
            },

            updateQuantity: (id, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(id)
                    return
                }
                set({
                    items: get().items.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    ),
                })
            },

            clearCart: () => set({ items: [] }),

            get count() {
                return get().items.reduce((total, item) => total + item.quantity, 0)
            },

            get totalPrice() {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
            },
        }),
        {
            name: 'attieke-ivoir-cart',
            storage: createJSONStorage(() => localStorage),
            skipHydration: true, // We will handle hydration manually to avoid hydration mismatch
        }
    )
)
