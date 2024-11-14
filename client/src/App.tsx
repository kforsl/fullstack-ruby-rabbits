import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import NavigationMenu from './components/NavigationMenu/NavigationMenu';
import RoutesComponent from './routes/Routes';

function App() {
    return (
        <>
            <Header />
            <div className='wrapper'>
                <RoutesComponent />
            </div>
            <Footer />
        </>
    );
}

export default App;
