import DashboardMenu from './components/DashboardMenu/DashboardMenu';
import RoutesComponent from './routes/RoutesComponent';

function App() {
    return (
        <section className='main-wrapper'>
            <DashboardMenu />
            <RoutesComponent />
        </section>
    );
}

export default App;
