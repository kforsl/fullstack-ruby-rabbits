import { ProductType } from './interfaceProduct';

export interface OrderType {
    _id: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    state: 'waiting' | 'preparing' | 'ready' | 'history';
    comment?: string;
    order: OrderItemType[];
}

export interface OrderItemType {
    product: ProductType;
    quantity: number;
    size: 'small' | 'medium' | 'large';
}

/*
 * Författare: Magnus
 * Skapat upp interface för OrderType och OrderItemType.
 */
