import Footer from './components/Footer/Footer';
import NavigationMenu from './components/NavigationMenu/NavigationMenu';
import RoutesComponent from './routes/Routes';

function App() {
    return (
        <>
            <div className='wrapper'>
                <NavigationMenu />

                <RoutesComponent />
            </div>
            <Footer />
        </>
    );
}

export default App;
