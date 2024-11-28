import { useMutation } from '@tanstack/react-query';
import agent from '../api/agent';
import { PaymentOption } from '../../interfaces/interfaceAuth';

interface MutationParameters {
    paymentOptions: PaymentOption[];
}
export const useUpdatePaymentOptions = () => {
    return useMutation({
        mutationFn: ({ paymentOptions }: MutationParameters) => agent.Profile.updatePaymentOptions(paymentOptions),
    });
};

/*

 */
