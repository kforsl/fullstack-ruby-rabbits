const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const app = express();
require('dotenv').config();

const ingredientRoute = require('./routes/ingredientRoute');
const productRoute = require('./routes/productRoute');
const allergenRoute = require('./routes/allergenRoute');
const orderRoute = require('./routes/orderRoute');

const PORT = process.env.PORT | 3000;

app.use(express.json());
app.use(cors());

app.use('/api/ingredients', ingredientRoute);
app.use('/api/products', productRoute);
app.use('/api/allergens', allergenRoute);
app.use('/api/orders', orderRoute);

const run = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        app.listen(3000, () => console.log(`Server started on PORT ${PORT}`));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

run();
