const asyncHandler = require("express-async-handler");
const {MenuItemModel} = require("../models/menuItemModel");

exports.getAllMenuItems = asyncHandler(async (req, res) => {

    const menuItems = await MenuItemModel.find({});
    res.status(200).json({
        message:'Menu items successfully found.',
        data: menuItems
    });

});

exports.createMenuItem = asyncHandler(async (req, res) => {

    try{
        const menuItem = new MenuItemModel(req.body);
        await menuItem.save();
        res.status(201).json({
            message: 'created menu item',
            data: menuItem
        });
    
    }catch(error){
        res.status(400).json({
            message: 'Error',
            data: error
        });
    }
});