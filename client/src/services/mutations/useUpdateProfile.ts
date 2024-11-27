import { useMutation } from '@tanstack/react-query';
import agent from '../api/agent';

interface passwordForm {
    password: string;
    newPassword: string;
    verifyPassword: string;
}

export const useUpdateProfile = () => {
    return useMutation({
        mutationFn: ({
            route,
            formData,
        }: {
            route: 'password' | 'payment' | 'data' | 'allergen';
            formData: passwordForm;
        }) => agent.Profile.update(route, formData),
    });
};
