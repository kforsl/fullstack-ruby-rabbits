const express = require('express');
const controller = require('../controllers/menuController');
const { jwtAuthMiddleware } = require('../middlewares/jwtAuthMiddleware');

const router = express.Router();

//Get all menu items
router.get('/', controller.getAllMenuItems);
router.post('/', jwtAuthMiddleware, controller.createMenuItem);
router.put('/:id', controller.updateMenuItem);

module.exports = router;
