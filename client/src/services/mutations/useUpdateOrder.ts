import { useMutation } from '@tanstack/react-query';
import agent from '../api/agent';
import { socket } from '../webSocket/ioSocket';
import { OrderType } from '../../interfaces/interfaceOrder';

interface MutationParameters {
    id: string;
    order: OrderType;
}
export const useUpdateOrder = () => {
    return useMutation({
        mutationFn: ({ id, order }: MutationParameters) => agent.Orders.updateOrder(id, { ...order, state: 'waiting' }),

        onSuccess: () => {
            socket.emit('updateOrderStatus');
        },
    });
};

/*
 * Författare: Magnus
 * Mutation för att uppdatera en order. Då status kommer gå från "editing" till "waiting" så skickas en emit till socket för uppdatering över applikationen.
 */
