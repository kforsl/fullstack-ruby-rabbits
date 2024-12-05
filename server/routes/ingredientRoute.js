const express = require('express');
const controller = require('../controllers/ingredientController');
const { validateUserAsEmployee, validateAccessToken } = require('../middlewares/jwtAuth');
const router = express.Router();

//Get all menu items
router.post('/', validateAccessToken, validateUserAsEmployee, controller.createIngredient);
router.get('/', controller.getAllIngredients);
router.get('/:id', controller.getIngredientById);

module.exports = router;
