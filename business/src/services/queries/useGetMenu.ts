import { useQuery } from '@tanstack/react-query';
import agent from '../api/agent';

export const useGetMenu = () => {
    return useQuery({
        queryKey: ['menu'],
        queryFn: agent.Products.list,
        staleTime: 5 * 60 * 1000,
    });
};

/*
 *Författare: Magnus
 * Queryfunktion som hämtar vår meny, queryKey är alltid en array och måste vara unik. Skulle man hämta ett specifikt item från menu så kan man skriva ex: ["menu", id] där id är en dynamisk variabel.
 * queryFn måste returnera ett promise, staleTime är tiden i milisekunder som måste passera innan den gör en refetch.
 * Annars serveras info från cache.
 */
