import { useQuery } from '@tanstack/react-query';
import agent from '../api/agent';

export const useGetIngrediant = () => {
    return useQuery({
        queryKey: ['ingrediant'],
        queryFn: agent.Ingrediant.list,
        staleTime: 5 * 60 * 1000,
    });
};
