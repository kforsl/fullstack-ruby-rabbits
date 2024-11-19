const { Schema, model } = require('mongoose');

const IngredientSchema = new Schema({
    //Denna är speciellt för varje objekt inne i order.
    ingredient: {
        type: Schema.Types.ObjectId,
        ref: 'Ingredient',
    },
    quantity: {
        type: Number,
        required: true,
    },
    measuringUnit: {
        type: String,
        required: true,
    },
});

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
            type: IngredientSchema,
            required: true,
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
