import { CartItem } from '../../interfaces/interfaceCart';
import useCartStore from '../../stores/cartStore';
import './cartItem.css';

interface Props {
    cartItem: CartItem;
}
const CartItemComponent: React.FC<Props> = ({ cartItem }) => {
    const { addToCart, removeFromCart, cart, setIsOpen } = useCartStore();
    const priceOfItem = cartItem.price * cartItem.quantity;

    return (
        <li className='cart-item'>
            <h3 className='cart-item__title'>{cartItem.name}</h3>
            <h3 className='cart-item__size'>{cartItem.size}</h3>
            <div className='cart-item__button-wrapper'>
                <button
                    className='cart-item__button'
                    onClick={() => {
                        removeFromCart(cartItem);
                        cart.length === 1 && cartItem.quantity === 1 && setIsOpen(false);
                    }}>
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

/*
 * Författare: Magnus
 * Komponent för cart-items. Varje item har 2 knappar och totalpris för item. Knapparna är kopplade till funktioner i zustand useCartStore.
 *
 * Ändrat: Magnus
 * Stänger nu cart ifall man tar bort sista cart-item. Ändrat css. Lagt till storlek.
 */
