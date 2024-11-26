const express = require('express');
const controller = require('../controllers/orderController');
const { validateAccessToken, validateIfUserIsCustomer } = require('../middlewares/jwtAuth');

const router = express.Router();

//Get all menu items
router.get('/', controller.getAllOrders);
router.get('/:id', controller.getOrderById);
router.get('/user/:id', validateIfUserIsCustomer, controller.getAllOrdersByCustomerId);
router.put('/:id', controller.updateOrderById);
router.post('/', validateIfUserIsCustomer, controller.createOrder);

module.exports = router;
