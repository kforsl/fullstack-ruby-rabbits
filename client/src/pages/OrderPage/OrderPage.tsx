import { useParams } from 'react-router-dom';
import OrderConfirmation from '../../components/OrderConfirmation/OrderConfirmation';
import useOrderStore from '../../stores/orderStore';
import './orderPage.css';
import { useEffect } from 'react';
import { useGetOrderById } from '../../services/queries';
import { socket } from '../../services/webSocket/ioSocket';
const OrderPage: React.FC = () => {
    const { order, setOrder } = useOrderStore();
    const { id } = useParams<{ id: string }>();
    const { data, isError, isLoading } = useGetOrderById(id || '');

    useEffect(() => {
        if (data && data.length > 0 && !isError) {
            setOrder(data[0]);
            socket.emit('joinOrderRoom', data[0]._id);
        }
    }, [data]);

    if (isLoading) {
        return (
            <main className='order-page wrapper'>
                <p>Letar efter din order...</p>
            </main>
        );
    }

    if (!id || !data || isError || order._id === 'order-id') {
        return (
            <main className='order-page wrapper'>
                <p>Kan inte hitta order.</p>
            </main>
        );
    }
    return (
        <main className='order-page wrapper'>
            <OrderConfirmation />
        </main>
    );
};

export default OrderPage;

/*
 * Författare: Magnus
 * Skapat sida som renderar ut ordrar.
 */
