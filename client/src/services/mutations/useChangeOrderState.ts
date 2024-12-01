import { useMutation } from '@tanstack/react-query';
import agent from '../api/agent';
import { socket } from '../webSocket/ioSocket';

interface MutationParameters {
    id: string;
    state: 'waiting' | 'editing' | 'anulled';
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
 * Uppdaterar status på en liggande order via vårt api. När det lyckas rensas cache på "orders" och alla ordrar refetchas.
 * Används i komponent på följande vis:
 * Importera useChangeOrderState
 * Plocka ut mutate: const { mutate } = useChangeOrderState();
 * mutate är en funktion som tar ett object med två parametrar vilket definieras av MutationParameters-interface ovan.
 * ex: mutate({id, state})
 *
 * Ändrat: Kim
 * Laggt till socket.emit
 */
