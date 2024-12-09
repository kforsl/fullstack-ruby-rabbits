import './orderPreview.css';
import { useEffect, useState, useRef } from 'react';
import { useChangeOrderState, useUpdateOrder } from '../../services/mutations';
import { getLastNCharacters } from '../../utils/utilFunctions';
import TextButton from '../TextButton/TextButton';
import { socket } from '../../services/webSocket/ioSocket';
import { useGetOrderById } from '../../services/queries';
import OrderPreviewListItem from '../OrderPreviewListItem/OrderPreviewListItem';
import useOrderStore from '../../stores/ordersStore';

const OrderPreview: React.FC = () => {
    const {
        order: newOrder,
        setOrder: setNewOrder,
        originalOrder,
        setOriginalOrder,
        isOrderPreviewOpen,
        setIsOrderPreviewOpen,
    } = useOrderStore();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const orderNumber = newOrder ? getLastNCharacters(newOrder._id, 4) : '';
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

    useEffect(() => {
        if (dialogRef.current) {
            if (isOrderPreviewOpen) {
                (dialogRef.current as HTMLDialogElement).showModal();
            } else {
                (dialogRef.current as HTMLDialogElement).close();
            }
        }
    }, [isOrderPreviewOpen]);

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
        <dialog className='order-preview' ref={dialogRef}>
            <h2 className={`order-preview__state order-preview__state--${newOrder.state}`}>
                {handleStateInfo(newOrder.state).state}
            </h2>
            <button className='order-preview__back-button' onClick={() => setIsOrderPreviewOpen(false)}>
                X
            </button>
            <h1 className='order-preview__title'>{handleStateInfo(newOrder.state).description}</h1>
            <h2 className='order-preview__subtitle'>{`Ordernummer: ${orderNumber}`}</h2>
            {newOrder.comment && <p className='order-preview__comment'>{newOrder.comment}</p>}
            <div className='order-preview__list-wrapper'>
                <h3 className='order-preview__category-title'>PRODUKT</h3>
                <h3 className='order-preview__category-title'>STORLEK</h3>
                <h3 className='order-preview__category-title'>ANTAL</h3>
                <ul className='order-preview__order-list'>
                    {newOrder?.order.map((orderItem) => (
                        <OrderPreviewListItem
                            orderItem={orderItem}
                            isEditing={isEditing}
                            key={orderItem._id + orderItem.size}
                        />
                    ))}
                </ul>
            </div>
            <h3 className='order-preview__total-price'>{`Totalpris: ${newOrder?.price}kr`}</h3>
            {!isAnnulled && (
                <div className='order-preview__button-wrapper'>
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
                                modifier='end'
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
                                modifier='end'
                                disabled={isChangingEditState || isFetching}>
                                {isChangingEditState || isFetching ? 'Loading...' : 'SPARA ÄNDRING'}
                            </TextButton>
                        </>
                    )}
                    {newOrder?.state === 'ready' && (
                        <>
                            <TextButton
                                onClick={() => {
                                    editOrderState(
                                        { id: newOrder._id, state: 'history' },
                                        {
                                            onSuccess: () => {
                                                setIsEditing(false);
                                            },
                                        }
                                    );
                                }}
                                modifier='end'
                                disabled={isChangingEditState || isFetching}>
                                {isChangingEditState || isFetching ? 'Loading...' : 'GE TILL KUND'}
                            </TextButton>
                        </>
                    )}
                </div>
            )}
        </dialog>
    );
};

export default OrderPreview;

/*
 * Författare: Magnus
 * Skapat komponent som renderar ut information om lagd order.
 *
 * Ändrat: Magnus
 * Lagt till möjlighet att ändra order. Lagt till 2 useEffects. 1 för att få ett grundvärde på orderstore (useMemo för att objekt triggar false då de jämförs med referens inte innehåll... Något sådant..). 1 för att inte kalla på socket 100ggr per anrop.
 * Behöver refaktoreras! Knapparna kanske ska ha en egen komponent...
 *
 * Ändrat: Magnus
 * Tagit bort memoize, tagit bort behovet av props, genererar text beroende av state av order via en switch. Lagt till klasser i css för olika states. socket har nu en if-sats och clean up
 *
 * Ändrat: Magnus
 * Gjort om till en dialog och använder useRef för att visa eller dölja modal. Ändrat useEffect för socket att alltid lägga på en listener. Lagt till knappar.
 */
