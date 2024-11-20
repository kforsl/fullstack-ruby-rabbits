import { useGetOrders } from '../../services/queries';
import OrderCard from '../OrderCard/OrderCard';
import './checkoutOrder.css';

interface Props {
    changeview: () => void;
}

const CheckoutOrder = ({ changeview }: Props) => {
    const { data, isLoading, isError, error } = useGetOrders();

    if (isLoading) {
        return (
            <main className='chef-page'>
                <p>Loading...</p>
            </main>
        );
    }

    if (isError) {
        return (
            <main className='chef-page'>
                <p>{`${error}`}</p>
            </main>
        );
    }

    return (
        <section className='checkoutOrder'>
            <article className='checkoutOrder__section'>
                <h2 className='checkoutOrder__section-title'> Väntande Ordrar (11) </h2>
                <ul className='checkoutOrder__order-list'>
                    {data?.map(
                        (order) =>
                            order.state === 'waiting' && <OrderCard size={'small'} order={order} key={order._id} />
                    )}
                </ul>
            </article>
            <article className='checkoutOrder__section'>
                <h2 className='checkoutOrder__section-title'> Tillagas </h2>
                <ul className='checkoutOrder__order-list'>
                    {data?.map(
                        (order) =>
                            order.state === 'preparing' && <OrderCard size={'small'} order={order} key={order._id} />
                    )}
                </ul>
            </article>
            <article className='checkoutOrder__section'>
                <h2 className='checkoutOrder__section-title'> Redo att hämtas </h2>
                <ul className='checkoutOrder__order-list'>
                    {data?.map(
                        (order) => order.state === 'ready' && <OrderCard size={'small'} order={order} key={order._id} />
                    )}
                </ul>
            </article>
            <button className='checkoutOrder__btn' onClick={changeview}>
                SKAPA NY ORDER
            </button>
        </section>
    );
};

export default CheckoutOrder;

/**
 * Författare: Kim
 * Komponent som håller layouten för de olika sektionerna av orderstatus.
 */
