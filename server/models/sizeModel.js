const { Schema, model } = require('mongoose');

const SizeItemSchema = new Schema({
    type: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
    },
});

const SizeModel = model('Size', SizeItemSchema);

module.exports = { SizeModel, SizeItemSchema };
