import { OrderItemType } from '../../interfaces/interfaceOrder';
import OrderPreviewEditor from '../OrderPreviewEditor/OrderPreviewEditor';
import './orderPreviewListItem.css';
interface Props {
    orderItem: OrderItemType;
    isEditing: boolean;
}
const OrderPreviewListItem: React.FC<Props> = ({ orderItem, isEditing }) => {
    return (
        <li className='order-preview__order-list-item' key={orderItem._id}>
            <h4 className='order-preview__list-info'>{orderItem.product.name}</h4>
            <h4 className='order-preview__list-info'>{orderItem.size}</h4>
            {!isEditing ? (
                <h4 className='order-preview__list-info'>{orderItem.quantity}</h4>
            ) : (
                <OrderPreviewEditor orderItem={orderItem} />
            )}
        </li>
    );
};

export default OrderPreviewListItem;

/*
 * Författare: Magnus
 * Komponent för att lista varje item i en liggande order.
 */
