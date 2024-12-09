const express = require('express');
const controller = require('../controllers/productController');
const { validateAccessTokenStrict, validateUserAsManager } = require('../middlewares/jwtAuth');

const router = express.Router();

//Get all menu items
router.get('/', controller.getAllProducts);
router.get('/:id', controller.getProductById);
router.post('/', validateAccessTokenStrict, validateUserAsManager, controller.createProduct);
router.put('/:id', validateAccessTokenStrict, validateUserAsManager, controller.updateProductById);

module.exports = router;
