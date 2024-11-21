import './dashboardMenu.css';
import useAuthStore from '../../stores/authStore';
import { Link, useLocation } from 'react-router-dom';

const DashboardMenu = () => {
    const location = useLocation();
    const { employee, menuIsExpanded, setMenuIsExpanded } = useAuthStore();
    const navigation = [
        { name: 'KASSA-VY', route: '/kassa' },
        { name: 'KOCK-VY', route: '/kock' },
        { name: 'LAGERSALDO', route: '/lager' },
    ];

    return (
        <>
            <aside
                className={`dashboard-menu__wrapper ${
                    employee
                        ? menuIsExpanded
                            ? ' dashboard-menu__wrapper--shown'
                            : 'dashboard-menu__wrapper--hidden'
                        : 'dashboard-menu__wrapper--inactive'
                }`}>
                <section className='hamburger-wrapper'>
                    <button
                        className={`hamburger-button hamburger-button--${menuIsExpanded ? 'active' : 'inactive'}`}
                        onClick={() => {
                            setMenuIsExpanded(!menuIsExpanded);
                        }}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </section>
                <ul className={`dashboard-menu__list ${menuIsExpanded ? '' : 'dashboard-menu__list--hidden'}`}>
                    <li className='menu-list__header'>
                        Inloggad som <br />
                        {employee?.firstName} {employee?.lastName}
                    </li>
                    {navigation.map((option, index) => (
                        <li className='menu-list__link-wrapper' key={index}>
                            <Link
                                key={index}
                                to={option.route}
                                className={`menu-list__link ${
                                    location.pathname === option.route ? 'menu-list__link--active' : ''
                                }`}>
                                {option.name}
                            </Link>
                        </li>
                    ))}
                    <li className='menu-list__logout-wrapper'>
                        <button
                            className='menu-list__logout'
                            onClick={() => {
                                window.sessionStorage.clear();
                                window.location.href = '/';
                            }}>
                            LOGGA UT
                        </button>
                    </li>
                </ul>
            </aside>
        </>
    );
};

export default DashboardMenu;
