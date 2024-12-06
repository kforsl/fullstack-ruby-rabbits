const express = require('express');
const controller = require('../controllers/productController');
const { validateAccessToken, validateUserAsEmployee } = require('../middlewares/jwtAuth');

const router = express.Router();

//Get all menu items
router.get('/', controller.getAllProducts);
router.get('/:id', controller.getProductById);
router.post('/', validateAccessToken, validateUserAsEmployee, controller.createProduct);
router.put('/:id', validateAccessToken, validateUserAsEmployee, controller.updateProductById);

module.exports = router;
