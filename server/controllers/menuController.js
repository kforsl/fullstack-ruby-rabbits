const asyncHandler = require("express-async-handler");
const {MenuItemModel} = require("../models/menuItemModel");

exports.getAllMenuItems = asyncHandler(async (req, res) => {

    const menuItems = await MenuItemModel.find({}).populate('sizes.size').populate('sizes.ingredients.ingredientItem');
    res.status(200).json({
        message:'Menu items successfully found.',
        data: menuItems
    });

});

exports.createMenuItem = asyncHandler(async (req, res) => {

    try{
        if(MenuItemModel.findOne({name: req.body.name}) === null) {
        const menuItem = new MenuItemModel(req.body);

        await menuItem.save();
        res.status(201).json({
            message: 'created menu item',
            data: menuItem
        });
    }
    else{
        res.status(400).json({
            message: 'duplicate menu item',
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
            message:"Menu item updated",
            data:menuItem
        })
    }
    catch(error){
        res.status(500).json({
            message:'Error', 
            data: error});
    }


});