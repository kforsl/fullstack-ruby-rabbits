import { OrderType, OrderItemType } from '../../interfaces/interfaceOrder';
import { formatDate, getLastNCharacters } from '../../utils/utilFunctions';
import TextButton from '../TextButton/TextButton';
import './orderCard.css';
interface Props {
    size: 'small' | 'medium' | 'large';
    order: OrderType;
}

const OrderCard: React.FC<Props> = ({ size, order }) => {
    const calculateAmountInOrder = (): number =>
        order.order.reduce((totalAmount: number, orderItem: OrderItemType) => totalAmount + orderItem.quantity, 0);

    if (size === 'small')
        return (
            <li className={`order-card order-card--small`}>
                <h2 className='order-card__order-id'>{getLastNCharacters(order._id, 4)}</h2>
                <h3 className='order-card__time'>{formatDate(order.createdAt)}</h3>
            </li>
        );
    if (size === 'medium')
        return (
            <li className='order-card order-card--medium'>
                <h2 className='order-card__order-id'>{getLastNCharacters(order._id, 4)}</h2>
                <h3 className='order-card__date'>{formatDate(order.createdAt)}</h3>
                <h3 className='order-card__amount'>
                    <span>Antal:</span>
                    <span>{calculateAmountInOrder()}</span>
                </h3>
                <TextButton onClick={() => console.log('Här var det klickat!')}>TILLAGA</TextButton>
            </li>
        );
    if (size === 'large')
        return (
            <ul className='order-card order-card--large'>
                <h2 className='order-card__order-id'>{getLastNCharacters(order._id, 4)}</h2>
                <h3 className='order-card__date'>{formatDate(order.createdAt)}</h3>
                {order.order.map((orderItem, i) => (
                    <li className='order-card__order-item' key={orderItem.size + i}>
                        <h4 className='order-card__product-name'>{orderItem.product.name}</h4>
                        <h4 className='order-card__product-size'>{orderItem.size}</h4>
                        <h4 className='order-card__product-quantity'>{orderItem.quantity}</h4>
                    </li>
                ))}
                <TextButton onClick={() => console.log('Här var det klickat!')}>KLAR FÖR SERVERING</TextButton>
            </ul>
        );
};

export default OrderCard;

/*
 *Författare: Magnus
 *Skapat komponent som tar 2 props och renderar ut kort för beställningar.
 */
