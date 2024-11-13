const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const menuRoute = require('./routes/menuRoute');
const ingredientRoute = require('./routes/ingredientRoute');
const sizeRoute = require('./routes/sizeRoute');
const allergenRoute = require('./routes/allergenRoute');

const PORT = process.env.PORT | 3000;

app.use(express.json());

app.use('/menu-items', menuRoute);
app.use('/ingredients', ingredientRoute);
app.use('/sizes', sizeRoute);
app.use('/allergens', allergenRoute);

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