import { useEffect, useState } from 'react';
import { useChangeOrderState } from '../../services/mutations';
import useAuthStore from '../../stores/authStore';
import { getLastNCharacters } from '../../utils/utilFunctions';
import TextButton from '../TextButton/TextButton';
import './orderConfirmation.css';
import { socket } from '../../services/webSocket/ioSocket';
import { useGetOrderById } from '../../services/queries';
import OrderConfirmationListItem from '../OrderConfirmationListItem/OrderConfirmationListItem';
import useOrderStore from '../../stores/orderStore';
import { useUpdateOrder } from '../../services/mutations/useUpdateOrder';

const OrderConfirmation: React.FC = () => {
    const { order: newOrder, setOrder: setNewOrder, originalOrder, setOriginalOrder } = useOrderStore();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const orderNumber = newOrder ? getLastNCharacters(newOrder._id, 4) : '';
    const { customer } = useAuthStore();
    const { mutate: annullOrder, isPending: isAnnulling, isSuccess: isAnnulled } = useChangeOrderState();
    const { mutate: editOrderState, isPending: isChangingEditState } = useChangeOrderState();
    const { mutate: updateOrder } = useUpdateOrder();
    const { refetch, isFetching } = useGetOrderById(newOrder?._id);

    useEffect(() => {
        const handleNewOrderStatus = async () => {
            const { data, isError } = await refetch();

            if (data && !isError) {
                setOriginalOrder(data[0]);
                setNewOrder(data[0]);
            }
        };

        socket.on('newOrderStatus', handleNewOrderStatus);

        return () => {
            socket.off('newOrderStatus', handleNewOrderStatus);
        };
    }, [refetch]);

    const handleStateInfo = (state: 'annulled' | 'editing' | 'preparing' | 'ready' | 'history' | 'waiting') => {
        switch (state) {
            case 'waiting':
                return { state: 'PLACERAD I KÖ', description: 'Ordern har placerats i kön.' };
            case 'annulled':
                return { state: 'ANNULERAD', description: 'Ordern har blivit annullerad.' };
            case 'editing':
                return { state: 'EDITERAS', description: 'Ordern är under redigering.' };
            case 'preparing':
                return { state: 'TILLAGAS', description: 'Ordern håller på att tillagas.' };
            case 'ready':
                return { state: 'REDO ATT HÄMTAS!', description: 'Ordern är redo att hämtas.' };
            case 'history':
                return { state: 'HÄMTAD', description: 'Ordern har hämtats och avslutats.' };
            default:
                return { state: 'PLACERAD I KÖ', description: 'Ordern har placerats i kön.' };
        }
    };

    return (
        <article className='order-confirmation'>
            <h2 className={`order-confirmation__state order-confirmation__state--${newOrder.state}`}>
                {handleStateInfo(newOrder.state).state}
            </h2>
            <h1 className='order-confirmation__title'>{handleStateInfo(newOrder.state).description}</h1>
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
                    <OrderConfirmationListItem
                        orderItem={orderItem}
                        isEditing={isEditing}
                        key={orderItem._id + orderItem.size}
                    />
                ))}
                <h3 className='order-confirmation__category-title'>{`Totalpris: ${newOrder?.price}kr`}</h3>
            </ul>
            {!isAnnulled && (
                <div className='order-confirmation__button-wrapper'>
                    {newOrder?.state === 'waiting' && (
                        <>
                            <TextButton
                                onClick={() => annullOrder({ id: newOrder._id, state: 'annulled' })}
                                disabled={isAnnulling || isFetching}>
                                {isAnnulling || isFetching ? 'Loading...' : 'AVBRYT ORDER'}
                            </TextButton>
                            <TextButton
                                onClick={() =>
                                    editOrderState(
                                        { id: newOrder._id, state: 'editing' },
                                        {
                                            onSuccess: () => {
                                                setIsEditing(true);
                                            },
                                        }
                                    )
                                }
                                disabled={isChangingEditState || isFetching}>
                                {isChangingEditState || isFetching ? 'Loading...' : 'ÄNDRA ORDER'}
                            </TextButton>
                        </>
                    )}
                    {newOrder?.state === 'editing' && (
                        <>
                            <TextButton
                                onClick={() => {
                                    editOrderState(
                                        { id: newOrder._id, state: 'waiting' },
                                        {
                                            onSuccess: () => {
                                                setIsEditing(false);
                                                setNewOrder(originalOrder);
                                            },
                                        }
                                    );
                                }}
                                disabled={isChangingEditState || isFetching}>
                                {isChangingEditState || isFetching ? 'Loading...' : 'AVBRYT ÄNDRING'}
                            </TextButton>
                            <TextButton
                                onClick={() => {
                                    updateOrder(
                                        { id: newOrder._id, order: newOrder },
                                        {
                                            onSuccess: () => {
                                                setIsEditing(false);
                                            },
                                        }
                                    );
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
 *
 * Ändrat: Magnus
 * Lagt till möjlighet att ändra order. Lagt till 2 useEffects. 1 för att få ett grundvärde på orderstore (useMemo för att objekt triggar false då de jämförs med referens inte innehåll... Något sådant..). 1 för att inte kalla på socket 100ggr per anrop.
 * Behöver refaktoreras! Knapparna kanske ska ha en egen komponent...
 *
 * Ändrat: Magnus
 * Tagit bort memoize, tagit bort behover av props, genererar text beroende av state av order via en switch. Lagt till klasser i css för olika states.
 */
