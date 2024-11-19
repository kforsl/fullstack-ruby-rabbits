import { create } from 'zustand';
import { ProductType } from '../interfaces';
import agent from '../services/api/agent';

interface ProductStore {
    products: ProductType[];
    iceCream: ProductType[];
    milkshake: ProductType[];
    specials: ProductType[];
    addProducts: () => void;
}

const useProductStore = create<ProductStore>((set) => ({
    products: [],
    iceCream: [],
    milkshake: [],
    specials: [],
    addProducts: async () => {
        try {
            const response = await agent.Product.list();
            set({ products: response.data });
            set((state) => ({ iceCream: state.products.filter((item) => item.type === 'Ice cream') }));
            set((state) => ({ milkshake: state.products.filter((item) => item.type === 'Milkshake') }));
            set((state) => ({ specials: state.products.filter((item) => item.type === 'Milkshake') }));
        } catch (error) {
            console.log(error);
        }
    },
}));

export default useProductStore;
/*
 * Författare: Kim
 * Skapat upp en store för products med
 */
