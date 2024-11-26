import { useState } from 'react';
import CartItemComponent from '../../components/CartItem/CartItem';
import useCartStore from '../../stores/cartStore';
import './finalizeOrder.css';
import { useCreateOrder } from '../../services/mutations';
import TextButton from '../../components/TextButton/TextButton';
import { CartItem, CartToOrder } from '../../interfaces/interfaceCart';
const FinalizeOrder: React.FC = () => {
    const { cart, setCart } = useCartStore();
    const [comment, setComment] = useState('');
    const { mutate: createOrder, isPending } = useCreateOrder();

    const calculateTotalPrice = (): number =>
        cart.reduce((totalCost: number, cartItem: CartItem) => totalCost + cartItem.price * cartItem.quantity, 0);

    const createNewOrder = () => {
        const cartToOrder = cart.map(({ id, quantity, size }) => ({
            product: id,
            quantity,
            size,
        }));

        let newOrder: CartToOrder | null = {
            price: calculateTotalPrice(),
            comment: comment,
            order: cartToOrder,
        };

        createOrder(newOrder, {
            onSuccess: () => {
                newOrder = null;
                setComment('');
                setCart([]);
            },
            onError: (error) => {
                console.error('Order creation failed:', error);
            },
        });
    };
    return (
        <main className='finalize-page wrapper'>
            <h1 className='finalize-page__title'>DIN ORDER:</h1>
            <ul className='finalize-page__order-list'>
                {cart.map((item) => (
                    <CartItemComponent key={item.id} cartItem={item} />
                ))}
            </ul>
            <form className='finalize-page__comment-form'>
                <textarea
                    placeholder='HAR DU ÖNSKEMÅL PÅ DIN BESTÄLLNING? SKRIV HÄR...'
                    name='orderComment'
                    id='orderComment'
                    className='finalize-page__textarea'
                    onChange={(e) => setComment(e.target.value)}
                    value={comment ? comment : ''}></textarea>
            </form>
            <TextButton onClick={createNewOrder}>{isPending ? 'Loading...' : 'SKICKA ORDER'}</TextButton>
        </main>
    );
};

export default FinalizeOrder;

/*
 * Författare: Magnus
 * Skapat sidan som skickar ordern till backend.
 */
