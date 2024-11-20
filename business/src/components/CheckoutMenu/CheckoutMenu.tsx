import './checkoutMenu.css';
import { ProductType } from '../../interfaces/interfaceProduct';
import { useGetMenu } from '../../services/queries';
import Cart from '../Cart/Cart';
import ProductList from '../ProductList/ProductList';

interface Props {
    changeview: () => void;
}

const CheckoutMenu = ({ changeview }: Props) => {
    const { data, isLoading, isError, error } = useGetMenu();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>{`${error}`}</p>;

    const iceCream =
        typeof data?.data !== 'string'
            ? (data?.data.filter((item) => item.type === 'icecream') as ProductType[])
            : ([] as ProductType[]);
    const milkshake =
        typeof data?.data !== 'string'
            ? (data?.data.filter((item) => item.type === 'milkshake') as ProductType[])
            : ([] as ProductType[]);

    return (
        <section className='checkoutMenu'>
            <article className='checkoutMenu__menu-section'>
                <h1 className='checkoutMenu__menu-title'> Menu </h1>
                <ProductList title='Ice cream' products={iceCream} />
                <ProductList title='Milkshake' products={milkshake} />
            </article>
            <article className='checkoutMenu__cart-section'>
                <Cart changeview={changeview} />
            </article>
        </section>
    );
};

export default CheckoutMenu;
