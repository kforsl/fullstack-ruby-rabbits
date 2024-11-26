const express = require('express');
const controller = require('../controllers/profileController');

const router = express.Router();

//Get all menu items
router.put('/allergen', controller.updateAllergen);
router.put('/password', controller.updatePassword);
router.put('/payment', controller.updatePayment);
router.put('/data', controller.updatePersonalData);

module.exports = router;
