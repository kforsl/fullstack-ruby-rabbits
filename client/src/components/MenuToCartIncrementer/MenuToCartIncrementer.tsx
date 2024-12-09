import { CartItem } from '../../interfaces/interfaceCart';
import useCartStore from '../../stores/cartStore';
import './menuToCartIncrementer.css';

interface Props {
    item: CartItem;
}
const MenuToCartIncrementer: React.FC<Props> = ({ item }) => {
    const { removeFromCart, addToCart, cart, setIsOpen } = useCartStore();

    return (
        <div className='menu-to-cart-incrementer'>
            <button
                className='menu-to-cart-incrementer__button menu-to-cart-incrementer__button--remove'
                onClick={() => {
                    removeFromCart(item);
                    cart.length === 1 && item.quantity === 1 && setIsOpen(false);
                }}>
                <span className='menu-to-cart-incrementer__button-text'>&#10094;</span>
            </button>
            <h3 className='menu-to-cart-incrementer__amount'>{item.quantity}</h3>
            <button
                className='menu-to-cart-incrementer__button menu-to-cart-incrementer__button--add'
                onClick={() => addToCart(item)}>
                <span className='menu-to-cart-incrementer__button-text'>&#10095;</span>
            </button>
        </div>
    );
};

export default MenuToCartIncrementer;

/*
 * Författare: Magnus
 * Skapat komponent som lägger till och tar ifrån antal från befintliga cart-items.
 */
