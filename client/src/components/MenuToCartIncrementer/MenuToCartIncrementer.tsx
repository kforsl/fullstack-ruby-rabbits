import { CartItem } from '../../interfaces/interfaceCart';
import useCartStore from '../../stores/cartStore';
import './menuToCartIncrementer.css';

interface Props {
    item: CartItem;
}
const MenuToCartIncrementer: React.FC<Props> = ({ item }) => {
    const { removeFromCart, addToCart, cart, setIsOpen } = useCartStore();
    const foundProduct = cart.find((cartItem) => cartItem.id === item.id);
    return (
        <div className='menu-to-cart-incrementer'>
            <button
                className='menu-to-cart-incrementer__button menu-to-cart-incrementer__button--remove'
                onClick={() => {
                    removeFromCart(item);
                    cart.length === 1 && foundProduct?.quantity === 1 && setIsOpen(false);
                }}>
                <span className='menu-to-cart-incrementer__button-text'>&#10094;</span>
            </button>
            <h3 className='menu-to-cart-incrementer__amount'>{foundProduct?.quantity}</h3>
            <button
                className='menu-to-cart-incrementer__button menu-to-cart-incrementer__button--add'
                onClick={() => addToCart(item)}>
                <span className='menu-to-cart-incrementer__button-text'>&#10095;</span>
            </button>
        </div>
    );
};

export default MenuToCartIncrementer;
