const asyncHandler = require('express-async-handler');

exports.updateAllergen = asyncHandler(async (req, res) => {
    try {
        res.status(200).json({
            message: 'Succesfully update Allergen',
            data: [],
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            data: [error],
        });
    }
});

exports.updatePassword = asyncHandler(async (req, res) => {
    try {
        console.log(req.body);

        res.status(200).json({
            message: 'Succesfully update Pawwsord',
            data: [],
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error',
            data: [error],
        });
    }
});
exports.updatePayment = asyncHandler(async (req, res) => {
    try {
        res.status(200).json({
            message: 'Succesfully updated payment',
            data: [],
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error',
            data: [error],
        });
    }
});

exports.updatePersonalData = asyncHandler(async (req, res) => {
    try {
        res.status(200).json({
            message: 'Succesfully updated Personal data.',
            data: [],
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error',
            data: [error],
        });
    }
});
