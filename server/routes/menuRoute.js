const express = require('express');
const controller = require('../controllers/menuController');


const router = express.Router();

//Get all menu items
router.get('/', controller.getAllMenuItems);
router.post('/', controller.createMenuItem);

module.exports = router;