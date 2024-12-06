import { useEffect, useState } from 'react';
import CartItemComponent from '../../components/CartItem/CartItem';
import useCartStore from '../../stores/cartStore';
import './finalizeOrder.css';
import { useCreateOrder } from '../../services/mutations';
import TextButton from '../../components/TextButton/TextButton';
import { CartItem, CartToOrder } from '../../interfaces/interfaceCart';
import useOrderStore from '../../stores/orderStore';
import { useMatch, useNavigate } from 'react-router-dom';

const FinalizeOrder: React.FC = () => {
    const { cart, setCart } = useCartStore();
    const { setOrder } = useOrderStore();
    const [comment, setComment] = useState('');
    const navigate = useNavigate();
    const orderpage = useMatch('/ordrar/:id');
    const { mutate: createOrder, isPending, isError, isSuccess } = useCreateOrder();

    const calculateTotalPrice = (): number =>
        cart.reduce((totalCost: number, cartItem: CartItem) => totalCost + cartItem.price * cartItem.quantity, 0);

    useEffect(() => {
        if (cart.length === 0 && !isPending && !isError && !isSuccess && !orderpage) {
            navigate('/');
        }
    }, [cart]);

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
            onSuccess: (response) => {
                newOrder = null;
                if (response) {
                    setOrder(response[0]);
                    navigate(`/ordrar/${response[0]._id}`);
                    setComment('');
                    setCart([]);
                }
            },
            onError: (error) => {
                console.error('Order creation failed:', error);
            },
        });
    };
    isError && navigate('/error');
    return (
        <main className='finalize-page wrapper'>
            <article className='finalize-page__confirmation-wrapper'>
                <h1 className='finalize-page__title'>DIN ORDER:</h1>
                <ul className='finalize-page__order-list'>
                    {cart.map((item) => (
                        <CartItemComponent key={item.id + item.size} cartItem={item} />
                    ))}
                </ul>
                <div className='finalize-page__control-wrapper'>
                    <h2 className='finalize-page__total-price'>{`TOTALT: ${calculateTotalPrice()}kr`}</h2>
                    {cart.length !== 0 && (
                        <TextButton onClick={createNewOrder}>{isPending ? 'Loading...' : 'SKICKA ORDER'}</TextButton>
                    )}

                    <form className='finalize-page__comment-form'>
                        <textarea
                            maxLength={150}
                            placeholder='HAR DU ÖNSKEMÅL PÅ DIN BESTÄLLNING? SKRIV HÄR...'
                            name='orderComment'
                            id='orderComment'
                            className='finalize-page__textarea'
                            onChange={(e) => setComment(e.target.value)}></textarea>
                        <span className='finalize-page__comment-count'>{`${comment.length}/150`}</span>
                    </form>
                </div>
            </article>
        </main>
    );
};

export default FinalizeOrder;

/*
 * Författare: Magnus
 * Skapat sidan som skickar ordern till backend. Preliminär css och komponent.
 *
 * Ändrat: Magnus
 * Lagt in komponent för order-bekräftelse samt error renderas ifall det misslyckas.
 *
 * Ändrat: Magnus
 * Lagt in setOrder från orderStore. Använder den för att sätta ett grundvärde på order.
 *
 * Ändrat: Magnus
 * Om cart är tom när du direktnavigerar till /orderbekraftelse så skickas du tillbaka till menyn.
 *
 * Ändrat: Magnus
 * Tagit bort komponent för att rendera ut färdig order. Istället navigerar du till ordrar page. OnSuccess i mutation ger dig inte direkt tillgång till data. Så har ändrat data till response.
 *
 * Ändrat: Magnus
 * Om du tömmer cart helt navigerar du till menyn.
 */
