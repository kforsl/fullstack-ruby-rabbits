import { useMutation } from '@tanstack/react-query';
import agent from '../api/agent';
import { Customer } from '../../interfaces/interfaceAuth';

export const useUpdatePersonalData = () => {
    return useMutation({
        mutationFn: (userInformation: Customer) => agent.Profile.updatePersonalData(userInformation),

        onSuccess: (response) => {
            console.log('Success', response);
            sessionStorage.setItem('user', JSON.stringify(response));
        },
    });
};
