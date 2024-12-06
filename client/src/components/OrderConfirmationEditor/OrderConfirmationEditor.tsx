import { OrderItemType } from '../../interfaces/interfaceOrder';
import useOrderStore from '../../stores/orderStore';
import './orderConfirmationEditor.css';
interface Props {
    orderItem: OrderItemType;
}
const OrderConfirmationEditor: React.FC<Props> = ({ orderItem }) => {
    const { incrementItem, decrementItem, order } = useOrderStore();

    const lastItem = order.order.length === 1 && order.order[0].quantity === 1;
    return (
        <div className='order-confirmation-editor'>
            <button
                aria-label='Ta bort 1'
                className={`order-confirmation-editor__button order-confirmation-editor__button--remove ${
                    lastItem ? 'order-confirmation-editor__button--disabled' : ''
                }`}
                onClick={() => {
                    if (lastItem) {
                        return console.error('Annulera ordern istället.');
                    }
                    decrementItem(orderItem.product._id, orderItem.size);
                }}>
                <span className='order-confirmation-editor__button-text'>&#10094;</span>
            </button>
            <h3 className='order-confirmation-editor__amount'>{orderItem.quantity}</h3>
            <button
                aria-label='Lägg till 1'
                className='order-confirmation-editor__button order-confirmation-editor__button--add'
                onClick={() => incrementItem(orderItem.product._id, orderItem.size)}>
                <span className='order-confirmation-editor__button-text'>&#10095;</span>
            </button>
        </div>
    );
};

export default OrderConfirmationEditor;

/*
 * Författare: Magnus
 * Tog loss logik för orderconfirmation komponent för att lägga till/ta bort från existerande order.
 * Borde gå att återanvända MenuToCartIncrementer den dagen vi refaktorerar kod... lol
 */
