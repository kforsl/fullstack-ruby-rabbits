const asyncHandler = require('express-async-handler');
const { IngredientModel } = require('../models/ingredientModel');

exports.createIngredient = asyncHandler(async (req, res) => {
    try {
        const ingredient = new IngredientModel(req.body);

        await ingredient.save();

        res.status(201).json({
            message: 'Succesfully created ingredient',
            data: ingredient,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            data: error.message,
        });
    }
});

exports.getAllIngredients = asyncHandler(async (req, res) => {
    try {
        const ingredients = await IngredientModel.find({}).populate('allergens');
        res.status(200).json({
            message: 'Succesfully found ingredients',
            data: ingredients,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            data: error.message,
        });
    }
});
