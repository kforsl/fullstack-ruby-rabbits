import { useLocation, useParams } from 'react-router-dom';
import OrderConfirmation from '../../components/OrderConfirmation/OrderConfirmation';
import useOrderStore from '../../stores/orderStore';
import './orderPage.css';
import { useEffect } from 'react';
import { useGetOrderById } from '../../services/queries';
const OrderPage: React.FC = () => {
    const { order, setOrder } = useOrderStore();
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const { data, isError, isLoading } = useGetOrderById(id || '');

    useEffect(() => {
        if (data && data.length > 0 && !isError) {
            setOrder(data[0]);
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
