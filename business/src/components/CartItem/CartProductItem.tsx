import { CartItem } from '../../interfaces/interfaceCart';
// import useCartStore from '../../stores/cartStore';
import './cartProductItem.css';

interface Props {
    product: CartItem;
}

const CartProductItem = ({ product }: Props) => {
    // const { addToCart, removeFromCart } = useCartStore();

    return (
        <li className='cart-item'>
            <img className='cart-item__image' src='/assets/strawberry-milkshake.png' alt='temp img' />
            <section className='cart-item__info-section'>
                <h3 className='cart-item__info-text'> ProduktNamn</h3>
                <h4 className='cart-item__info-text'> 32 kr </h4>
            </section>
            <section className='cart-item__info-cart'>
                <p className='cart-item__cart-value'> 3x </p>
                <div className='cart-item__btn-section'>
                    <button className='cart-item__cart-btn' onClick={() => console.log(product)}>
                        +
                    </button>
                    <button className='cart-item__cart-btn' onClick={() => console.log(product)}>
                        -
                    </button>
                </div>
            </section>
        </li>
    );
};

export default CartProductItem;
