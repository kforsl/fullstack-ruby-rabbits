import { useLocation } from 'react-router-dom';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import './header.css';
import { useEffect, useState } from 'react';
const Header: React.FC = () => {
    const title = ['H', 'A', 'P', 'P', 'Y', 'M', 'E', 'S', 'S'];

    const location = useLocation();

    const [isOnlyNavigation, setIsOnlyNavigation] = useState<boolean>();

    useEffect(() => {
        if (location.pathname === '/' || location.pathname === '/om-oss') {
            setIsOnlyNavigation(false);
        } else setIsOnlyNavigation(true);
    }, [location]);

    return (
        <>
            {isOnlyNavigation ? (
                <header className='header--small'>
                    <NavigationMenu />
                </header>
            ) : (
                <header className='header'>
                    <div className='header__inner-wrapper'>
                        <h2 className='header__logotype'>
                            {title.map((letter, i) => (
                                <span key={letter + i} className={`header__logotype header__logotype--letter${i}`}>
                                    {letter}
                                </span>
                            ))}
                        </h2>
                        <NavigationMenu />
                    </div>
                </header>
            )}
        </>
    );
};

export default Header;

/*
 *Författare: Magnus
 * Skapat header. Lagt in navigationsmenyn i header, kommer att behöva rendera ut den beroende av sida och då också göra det möjligt att rendera ut navigationsmenyn utanför header.
 * titeln renderas ut med span för att kunna sätta storlek och position per bokstav. Svg bakgrund behöver fixas för responsivitet.
 */

/*
 * Ändrat: Kim
 * Lagt till funktion för att kunna visa två olika headers baserat på vilken sida som visas.
 */
/*
 * Ändrat: Magnus
 * Gjort header responsive.
 */
