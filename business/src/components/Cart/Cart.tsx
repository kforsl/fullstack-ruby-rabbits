import { CartItem } from '../../interfaces/interfaceCart';
import useCartStore from '../../stores/cartStore';
import CartProductItem from '../CartProductItem/CartProductItem';
import './cart.css';

const Cart = () => {
    const { cart } = useCartStore();

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
            <section>
                <p>{calculateTotalPrice()}kr</p>
            </section>
            <section className='cart__btn-section'>
                <button className='cart__btn cart__btn--filled'> Kontant </button>
                <button className='cart__btn'> Kort </button>
                <button className='cart__btn cart__btn--large'> Betala </button>
            </section>
        </section>
    );
};

export default Cart;
