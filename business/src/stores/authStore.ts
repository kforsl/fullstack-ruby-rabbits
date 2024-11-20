import { create } from 'zustand';
import { SignInForm } from '../interfaces/interfaceAuth';
// import agent from '../services/api/agent';

interface AuthStore {
    isLoading: boolean;

    signInForm: SignInForm;
    clearForm: () => void;
    onFormChanged: (event: React.FormEvent) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    isLoading: false,
    signInForm: { email: '', password: '' },

    setIsLoading: (state: boolean) => set({ isLoading: state }),

    clearForm: () => set({ signInForm: { email: '', password: '' } }),

    onFormChanged: (event) => {
        set((state) => {
            const { name, value } = event.target as HTMLInputElement;

            return {
                signInForm: { ...state.signInForm, [name]: value },
            };
        });
    },
}));

export default useAuthStore;
/*
 *Författare: Johan
 *Sköter autentisering av formuläret, samt allt vad gäller det visuella kopplat till det.
 */