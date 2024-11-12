const { Schema, model } = require('mongoose');


const IngredientSchema = new Schema({ //Denna är speciellt för varje objekt inne i menuItem.
    ingredientItem: {
        type: Schema.Types.ObjectId, ref: 'IngredientItem'
    },
    quantity: {
        type: Number,
        required: true,
    },
    measuringUnit:{
        type: String,
        required: true,
    }
});

const SizeListSchema = new Schema({
    size:{
        type: Schema.Types.ObjectId, ref: 'Size'
    },
    prize:{
        type: Number,
        required: true,
    },
    ingredients:{
        type: [IngredientSchema],
        required: true,
    }
})

const MenuItemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    imageUrl:{
        type: String,
        required: false,
    },
    sizes:[SizeListSchema]
});

const MenuItemModel = model('menuItem', MenuItemSchema);


module.exports = { MenuItemModel, MenuItemSchema }