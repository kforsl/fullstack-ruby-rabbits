const express = require('express');
const controller = require('../controllers/orderController');

const router = express.Router();

//Get all menu items
router.get('/', controller.getyAllOrders);
router.post('/', controller.createOrder);

module.exports = router;
