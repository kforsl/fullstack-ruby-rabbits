import { create } from 'zustand';

interface AuthStore {
    // employee: Employee;
}

const useAuthStore = create<AuthStore>(() => ({}));

export default useAuthStore;
/*
 *Författare: Magnus
 *Startat upp en array för cart samt funktionalitet att lägga till och ta bort cart items. removeFromCart filtrerar bort cart item istället för att visa 0.
 */
