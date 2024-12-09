import { useQuery } from '@tanstack/react-query';
import agent from '../api/agent';

export const useGetIngredient = () => {
    return useQuery({
        queryKey: ['ingredient'],
        queryFn: agent.Ingredient.list,
        staleTime: 5 * 60 * 1000,
    });
};
