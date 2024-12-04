import { useEffect, useState } from 'react';
import useSize from '../../utils/useSize';
import './profileNav.css';

interface Props {
    onClick: (navOption: 'personal' | 'payment' | 'password' | 'allergies') => void;
    active: 'personal' | 'payment' | 'password' | 'allergies';
}

interface navigationItem {
    text: string;
    navOption: 'personal' | 'payment' | 'password' | 'allergies';
}

const ProfileNav = ({ onClick, active }: Props) => {
    const { windowWidth } = useSize();
    const [isDropDownMenu, setIsDropDownMenu] = useState<boolean>(false);

    useEffect(() => {
        const breakpoint: number = 850;
        if (!isDropDownMenu) if (windowWidth < breakpoint) setIsDropDownMenu(true);

        if (isDropDownMenu) if (windowWidth > breakpoint) setIsDropDownMenu(false);
    }, [windowWidth]);

    const navigationItems: navigationItem[] = [
        {
            text: 'Personuppgifter',
            navOption: 'personal',
        },
        {
            text: 'Betalalternativ',
            navOption: 'payment',
        },
        {
            text: 'Byta Lösenord',
            navOption: 'password',
        },
        {
            text: 'Allergier',
            navOption: 'allergies',
        },
    ];

    return (
        <nav className='profile-nav'>
            {isDropDownMenu ? (
                <select
                    value={active}
                    className='profile-nav__dropdown'
                    onChange={(e) => onClick(e.target.value as 'personal' | 'payment' | 'password' | 'allergies')}>
                    {navigationItems.map((nav) => (
                        <option key={nav.navOption} value={nav.navOption} className={`profile-nav__dropdown-item`}>
                            {nav.text}
                        </option>
                    ))}
                </select>
            ) : (
                <ul className='profile-nav__list'>
                    {navigationItems.map((nav) => (
                        <li
                            key={nav.navOption}
                            onClick={() => onClick(nav.navOption)}
                            className={`profile-nav__list-item ${
                                active === nav.navOption && 'profile-nav__list-item--active'
                            }`}>
                            {nav.text}
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
};

export default ProfileNav;

/*
 * Författare: Kim
 *
 * Skapat komponent för att ändra vilket formulär som ska visas för användaren.
 *
 * Ändrat: Kim
 *
 * Lagt till navigationItems och map samt active
 */
