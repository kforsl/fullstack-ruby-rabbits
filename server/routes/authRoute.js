const express = require('express');
const controller = require('../controllers/authController');
const router = express.Router();
const { validateRefreshToken } = require('../middlewares/jwtAuth');

//Authenticate
router.post('/', controller.authenticate);
router.post('/register', controller.register);
router.post('/refresh', validateRefreshToken, controller.refreshToken);

module.exports = router;
