import { Link } from 'react-router-dom';
import './navigationMenu.css';
import Cart from '../Cart/Cart';
import { useEffect, useState } from 'react';
import useAuthStore from '../../stores/authStore';

const NavigationMenu: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { setIsShowingForm } = useAuthStore();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') setIsLoggedIn(true);
        else setIsLoggedIn(false);
    }, []);

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
                <li className='navigation-menu__list-item' key='/profil'>
                    {isLoggedIn ? (
                        <Link to='/profil' className='navigation-menu__link'>
                            PROFIL
                        </Link>
                    ) : (
                        <a
                            onClick={(): void => setIsShowingForm(true)}
                            className='navigation-menu__link navigation-menu__link-to-form'>
                            LOGGA IN
                        </a>
                    )}
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
