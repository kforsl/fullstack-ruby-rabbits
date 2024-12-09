const express = require('express');
const controller = require('../controllers/authController');
const router = express.Router();
const { validateRefreshTokenStrict, validateAccessTokenStrict } = require('../middlewares/jwtAuth');

//Authenticate
router.post('/', controller.authenticateEmployee);
router.get('/signout', validateAccessTokenStrict, controller.signOut);
router.post('/customer', controller.authenticateCustomer);
router.post('/token', validateAccessTokenStrict, controller.verifyAccessToken);
router.get('/refresh', validateRefreshTokenStrict, controller.refreshToken);
router.post('/customer/register', controller.registerCustomer);
router.post('/register', controller.registerEmployee);

module.exports = router;
