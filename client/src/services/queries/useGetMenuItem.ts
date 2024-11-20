import { useQuery } from '@tanstack/react-query';
import agent from '../api/agent';

export const useGetMenuItem = (id: string) => {
    return useQuery({
        queryKey: ['menu', id],
        queryFn: agent.Product.list,
        staleTime: 5 * 60 * 1000,
    });
};

/*
 * Författare: Magnus
 * Funktion som kommer ta emot en sträng och gör ett anrop på specifik produkt. Agent har inte funktion klar så det här är placeholder.
 */
