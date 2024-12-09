import { useMutation, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';
import { socket } from '../webSocket/ioSocket';

interface MutationParameters {
    id: string;
    state: 'waiting' | 'preparing' | 'ready' | 'history';
}
export const useOrderState = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, state }: MutationParameters) => agent.Orders.updateState(id, state),

        onSuccess: (orderList) => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            socket.emit('updateOrderStatus', orderList[0]._id);
        },
    });
};

/*
 * Författare: Magnus
 * Uppdaterar status på en liggande order via vårt api. När det lyckas rensas cache på "orders" och alla ordrar refetchas.
 * Används i komponent på följande vis:
 * Importera useOrderState
 * Plocka ut mutate: const { mutate } = useOrderState();
 * mutate är en funktion som tar ett object med två parametrar vilket definieras av MutationParameters-interface ovan.
 * ex: mutate({id, state})
 *
 * Ändrat: Kim
 * Laggt till socket.emit
 */
