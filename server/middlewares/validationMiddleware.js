const { OrderModel } = require('../models/orderModel');

exports.validateOrder = async (req, res, next) => {
    try {
        const order = new OrderModel(req.body, { runValidators: true });

        if (order.order) {
            if (order.order.length < 1) throw new Error('Order is empty');
        }
        req.order = order;

        next();
    } catch (error) {
        res.status(400).json({
            message: 'Error',
            data: [error.message],
        });
    }
};
exports.validateOrderStrict = async (req, res, next) => {
    try {
        const order = new OrderModel(req.body, { runValidators: true });

        if (!order.order) throw new Error('Order is empty');
        if (order.order.length < 1) throw new Error('Order is empty');

        req.order = order;

        next();
    } catch (error) {
        res.status(400).json({
            message: 'Error',
            data: [error.message],
        });
    }
};
/**
 * Skapad: Johan
 * Validering för olika saker. La initialt in validering för order,
 * huruvida det kommer med produkter eller inte. Man ska inte kunna lägga en
 * tom order, eller uppdatera en order till att vara tom.
 */
