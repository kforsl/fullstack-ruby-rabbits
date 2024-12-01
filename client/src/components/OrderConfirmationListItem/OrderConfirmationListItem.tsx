import { OrderItemType } from '../../interfaces/interfaceOrder';
import OrderConfirmationEditor from '../OrderConfirmationEditor/OrderConfirmationEditor';
import './orderConfirmationListItem.css';
interface Props {
    orderItem: OrderItemType;
    isEditing: boolean;
}
const OrderConfirmationListItem: React.FC<Props> = ({ orderItem, isEditing }) => {
    return (
        <li className='order-confirmation__order-list-item' key={orderItem._id}>
            <h4 className='order-confirmation__list-info'>{orderItem.product.name}</h4>
            <h4 className='order-confirmation__list-info'>{orderItem.size}</h4>
            {!isEditing ? (
                <h4 className='order-confirmation__list-info'>{orderItem.quantity}</h4>
            ) : (
                <OrderConfirmationEditor orderItem={orderItem} />
            )}
        </li>
    );
};

export default OrderConfirmationListItem;

/*
 * Författare: Magnus
 * Komponent för att lista varje item i en liggande order.
 */
