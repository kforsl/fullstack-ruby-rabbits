import { Link } from 'react-router-dom';
import './navigationMenu.css';
import Cart from '../Cart/Cart';
import useAuthStore from '../../stores/authStore';
import { useEffect, useState } from 'react';
import useSize from '../../utils/useSize';
const NavigationMenu: React.FC = () => {
    const { setIsShowingForm, customer } = useAuthStore();
    const { windowWidth } = useSize();
    const [isBurgerShowing, setIsBurgerShowing] = useState<boolean>(false);

    const navigation = [
        { name: 'MENU', route: '/' },
        { name: 'OM OSS', route: '/om-oss' },
        // { name: 'PROFIL', route: '/profil' },
    ];

    const onProfileButtonClicked = () => {
        if (customer === null) setIsShowingForm(true);
        else window.location.href = '/profil';
    };

    useEffect(() => {
        if (!isBurgerShowing) if (windowWidth < 500) setIsBurgerShowing(true);

        if (isBurgerShowing) if (windowWidth > 500) setIsBurgerShowing(false);
    }, [windowWidth]);
    return (
        <nav className='navigation-menu'>
            {isBurgerShowing ? (
                <ul> My Burger</ul>
            ) : (
                <>
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
                                onClick={onProfileButtonClicked}
                                className='navigation-menu__link navigation-menu__link--profile'>
                                {customer !== null ? 'PROFIL' : 'LOGGA IN'}
                            </button>
                        </li>
                    </ul>
                </>
            )}
            <Cart />
        </nav>
    );
};

export default NavigationMenu;

/*
 * Författare: Magnus
 * Komponent som ger oss våra länkar för navigation.
 */
