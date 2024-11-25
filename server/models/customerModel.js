const { Schema, model } = require('mongoose');

const CustomerSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    zipcode: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    socialSecurityNumber: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: null,
        required: false,
    },
});

const CustomerModel = model('Customer', CustomerSchema);

module.exports = { CustomerModel, CustomerSchema };
