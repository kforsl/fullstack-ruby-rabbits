const { Schema, model } = require('mongoose');

const SizeListSchema = new Schema({
    size: {
        type: String,
        enum: {
            values: ['small', 'medium', 'large'],
            message: '{VALUE} is not supported.',
        },
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    ingredientMultiplier: {
        type: Number,
        default: 1,
    },
});

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: {
            values: ['milkshake', 'icecream'],
            message: '{VALUE} is not supported.',
        },
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    ingredients: [
        {
            ingredient: {
                type: Schema.Types.ObjectId,
                ref: 'Ingredient',
                required: true,
            },
            quantityInGrams: {
                type: Number,
                required: true,
            },
        },
    ],
    isSpecial: {
        type: Boolean,
        default: false,
    },
    sizes: [
        {
            type: SizeListSchema,
            required: true,
        },
    ],
});

const ProductModel = model('Product', ProductSchema);
module.exports = { ProductModel, ProductSchema };
