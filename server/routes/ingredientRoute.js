const express = require('express');
const controller = require('../controllers/ingredientController');


const router = express.Router();

//Get all menu items
router.post('/', controller.createIngredient);
router.get('/', controller.getAllIngredients);

module.exports = router;