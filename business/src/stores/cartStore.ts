import { create } from 'zustand';
import { CartItem } from '../interfaces/interfaceCart.ts';

interface CartStore {
    cart: CartItem[];
    setCart: (value: CartItem[]) => void;
    addToCart: (value: CartItem) => void;
    removeFromCart: (value: CartItem) => void;
    deleteFromCart: (value: CartItem) => void;
}

const useCartStore = create<CartStore>((set) => ({
    cart: [],
    setCart: (value) => set({ cart: value }),
    addToCart: (item) => {
        set((state) => {
            const itemInCart = state.cart.find((cartItem) => cartItem === item);

            return {
                cart: itemInCart
                    ? state.cart.map((cartItem) =>
                          cartItem === item ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                      )
                    : [...state.cart, { ...item, quantity: 1 }],
            };
        });
    },
    removeFromCart: (item) => {
        set((state) => {
            const itemInCart = state.cart.find((cartItem) => cartItem === item);

            return {
                cart:
                    itemInCart && itemInCart.quantity > 1
                        ? state.cart.map((cartItem) =>
                              cartItem === item ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
                          )
                        : state.cart.filter((cartItem) => cartItem !== item),
            };
        });
    },
    deleteFromCart: (item) => {
        set((state) => {
            return { cart: state.cart.filter((cartItem) => cartItem !== item) };
        });
    },
}));

export default useCartStore;
/*
 *Författare: Magnus
 *Startat upp en array för cart samt funktionalitet att lägga till och ta bort cart items. removeFromCart filtrerar bort cart item istället för att visa 0.
 */

/**
 * författare: Kim
 * Lagt till deleteFromCart och ändrat så att den kollar så hela objektet stämmer och inte bara id.
 */