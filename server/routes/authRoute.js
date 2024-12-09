const express = require('express');
const controller = require('../controllers/authController');
const router = express.Router();
const { validateRefreshTokenStrict, validateAccessToken } = require('../middlewares/jwtAuth');

//Authenticate
router.post('/', controller.authenticateEmployee);
router.get('/signout', validateAccessToken, controller.signOut);
router.post('/customer', controller.authenticateCustomer);
router.post('/token', validateAccessToken, controller.verifyAccessToken);
router.get('/refresh', validateRefreshTokenStrict, controller.refreshToken);
router.post('/customer/register', controller.registerCustomer);
// router.post('/customer/:id/refresh', validateRefreshTokenStrict, controller.refreshTokenForCustomer);
router.get('/customer/signout', validateAccessToken, controller.signOut);
router.post('/register', controller.registerEmployee);
// router.post('/:id/refresh', validateRefreshTokenStrict, controller.refreshTokenForEmployee);

module.exports = router;
