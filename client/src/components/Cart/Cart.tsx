import { useState } from 'react';
import './cart.css';
import useCartStore from '../../stores/cartStore';
import { useNavigate } from 'react-router-dom';
import CartItemComponent from '../CartItem/CartItem';
import TextButton from '../TextButton/TextButton';
// import { useEffect } from 'react';
// import { CartItem } from '../../interfaces/interfaceCart';

const Cart: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { cart } = useCartStore();
    // const { setCart } = useCartStore();
    const navigate = useNavigate();

    const calculateTotalPrice = (): number =>
        cart.reduce((totalCost, cartItem) => totalCost + cartItem.price * cartItem.quantity, 0); // totalCost är vad vi kallar returnerade värdet, 0 är initiala värdet.

    const calculateAmountOfIcreams = (): number =>
        cart.reduce((totalAmount, cartItem) => totalAmount + cartItem.quantity, 0);

    // const iceCreams: CartItem[] = [
    //     {
    //         id: '1',
    //         name: 'Vanilla',
    //         price: 50,
    //         quantity: 2,
    //     },
    //     {
    //         id: '2',
    //         name: 'Chocolate',
    //         price: 39,
    //         quantity: 1,
    //     },
    //     {
    //         id: '3',
    //         name: 'Strawberry',
    //         price: 55,
    //         quantity: 3,
    //     },
    //     {
    //         id: '4',
    //         name: 'Mint Chocolate Chip',
    //         price: 49,
    //         quantity: 1,
    //     },
    //     {
    //         id: '5',
    //         name: 'Cookie Dough',
    //         price: 55,
    //         quantity: 2,
    //     },
    // ];
    // useEffect(() => {
    //     setCart(iceCreams);
    // }, []);

    return (
        <figure className='cart'>
            <button
                aria-label='Öppna varukorgen'
                onClick={(): void => setIsOpen((prev) => !prev)}
                className='cart__button'
                id='cartButton'>
                {cart.length > 0 && <span className='cart__counter'>{calculateAmountOfIcreams()}</span>}
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
 */
