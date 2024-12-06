import { useMutation } from '@tanstack/react-query';
import agent from '../api/agent';
import { socket } from '../webSocket/ioSocket';

interface MutationParameters {
    id: string;
    state: 'waiting' | 'preparing' | 'ready' | 'history' | 'editing' | 'annulled';
}
export const useChangeOrderState = () => {
    return useMutation({
        mutationFn: ({ id, state }: MutationParameters) => agent.Orders.updateState(id, state),

        onSuccess: () => {
            socket.emit('updateOrderStatus');
        },
    });
};

/*
 * Författare: Magnus
 * Uppdaterar status på en liggande order via vårt api.
 *
 * Ändrat: Kim
 * Laggt till socket.emit
 */
