import './dashboardMenu.css';
import useAuthStore from '../../stores/authStore';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { socket } from '../../services/webSocket/ioSocket';

const DashboardMenu = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { employee, setEmployee, menuIsExpanded, setMenuIsExpanded } = useAuthStore();
    const [navigation, setNavigation] = useState([
        { name: 'KASSA-VY', route: '/kassa' },
        { name: 'KOCK-VY', route: '/kock' },
        { name: 'LAGERSALDO', route: '/lager' },
    ]);

    useEffect(() => {
        if (navigation.some((item) => item.route === location.pathname)) {
            if (!employee) {
                navigate('/');
            } else {
                socket.emit('joinEmployeeRoom');
            }
        }

        if (employee?.role !== 'employee') {
            setNavigation([...navigation, { name: 'PRODUKTER', route: '/admin/produkt' }]);
        }
    }, []);

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
                                }`}
                                onClick={() => setMenuIsExpanded(false)}>
                                {option.name}
                            </Link>
                        </li>
                    ))}
                    <li className='menu-list__logout-wrapper'>
                        <button
                            className='menu-list__logout'
                            onClick={() => {
                                window.sessionStorage.clear();
                                setEmployee(null);
                                navigate('/');
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

/*
 *Författare: Johan
 *
 * Ändrat: Magnus
 * Lade till seMenuIsExpanded(false) som onClick på navigationslänkarna så att menyn stänger när man navigerat.
 */
