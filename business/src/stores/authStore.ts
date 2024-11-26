import { create } from 'zustand';
import { SignInForm } from '../interfaces/interfaceAuth';
import { EmployeeType } from '../interfaces/interfaceEmployee';
// import agent from '../services/api/agent';

interface AuthStore {
    employee: EmployeeType | null;
    setEmployee: (employee: EmployeeType | null) => void;
    menuIsExpanded: boolean;
    setMenuIsExpanded: (state: boolean) => void;
    setIsLoading: (state: boolean) => void;
    isLoading: boolean;

    isShowingLoadingSection: boolean;
    setIsShowingLoadingSection: (state: boolean) => void;

    signInForm: SignInForm;
    clearForm: () => void;
    onFormChanged: (event: React.FormEvent) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    employee: (JSON.parse(sessionStorage.getItem('employee') as string) as EmployeeType) || null,
    setEmployee: (employee) => set({ employee }),
    menuIsExpanded: false,
    setMenuIsExpanded: (state) => set({ menuIsExpanded: state }),

    isLoading: false,
    signInForm: { email: '', password: '' },

    isShowingLoadingSection: false,
    setIsShowingLoadingSection: (state) => set({ isShowingLoadingSection: state }),

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
