import { Link } from 'react-router-dom';
import './navigationMenu.css';
import Cart from '../Cart/Cart';
import useAuthStore from '../../stores/authStore';
const NavigationMenu: React.FC = () => {
    const { setIsShowingForm, customer } = useAuthStore();

    const navigation = [
        { name: 'MENU', route: '/' },
        { name: 'OM OSS', route: '/om-oss' },
        // { name: 'PROFIL', route: '/profil' },
    ];
    return (
        <nav className='navigation-menu'>
            <ul className='navigation-menu__list'>
                {navigation.map((navigationItem) => (
                    <li className='navigation-menu__list-item' key={navigationItem.route}>
                        <Link to={navigationItem.route} className='navigation-menu__link'>
                            {navigationItem.name}
                        </Link>
                    </li>
                ))}
                <li className='navigation-menu__list-item'>
                    <button
                        onClick={() => setIsShowingForm(true)}
                        className='navigation-menu__link navigation-menu__link--profile'>
                        {customer !== null ? 'PROFIL' : 'LOGGA IN'}
                    </button>
                </li>
            </ul>

            <Cart />
        </nav>
    );
};

export default NavigationMenu;

/*
 * Författare: Magnus
 * Komponent som ger oss våra länkar för navigation.
 */
