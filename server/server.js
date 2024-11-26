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

const PORT = process.env.PORT | 3000;

app.use(express.json());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            scriptSrc: ["'self'", 'https://localhost:3000'],
            defaultSrc: ["'self'", 'https://localhost:3000'],
            fontSrc: ["'self'"],
            imgSrc: ["'self'", 'https://happymess-images.s3.eu-north-1.amazonaws.com'],
            connectSrc: [
                "'self'",
                'https://drpn0wxpzl77r.cloudfront.net',
                'https://dxcrvzvfdmi0n.cloudfront.net',
                'https://localhost:1337',
                'https://localhost:1338',
            ],
        },
    })
);
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/api/ingredients', ingredientRoute);
app.use('/api/products', productRoute);
app.use('/api/allergens', allergenRoute);
app.use('/api/orders', orderRoute);
app.use('/api/auth', authRoute);

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
            console.log('a user connected');
            socket.on('disconnect', async (reason) => {
                console.log(`USER DISCONNECTED: ${socket.id}. REASON: ${reason}`);
            });
            socket.on('createOrder', () => {
                socket.broadcast.emit('newOrder');
            });
            socket.on('updateOrderStatus', () => {
                socket.broadcast.emit('newOrderStatus');
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
 * Laggt till socket.io
 */
