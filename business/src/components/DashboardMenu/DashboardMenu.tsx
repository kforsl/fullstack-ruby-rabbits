import { useEffect } from 'react';
import './dashboardMenu.css';
import useAuthStore from '../../stores/authStore';

const DashboardMenu = () => {
    const { employee, menuIsExpanded, setMenuIsExpanded } = useAuthStore();

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
                <button
                    onClick={() => {
                        setMenuIsExpanded(!menuIsExpanded);
                    }}>
                    Tryck här
                </button>
            </aside>
        </>
    );
};

export default DashboardMenu;
