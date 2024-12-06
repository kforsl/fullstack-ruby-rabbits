const express = require('express');
const controller = require('../controllers/authController');
const router = express.Router();
const { validateRefreshTokenStrict } = require('../middlewares/jwtAuth');

//Authenticate
router.post('/', controller.authenticateEmployee);
router.get('/signout');
router.post('/customer', controller.authenticateCustomer);
router.post('/customer/register', controller.registerCustomer);
router.post('/customer/:id/refresh', validateRefreshTokenStrict, controller.refreshTokenForCustomer);
router.get('/customer/signout', controller.signOutCustomer);
router.post('/register', controller.registerEmployee);
router.post('/:id/refresh', validateRefreshTokenStrict, controller.refreshTokenForEmployee);

module.exports = router;
