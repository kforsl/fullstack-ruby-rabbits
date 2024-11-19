const express = require('express');
const controller = require('../controllers/productController');

const router = express.Router();

//Get all menu items
router.get('/', controller.getAllProducts);
router.post('/', controller.createProduct);

module.exports = router;
