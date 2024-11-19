import { create } from 'zustand';
import { SignInForm } from '../interfaces/interfaceAuth';

interface AuthStore {
    isShowingForm: boolean;
    setIsShowingForm: (value: boolean) => void;

    signInForm: SignInForm;
    isSigningIn: boolean;
    clearForm: (form: 'signIn' | 'signUp') => void;
    setIsSigningIn: (value: boolean) => void;
    onFormChanged: (event: React.FormEvent) => void;
    validateForm: (form: 'signIn' | 'signUp') => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    isShowingForm: false,
    signInForm: { email: '', password: '' },
    signUpForm: { email: '', password: '', confirmPassword: '', phone: '', firstName: '', lastName: '' },
    setIsShowingForm: (value) => {
        set({ isShowingForm: value });
        (document.querySelector('html') as HTMLElement).style.overflow = value ? 'hidden' : '';
    },
    validateRegistrationForm: () => {},

    isSigningIn: true,
    setIsSigningIn: (value) => set({ isSigningIn: value }),

    clearForm: () => set({ signInForm: { email: '', password: '' } }),

    onFormChanged: (event) => {
        set((state) => {
            const { name, value } = event.target as HTMLInputElement;

            return {
                signInForm: { ...state.signInForm, [name]: value },
            };
        });
    },
    validateForm: () => {},
}));

export default useAuthStore;
/*
 *Författare: Johan
 *Sköter autentisering av formuläret, samt allt vad gäller det visuella kopplat till det.
 */
