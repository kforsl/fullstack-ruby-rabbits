import { OrderType } from '../../interfaces/interfaceOrder';
import OrderListItem from '../OrderListItem/OrderListItem';
import './profileOrderList.css';

interface Props {
    orders: OrderType[];
}

const ProfileOrderList = ({ orders }: Props) => {
    return (
        <section className='profile-order-list'>
            <ul>
                <h3 className='profile-order-list__title'> Aktiva Ordrar </h3>
                {orders.map((order) => order.state !== 'history' && <OrderListItem order={order} key={order._id} />)}
            </ul>
            <ul>
                <h3 className='profile-order-list__title'> Tidigare Ordrar </h3>
                {orders.map((order) => order.state === 'history' && <OrderListItem order={order} key={order._id} />)}
            </ul>
        </section>
    );
};

export default ProfileOrderList;
