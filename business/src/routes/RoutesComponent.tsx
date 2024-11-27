import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import ChefPage from '../pages/ChefPage/ChefPage';
import CheckoutPage from '../pages/CheckoutPage/CheckoutPage';
import AdminPage from '../pages/AdminPage/AdminPage';
import EditProductPage from '../pages/EditProductPage/EditProductPage';

const RoutesComponent: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/kock' element={<ChefPage />} />
            <Route path='/kassa' element={<CheckoutPage />} />
            <Route path='/admin' element={<AdminPage />} />
            <Route path='/admin/produkt' element={<EditProductPage />} />
        </Routes>
    );
};
export default RoutesComponent;
