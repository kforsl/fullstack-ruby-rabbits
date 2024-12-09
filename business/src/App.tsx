import { useEffect } from 'react';
import DashboardMenu from './components/DashboardMenu/DashboardMenu';
import RoutesComponent from './routes/RoutesComponent';
import useAuthStore from './stores/authStore';
import agent from './services/api/agent';
import { TokenResponse } from './interfaces/interfaceAuth';

function App() {
    const { employee } = useAuthStore();

    useEffect(() => {
        if (!employee) {
            agent.Authenticate.refreshToken().then((response: TokenResponse) => {
                if (response.token) {
                    sessionStorage.setItem('ato', response.token);
                    sessionStorage.setItem('user', JSON.stringify(response.data));
                }
            });
        }
        setInterval(() => {
            if (employee) {
                agent.Authenticate.refreshToken().then((response: TokenResponse) => {
                    if (response.token) {
                        sessionStorage.setItem('ato', response.token);
                    }
                });
            }
        }, 1000 * 60 * 5);
    }, []);
    return (
        <>
            <DashboardMenu />
            <RoutesComponent />
        </>
    );
}

export default App;
