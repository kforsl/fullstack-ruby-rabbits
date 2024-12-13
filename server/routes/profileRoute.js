const express = require('express');
const controller = require('../controllers/profileController');
const { validateAccessTokenStrict, validateUserAsCustomerStrict } = require('../middlewares/jwtAuth');

const router = express.Router();

//Get all menu items
router.put('/allergen', validateAccessTokenStrict, validateUserAsCustomerStrict, controller.updateAllergen);
router.put('/password', validateAccessTokenStrict, validateUserAsCustomerStrict, controller.updatePassword);
router.put('/payment', validateAccessTokenStrict, validateUserAsCustomerStrict, controller.updatePayment);
router.put('/data', validateAccessTokenStrict, validateUserAsCustomerStrict, controller.updatePersonalData);
router.get('/me', validateAccessTokenStrict, controller.getCustomer);

module.exports = router;
