import OrderListItem from '../OrderListItem/OrderListItem';
import useAuthStore from '../../stores/authStore';
import './profileOrderList.css';
import { useEffect } from 'react';
import { Customer } from '../../interfaces/interfaceAuth';

const ProfileOrderList = () => {
    const { orders, setOrders } = useAuthStore();

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user') as string) as Customer;
        if (!user) {
            window.location.href = '/?notLoggedIn=true';
        } else {
            setOrders(user._id as string);
        }
    }, []);
    return (
        <section className='profile-order-list'>
            {!orders ? (
                <ul>Laddar...</ul>
            ) : (
                <>
                    <ul>
                        <h3 className='profile-order-list__title'> Aktiva Ordrar </h3>
                        {orders
                            .filter((order) => order.state !== 'history')
                            .map(
                                (order) => order.state !== 'history' && <OrderListItem order={order} key={order._id} />
                            )}
                        {orders.filter((order) => order.state !== 'history').length <= 0 && (
                            <li className='profile-order-list__empty'>Du har inga tidigare ordrar.</li>
                        )}
                    </ul>
                    <ul>
                        <h3 className='profile-order-list__title'> Tidigare Ordrar </h3>
                        {orders
                            .filter((order) => order.state === 'history')
                            .map(
                                (order) => order.state === 'history' && <OrderListItem order={order} key={order._id} />
                            )}
                        {orders.filter((order) => order.state === 'history').length <= 0 && (
                            <li className='profile-order-list__empty'>Du har inga tidigare ordrar.</li>
                        )}
                    </ul>
                </>
            )}
        </section>
    );
};

export default ProfileOrderList;
