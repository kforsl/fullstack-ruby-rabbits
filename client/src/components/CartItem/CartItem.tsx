import { CartItem } from '../../interfaces/interfaceCart';
import MenuToCartIncrementer from '../MenuToCartIncrementer/MenuToCartIncrementer';
import './cartItem.css';

interface Props {
    cartItem: CartItem;
}
const CartItemComponent: React.FC<Props> = ({ cartItem }) => {
    const priceOfItem = cartItem.price * cartItem.quantity;

    return (
        <li className='cart-item'>
            <h3 className='cart-item__title'>{`${cartItem.name} - ${cartItem.size.charAt(0).toUpperCase()}`}</h3>

            <h3 className='cart-item__price-of-item'>{`${priceOfItem}kr`}</h3>

            <div className='cart-item__button-wrapper'>
                <MenuToCartIncrementer item={cartItem} />
            </div>
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
