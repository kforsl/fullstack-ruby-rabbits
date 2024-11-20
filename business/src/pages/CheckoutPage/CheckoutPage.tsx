import { useState } from 'react';
import './checkoutPage.css';
import CheckoutMenu from '../../components/CheckoutMenu/CheckoutMenu';
import CheckoutOrder from '../../components/CheckoutOrder/CheckoutOrder';

const CheckoutPage: React.FC = () => {
    const [isMenuShowing, setIsMenuShowing] = useState<boolean>(false);

    const changeview = () => {
        setIsMenuShowing(!isMenuShowing);
    };

    return (
        <main>
            <div className='wrapper'>
                {isMenuShowing ? <CheckoutMenu changeview={changeview} /> : <CheckoutOrder changeview={changeview} />}
            </div>
        </main>
    );
};

export default CheckoutPage;
