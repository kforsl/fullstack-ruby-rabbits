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

exports.getAllOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await OrderModel.find({})
            .populate('order.product')
            .populate('order.product.ingredients.ingredient');
      
        if (orders.length < 1) {
            res.status(404).json({
                message: 'No orders found',
                data: [],
            });
        } else {
            res.status(200).json({
                message: 'Succesfully found orders',
                data: orders,
            });
        }

    } catch (error) {
        res.status(500).json({
            message: 'Error',
            data: error.message,
        });
    }
});

exports.getOrderById = asyncHandler(async (req, res) => {
    try {
        const order = await OrderModel.findById(req.params.id)
            .populate('order.product')
            .populate('order.product.ingredients.ingredient[]');

        if (!order)
            res.status(404).json({
                message: 'Error',
                data: 'Order not found.',
            });

        res.status(200).json({
            message: 'Succesfully found order.',
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            data: error.message,
        });
    }
});
