import axios, { AxiosResponse } from 'axios';
import { IngredientItemType, ProductType, UpdateProductType } from '../../interfaces/interfaceProduct';
import { SignInForm } from '../../interfaces/interfaceAuth';
import { OrderType } from '../../interfaces/interfaceOrder';
import { CartToOrder } from '../../interfaces/interfaceCart';
import { BASE_URL } from '../../../../constants.ts';

axios.defaults.baseURL = `${BASE_URL}/api`;

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

// interface ProductResponse {
//     message: string;
//     data: ProductType[] | string;
// }

interface AgentResponse<T = object> {
    message: string;
    data: T[];
}

const Products = {
    list: () => requests.get<AgentResponse<ProductType>>('products').then((response) => response.data),
    update: (id: string, product: UpdateProductType) =>
        requests.put<AgentResponse<UpdateProductType>>(`products/${id}`, product).then((response) => response.data),
    post: (product: UpdateProductType) =>
        requests.post<AgentResponse<UpdateProductType>>(`products`, product).then((response) => response.data),
};

const Orders = {
    list: () => requests.get<AgentResponse<OrderType>>('orders').then((response) => response.data),
    updateState: (id: string, state: 'waiting' | 'preparing' | 'ready' | 'history' | 'editing' | 'annulled') =>
        requests.put<AgentResponse<OrderType>>(`orders/${id}`, { state: state }).then((response) => response.data),
    post: (order: CartToOrder) =>
        requests.post<AgentResponse<OrderType>>('orders', order).then((response) => response.data),
    getByOrderId: (id: string) =>
        requests.get<AgentResponse<OrderType>>(`orders/${id}`).then((response) => response.data),
    updateOrder: (id: string, order: OrderType) =>
        requests.put<AgentResponse<OrderType>>(`orders/${id}`, order).then((response) => response.data),
};

const Ingredient = {
    list: () => requests.get<AgentResponse<IngredientItemType>>('ingredients').then((response) => response.data),
};

const agent = {
    Authenticate: (credentials: SignInForm) =>
        requests
            .post<AgentResponse<SignInForm>>(`auth`, credentials)
            .then((response) => response.data)
            .catch((error) => error.message),
    Products,
    Orders,
    Ingredient,
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

/*
 * Ändrat: Magnus
 * Lade in Orders objekt med funktioner, ändrade AgentResponse så data alltid är en array med "T".
 */
/*
 * Ändrat: Magnus
 * Skapade en post för att lägga en order.
 */
/*
 * Ändrat: Magnus
 * Fixat så Product.list returnerar data direkt så man slipper stega data.data.
 
 * Ändrat: Magnus
 * Lagt in getByOrderId och updateOrder. Importerar nu BASE_URL från constants.ts för att enbart ha ett ställe att ändra url på.
 */
