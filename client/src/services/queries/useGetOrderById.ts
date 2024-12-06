import { useQuery } from '@tanstack/react-query';
import agent from '../api/agent';

export const useGetOrderById = (id: string) => {
    return useQuery({
        queryKey: ['order', id],
        queryFn: () => agent.Orders.getByOrderId(id),
        enabled: !!id && id !== 'order-id',
    });
};

/*
 *Författare: Magnus
 * Queryfunktion som hämtar specifik order via id.
 *
 * Ändrat: Magnus
 * Lade till att den enbart ska köras om id finns och att id inte är strängen 'order-id'. Orderstore _id initieras med 'order-id' innan den fått det riktiga.
 */
