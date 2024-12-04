import { useMutation, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';
import { UpdateProductType } from '../../interfaces/interfaceProduct';

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (product: UpdateProductType) => agent.Products.post(product),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menu'] });
        },
    });
};
