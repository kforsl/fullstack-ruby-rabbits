const express = require('express');
const controller = require('../controllers/sizeController');


const router = express.Router();

//Get all menu items
router.get('/', controller.getAllSizes);
router.post('/', controller.createSize);

module.exports = router;