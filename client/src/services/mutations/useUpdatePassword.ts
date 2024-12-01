import { useMutation } from '@tanstack/react-query';
import agent from '../api/agent';
import { PasswordForm } from '../../interfaces/interfaceAuth';

export const useUpdatePassword = () => {
    return useMutation({
        mutationFn: (passwords: PasswordForm) => agent.Profile.updatePassword(passwords),
    });
};
