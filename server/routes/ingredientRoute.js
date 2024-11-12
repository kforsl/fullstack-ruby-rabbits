const express = require('express');
const controller = require('../controllers/ingredientController');


const router = express.Router();

//Get all menu items
router.post('/', controller.createIngredient);

module.exports = router;