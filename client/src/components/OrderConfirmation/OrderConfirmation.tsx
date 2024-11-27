import { OrderType } from '../../interfaces/interfaceOrder';
import useAuthStore from '../../stores/authStore';
import { getLastNCharacters } from '../../utils/utilFunctions';
import './orderConfirmation.css';

interface Props {
    order: OrderType;
}

const OrderConfirmation: React.FC<Props> = ({ order }) => {
    const orderNumber = order ? getLastNCharacters(order._id, 4) : '';
    const { customer } = useAuthStore();
    return (
        <article className='order-confirmation'>
            <h1 className='order-confirmation__title'>Succé! Du har lagt en beställning!</h1>
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
                            orderItem.product.name :({/* Behöver fixa så namnet är tillgängligt i objektet */}
                        </h4>
                        <h4 className='order-confirmation__list-info'>{orderItem.size}</h4>
                        <h4 className='order-confirmation__list-info'>{orderItem.quantity}</h4>
                    </li>
                ))}
            </ul>
        </article>
    );
};

export default OrderConfirmation;

/*
 * Författare: Magnus
 * Skapat komponent som renderar ut information om lagd order. Funktionalitet för inloggad användare och gäst kanske bör utökas.
 */
