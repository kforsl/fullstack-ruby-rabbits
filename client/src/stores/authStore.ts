import { create } from 'zustand';
import { SignInForm, Customer, SignUpForm } from '../interfaces/interfaceAuth';
// import agent from '../services/api/agent';

interface AuthStore {
    customer: Customer | null;
    isSigningIn: boolean;
    setIsSigningIn: (state: boolean) => void;

    setCustomer: (customer: Customer) => void;
    setIsLoading: (state: boolean) => void;
    isLoading: boolean;

    isShowingLoadingSection: boolean;
    setIsShowingLoadingSection: (state: boolean) => void;

    isShowingForm: boolean;
    setIsShowingForm: (state: boolean) => void;
    signInForm: SignInForm;
    signUpForm: SignUpForm;
    clearForm: () => void;
    onFormChanged: (event: React.FormEvent) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    customer: (JSON.parse(sessionStorage.getItem('user') as string) as Customer) || null,
    setCustomer: (customer) => set({ customer }),

    signInForm: { email: '', password: '' },
    signUpForm: {
        email: '',
        password: '',
        socialSecurityNumber: '',
        verifyPassword: '',
        firstName: '',
        lastName: '',
        zipcode: '',
        address: '',
        city: '',
        phone: '',
    },

    isShowingLoadingSection: false,
    setIsShowingLoadingSection: (state) => set({ isShowingLoadingSection: state }),

    isShowingForm: false,
    setIsShowingForm: (state: boolean) => set({ isShowingForm: state }),

    isSigningIn: true,
    setIsSigningIn: (state) => set({ isSigningIn: state }),

    isLoading: false,
    setIsLoading: (state: boolean) => set({ isLoading: state }),

    clearForm: () =>
        set({
            signInForm: { email: '', password: '' },
            signUpForm: {
                email: '',
                socialSecurityNumber: '',
                password: '',
                verifyPassword: '',
                firstName: '',
                lastName: '',
                zipcode: '',
                address: '',
                city: '',
                phone: '',
            },
        }),

    onFormChanged: (event) => {
        set((state) => {
            const { name, value } = event.target as HTMLInputElement;
            const { formType } = (event.target as HTMLInputElement).dataset;
            if (formType?.toLowerCase() === 'signin') {
                return {
                    signInForm: { ...state.signInForm, [name]: value },
                };
            }
            return {
                signUpForm: { ...state.signUpForm, [name]: value },
            };
        });
    },
}));

export default useAuthStore;
/*
 *Författare: Johan
 *Sköter autentisering av formuläret, samt allt vad gäller det visuella kopplat till det.
 */
