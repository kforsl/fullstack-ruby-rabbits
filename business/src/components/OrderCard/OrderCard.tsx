import { OrderType, OrderItemType } from '../../interfaces/interfaceOrder';
import { useGetOrderById } from '../../services/queries';
import useOrderStore from '../../stores/ordersStore';
import { formatDate, getLastNCharacters } from '../../utils/utilFunctions';
import TextButton from '../TextButton/TextButton';
import './orderCard.css';
interface Props {
    size: 'small' | 'medium' | 'large';
    order: OrderType;
    onClick?: () => void;
}

const OrderCard: React.FC<Props> = ({ size, order, onClick }) => {
    const { setIsOrderPreviewOpen, setOrder } = useOrderStore();
    const { data, isSuccess } = useGetOrderById(order._id || '');
    const calculateAmountInOrder = (): number =>
        order.order.reduce((totalAmount: number, orderItem: OrderItemType) => totalAmount + orderItem.quantity, 0);

    const handleOrderPreview = () => {
        if (data && isSuccess) {
            setOrder(data[0]);
            setIsOrderPreviewOpen(true);
        }
    };

    if (size === 'small')
        return (
            <li className={`order-card order-card--small`} onClick={handleOrderPreview}>
                <h2 className='order-card__order-id'>{getLastNCharacters(order._id, 4)}</h2>
                <h3 className='order-card__time'>{formatDate(order.createdAt)}</h3>
            </li>
        );
    if (size === 'medium')
        return (
            <li
                className={`order-card order-card--medium ${order.comment ? 'order-card--comment' : ''}`}
                onClick={handleOrderPreview}>
                <h2 className='order-card__order-id'>{getLastNCharacters(order._id, 4)}</h2>
                {order.comment && (
                    <img
                        src='/assets/fluent_notepad-edit-16-filled.svg'
                        alt='ett anteckningsblock som indikerar att kommentar finns.'
                        className='order-card__comment-icon'
                    />
                )}
                <h3 className='order-card__date'>{formatDate(order.createdAt)}</h3>
                <h3 className='order-card__amount'>
                    <span>Antal:</span>
                    <span>{calculateAmountInOrder()}</span>
                </h3>
                <TextButton
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        onClick && onClick();
                    }}>
                    TILLAGA
                </TextButton>
            </li>
        );

    if (size === 'large')
        return (
            <article
                className={`order-card order-card--large ${order.comment ? 'order-card--comment' : ''}`}
                onClick={handleOrderPreview}>
                <section className='order-card__info-section'>
                    <h2 className='order-card__order-id'>{getLastNCharacters(order._id, 4)}</h2>
                    {order.comment && (
                        <img
                            src='/assets/fluent_notepad-edit-16-filled.svg'
                            alt='ett anteckningsblock som indikerar att kommentar finns.'
                            className='order-card__comment-icon'
                        />
                    )}
                    <h3 className='order-card__date'>{formatDate(order.createdAt)}</h3>
                </section>
                <ul className='order-card__list'>
                    {order.order.map((orderItem, i) => (
                        <li className='order-card__order-item' key={orderItem.size + i}>
                            <h4 className='order-card__product-name'>{orderItem.product.name}</h4>
                            <h4 className='order-card__product-size'>{orderItem.size}</h4>
                            <h4 className='order-card__product-quantity'>{orderItem.quantity} st</h4>
                        </li>
                    ))}
                </ul>
                <TextButton
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        onClick && onClick();
                    }}>
                    KLAR FÖR SERVERING
                </TextButton>
            </article>
        );
};

export default OrderCard;

/*
 * Författare: Magnus
 * Skapat komponent som tar 2 props och renderar ut kort för beställningar.
 *
 * Ändrat: Magnus
 * Tar nu emot en onClick och skickar ned den till TextButton.
 * Ändrat: Kim
 * Ändrat styling för order-cart--large
 *
 * Ändrat: Magnus
 * Smallcard tar nu emot onclick, används för att toggla små kort som är 'ready' till 'history'.
 
 * Ändrat: Magnus
 * Klickar du korten så öppnas nu en orderpreview där du kan se vad som beställts och läsa kommentar samt editera/annulera.
 */
