const express = require('express');
const controller = require('../controllers/orderController');
const {
    validateAccessTokenStrict,
    validateAccessToken,
    validateUserAsCustomer,
    validateUserAsCustomerOrEmployeeStrict,
    validateUserAsEmployee,
} = require('../middlewares/jwtAuth');
const { validateOrder, validateOrderStrict } = require('../middlewares/validationMiddleware');

const router = express.Router();

//Get all menu items
router.get('/', validateAccessTokenStrict, validateUserAsEmployee, controller.getAllOrders);
router.get('/:id', controller.getOrderById);
router.get(
    '/user/:id',
    validateAccessTokenStrict,
    validateUserAsCustomerOrEmployeeStrict,
    controller.getAllOrdersByCustomerId
);
router.put('/:id', validateOrder, controller.updateOrderById);
router.post('/', validateAccessToken, validateUserAsCustomer, validateOrderStrict, controller.createOrder);

module.exports = router;
