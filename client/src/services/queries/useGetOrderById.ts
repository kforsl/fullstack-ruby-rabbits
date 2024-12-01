import { useQuery } from '@tanstack/react-query';
import agent from '../api/agent';

export const useGetOrderById = (id: string) => {
    return useQuery({
        queryKey: ['order', id],
        queryFn: () => agent.Orders.getByOrderId(id),
    });
};

/*
 *Författare: Magnus
 * Queryfunktion som hämtar specifik order via id.
 */
