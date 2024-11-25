import { useState } from 'react';
import { CartItem, CartToOrder } from '../../interfaces/interfaceCart';
import useCartStore from '../../stores/cartStore';
import CartProductItem from '../CartProductItem/CartProductItem';
import './cart.css';
import { useCreateOrder } from '../../services/mutations';
import CommentForm from '../CommentForm/CommentForm';

interface Props {
    changeview: () => void;
    comment: string;
    setComment: (comment: string) => void;
}

const Cart = ({ changeview, comment, setComment }: Props) => {
    const { cart, setCart } = useCartStore();
    const [isPayByCard, setIsPayByCard] = useState<boolean>(true);
    const [isCommenting, setIsCommenting] = useState<boolean>(false);
    const { mutate: createOrder, isPending } = useCreateOrder();

    const calculateTotalPrice = (): number =>
        cart.reduce((totalCost: number, cartItem: CartItem) => totalCost + cartItem.price * cartItem.quantity, 0); // totalCost är vad vi kallar returnerade värdet, 0 är initiala värdet.

    const createNewOrder = (cart: CartItem[], comment: string, changeview: () => void) => {
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
                changeview();
            },
            onError: (error) => {
                console.error('Order creation failed:', error);
            },
        });
    };

    return (
        <section className='cart'>
            <h2 className='cart__title'>Kundkorg</h2>
            {isCommenting ? (
                <CommentForm
                    comment={comment}
                    setComment={setComment}
                    onSave={() => setIsCommenting((prev) => !prev)}
                    onAbort={() => {
                        setIsCommenting((prev) => !prev);
                        setComment('');
                    }}
                />
            ) : (
                <ul className='cart__product-list'>
                    {cart.map((product, i) => (
                        <CartProductItem product={product} key={i} />
                    ))}
                </ul>
            )}

            <section className='cart__information'>
                <figure className='cart__information__comment' onClick={() => setIsCommenting((prev) => !prev)}>
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
                    onClick={() => createNewOrder(cart, comment, changeview)}
                    disabled={isPending}>
                    {isPending ? 'Loading...' : 'Betala'}
                </button>
            </section>
        </section>
    );
};

export default Cart;

/*
 * Författare: Kim
 * Komponent som visar de produkter som finns i varukorgem och möjligheten att öka och minska antalet.
 *
 * Ändrat: Magnus
 * Fixat createNewOrder funtkionen som använder useMutate för att skapa en ny order.
 * Använder isPending för att rendera textinnehåll i betalaknappen och är då disabled.
 */
