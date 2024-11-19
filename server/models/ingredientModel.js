const { Schema, model } = require('mongoose');
const { AllergenSchema } = require('./allergenModel');

const IngredientSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    allergens: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Allergen',
            required: false,
        },
    ],
});

const IngredientModel = model('Ingredient', IngredientSchema);

module.exports = { IngredientModel, IngredientSchema };
