const asyncHandler = require('express-async-handler');
const {AllergenModel} = require('../models/allergenModel');


exports.getAllAllergens = asyncHandler(async (req, res) => {
try{
    
    const allergens = await AllergenModel.find({});
    res.status(200).json({
        message: 'Allergens succesfully found',
        data:allergens
    });

}catch(error){
    res.status(500).json({
        message: 'Error',
        data: error
    });
}
});


exports.createAllergen = asyncHandler(async (req, res) => {
    try{
        const allergen = new AllergenModel(req.body);

        await allergen.save();

        res.status(201).json({
            message: 'Succesfully created Allergen',
            data:allergen
        });
    
    }catch(error){
        res.status(400).json({
            message: 'Error',
            data: error.errorResponse
        });
    }
});
