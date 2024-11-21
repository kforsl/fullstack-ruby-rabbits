export interface CartItem {
    name: string;
    price: number;
    imageUrl: string;
    id: string;
    quantity: number;
    size: 'small' | 'medium' | 'large';
}

export interface CartToOrder {
    price: number;
    comment?: string;
    order: CartOrderInfo[];
}

export interface CartOrderInfo {
    product: string;
    quantity: number;
    size: 'small' | 'medium' | 'large';
}
/*
 * Författare: Magnus
 * Skapat upp interface för cart. CartToOrder skickas till backend.
 *
 * Ändrat: Magnus
 * Ändrade CartItem som nu inte längre extendar ett till interface. Istället är det inbakat.
 *
 */
