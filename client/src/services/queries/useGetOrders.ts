import { useQuery } from '@tanstack/react-query';
import agent from '../api/agent';

export const useGetOrders = (id: string) => {
    return useQuery({
        queryKey: ['order', id],
        queryFn: () => agent.Orders.listByUserId(id).then((res) => (res ? res : null)),
        enabled: !!id,
    });
};

/*
 *Författare: Johan
 * Queryfunktion som hämtar användarens ordrar. Om det inte finns några ordrar så får man tillbaka "null".
 */
