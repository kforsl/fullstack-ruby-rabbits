import { Link, useNavigate } from 'react-router-dom';
import './navigationMenu.css';
import Cart from '../Cart/Cart';
import useAuthStore from '../../stores/authStore';
import { useEffect, useState } from 'react';
import useSize from '../../utils/useSize';
const NavigationMenu: React.FC = () => {
    const { setIsShowingForm, customer } = useAuthStore();
    const { windowWidth } = useSize();
    const [isBurgerShowing, setIsBurgerShowing] = useState<boolean>(false);
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

    const navigate = useNavigate();
    const navigation = [
        { name: 'MENU', route: '/' },
        { name: 'OM OSS', route: '/om-oss' },
        // { name: 'PROFIL', route: '/profil' },
    ];

    const onProfileButtonClicked = () => {
        if (isNavOpen) setIsNavOpen(false);
        if (customer === null) setIsShowingForm(true);
        else navigate('/profil');
    };

    useEffect(() => {
        const breakpoint: number = 550;
        if (!isBurgerShowing) if (windowWidth < breakpoint) setIsBurgerShowing(true);

        if (isBurgerShowing) if (windowWidth > breakpoint) setIsBurgerShowing(false);
    }, [windowWidth]);
    return (
        <nav className={isBurgerShowing ? 'navigation-burger' : 'navigation-menu'}>
            {isBurgerShowing ? (
                <>
                    <ul className={`navigation-burger__list ${isNavOpen ? 'navigation-burger__list--open' : ''}`}>
                        {navigation.map((navigationItem) => (
                            <li className='navigation-menu__list-item' key={navigationItem.route}>
                                <Link
                                    to={navigationItem.route}
                                    className='navigation-menu__link'
                                    onClick={() => setIsNavOpen(false)}>
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
                    <section className='hamburger-wrapper'>
                        <button
                            className={`hamburger-button hamburger-button--${isNavOpen ? 'active' : 'inactive'}`}
                            onClick={() => {
                                setIsNavOpen(!isNavOpen);
                            }}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </section>
                    <img
                        src='/images/logotype.png'
                        alt='Leende blå person med h och m som ögon'
                        className='navigation-menu__logotype'
                        onClick={() => window.scrollTo(0, 0)}
                    />
                </>
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
 *
 * Ändrat: Kim
 * Lagt till så meny ändras till en mobil navigationsmeny
 *
 * Ändrat: Magnus
 * Skapat logotyp för att visa i mobilt-läge. Om man klickar scrollar den upp dig. Ändrat storlek på navigation i burgare, kanske för stort. Padding ligger nu på knappar istället för wrapper.
 */
