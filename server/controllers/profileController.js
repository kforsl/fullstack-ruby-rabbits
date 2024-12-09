const asyncHandler = require('express-async-handler');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { CustomerModel } = require('../models/customerModel');
const generateAccessToken = async (data) =>
    await jwt.sign({ token: data }, process.env.JWT_SECRET, { expiresIn: '15min' });
exports.getCustomer = asyncHandler(async (req, res) => {
    const { userId } = req;
    const customer = CustomerModel.findById(userId);
    if (!customer) return res.status(404).json({ message: 'no user found.', data: '' });
    customer.refreshToken = '';
    customer.hash = '';

    await customer.save();
    return res.status(200).json({
        message: 'successfully got customer',
        data: customer,
    });
});
exports.updateAllergen = asyncHandler(async (req, res) => {
    try {
        res.status(200).json({
            message: 'successfully update Allergen',
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
        const user = req.customer;
        const { password, newPassword, verifyPassword } = req.body;

        if (!(await bcrypt.compare(password, user.hash))) {
            return res.status(401).json({
                message: 'Error',
                data: ['Invalid credentials'],
            });
        }

        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        if (!newPassword || newPassword.length < 8) {
            return res.status(400).json({
                message: 'Error',
                data: ['Lösenordet måste vara åtminstone 8 karaktärer långt!'],
            });
        }

        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({
                message: 'Error',
                data: [
                    'Lösenordet måste innehålla minst 1 stor bokstav, 1 liten bokstav, 1 siffra och 1 specialtecken!',
                ],
            });
        }

        if (newPassword !== verifyPassword) {
            return res.status(400).json({
                message: 'Error',
                data: ['Lösenorden stämmer inte överens!'],
            });
        }

        hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUser = await CustomerModel.findByIdAndUpdate(
            user._id,
            { hash: hashedPassword, updatedAt: new Date() },
            { new: true }
        );

        res.status(200).json({
            message: 'successfully update Password',
            data: [updatedUser],
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
        const customer = req.customer;
        const paymentOptions = req.body;
        const updatedCustomer = await CustomerModel.findByIdAndUpdate(
            customer._id,
            { ...customer, paymentOptions: [...paymentOptions] },
            { new: true }
        );
        updatedCustomer.hash = null;
        updatedCustomer.updatedAt = new Date();
        res.status(200).json({
            message: 'successfully updated payment',
            data: [updatedCustomer],
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error',
            data: [error.message],
        });
    }
});

exports.updatePersonalData = asyncHandler(async (req, res) => {
    try {
        const user = req.customer;

        if (!user) {
            throw new Error('You do not have access to this endpoint');
        }

        const updatedUser = await CustomerModel.findByIdAndUpdate(
            user._id,
            { ...req.body, updatedAt: new Date() },
            { new: true }
        );

        updatedUser.hash = null;

        res.status(200).json({
            message: 'successfully updated Personal data.',
            data: [updatedUser],
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error',
            data: [error],
        });
    }
});
