import OrderCard from '../../components/OrderCard/OrderCard';
import './chefPage.css';
import { OrderType } from '../../interfaces/interfaceOrder';
import { useGetOrders } from '../../services/queries';
import { useOrderState } from '../../services/mutations';
import { socket } from '../../services/webSocket/ioSocket';
const ChefPage: React.FC = () => {
    const { data, isLoading, isError, error, refetch } = useGetOrders();
    const { mutate } = useOrderState();

    socket.on('newOrder', () => {
        refetch();
    });
    socket.on('newOrderStatus', () => {
        refetch();
    });

    if (isLoading) {
        return (
            <main className='chef-page'>
                <p>Loading...</p>
            </main>
        );
    }

    if (isError) {
        return (
            <main className='chef-page'>
                <p>{`${error}`}</p>
            </main>
        );
    }

    const waiting = data?.filter((dataItem: OrderType) => dataItem.state === 'waiting');

    const preparing = data?.find((dataItem: OrderType) => dataItem.state === 'preparing');

    const handleUpdateState = (id: string, state: 'waiting' | 'preparing' | 'ready' | 'history') => {
        mutate({ id, state });
    };

    return (
        <main className='chef-page'>
            <section className='order-queue'>
                <h2 className='order-queue__title'>{`Väntande Ordrar (${waiting?.length}st)`}</h2>
                <ul className='order-queue__order-list'>
                    {waiting?.map((waitingItem: OrderType) => (
                        <OrderCard
                            size='medium'
                            order={waitingItem}
                            key={waitingItem._id}
                            onClick={() => handleUpdateState(waitingItem._id, 'preparing')}
                        />
                    ))}
                </ul>
            </section>
            <section className='active-order'>
                <h2 className='active-order__title'>Tillagas</h2>
                {preparing && (
                    <OrderCard
                        size='large'
                        order={preparing}
                        onClick={() => handleUpdateState(preparing._id, 'ready')}
                    />
                )}
            </section>
        </main>
    );
};

export default ChefPage;

/*
 *Författare: Magnus
 *Skapat page som renderar ut och sorterar beställningar åt kocken.
 *
 * Ändrat: Magnus
 * Tagit bort axios anropet och placerat det i agent.
 *
 * Ändrat: Magnus
 * Implementerat useMutate så vi kan uppdatera orderstatus.
 *
 *  * Ändrat: Kim
 * Laggt till socket.on för att refetch useQuery
 */
