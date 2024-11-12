const asyncHandler = require("express-async-handler");
const {IngredientItemModel} = require("../models/ingredientItemModel");



exports.createIngredient = asyncHandler(async (req, res) => {
    try{
        const ingredientItem = new IngredientItemModel(req.body);
        const allergens = req.body.allergens;

        allergens.forEach(async allergen => {
            if(AllergenModel.findOne({name:allergen.name}))
                await (AllergenModel.findOne({name:allergen.name}));
            else
                parsedAllergens.push(new AllergenModel(allergen));
        });
        AllergenModel.insertMany(parsedAllergens);
        await ingredientItem.save();

        res.status(201).json({
            message: 'Created menu item',
            data:ingredientItem
        });
    
    }catch(error){
        res.status(400).json({
            message: 'Error',
            data: error.toString()
        });
    }
});