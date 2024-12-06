import { useEffect, useState } from 'react';
import './profileNav.css';
import useWindowSizeStore from '../../stores/windowSizeStore';

interface Props {
    onClick: (navOption: 'personal' | 'payment' | 'password' | 'allergies' | 'signout') => void;
    active: 'personal' | 'payment' | 'password' | 'allergies' | 'signout';
}

interface navigationItem {
    text: string;
    navOption: 'personal' | 'payment' | 'password' | 'allergies' | 'signout';
}

const ProfileNav = ({ onClick, active }: Props) => {
    const { width } = useWindowSizeStore();

    const [isDropDownMenu, setIsDropDownMenu] = useState<boolean>(false);

    useEffect(() => {
        const breakpoint: number = 850;
        if (!isDropDownMenu) if (width < breakpoint) setIsDropDownMenu(true);

        if (isDropDownMenu) if (width > breakpoint) setIsDropDownMenu(false);
    }, [width]);

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
        {
            text: 'Logga ut',
            navOption: 'signout',
        },
    ];

    return (
        <nav className='profile-nav'>
            {isDropDownMenu ? (
                <select
                    value={active}
                    className='profile-nav__dropdown'
                    onChange={(e) =>
                        onClick(e.target.value as 'personal' | 'payment' | 'password' | 'allergies' | 'signout')
                    }>
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
 * Skapat komponent för att ändra vilket formulär som ska visas för användaren.
 *
 * Ändrat: Kim
 * Lagt till navigationItems och map samt active
 *
 * Ändrat: Magnus
 * Ändrade så komponent använder width från windowSizeStore istället för egen useState.
 */
