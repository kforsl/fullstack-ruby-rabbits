const asyncHandler = require('express-async-handler');
const { OrderModel } = require('../models/orderModel');

exports.createOrder = asyncHandler(async (req, res) => {
    try {
        const order = new OrderModel(req.body);

        await order.save();

        res.status(201).json({
            message: 'Succesfully created order',
            data: [order],
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            data: [error],
        });
    }
});

exports.getAllOrders = asyncHandler(async (req, res) => {
    try {
        const { state } = req.query;

        const orders = await OrderModel.find({})
            .populate('order.product')
            .populate('order.product.ingredients.ingredient');

        if (orders.length < 1) {
            res.status(404).json({
                message: 'Error',
                data: 'No orders found',
            });
        } else {
            const dateSort = (a, b) => (a.updatedAt < b.updatedAt ? -1 : 1);
            if (!state) {
                res.status(200).json({
                    message: 'Succesfully found orders',
                    data: orders.filter((x) => x.state !== 'history').sort(dateSort),
                });
            } else {
                const states = ['waiting', 'preparing', 'ready', 'history'];
                if (states.includes(state)) {
                    res.status(200).json({
                        message: 'Succesfully found orders',
                        data: orders.filter((x) => x.state === state).sort(dateSort),
                    });
                } else {
                    res.status(200).json({
                        message: 'Succesfully found orders',
                        data: orders.sort(dateSort),
                    });
                }
            }
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            data: [error],
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
            data: [order],
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            data: [error],
        });
    }
});
exports.updateOrderById = asyncHandler(async (req, res) => {
    try {
        const order = await OrderModel.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: new Date() },
            { new: true }
        );

        if (!order) {
            res.status(404).json({
                message: 'Error',
                data: 'Order not found.',
            });
        }

        res.status(200).json({
            message: 'Succesfully updated order.',
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            data: [error],
        });
    }
});
