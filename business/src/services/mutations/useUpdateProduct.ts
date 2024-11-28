import { useMutation } from '@tanstack/react-query';
import agent from '../api/agent';
import { UpdateProductType } from '../../interfaces/interfaceProduct';

interface Props {
    id: string;
    product: UpdateProductType;
}
export const useUpdateProduct = () => {
    return useMutation({
        mutationFn: ({ id, product }: Props) => agent.Products.update(id, product),
    });
};
