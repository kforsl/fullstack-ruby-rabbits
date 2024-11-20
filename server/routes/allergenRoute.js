const express = require('express');
const controller = require('../controllers/allergenController');

const router = express.Router();

//Get all menu items
router.get('/', controller.getAllAllergens);
router.get('/:id', controller.getAllergenById);
router.post('/', controller.createAllergen);

module.exports = router;
