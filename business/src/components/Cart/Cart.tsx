import { useState } from 'react';
import { CartItem } from '../../interfaces/interfaceCart';
import useCartStore from '../../stores/cartStore';
import CartProductItem from '../CartProductItem/CartProductItem';
import './cart.css';

const createNewOrder = (cart: CartItem[], comment: string, changeview: () => void) => {
    changeview();
};

interface Props {
    changeview: () => void;
}

const Cart = ({ changeview }: Props) => {
    const { cart } = useCartStore();
    const [isPayByCard, setIsPayByCard] = useState<boolean>(true);

    const [comment, setComment] = useState('');

    const calculateTotalPrice = (): number =>
        cart.reduce((totalCost: number, cartItem: CartItem) => totalCost + cartItem.price * cartItem.quantity, 0); // totalCost är vad vi kallar returnerade värdet, 0 är initiala värdet.

    return (
        <section className='cart'>
            <h2 className='cart__title'>Kundkorg</h2>
            <ul className='cart__product-list'>
                {cart.map((product) => (
                    <CartProductItem product={product} key={product.size + product.id} />
                ))}
            </ul>
            <section className='cart__information'>
                <figure className='cart__information__comment'>
                    <img src='/assets/fluent_notepad-edit-16-filled.svg' alt='notepad' />
                    <figcaption className='cart__information__comment-prev'> {comment} </figcaption>
                </figure>
                <p className='cart__information__total-sum'>{calculateTotalPrice()}kr</p>
            </section>
            <section className='cart__btn-section'>
                <button
                    className={isPayByCard ? 'cart__btn' : 'cart__btn cart__btn--filled'}
                    onClick={() => {
                        setIsPayByCard(false);
                    }}>
                    Kontant
                </button>
                <button
                    className={isPayByCard ? 'cart__btn cart__btn--filled' : 'cart__btn'}
                    onClick={() => {
                        setIsPayByCard(true);
                    }}>
                    Kort
                </button>
                <button
                    className='cart__btn cart__btn--large'
                    onClick={() => createNewOrder(cart, comment, changeview)}>
                    Betala
                </button>
            </section>
        </section>
    );
};

export default Cart;
