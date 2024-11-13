const asyncHandler = require('express-async-handler');
const {SizeModel} = require('../models/sizeModel');

exports.getAllSizes = asyncHandler(async (req, res) => {
    const sizes = await SizeModel.find({});
    res.json({
        message:'Sizes succesfully found',
        data: sizes
    });
});

exports.createSize = asyncHandler(async (req, res) => {
    try{
        if(!req.body.type) throw new Error('Type is required');
        if(await SizeModel.findOne({type: req.body.type}).exec()) throw new Error(`type needs to be unique.`);

        const size = new SizeModel(req.body);

        await size.save();
        res.status(200).json({
            message:'Succesfully created Size',
            data:size
        });
    }
    catch (error){
        res.status(500).json({
            message: 'Error',
            data: error
        });
    }
});