const express = require('express');
const controller = require('../controllers/authController');
const router = express.Router();

//Authenticate
router.post('/', controller.authenticate);
router.post('/register', controller.register);

module.exports = router;
