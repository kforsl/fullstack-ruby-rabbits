const express = require('express');
const controller = require('../controllers/orderController');
const { validateAccessToken } = require('../middlewares/jwtAuth');

const router = express.Router();

//Get all menu items
router.get('/', controller.getAllOrders);
router.get('/:id', controller.getOrderById);
router.put('/:id', controller.updateOrderById);
router.post('/', controller.createOrder);

module.exports = router;
