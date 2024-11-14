import NavigationMenu from '../NavigationMenu/NavigationMenu';
import './header.css';
const Header: React.FC = () => {
    const title = ['H', 'A', 'P', 'P', 'Y', 'M', 'E', 'S', 'S'];
    return (
        <header className='header'>
            <div className='header__inner-wrapper'>
                <h2 className='header__logotype'>
                    {title.map((letter, i) => (
                        <span className={`header__logotype header__logotype--letter${i}`}>{letter}</span>
                    ))}
                </h2>
                <NavigationMenu />
            </div>
        </header>
    );
};

export default Header;
