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
                {order._id.slice(0, 4)}
            </Link>
            {order.state !== 'history' && <p className='order-list-item__status'> Status: {order.state}</p>}
            <p className='order-list-item__price'> {order.price} kr </p>
            <p className='order-list-item__date'> {order.createdAt.toDateString()} </p>
        </li>
    );
};

export default OrderListItem;
