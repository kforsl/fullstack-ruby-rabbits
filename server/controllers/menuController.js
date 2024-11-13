const asyncHandler = require('express-async-handler');
const {MenuItemModel} = require('../models/menuItemModel');

exports.getAllMenuItems = asyncHandler(async (req, res) => {

    const menuItems = await MenuItemModel.find({}).populate('sizes.size').populate('sizes.ingredients.ingredientItem');
    res.status(200).json({
        message:'Menu items successfully found',
        data: menuItems
    });

});

exports.createMenuItem = asyncHandler(async (req, res) => {

    try{
        if(MenuItemModel.findOne({name: req.body.name}) === null) {
        const menuItem = new MenuItemModel(req.body);

        await menuItem.save();
        res.status(201).json({
            message: 'Succesfully created Menu-item',
            data: menuItem
        });
    }
    else{
        res.status(400).json({
            message: 'Duplicate Menu-item',
            data: 'There is already an item with that name in the database'
        });
    }
    
    }catch(error){
        res.status(500).json({
            message: 'Error',
            data: error
        });
    }
});

exports.updateMenuItem = asyncHandler(async (req, res) => {
    try{
        const menuItem = await MenuItemModel.findByIdAndUpdate(req.params.id, req.body,{new: true});
        await menuItem.save();
        res.status(200).json({
            message:'Succesfully updated Menu-item',
            data:menuItem
        })
    }
    catch(error){
        res.status(500).json({
            message:'Error', 
            data: error
        });
    }


});