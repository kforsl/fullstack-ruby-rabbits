const express = require('express');
const controller = require('../controllers/profileController');
const {
    validateAccessToken,
    validateAccessTokenStrict,
    validateIfUserIsCustomer,
    validateIfUserIsCustomerStrict,
} = require('../middlewares/jwtAuth');

const router = express.Router();

//Get all menu items
router.put('/allergen', validateAccessTokenStrict, validateIfUserIsCustomerStrict, controller.updateAllergen);
router.put('/password', validateAccessTokenStrict, validateIfUserIsCustomerStrict, controller.updatePassword);
router.put('/payment', validateAccessTokenStrict, validateIfUserIsCustomerStrict, controller.updatePayment);
router.put('/data', validateAccessTokenStrict, validateIfUserIsCustomerStrict, controller.updatePersonalData);
router.get('/me', validateAccessTokenStrict, controller.getCustomer);

module.exports = router;
