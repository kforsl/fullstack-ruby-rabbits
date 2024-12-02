import { Route, Routes } from 'react-router-dom';
import MenuPage from '../pages/MenuPage/MenuPage';
import AboutUsPage from '../pages/AboutUsPage/AboutUsPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import FinalizeOrder from '../pages/FinalizeOrderPage/FinalizeOrder';
import OrderPage from '../pages/OrderPage/OrderPage';

const RoutesComponent: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<MenuPage />} />
            <Route path='/om-oss' element={<AboutUsPage />} />
            <Route path='/profil' element={<ProfilePage />} />
            <Route path='/orderbekraftelse' element={<FinalizeOrder />} />
            <Route path='/ordrar/:id' element={<OrderPage />} />
        </Routes>
    );
};

export default RoutesComponent;

/*
 * Författare: Magnus
 * Initial setup för våra routes.
 
 * Ändrat: Magnus
 * Lade till ordrar route.
 */
