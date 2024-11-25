import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import SignForm from './components/SignForm/SignForm';
import RoutesComponent from './routes/Routes';

function App() {
    return (
        <>
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

/**
 * Ändrat: Kim
 * Flyttat div med wrapper in i varje page istället.
 */
