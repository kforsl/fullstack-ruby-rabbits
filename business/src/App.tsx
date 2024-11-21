import DashboardMenu from './components/DashboardMenu/DashboardMenu';
import { useEffect } from 'react';
import RoutesComponent from './routes/RoutesComponent';
import { socket } from './services/webSocket/ioSocket';

async function socketIoConnect() {
    socket.emit('connection');
}

function App() {
    useEffect(() => {
        socketIoConnect();
    }, []);
    return (
        <>
            <DashboardMenu />
            <RoutesComponent />
        </>
    );
}

export default App;
