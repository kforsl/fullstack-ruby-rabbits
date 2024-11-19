const { Schema, model } = require('mongoose');

const OrderItemSchema = new Schema({});

const OrderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },
    state: {
        type: String,
        enum: {
            values: ['waiting', 'preparing', 'ready', 'history'],
            message: '{VALUE} is not supported.',
        },
        default: 'waiting',
    },
    comment: {
        type: String,
        required: false,
    },
    order: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            size: {
                type: String,
                enum: {
                    values: ['small', 'medium', 'large'],
                    message: '{VALUE} is not supported.',
                },
                required: true,
            },
        },
    ],
});

const OrderModel = model('Order', OrderSchema);
module.exports = { OrderModel, OrderSchema };
