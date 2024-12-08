import { useEffect } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import SignForm from './components/SignForm/SignForm';
import RoutesComponent from './routes/Routes';
import agent from './services/api/agent';
import useAuthStore from './stores/authStore';
import { tokenResponse } from './interfaces/interfaceAuth';
function App() {
    const { customer } = useAuthStore();

    useEffect(() => {
        setInterval(() => {
            if (customer) {
                agent.Authenticate.refreshToken().then((response: tokenResponse) => {
                    if (response.token) {
                        sessionStorage.setItem('ato', response.token);
                    }
                    return response;
                });
            }
        }, 25000);
    }, []);

    return (
        <>
            <ScrollToTop />
            <Header />
            <SignForm />
            <RoutesComponent />
            <Footer />
        </>
    );
}

export default App;

/*
 *Ändrat: Magnus
 * Lade till header och flyttade in navigation in i header. Då header inte finns på varje sida bör den renderas ut conditionellt.
 */

/*
 * Ändrat: Kim
 * Flyttat div med wrapper in i varje page istället.
 */

/*
 *Ändrat: Magnus
 * Lade till ScrollToTop-component som ser till att man är högst upp på sidan när man byter route.
 */
