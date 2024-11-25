import { CartItem } from '../../interfaces/interfaceCart';
import useCartStore from '../../stores/cartStore';
import './menuToCartIncrementer.css';

interface Props {
    item: CartItem;
}
const MenuToCartIncrementer: React.FC<Props> = ({ item }) => {
    const { removeFromCart, addToCart, cart } = useCartStore();
    const foundProduct = cart.find((cartItem) => cartItem.size === item.size && cartItem.id === item.id);
    return (
        <div className='menu-to-cart-incrementer'>
            <button
                className='menu-to-cart-incrementer__button menu-to-cart-incrementer__button--remove'
                onClick={() => removeFromCart(item)}>
                &#10094;
            </button>
            <h3 className='menu-to-cart-incrementer__amount'>{foundProduct?.quantity}</h3>
            <button
                className='menu-to-cart-incrementer__button menu-to-cart-incrementer__button--add'
                onClick={() => addToCart(item)}>
                &#10095;
            </button>
        </div>
    );
};

export default MenuToCartIncrementer;
