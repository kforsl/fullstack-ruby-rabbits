import { Link } from 'react-router-dom';
import { OrderType } from '../../interfaces/interfaceOrder';
import './orderListItem.css';

interface Props {
    order: OrderType;
}
const OrderListItem = ({ order }: Props) => {
    return (
        <li className='order-list-item'>
            <Link className='order-list-item__link' to={`/orderbekraftelse/${order._id}`}>
                {order._id.slice(order._id.length - 4, order._id.length).toLocaleUpperCase()}
            </Link>
            <p className='order-list-item__status'> Status: {order.state}</p>
            <p className='order-list-item__price'> {order.price} kr </p>
            <p className='order-list-item__date'> {new Date(order.createdAt).toDateString()} </p>
        </li>
    );
};

export default OrderListItem;
