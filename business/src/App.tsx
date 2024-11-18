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
            <RoutesComponent />
        </>
    );
}

export default App;
