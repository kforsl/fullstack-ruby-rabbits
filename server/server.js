const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const app = express();

require('dotenv').config();

const { createServer } = require('node:http'); // socket.io
const { Server } = require('socket.io'); // socket.io

const ingredientRoute = require('./routes/ingredientRoute');
const productRoute = require('./routes/productRoute');
const allergenRoute = require('./routes/allergenRoute');
const orderRoute = require('./routes/orderRoute');
const authRoute = require('./routes/authRoute');
const profileRoute = require('./routes/profileRoute');

const PORT = process.env.PORT | 3000;

app.use(express.json());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            scriptSrc: ["'self'", 'http://localhost:3000'],
            defaultSrc: ["'self'", 'http://localhost:3000'],
            fontSrc: ["'self'"],
            imgSrc: ["'self'", 'https://happymess-images.s3.eu-north-1.amazonaws.com'],
            connectSrc: [
                "'self'",
                'https://drpn0wxpzl77r.cloudfront.net',
                'https://dxcrvzvfdmi0n.cloudfront.net',
                'http://localhost:1337',
                'http://localhost:1338',
            ],
        },
    })
);
app.use(
    cors({
        credentials: true,
        origin: [
            'http://localhost:3000',
            'http://localhost:1337',
            'http://localhost:1338',
            'https://drpn0wxpzl77r.cloudfront.net',
            'https://dxcrvzvfdmi0n.cloudfront.net',
        ],
    })
);
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/api/ingredients', ingredientRoute);
app.use('/api/products', productRoute);
app.use('/api/allergens', allergenRoute);
app.use('/api/orders', orderRoute);
app.use('/api/auth', authRoute);
app.use('/api/profile', profileRoute);

const server = createServer(app); // socket.io
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

const run = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        io.on('connection', (socket) => {
            console.log('a user connected', socket.id);

            socket.on('disconnect', async (reason) => {
                console.log(`USER DISCONNECTED: ${socket.id}. REASON: ${reason}`);
            });
            socket.on('joinEmployeeRoom', () => {
                socket.join('employee');
                console.log(socket.id, 'Is in room Employee');
            });
            socket.on('joinOrderRoom', (id) => {
                socket.join(id);
                console.log(socket.id, 'Is in room ', id);
            });
            socket.on('createOrder', (id) => {
                socket.to('employee').to(id).emit('newOrder');
            });
            socket.on('updateOrderStatus', (id) => {
                socket.to('employee').to(id).emit('newOrderStatus');
            });
        });
        server.listen(3000, () => console.log(`Server started on PORT ${PORT}`));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

run();

/*
 * Ändrat: Kim
 * Lagt till socket.io
 *
 * Ändrat: Kim
 * Ändrat till io.emit istället för socket.emit/broadcast
 */
