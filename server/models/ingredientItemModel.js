const {Schema, model} = require('mongoose');
const { AllergenSchema } = require('./allergenModel');

const IngredientItemSchema = new Schema({
    name: {
        type:String,
        required:[true,'Name is required']
    },
    description: {
        type: String,
        required:[false, 'Description is required']
    },
    allergens: [{
        type:Schema.Types.ObjectId, 
        ref:'Allergen',
        required:false
    }]
});

const IngredientItemModel = model('IngredientItem', IngredientItemSchema);

module.exports = {IngredientItemModel, IngredientItemSchema};