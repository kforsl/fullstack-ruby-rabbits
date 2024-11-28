import { OrderType } from '../../interfaces/interfaceOrder';
import { useChangeOrderState } from '../../services/mutations';
import useAuthStore from '../../stores/authStore';
import { getLastNCharacters } from '../../utils/utilFunctions';
import TextButton from '../TextButton/TextButton';
import './orderConfirmation.css';

interface Props {
    order: OrderType;
}

const OrderConfirmation: React.FC<Props> = ({ order }) => {
    const orderNumber = order ? getLastNCharacters(order._id, 4) : '';
    const { customer } = useAuthStore();
    const { mutate: anullOrder, isPending: isAnulling, isSuccess: isAnulled } = useChangeOrderState();
    const { mutate: editOrder, isPending: isChangingToEditState, isSuccess: isInEditState } = useChangeOrderState();
    // const { mutate: backToWaiting, isPending: isChangingToWaitingState, isSuccess: isWaiting } = useChangeOrderState();

    return (
        <article className='order-confirmation'>
            {isAnulled && <h2 className='order-confirmation__deleted'>ANNULERAD!</h2>}
            <h1 className='order-confirmation__title'>
                {isAnulled ? 'Din order har tagits bort.' : 'Succé! Du har lagt en beställning!'}
            </h1>
            <h2 className='order-confirmation__subtitle'>{`Ordernummer: ${orderNumber}`}</h2>
            {customer ? (
                <p className='order-confirmation__info'>Din beställning har sparats i din profil!</p>
            ) : (
                <p className='order-confirmation__info'>Skriv upp ditt ordernr så du inte glömmer!</p>
            )}

            <ul className='order-confirmation__order-list'>
                <h3 className='order-confirmation__category-title'>PRODUKT</h3>
                <h3 className='order-confirmation__category-title'>STORLEK</h3>
                <h3 className='order-confirmation__category-title'>ANTAL</h3>
                {order.order.map((orderItem) => (
                    <li className='order-confirmation__order-list-item' key={orderItem._id}>
                        <h4 className='order-confirmation__list-info'>
                            orderItem. product. name :({/* Behöver fixa så namnet är tillgängligt i objektet */}
                        </h4>
                        <h4 className='order-confirmation__list-info'>{orderItem.size}</h4>
                        <h4 className='order-confirmation__list-info'>{orderItem.quantity}</h4>
                    </li>
                ))}
                <h3 className='order-confirmation__category-title'>{`Totalpris: ${order.price}kr`}</h3>
            </ul>
            {!isAnulled && (
                <div className='order-confirmation__button-wrapper'>
                    <TextButton onClick={() => anullOrder({ id: order._id, state: 'anulled' })} disabled={isAnulling}>
                        {isAnulling ? 'Loading...' : 'AVBRYT ORDER'}
                    </TextButton>
                    <TextButton
                        onClick={() => editOrder({ id: order._id, state: 'editing' })}
                        disabled={isChangingToEditState}>
                        {isChangingToEditState ? 'Loading...' : 'ÄNDRA ORDER'}
                    </TextButton>
                </div>
            )}
        </article>
    );
};

export default OrderConfirmation;

/*
 * Författare: Magnus
 * Skapat komponent som renderar ut information om lagd order. Funktionalitet för inloggad användare och gäst kanske bör utökas.
 */
