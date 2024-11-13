const asyncHandler = require("express-async-handler");
const {AllergenModel} = require("../models/allergenModel");


exports.getAllAllergens = asyncHandler(async (req, res) => {
try{
    
    const allergens = await AllergenModel.find({});
    res.status(200).json({
        message: 'Found allergens',
        data:allergens
    });

}catch(error){
    res.status(400).json({
        message: 'Error',
        data: error.toString()
    });
}
});


exports.createAllergen = asyncHandler(async (req, res) => {
    try{
        const allergen = new AllergenModel(req.body);

        await allergen.save();

        res.status(201).json({
            message: 'Created allergen',
            data:allergen
        });
    
    }catch(error){
        res.status(400).json({
            message: 'Error',
            data: error.errorResponse
        });
    }
});
