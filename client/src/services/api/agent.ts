import axios, { AxiosResponse } from 'axios';
import { ProductType } from '../../interfaces/interfaceProduct';
import { Customer, PasswordForm, PaymentOption, SignInForm, TokenResponse } from '../../interfaces/interfaceAuth';
import { CartToOrder } from '../../interfaces/interfaceCart';
import { BASE_URL } from '../../../../constants.ts';
import { OrderType } from '../../interfaces/interfaceOrder.ts';

axios.defaults.baseURL = `${BASE_URL}/api`;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) =>
        axios
            .get<T>(`${url}`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${sessionStorage.getItem('ato')}` },
            })
            .then(responseBody),
    post: <T>(url: string, body: {}) =>
        axios
            .post<T>(`${url}`, body, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${sessionStorage.getItem('ato')}` },
            })
            .then(responseBody),
    put: <T>(url: string, body: {}) =>
        axios
            .put<T>(`${url}`, body, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${sessionStorage.getItem('ato')}` },
            })
            .then(responseBody),
    delete: <T>(url: string) =>
        axios
            .delete<T>(`${url}`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${sessionStorage.getItem('ato')}` },
            })
            .then(responseBody),
};
interface ProductResponse {
    message: string;
    data: ProductType[];
}
interface AgentResponse<T = object> {
    message: string;
    data: T[];
}

const Product = {
    list: () => requests.get<ProductResponse>('products'),
};

const Orders = {
    post: (order: CartToOrder) =>
        requests.post<AgentResponse<OrderType>>('orders', order).then((response) => response.data),
    updateState: (id: string, state: 'waiting' | 'editing' | 'annulled') =>
        requests.put<AgentResponse<OrderType>>(`orders/${id}`, { state: state }).then((response) => response.data),
    updateOrder: (id: string, order: OrderType) =>
        requests.put<AgentResponse<OrderType>>(`orders/${id}`, order).then((response) => response.data),
    list: () =>
        requests
            .get<AgentResponse<OrderType>>(`orders`)
            .then((response) => response.data)
            .catch((error) => error),
    listByUserId: (id: string) =>
        requests
            .get<AgentResponse<OrderType>>(`orders/user/${id}`)
            .then((response) => response.data)
            .catch((error) => error),
    getByOrderId: (id: string) =>
        requests.get<AgentResponse<OrderType>>(`orders/${id}`).then((response) => response.data),
};

const Authenticate = {
    validateToken: (token: string) =>
        requests.post<TokenResponse>(`auth/token`, { accessToken: token }).then((response) => response),
    signIn: (credentials: SignInForm) =>
        requests
            .post<AgentResponse<TokenResponse>>(`auth/customer`, credentials)
            .then((response) => response)
            .catch((error) => error),
    signUp: (credentials: Customer) =>
        requests
            .post<AgentResponse<Customer>>(`auth/customer/register`, credentials)
            .then((response) => response.data[0])
            .catch((error) => error),
    refreshToken: () =>
        requests
            .get<TokenResponse>(`auth/refresh`)
            .then((response) => response)
            .catch((error) => error),
    signOut: () => requests.get(`auth/signout`).then((response) => response),
};

const Profile = {
    getProfile: () => requests.get<AgentResponse<Customer>>('profile/me').then((response) => response.data),
    updatePaymentOptions: (paymentOptions: PaymentOption[]) =>
        requests.put<AgentResponse<Customer>>(`profile/payment`, paymentOptions).then((response) => response.data),
    updatePersonalData: (userInformation: Customer) =>
        requests
            .put<AgentResponse<Customer>>('profile/data', userInformation)
            .then((response) => response.data[0])
            .catch((error) => error),
    updatePassword: (passwords: PasswordForm) =>
        requests.put<AgentResponse<Customer>>('profile/password', passwords).then((response) => response.data),
};

const agent = {
    Authenticate,
    Product,
    Orders,
    Profile,
    api: axios,
};

export default agent;

/*
 * Författare: Kim
 * Skapat Product med list
 */
/*
 * Ändrat: Magnus
 * Skapade updateState och updateOrder i order för att ändra en beställnings.
 */
