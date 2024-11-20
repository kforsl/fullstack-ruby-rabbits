import axios, { AxiosResponse } from 'axios';
import { ProductType } from '../../interfaces/interfaceProduct';
import { SignInForm } from '../../interfaces/interfaceAuth';

axios.defaults.baseURL = 'https://fullstack-ruby-rabbits.onrender.com/api/';
// axios.defaults.baseURL = 'http://localhost:3000/api/';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(`${url}`).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(`${url}`, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(`${url}`, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(`${url}`).then(responseBody),
};

//Exempel på objekt som kan användas i Agent
// const Messages = {
//     list: () => requests.get<MessageModel[]>(`messages`),
//     get: (id: string) => requests.get<MessageModel>(`messages/${id}`),
//     create: (message: { text: string; username: string }) => requests.post<string>(`messages`, message),
//     update: (id: string, message: MessageModel) => requests.put<string>(`messages/${id}`, message),
//     delete: (id: string) => requests.delete<string>(`messages/${id}`),
// };

// interface ProductResponse {
//     message: string;
//     data: ProductType[] | string;
// }

interface AgentResponse<T = object> {
    message: string;
    data: T[] | T | string;
}

const Products = {
    list: () => requests.get<AgentResponse<ProductType>>('products'),
};

const agent = {
    Authenticate: (credentials: SignInForm) =>
        requests.post<AgentResponse<SignInForm>>(`auth`, credentials).then((response) => response.data),
    Products,
};

export default agent;

/*
 * Författare: Kim
 * Skapat Product med list
 */

/*
 * Författare: Johan
 * Skapat Authenticate objektet i Agent för inlogg och dylikt.
 * Jag la även till en uppdaterad version av AgentResponse som kan användas i alla anrop.
 */
