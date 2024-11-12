import './navigationMenu.css';

const NavigationMenu: React.FC = () => {
    const navigation = [
        { name: 'MENU', route: '/menu' },
        { name: 'OM OSS', route: '/om-oss' },
        { name: 'PROFIL', route: '/profil' },
        { name: 'VARUKORG', route: '/varukorg' },
    ];
    return (
        <nav className='navigation-menu'>
            <ul className='navigation-menu__list'>
                {navigation.map((navigationItem) => (
                    <li className='navigation-menu__list-item' key={navigationItem.route}>
                        <p className='navigation-menu__link'>{navigationItem.name}</p>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavigationMenu;
