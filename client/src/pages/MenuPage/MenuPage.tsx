import PopularProductItem from '../../components/PopularProductItem/PopularProductItem';
import ProductList from '../../components/ProductList/ProductList';
import './menuPage.css';
import { useGetMenu } from '../../services/queries';
import { ProductType } from '../../interfaces/interfaceProduct';

const MenuPage: React.FC = () => {
    const { data, isLoading, isError, error } = useGetMenu();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>{`${error}`}</p>;

    const specials = data?.data.filter((item) => item.isSpecial === true) as ProductType[];
    const iceCream = data?.data.filter((item) => item.type === 'icecream') as ProductType[];
    const milkshake = data?.data.filter((item) => item.type === 'milkshake') as ProductType[];

    return (
        <main className='menu-page'>
            <div className='wrapper'>
                <ul className='menu-page__popular-wrapper'>
                    {specials?.map((special) => (
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
 *
 * Ändrat: Kim
 * Lagt till div med wrapper
 *
 * Ändrat: Magnus
 * Implementerade useQuery istället för zustand-store/useEffect för att rendera ut menyn.
 */
