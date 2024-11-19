import { useEffect } from 'react';
import PopularProductItem from '../../components/PopularProductItem/PopularProductItem';
import ProductList from '../../components/ProductList/ProductList';
import './menuPage.css';
import useProductStore from '../../stores/productStore';

const MenuPage: React.FC = () => {
    const { addProducts, iceCream, milkshake, specials } = useProductStore();

    useEffect(() => {
        addProducts();
    }, []);

    return (
        <main className='menu-page'>
            <div className='wrapper'>
                <ul className='menu-page__popular-wrapper'>
                    {specials.map((special) => (
                        <PopularProductItem product={special} key={special._id} />
                    ))}
                </ul>

                <section className='menu-page__menu-wrapper'>
                    <ProductList title='Ice Cream' position='left' productItems={iceCream} />
                    <ProductList title='Milkshake' position='right' productItems={milkshake} />
                </section>
            </div>
        </main>
    );
};

export default MenuPage;

/*
 * Författare: Kim
 * grundläggande layout av Page för meny där "företagsnamn" populära produkter och menyn renderas ut på sidan.
 *
 * Ändrat: Magnus
 * Tog bort svg-image och titel med css och lade den i headerkomponent.
 */

/*
 * Ändrat: Kim
 * Lagt till div med wrapper
 */
