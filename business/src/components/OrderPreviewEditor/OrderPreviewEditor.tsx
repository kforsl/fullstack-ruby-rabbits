import { OrderItemType } from '../../interfaces/interfaceOrder';
import useOrdersStore from '../../stores/ordersStore';
import './orderPreviewEditor.css';
interface Props {
    orderItem: OrderItemType;
}
const OrderPreviewEditor: React.FC<Props> = ({ orderItem }) => {
    const { incrementItem, decrementItem, order } = useOrdersStore();

    const lastItem = order.order.length === 1 && order.order[0].quantity === 1;
    return (
        <div className='order-preview-editor'>
            <button
                aria-label='Ta bort 1'
                className={`order-preview-editor__button ${lastItem ? 'order-preview-editor__button--disabled' : ''}`}
                onClick={() => {
                    if (lastItem) {
                        return console.error('Annulera ordern istället.');
                    }
                    decrementItem(orderItem.product._id, orderItem.size);
                }}>
                <figure className='order-preview-editor__button-text'>&#10094;</figure>
            </button>
            <h3 className='order-preview-editor__amount'>{orderItem.quantity}</h3>
            <button
                aria-label='Lägg till 1'
                className='order-preview-editor__button order-preview-editor__button--add'
                onClick={() => incrementItem(orderItem.product._id, orderItem.size)}>
                <figure className='order-preview-editor__button-text'>&#10095;</figure>
            </button>
        </div>
    );
};

export default OrderPreviewEditor;

/*
 * Författare: Magnus
 * Tog loss logik för orderconfirmation komponent för att lägga till/ta bort från existerande order.
 * Borde gå att återanvända MenuToCartIncrementer den dagen vi refaktorerar kod... lol
 
* Ändrat: Magnus
 * Knappens chevron är nu en figure då span av någon anledning gjorde en ruta. Funkar dock i client...
 */
