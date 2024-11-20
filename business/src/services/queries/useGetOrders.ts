import { useQuery } from '@tanstack/react-query';
import agent from '../api/agent';

export const useGetOrders = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: agent.Orders.list,
    });
};
