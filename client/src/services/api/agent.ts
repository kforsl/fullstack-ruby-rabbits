import axios, { AxiosResponse } from 'axios';
import { ProductType } from '../../interfaces/interfaceProduct';
import { Customer, PasswordForm, PaymentOption, SignInForm } from '../../interfaces/interfaceAuth';
import { CartToOrder } from '../../interfaces/interfaceCart';
import { OrderType } from '../../interfaces/interfaceOrder';

// axios.defaults.baseURL = 'Här får vi byta ut och ta vår adress när vi har en
axios.defaults.baseURL = 'http://localhost:3000/api/';
// axios.defaults.baseURL = 'https://fullstack-ruby-rabbits.onrender.com/api/';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(`${url}`, { withCredentials: true }).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(`${url}`, body, { withCredentials: true }).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(`${url}`, body, { withCredentials: true }).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(`${url}`, { withCredentials: true }).then(responseBody),
};

//Exempel på objekt som kan användas i Agent
// const Messages = {
//     list: () => requests.get<MessageModel[]>(`messages`),
//     get: (id: string) => requests.get<MessageModel>(`messages/${id}`),
//     create: (message: { text: string; username: string }) => requests.post<string>(`messages`, message),
//     update: (id: string, message: MessageModel) => requests.put<string>(`messages/${id}`, message),
//     delete: (id: string) => requests.delete<string>(`messages/${id}`),
// };
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
        requests
            .get<AgentResponse<OrderType>>(`orders/${id}`)
            .then((response) => response.data)
            .catch((error) => error),
};

const Authenticate = {
    signIn: (credentials: SignInForm) =>
        requests
            .post<AgentResponse<Customer>>(`auth/customer`, credentials)
            .then((response) => response.data[0])
            .catch((error) => error),
    signUp: (credentials: Customer) =>
        requests
            .post<AgentResponse<Customer>>(`auth/customer/register`, credentials)
            .then((response) => response.data[0])
            .catch((error) => error),
};

const Profile = {
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
