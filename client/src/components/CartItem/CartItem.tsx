import { CartItem } from '../../interfaces/interfaceCart';
import useCartStore from '../../stores/cartStore';
import './cartItem.css';

interface Props {
    cartItem: CartItem;
}
const CartItemComponent: React.FC<Props> = ({ cartItem }) => {
    const { addToCart, removeFromCart } = useCartStore();
    const priceOfItem = cartItem.price * cartItem.quantity;

    return (
        <li className='cart-item'>
            <h3 className='cart-item__title'>{cartItem.name}</h3>
            <div className='cart-item__button-wrapper'>
                <button className='cart-item__button' onClick={() => removeFromCart(cartItem)}>
                    -
                </button>
                <h3 className='cart-item__quantity'>{cartItem.quantity}</h3>
                <button className='cart-item__button' onClick={() => addToCart(cartItem)}>
                    +
                </button>
            </div>
            <h3 className='cart-item__price-of-item'>{`${priceOfItem}kr`}</h3>
        </li>
    );
};

export default CartItemComponent;
