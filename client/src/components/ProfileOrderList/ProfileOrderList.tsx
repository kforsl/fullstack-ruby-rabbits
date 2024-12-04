import OrderListItem from '../OrderListItem/OrderListItem';
import './profileOrderList.css';
import { useGetOrders } from '../../services/queries/useGetOrders';
import { OrderType } from '../../interfaces/interfaceOrder';
import { socket } from '../../services/webSocket/ioSocket';
import { useEffect, useState } from 'react';

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
                    <h3 className='profile-order-list__title'> Det blev ett problem på vägen! </h3>
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
                        {data.filter((order: OrderType) => order.state !== 'history' && order.state !== 'annulled')
                            .length < 1 ? (
                            <li key='01' className='profile-order-list__empty'>
                                Du har inga aktiva ordrar.
                            </li>
                        ) : (
                            (
                                data.filter(
                                    (order: OrderType) => order.state !== 'history' && order.state !== 'annulled'
                                ) as OrderType[]
                            )
                                .reverse()
                                .map((order: OrderType, index) => {
                                    if (index < 2) {
                                        socket.emit('joinOrderRoom', order._id);
                                        return <OrderListItem order={order} key={order._id} />;
                                    }
                                })
                        )}
                    </ul>
                    <ul>
                        <h3 className='profile-order-list__title'> Tidigare Ordrar </h3>
                        {data.filter((order: OrderType) => order.state === 'history' || order.state === 'annulled')
                            .length < 1 ? (
                            <li key='01' className='profile-order-list__empty'>
                                Du har inga tidigare ordrar.
                            </li>
                        ) : (
                            (
                                data.filter(
                                    (order: OrderType) => order.state === 'history' || order.state === 'annulled'
                                ) as OrderType[]
                            )
                                .reverse()
                                .map((order: OrderType, index) => {
                                    if (index < 5) {
                                        return <OrderListItem order={order} key={order._id} />;
                                    }
                                })
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
