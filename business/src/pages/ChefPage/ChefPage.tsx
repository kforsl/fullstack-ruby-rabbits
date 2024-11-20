import OrderCard from '../../components/OrderCard/OrderCard';
import './chefPage.css';
import { OrderType } from '../../interfaces/interfaceOrder';
import { useGetOrders } from '../../services/queries';
const ChefPage: React.FC = () => {
    const { data, isLoading, isError, error } = useGetOrders();

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

    return (
        <main className='chef-page'>
            <section className='order-queue'>
                <h2 className='order-queue__title'>{`Väntande Ordrar (${waiting?.length}st)`}</h2>
                <ul className='order-queue__order-list'>
                    {waiting?.map((waitingItem: OrderType) => (
                        <OrderCard size='medium' order={waitingItem} key={waitingItem._id} />
                    ))}
                </ul>
            </section>
            <section className='active-order'>
                <h2 className='active-order__title'>Tillagas</h2>
                {preparing && <OrderCard size='large' order={preparing} />}
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
 */
