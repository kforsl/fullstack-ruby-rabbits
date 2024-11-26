const express = require('express');
const controller = require('../controllers/profileController');
const { validateIfUserIsCustomer } = require('../middlewares/jwtAuth');

const router = express.Router();

//Get all menu items
router.put('/allergen', validateIfUserIsCustomer, controller.updateAllergen);
router.put('/password', validateIfUserIsCustomer, controller.updatePassword);
router.put('/payment', validateIfUserIsCustomer, controller.updatePayment);
router.put('/data', validateIfUserIsCustomer, controller.updatePersonalData);

module.exports = router;
