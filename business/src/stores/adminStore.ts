import { create } from 'zustand';
import { ProductType } from '../interfaces/interfaceProduct';

interface AdminStore {
    productToEdit: ProductType | null;
    setProductToEdit: (item: ProductType | null) => void;
}

const useAdminStore = create<AdminStore>((set) => ({
    productToEdit: null,
    setProductToEdit: (item) => {
        set(() => {
            return { productToEdit: item };
        });
    },
}));

export default useAdminStore;
