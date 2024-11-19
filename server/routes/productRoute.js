const express = require('express');
const controller = require('../controllers/productController');
const { jwtAuthMiddleware } = require('../middlewares/jwtAuthMiddleware');

const router = express.Router();

//Get all menu items
router.get('/', controller.getAllProducts);
router.post('/', jwtAuthMiddleware, controller.createProduct);

module.exports = router;
