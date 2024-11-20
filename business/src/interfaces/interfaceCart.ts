export interface CartItem extends CartOrderInfo {
    name: string;
    price: number;
}
export interface CartOrderInfo {
    id: string;
    quantity: number;
}

/*
 * Författare: Magnus
 * Skapat upp interface för cart. CardOrderInfo skickas till backend.
 */
