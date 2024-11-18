import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import ChefPage from '../pages/ChefPage/ChefPage';
import CheckoutPage from '../pages/CheckoutPage/CheckoutPage';
import AdminPage from '../pages/AdminPage/AdminPage';

const RoutesComponent: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/kock' element={<ChefPage />} />
            <Route path='/kassa' element={<CheckoutPage />} />
            <Route path='/admin' element={<AdminPage />} />
        </Routes>
    );
};
export default RoutesComponent;
