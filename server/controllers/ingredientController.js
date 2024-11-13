const asyncHandler = require('express-async-handler');
const {IngredientItemModel} = require('../models/ingredientItemModel');



exports.createIngredient = asyncHandler(async (req, res) => {
    try{
        const ingredientItem = new IngredientItemModel(req.body);
        
        await ingredientItem.save();

        res.status(201).json({
            message: 'Succesfully created Menu-item',
            data:ingredientItem
        });
    
    }catch(error){
        res.status(500).json({
            message: 'Error',
            data: error
        });
    }
});

exports.getAllIngredients = asyncHandler(async (req,res) => {
    try {
        const ingredientItems = await IngredientItemModel.find({}).populate('allergens');
        res.status(200).json({ingredientItems});
    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
});