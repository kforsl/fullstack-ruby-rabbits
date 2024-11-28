const asyncHandler = require('express-async-handler');
const { OrderModel } = require('../models/orderModel');

exports.createOrder = asyncHandler(async (req, res) => {
    try {
        const order = new OrderModel(req.body);

        const { customer } = req;

        if (customer) {
            order.customer = customer._id;
        }
        order.createdAt = new Date();

        await order.save();

        const orderToReturn = await OrderModel.findById(order._id).populate('order.product').populate('customer');
        orderToReturn.hash = null;

        res.status(201).json({
            message: 'Succesfully created order',
            data: [orderToReturn],
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
            .populate('order.product.ingredients.ingredient')
            .populate('customer');

        if (orders.length < 1) {
            order.forEach((o) => {
                if (o.customer) o.customer.hash = null;
            });
            res.status(204).json({
                message: 'No orders found',
                data: [],
            });
        } else {
            const dateSort = (a, b) => (a.updatedAt < b.updatedAt ? -1 : 1);
            if (!state) {
                res.status(200).json({
                    message: 'Succesfully found orders',
                    data: orders.filter((x) => x.state !== 'history').sort(dateSort),
                });
            } else {
                const states = ['waiting', 'preparing', 'ready', 'history', 'annulled', 'editing'];
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
            data: [error.message],
        });
    }
});

exports.getAllOrdersByCustomerId = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const orders = await OrderModel.find({ customer: id }).populate('order.product');

        if (orders.length < 1) {
            res.status(204).json({
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
            data: [error.message],
        });
    }
});

exports.getOrderById = asyncHandler(async (req, res) => {
    try {
        const order = await OrderModel.findById(req.params.id).populate('order.product').populate('customer');

        if (order.customer) order.customer.hash = null;

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
            data: [error.message],
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
        if (order.customer) order.customer.hash = null;

        if (!order) {
            res.status(204).json({
                message: 'Error',
                data: [],
            });
        }

        res.status(200).json({
            message: 'Succesfully updated order.',
            data: [order],
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            data: [error.message],
        });
    }
});
