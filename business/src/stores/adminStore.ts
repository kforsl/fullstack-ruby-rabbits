import { create } from 'zustand';
import { ProductType } from '../interfaces/interfaceProduct';

interface AdminStore {
    productToEdit: ProductType;
    setProductToEdit: (item: ProductType) => void;
    isEditingProduct: boolean;
    setIsEditingProduct: (bool: boolean) => void;
}

const useAdminStore = create<AdminStore>((set) => ({
    productToEdit: {
        _id: '',
        name: '',
        description: '',
        type: 'icecream',
        imageUrl: '',
        ingredients: [],
        isSpecial: false,
        sizes: [
            {
                size: 'small',
                price: 0,
                ingredientMultiplier: 0.9,
            },
            {
                size: 'medium',
                price: 0,
                ingredientMultiplier: 1,
            },
            {
                size: 'large',
                price: 0,
                ingredientMultiplier: 1.25,
            },
        ],
    },
    setProductToEdit: (item) => {
        set(() => {
            return { productToEdit: item };
        });
    },
    isEditingProduct: false,
    setIsEditingProduct: (bool) => {
        set(() => {
            return { isEditingProduct: bool };
        });
    },
}));

export default useAdminStore;
