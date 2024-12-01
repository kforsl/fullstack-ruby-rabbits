import { useState } from 'react';
import { OrderType } from '../../interfaces/interfaceOrder';
import { useChangeOrderState } from '../../services/mutations';
import useAuthStore from '../../stores/authStore';
import { getLastNCharacters } from '../../utils/utilFunctions';
import TextButton from '../TextButton/TextButton';
import './orderConfirmation.css';
import { socket } from '../../services/webSocket/ioSocket';
import { useGetOrderById } from '../../services/queries';

interface Props {
    order: OrderType;
}

const OrderConfirmation: React.FC<Props> = ({ order }) => {
    const [newOrder, setNewOrder] = useState<OrderType>(order);
    const orderNumber = newOrder ? getLastNCharacters(newOrder._id, 4) : '';
    const { customer } = useAuthStore();
    const { refetch, isFetching } = useGetOrderById(newOrder?._id);
    const { mutate: anullOrder, isPending: isAnulling, isSuccess: isAnulled } = useChangeOrderState();
    const { mutate: editOrderState, isPending: isChangingEditState } = useChangeOrderState();

    socket.on('newOrderStatus', async () => {
        const { data, isError } = await refetch();
        if (data && !isError) {
            setNewOrder(data[0]);
        }
    });

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
                {newOrder?.order.map((orderItem) => (
                    <li className='order-confirmation__order-list-item' key={orderItem._id}>
                        <h4 className='order-confirmation__list-info'>{orderItem.product.name}</h4>
                        <h4 className='order-confirmation__list-info'>{orderItem.size}</h4>
                        <h4 className='order-confirmation__list-info'>{orderItem.quantity}</h4>
                    </li>
                ))}
                <h3 className='order-confirmation__category-title'>{`Totalpris: ${newOrder?.price}kr`}</h3>
            </ul>
            {!isAnulled && (
                <div className='order-confirmation__button-wrapper'>
                    {newOrder.state === 'waiting' && (
                        <>
                            <TextButton
                                onClick={() => anullOrder({ id: newOrder._id, state: 'anulled' })}
                                disabled={isAnulling || isFetching}>
                                {isAnulling || isFetching ? 'Loading...' : 'AVBRYT ORDER'}
                            </TextButton>
                            <TextButton
                                onClick={() => editOrderState({ id: newOrder._id, state: 'editing' })}
                                disabled={isChangingEditState || isFetching}>
                                {isChangingEditState || isFetching ? 'Loading...' : 'ÄNDRA ORDER'}
                            </TextButton>
                        </>
                    )}
                    {newOrder.state === 'editing' && (
                        <>
                            <TextButton
                                onClick={() => editOrderState({ id: newOrder._id, state: 'waiting' })}
                                disabled={isChangingEditState || isFetching}>
                                {isChangingEditState || isFetching ? 'Loading...' : 'AVBRYT ÄNDRING'}
                            </TextButton>
                            <TextButton
                                onClick={() => {
                                    editOrderState({ id: newOrder._id, state: 'waiting' });
                                    console.log('Här sparas ny order');
                                }}
                                disabled={isChangingEditState || isFetching}>
                                {isChangingEditState || isFetching ? 'Loading...' : 'SPARA ÄNDRING'}
                            </TextButton>
                        </>
                    )}
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
