const asyncHandler = require('express-async-handler');
const { OrderModel } = require('../models/orderModel');

exports.createOrder = asyncHandler(async (req, res) => {
    try {
        const order = new OrderModel(req.body);

        await order.save();

        res.status(201).json({
            message: 'Succesfully created order',
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            data: error.message,
        });
    }
});

exports.getyAllOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await OrderModel.find({}).populate('order.product');
        res.status(200).json({
            message: 'Succesfully found orders',
            data: orders,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            data: error.message,
        });
    }
});
