import { useEffect } from 'react';
import { OrderType } from '../../interfaces/interfaceOrder';
import { useOrderState } from '../../services/mutations';
import { useGetOrders } from '../../services/queries';
import { socket } from '../../services/webSocket/ioSocket';
import OrderCard from '../OrderCard/OrderCard';
import './checkoutOrder.css';

interface Props {
    changeview: () => void;
}

const CheckoutOrder = ({ changeview }: Props) => {
    const { data, isLoading, isError, error, refetch } = useGetOrders();
    const { mutate: markAsDelivered } = useOrderState();

    useEffect(() => {
        const handleNewOrder = () => {
            console.log('logging newOrder');
            refetch();
        };

        const handleNewOrderStatus = () => {
            console.log('logging newOrderStatus');
            refetch();
        };

        if (!socket.hasListeners('newOrder')) {
            socket.on('newOrder', handleNewOrder);
        }

        if (!socket.hasListeners('newOrderStatus')) {
            socket.on('newOrderStatus', handleNewOrderStatus);
        }

        return () => {
            socket.off('newOrder', handleNewOrder);
            socket.off('newOrderStatus', handleNewOrderStatus);
        };
    }, [refetch]);

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
    const ordersWaiting = data?.filter((order) => order.state === 'waiting') as OrderType[];
    const ordersPrepering = data?.filter((order) => order.state === 'preparing') as OrderType[];
    const ordersReady = data?.filter((order) => order.state === 'ready') as OrderType[];

    const handleMarkAsDelivered = (id: string, state: 'history') => {
        markAsDelivered({ id, state });
    };

    return (
        <section className='checkoutOrder'>
            <article className='checkoutOrder__section'>
                <h2 className='checkoutOrder__section-title'> Väntande Ordrar ({ordersWaiting.length}st) </h2>
                <ul className='checkoutOrder__order-list'>
                    {ordersWaiting.map((order) => (
                        <OrderCard size={'small'} order={order} key={order._id} />
                    ))}
                </ul>
            </article>
            <article className='checkoutOrder__section'>
                <h2 className='checkoutOrder__section-title'> Tillagas </h2>
                <ul className='checkoutOrder__order-list'>
                    {ordersPrepering.map((order) => (
                        <OrderCard size={'small'} order={order} key={order._id} />
                    ))}
                </ul>
            </article>
            <article className='checkoutOrder__section'>
                <h2 className='checkoutOrder__section-title'> Redo att hämtas </h2>
                <ul className='checkoutOrder__order-list'>
                    {ordersReady.map((order) => (
                        <OrderCard
                            size={'small'}
                            order={order}
                            onClick={() => handleMarkAsDelivered(order._id, 'history')}
                            key={order._id}
                        />
                    ))}
                </ul>
            </article>
            <button className='checkoutOrder__btn' onClick={changeview}>
                SKAPA NY ORDER
            </button>
        </section>
    );
};

export default CheckoutOrder;

/*
 * Författare: Kim
 * Komponent som håller layouten för de olika sektionerna av orderstatus.
 *
 * Ändrat: Magnus
 * handleMarkAsDelivered skickas ned till små kort med status 'ready' för att togglas till 'history'
 *
 * Ändrat: Kim
 * Lagt till socket.on för att refetch useQuery
 *
 * Ändrat: Magnus
 * Lagt till useEffect och uppstädningsfunktion för socket så att det inte triggas så ofta.
 */
