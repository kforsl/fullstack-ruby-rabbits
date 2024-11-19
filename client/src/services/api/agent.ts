import axios, { AxiosResponse } from 'axios';
import { ProductType } from '../../interfaces/interfaceProduct';

// axios.defaults.baseURL = 'Här får vi byta ut och ta vår adress när vi har en backend uppe :) ';
axios.defaults.baseURL = 'http://localhost:3000/api/';

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
interface ProductResponse {
    message: string;
    data: ProductType[];
}

const Product = {
    list: () => requests.get<ProductResponse>('products'),
};

const Authenticate = {
    // signIn: (credentials: SignInForm) => requests.post<SignInForm>(`auth`, credentials),
};

const agent = {
    Authenticate,
    Product,
};

export default agent;

/*
 * Författare: Kim
 * Skapat Product med list
 */
