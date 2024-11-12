import { Link } from 'react-router-dom';
import './navigationMenu.css';

const NavigationMenu: React.FC = () => {
    const navigation = [
        { name: 'MENU', route: '/' },
        { name: 'OM OSS', route: '/om-oss' },
        { name: 'PROFIL', route: '/profil' },
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
            </ul>
        </nav>
    );
};

export default NavigationMenu;

/**
 * Författare: Magnus
 * Komponent som ger oss våra länkar för navigation.
 * **/
