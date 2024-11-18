const express = require('express');
const mongoose = require('mongoose');
const { createServer } = require('node:http'); // socket.io
const { Server } = require('socket.io'); // socket.io
var cors = require('cors');
const app = express();

require('dotenv').config();
app.use(cors());
const server = createServer(app); // socket.io
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

const menuRoute = require('./routes/menuRoute');
const ingredientRoute = require('./routes/ingredientRoute');
const sizeRoute = require('./routes/sizeRoute');
const allergenRoute = require('./routes/allergenRoute');

const PORT = process.env.PORT | 3000;

app.use(express.json());

app.use('/api/menu-items', menuRoute);
app.use('/api/ingredients', ingredientRoute);
app.use('/api/sizes', sizeRoute);
app.use('/api/allergens', allergenRoute);

const run = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        io.on('connection', (socket) => {
            console.log('a user connected');
            socket.on('disconnect', async (reason) => {
                console.log(`USER DISCONNECTED: ${socket.id}. REASON: ${reason}`);
            });
            socket.on('createOrder', () => {
                console.log('createOrder');
            });
            socket.on('updateOrderStatus', () => {
                console.log('updateOrderStatus');
            });
        });
        server.listen(3000, () => console.log(`Server started on PORT ${PORT}`));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

run();
