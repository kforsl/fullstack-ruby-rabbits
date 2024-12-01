const express = require('express');
const controller = require('../controllers/profileController');
const { validateIfUserIsCustomer, validateIfUserIsCustomerStrict } = require('../middlewares/jwtAuth');

const router = express.Router();

//Get all menu items
router.put('/allergen', validateIfUserIsCustomer, controller.updateAllergen);
router.put('/password', validateIfUserIsCustomer, controller.updatePassword);
router.put('/payment', validateIfUserIsCustomerStrict, controller.updatePayment);
router.put('/data', validateIfUserIsCustomer, controller.updatePersonalData);

module.exports = router;
