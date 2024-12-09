const express = require('express');
const controller = require('../controllers/orderController');
const { validateAccessToken, validateIfUserIsCustomer } = require('../middlewares/jwtAuth');
const { validateOrder, validateOrderStrict } = require('../middlewares/validationMiddleware');

const router = express.Router();

//Get all menu items
router.get('/', validateAccessToken, controller.getAllOrders);
router.get('/:id', controller.getOrderById);
router.get('/user/:id', validateAccessToken, validateIfUserIsCustomer, controller.getAllOrdersByCustomerId);
router.put('/:id', validateOrder, controller.updateOrderById);
router.post('/', validateIfUserIsCustomer, validateOrderStrict, controller.createOrder);

module.exports = router;
