import { CartItem } from '../../interfaces/interfaceCart';
import useCartStore from '../../stores/cartStore';
import './cartProductItem.css';

interface Props {
    product: CartItem;
}

const CartProductItem = ({ product }: Props) => {
    const { addToCart, removeFromCart } = useCartStore();
    const priceOfItem = product.price * product.quantity;

    return (
        <li className='cart-item'>
            <img className='cart-item__image' src={product.imageUrl} alt={`Produktbild för ${product.name}`} />
            <section className='cart-item__info-section'>
                <h3 className='cart-item__info-text'>
                    {product.name} - {product.size.slice(0, 1).toUpperCase()}
                </h3>
                <h4 className='cart-item__info-text'> {`${priceOfItem} kr`}</h4>
            </section>
            <section className='cart-item__info-cart'>
                <p className='cart-item__cart-value'> {product.quantity}x </p>
                <div className='cart-item__btn-section'>
                    <button className='cart-item__cart-btn' onClick={() => addToCart(product)}>
                        +
                    </button>
                    <button className='cart-item__cart-btn' onClick={() => removeFromCart(product)}>
                        -
                    </button>
                </div>
            </section>
        </li>
    );
};

export default CartProductItem;

/**
 * Författare: Kim
 * Komponent för ett objekt som ligger i varukorgen.
 */
