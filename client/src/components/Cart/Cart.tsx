import { useState } from 'react';
import './cart.css';
import useCartStore from '../../stores/cartStore';
import { useNavigate } from 'react-router-dom';
import CartItemComponent from '../CartItem/CartItem';
import TextButton from '../TextButton/TextButton';
import { CartItem } from '../../interfaces/interfaceCart';

const Cart: React.FC = () => {
    const { cart, isOpen, setIsOpen } = useCartStore();
    const isCartEmpty: boolean = cart.length === 0;
    const navigate = useNavigate();

    const calculateTotalPrice = (): number =>
        cart.reduce((totalCost: number, cartItem: CartItem) => totalCost + cartItem.price * cartItem.quantity, 0); // totalCost är vad vi kallar returnerade värdet, 0 är initiala värdet.

    const calculateAmountOfIcreams = (): number =>
        cart.reduce((totalAmount: number, cartItem: CartItem) => totalAmount + cartItem.quantity, 0);

    return (
        <figure className='cart'>
            <button
                aria-label='Öppna varukorgen'
                onClick={() => setIsOpen((prev) => !prev)}
                className={`cart__button ${isCartEmpty ? 'cart__button--disabled' : ''}`}
                disabled={isCartEmpty}>
                {!isCartEmpty && <span className='cart__counter'>{calculateAmountOfIcreams()}</span>}
            </button>

            {isOpen && (
                <div className='cart__innerwrapper'>
                    <ul className='cart__item-list'>
                        {cart.map((cartItem) => (
                            <CartItemComponent cartItem={cartItem} key={cartItem.id} />
                        ))}
                    </ul>
                    <h3 className='cart__total-price'>TOTALT: {calculateTotalPrice()}kr</h3>
                    <TextButton
                        onClick={() => {
                            navigate('bekraftaorder');
                            setIsOpen(false);
                        }}>
                        KÖP
                    </TextButton>
                </div>
            )}
        </figure>
    );
};

export default Cart;

/*
 *Författare: Magnus
 *Komponent för cart. Knapp med ikon som öppnar meny där samtliga cartItems samlas Kopplas till zustand useCartStore. Endast testad med utkommenterat dummy-data.
 *Ändrat: Magnus
 *När cart är tom så är nu knappen disabled samt har sänkt opacity.
 */
