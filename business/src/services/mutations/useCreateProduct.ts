import { useMutation } from '@tanstack/react-query';
import agent from '../api/agent';
import { UpdateProductType } from '../../interfaces/interfaceProduct';

export const useCreateProduct = () => {
    return useMutation({
        mutationFn: (product: UpdateProductType) => agent.Products.post(product),
    });
};
