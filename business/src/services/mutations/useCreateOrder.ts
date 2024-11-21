import { useMutation, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';
import { CartToOrder } from '../../interfaces/interfaceCart';
import { socket } from '../webSocket/ioSocket';

export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (order: CartToOrder) => agent.Orders.post(order),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            socket.emit('createOrder');
        },
    });
};

/*
 * Författare: Magnus
 * En mutate som tar emot en order skickar till vårt api och invaliderar cache för att trigga refetch när den är klar.
 */
