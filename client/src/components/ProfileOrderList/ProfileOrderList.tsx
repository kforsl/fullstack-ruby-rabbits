import OrderListItem from '../OrderListItem/OrderListItem';
import './profileOrderList.css';
import { useGetOrders } from '../../services/queries/useGetOrders';
import { OrderType } from '../../interfaces/interfaceOrder';

interface Props {
    id: string;
}

const ProfileOrderList = ({ id }: Props) => {
    const { data, isLoading, isError, error } = useGetOrders(id);
    if (isLoading) return <ul>Laddar...</ul>;
    if (isError)
        return (
            <section className='profile-order-list'>
                <ul>
                    <h3 className='profile-order-list__title'> Det blev ett problem på vägern! </h3>
                    <li className='profile-order-list__empty'>{error.message}</li>
                </ul>
            </section>
        );

    return (
        <section className='profile-order-list'>
            {data !== null ? (
                <>
                    <ul>
                        <h3 className='profile-order-list__title'> Aktiva Ordrar </h3>
                        {data.filter((order: OrderType) => order.state !== 'history').length < 1 ? (
                            <li key='01' className='profile-order-list__empty'>
                                Du har inga tidigare ordrar.
                            </li>
                        ) : (
                            (data.filter((order: OrderType) => order.state !== 'history') as OrderType[]).map(
                                (order: OrderType) => <OrderListItem order={order} key={order._id} />
                            )
                        )}
                    </ul>
                    <ul>
                        <h3 className='profile-order-list__title'> Tidigare Ordrar </h3>
                        {data.filter((order: OrderType) => order.state === 'history').length != 0 ? (
                            <li key='01' className='profile-order-list__empty'>
                                Du har inga tidigare ordrar.
                            </li>
                        ) : (
                            (data.filter((order: OrderType) => order.state === 'history') as OrderType[]).map(
                                (order: OrderType) => <OrderListItem order={order} key={order._id} />
                            )
                        )}
                    </ul>
                </>
            ) : (
                <ul>
                    <h3 className='profile-order-list__title'> Ni har inte lagt någon order än! </h3>
                    <li className='profile-order-list__empty'></li>
                </ul>
            )}
        </section>
    );
};

export default ProfileOrderList;
