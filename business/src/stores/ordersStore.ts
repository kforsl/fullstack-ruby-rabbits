import { create } from 'zustand';
import { OrderItemType, OrderType } from '../interfaces/interfaceOrder';

interface OrderState {
    order: OrderType;
    setOrder: (arg: OrderType) => void;
    originalOrder: OrderType;
    setOriginalOrder: (arg: OrderType) => void;
    incrementItem: (productId: string, size: 'small' | 'medium' | 'large') => void;
    decrementItem: (productId: string, size: 'small' | 'medium' | 'large') => void;
    isOrderPreviewOpen: boolean;
    setIsOrderPreviewOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
}

const useOrderStore = create<OrderState>((set) => ({
    order: {
        _id: 'order-id',
        price: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        state: 'waiting',
        order: [],
    },
    setOrder: (value) => set({ order: value }),
    originalOrder: {
        _id: 'order-id',
        price: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        state: 'waiting',
        order: [],
    },
    setOriginalOrder: (value) => set({ originalOrder: value }),

    incrementItem: (productId, size) => {
        set((state) => {
            const updatedOrder = state.order.order.map((item: OrderItemType) => {
                if (item.product._id === productId && item.size === size) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }
                return item;
            });

            const sizePrice =
                state.order.order
                    .find((item: OrderItemType) => item.product._id === productId && item.size === size)
                    ?.product.sizes.find((s) => s.size === size)?.price || 0;

            return {
                order: {
                    ...state.order,
                    price: state.order.price + sizePrice,
                    order: updatedOrder,
                },
            };
        });
    },

    decrementItem: (productId, size) => {
        set((state) => {
            const sizePrice =
                state.order.order
                    .find((item: OrderItemType) => item.product._id === productId && item.size === size)
                    ?.product.sizes.find((s) => s.size === size)?.price || 0;

            const updatedOrder = state.order.order
                .map((item) => {
                    if (item.product._id === productId && item.size === size) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    return item;
                })
                .filter((item: OrderItemType) => item.quantity > 0);

            return {
                order: {
                    ...state.order,
                    price: state.order.price - sizePrice,
                    order: updatedOrder,
                },
            };
        });
    },
    isOrderPreviewOpen: false,
    setIsOrderPreviewOpen: (value) =>
        set((state) => ({
            isOrderPreviewOpen: typeof value === 'function' ? value(state.isOrderPreviewOpen) : value,
        })),
}));

export default useOrderStore;
/*
 * Författare: Magnus
 * Skapade upp store för liggande ordrar så vi kan göra en uppdatering till api.
 *
 * Ändrat: Magnus
 * Lagt till isOrderPreviewOpen med setter för att visa dialog.
 */
