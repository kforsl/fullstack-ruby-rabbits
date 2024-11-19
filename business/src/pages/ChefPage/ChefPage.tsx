import OrderCard from '../../components/OrderCard/OrderCard';
import './chefPage.css';
const ChefPage: React.FC = () => {
    return (
        <main className='chef-page'>
            <section className='order-queue'>
                <h2 className='order-queue__title'>Väntande Ordrar (8st)</h2>
                <ul className='order-queue__order-list'>
                    <OrderCard size='medium' />
                    <OrderCard size='medium' />
                    <OrderCard size='medium' />
                    <OrderCard size='medium' />
                    <OrderCard size='medium' />
                    <OrderCard size='medium' />
                    <OrderCard size='medium' />
                    <OrderCard size='medium' />
                    <OrderCard size='medium' />
                    <OrderCard size='medium' />
                    <OrderCard size='medium' />
                    <OrderCard size='medium' />
                </ul>
            </section>
            <section className='active-order'>
                <h2 className='active-order__title'>Tillagas</h2>
                <OrderCard size='large' />
            </section>
        </main>
    );
};

export default ChefPage;
