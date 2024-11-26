const express = require('express');
const controller = require('../controllers/authController');
const router = express.Router();
const { validateRefreshToken } = require('../middlewares/jwtAuth');

//Authenticate
router.post('/', controller.authenticateEmployee);
router.post('/customer', controller.authenticateCustomer);
router.post('/customer/register', controller.registerCustomer);
router.post('/register', controller.registerEmployee);
router.post('/refresh', validateRefreshToken, controller.refreshToken);
router.get('/', controller.getUser);

module.exports = router;
