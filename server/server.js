const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');

require('dotenv').config();

const menuRoute = require('./routes/menuRoute');
const ingredientRoute = require('./routes/ingredientRoute');
const sizeRoute = require('./routes/sizeRoute');
const allergenRoute = require('./routes/allergenRoute');
const authRoute = require('./routes/authRoute');

const PORT = process.env.PORT | 3000;

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/api/menu-items', menuRoute);
app.use('/api/ingredients', ingredientRoute);
app.use('/api/sizes', sizeRoute);
app.use('/api/allergens', allergenRoute);
app.use('/api/auth', authRoute);

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
