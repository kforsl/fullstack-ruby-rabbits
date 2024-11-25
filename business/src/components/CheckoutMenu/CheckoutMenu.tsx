import './checkoutMenu.css';
import { ProductType } from '../../interfaces/interfaceProduct';
import { useGetMenu } from '../../services/queries';
import Cart from '../Cart/Cart';
import ProductList from '../ProductList/ProductList';
import { useState } from 'react';

interface Props {
    changeview: () => void;
}

const CheckoutMenu = ({ changeview }: Props) => {
    const { data, isLoading, isError, error } = useGetMenu();

    const [comment, setComment] = useState('');

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>{`${error}`}</p>;

    const iceCream = data?.filter((item) => item.type === 'icecream') as ProductType[];

    const milkshake = data?.filter((item) => item.type === 'milkshake') as ProductType[];

    return (
        <section className='checkoutMenu'>
            <article className='checkoutMenu__wrapper'>
                <h1 className='checkoutMenu__menu-title'> Menu </h1>

                <img
                    className='checkoutMenu__back-btn'
                    src='/assets/icon-park-outline_back.svg'
                    alt='tillbaka'
                    onClick={() => {
                        changeview();
                        setComment('');
                    }}
                />
                <section className='checkoutMenu__menu-section'>
                    <ProductList title='Ice cream' products={iceCream} />
                    <ProductList title='Milkshake' products={milkshake} />
                </section>
            </article>
            <article className='checkoutMenu__cart-section'>
                <Cart changeview={changeview} comment={comment} setComment={setComment} />
            </article>
        </section>
    );
};

export default CheckoutMenu;

/*
 * Författare: Kim
 * Komponent som håller layouten för varukorg och produkterna i meny
 */

/*
 * Ändrat: Kim
 * Lagt till tillbaka knapp och gjort så att enbart produkterna scrollar
 */

/*
 * Ändrat: Magnus
 * Förenklat filtermetoderna efter att svaren alltid är en array.
 */
