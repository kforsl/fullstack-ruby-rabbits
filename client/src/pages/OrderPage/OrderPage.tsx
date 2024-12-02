import OrderConfirmation from '../../components/OrderConfirmation/OrderConfirmation';
import useOrderStore from '../../stores/orderStore';
import './orderPage.css';
const OrderPage: React.FC = () => {
    const { order } = useOrderStore();
    return <OrderConfirmation order={order} />;
};

export default OrderPage;
