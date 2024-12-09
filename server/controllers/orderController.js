const asyncHandler = require('express-async-handler');
const { OrderModel } = require('../models/orderModel');
const { ProductModel } = require('../models/productModel');

exports.createOrder = asyncHandler(async (req, res) => {
    const { customer } = req;
    const order = new OrderModel(req.body);
    if (customer) {
        order.customer = customer._id;
    }
    order.createdAt = new Date();
    await order.populate('order.product');
    order.price = order.order
        .map((item) => Number(item.product.sizes.find((x) => x.size === item.size).price) * item.quantity)
        .reduce((a, b) => a + b);
    await order.save();

    return res.status(201).json({
        message: 'successfully created order',
        data: [order],
    });
});

exports.getAllOrders = asyncHandler(async (req, res) => {
    try {
        const { state } = req.query;

        const orders = await OrderModel.find({})
            .populate('order.product')
            .populate('order.product.ingredients.ingredient')
            .populate('customer');

        if (orders.length < 1) {
            res.status(200).json({
                message: 'No orders found',
                data: [],
            });
        } else {
            orders.forEach((o) => {
                if (o.customer) o.customer.hash = null;
            });
            const dateSort = (a, b) => (a.updatedAt < b.updatedAt ? -1 : 1);
            if (!state) {
                res.status(200).json({
                    message: 'successfully found orders',
                    data: orders.filter((x) => x.state !== 'history').sort(dateSort),
                });
            } else {
                const states = ['waiting', 'preparing', 'ready', 'history', 'annulled', 'editing'];
                if (states.includes(state)) {
                    res.status(200).json({
                        message: 'successfully found orders',
                        data: orders.filter((x) => x.state === state).sort(dateSort),
                    });
                } else {
                    res.status(200).json({
                        message: 'successfully found orders',
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
        const { userId } = req;

        const orders = await OrderModel.find({ customer: userId }).populate('order.product');

        if (orders.length < 1) {
            res.status(204).json({
                message: 'No orders found',
                data: [],
            });
        } else {
            res.status(200).json({
                message: 'successfully found orders',
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
        if (!order)
            return res.status(404).json({
                message: 'Error',
                data: 'Order not found.',
            });

        if (order.customer) order.customer.hash = null;

        return res.status(200).json({
            message: 'successfully found order.',
            data: [order],
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error',
            data: [error.message],
        });
    }
});

exports.updateOrderById = asyncHandler(async (req, res) => {
    try {
        const { order } = req;
        if (order.order) {
            const products = await ProductModel.find({
                _id: { $in: order.order.map((item) => item.product) },
            }).populate('sizes'); //Hämtar ut alla produkter från ordern med storlekarna förberedda i sin helhet så man kan få hela objekten, då man endast returnerar ID per produkt.
            if (products) {
                order.order.forEach((item) => {
                    const foundProduct = products.find((x) => x._id.equals(item.product));
                    item.product = foundProduct;
                });
                order.price = order.order
                    .map((item) => Number(item.product.sizes.find((x) => x.size === item.size).price) * item.quantity)
                    .reduce((a, b) => a + b);
            }
        }
        order.updatedAt = new Date();
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            req.params.id,
            { ...order },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedOrder) {
            res.status(200).json({
                message: 'Error',
                data: ['Order was not validated correctly.'],
            });
        }
        if (updatedOrder.customer) updatedOrder.customer.hash = null;

        res.status(200).json({
            message: 'successfully updated order.',
            data: [updatedOrder],
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            data: [error.message],
        });
    }
});

/*
 * Ändrad: Magnus
 * Lade till validering i object på updateOrderById.
 *
 * Ändrad: Magnus
 * Ändrade status 204 till 200 på getAllOrder för att returnera en tom order. Med status 204 kraschade appen.
 *
 * Ändrad: Johan
 * Ordnade med middleware som sköter viss validering av data som kommer in, t.ex om ordern har produkter eller inte med sig.
 * Har även sett till att UpdateOrder nu uppdaterar produkterna och totala priset om produkter kommer med i anropet.
 *
 */
