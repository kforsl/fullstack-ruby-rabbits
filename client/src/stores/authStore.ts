import { create } from 'zustand';
import { SignInForm, SignUpForm } from '../interfaces/interfaceAuth';

interface AuthStore {
    isShowingForm: boolean;
    setIsShowingForm: (value: boolean) => void;

    signUpForm: SignUpForm;
    validateRegistrationForm: () => void;

    signInForm: SignInForm;
    isSigningIn: boolean;
    clearSignInForm: () => void;
    setIsSigningIn: (value: boolean) => void;
    onSignInFormChanged: (event: React.FormEvent) => void;
    validateLoginForm: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    isShowingForm: false,
    signInForm: { email: '', password: '' },
    signUpForm: { email: '', password: '', confirmPassword: '', phone: '' },
    setIsShowingForm: (value) => {
        set({ isShowingForm: value });
        (document.querySelector('html') as HTMLElement).style.overflow = value ? 'hidden' : '';
    },
    validateRegistrationForm: () => {},

    isSigningIn: true,
    clearSignInForm: () => set({ signInForm: { email: '', password: '' } }),
    setIsSigningIn: (value) => set({ isSigningIn: value }),
    onSignInFormChanged: (event) => {
        set((state) => {
            const { name, value } = event.target as HTMLInputElement;
            return {
                signInForm: { ...state.signInForm, [name]: value },
            };
        });
    },
    validateLoginForm: () => {},
}));

export default useAuthStore;
/*
 *Författare: Johan
 *Sköter autentisering av formuläret, samt allt vad gäller det visuella kopplat till det.
 */
