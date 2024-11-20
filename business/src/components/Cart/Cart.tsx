import useCartStore from '../../stores/cartStore';
import CartProductItem from '../CartItem/CartProductItem';
import './cart.css';

const Cart = () => {
    const { cart } = useCartStore();

    return (
        <section className='cart'>
            <h2 className='cart__title'>Kundkorg</h2>
            <ul className='cart__product-list'>
                {cart.map((product) => (
                    <CartProductItem product={product} />
                ))}
            </ul>
            <section className='cart__btn-section'>
                <button className='cart__btn cart__btn--filled'> Kontant </button>
                <button className='cart__btn'> Kort </button>
                <button className='cart__btn cart__btn--large'> Betala </button>
            </section>
        </section>
    );
};

export default Cart;
