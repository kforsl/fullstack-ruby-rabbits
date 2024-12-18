const asyncHandler = require('express-async-handler');
const { ProductModel } = require('../models/productModel');

exports.createProduct = asyncHandler(async (req, res) => {
    try {
        const product = new ProductModel(req.body);

        await product.save();

        res.status(201).json({
            message: 'successfully created product',
            data: [product],
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            data: [error],
        });
    }
});

exports.getAllProducts = asyncHandler(async (req, res) => {
    try {
        const products = await ProductModel.find({}).populate('ingredients.ingredient');

        res.status(200).json({
            message: 'successfully found products',
            data: products,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error',
            data: [error],
        });
    }
});
exports.updateProductById = asyncHandler(async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: new Date() },
            { new: true }
        );
        res.status(200).json({
            message: 'successfully updated product.',
            data: [product],
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error',
            data: [error],
        });
    }
});

exports.getProductById = asyncHandler(async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id).populate('ingredients.ingredient');
        if (!product) {
            res.status(404).json({
                message: 'Error',
                data: 'Product not found.',
            });
        }
        res.status(200).json({
            message: 'successfully found product.',
            data: [product],
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error',
            data: [error],
        });
    }
});
