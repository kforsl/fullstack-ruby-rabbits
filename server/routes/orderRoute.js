const express = require('express');
const controller = require('../controllers/orderController');

const router = express.Router();

//Get all menu items
router.get('/', controller.getAllOrders);
router.get('/:id', controller.getOrderById);
router.post('/', controller.createOrder);

module.exports = router;
