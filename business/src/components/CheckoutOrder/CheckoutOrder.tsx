import { OrderType } from '../../interfaces/interfaceOrder';
import OrderCard from '../OrderCard/OrderCard';
import './checkoutOrder.css';

interface Props {
    changeview: () => void;
}

const CheckoutOrder = ({ changeview }: Props) => {
    const orders: OrderType[] = [
        {
            _id: '0001',
            price: 23,
            createdAt: new Date(),
            updatedAt: new Date(),
            state: 'waiting',
            order: [],
        },
        {
            _id: '0002',
            price: 23,
            createdAt: new Date(),
            updatedAt: new Date(),
            state: 'waiting',
            order: [],
        },
        {
            _id: '0003',
            price: 23,
            createdAt: new Date(),
            updatedAt: new Date(),
            state: 'waiting',
            order: [],
        },
        {
            _id: '0004',
            price: 23,
            createdAt: new Date(),
            updatedAt: new Date(),
            state: 'waiting',
            order: [],
        },
        {
            _id: '0005',
            price: 23,
            createdAt: new Date(),
            updatedAt: new Date(),
            state: 'waiting',
            order: [],
        },
        {
            _id: '0006',
            price: 23,
            createdAt: new Date(),
            updatedAt: new Date(),
            state: 'waiting',
            order: [],
        },
        {
            _id: '0007',
            price: 23,
            createdAt: new Date(),
            updatedAt: new Date(),
            state: 'preparing',
            order: [],
        },
        {
            _id: '0008',
            price: 23,
            createdAt: new Date(),
            updatedAt: new Date(),
            state: 'preparing',
            order: [],
        },
        {
            _id: '0009',
            price: 23,
            createdAt: new Date(),
            updatedAt: new Date(),
            state: 'preparing',
            order: [],
        },
        {
            _id: '0010',
            price: 23,
            createdAt: new Date(),
            updatedAt: new Date(),
            state: 'preparing',
            order: [],
        },
        {
            _id: '0011',
            price: 23,
            createdAt: new Date(),
            updatedAt: new Date(),
            state: 'preparing',
            order: [],
        },
        {
            _id: '0012',
            price: 23,
            createdAt: new Date(),
            updatedAt: new Date(),
            state: 'preparing',
            order: [],
        },
        {
            _id: '0013',
            price: 23,
            createdAt: new Date(),
            updatedAt: new Date(),
            state: 'ready',
            order: [],
        },
        {
            _id: '0014',
            price: 23,
            createdAt: new Date(),
            updatedAt: new Date(),
            state: 'ready',
            order: [],
        },
        {
            _id: '0015',
            price: 23,
            createdAt: new Date(),
            updatedAt: new Date(),
            state: 'ready',
            order: [],
        },
        {
            _id: '0016',
            price: 23,
            createdAt: new Date(),
            updatedAt: new Date(),
            state: 'ready',
            order: [],
        },
        {
            _id: '0017',
            price: 23,
            createdAt: new Date(),
            updatedAt: new Date(),
            state: 'ready',
            order: [],
        },
        {
            _id: '0018',
            price: 23,
            createdAt: new Date(),
            updatedAt: new Date(),
            state: 'ready',
            order: [],
        },
    ];
    return (
        <section className='checkoutOrder'>
            <article className='checkoutOrder__section'>
                <h2 className='checkoutOrder__section-title'> Väntande Ordrar (11) </h2>
                <ul className='checkoutOrder__order-list'>
                    {orders.map(
                        (order) =>
                            order.state === 'waiting' && <OrderCard size={'small'} order={order} key={order._id} />
                    )}
                </ul>
            </article>
            <article className='checkoutOrder__section'>
                <h2 className='checkoutOrder__section-title'> Tillagas </h2>
                <ul className='checkoutOrder__order-list'>
                    {orders.map(
                        (order) =>
                            order.state === 'preparing' && <OrderCard size={'small'} order={order} key={order._id} />
                    )}
                </ul>
            </article>
            <article className='checkoutOrder__section'>
                <h2 className='checkoutOrder__section-title'> Redo att hämtas </h2>
                <ul className='checkoutOrder__order-list'>
                    {orders.map(
                        (order) => order.state === 'ready' && <OrderCard size={'small'} order={order} key={order._id} />
                    )}
                </ul>
            </article>
            <button className='checkoutOrder__btn' onClick={changeview}>
                SKAPA NY ORDER
            </button>
        </section>
    );
};

export default CheckoutOrder;
