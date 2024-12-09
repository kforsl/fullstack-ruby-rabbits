const asyncHandler = require('express-async-handler');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { CustomerModel } = require('../models/customerModel');

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

        const accessToken = jwt.sign(updatedUser.toJSON(), process.env.JWT_SECRET, { expiresIn: '1h' });
        updatedUser.hash = null;

        res.cookie('ato', accessToken, {
            httpOnly: true,
            secure: true,
            signed: true,
            maxAge: 9000000,
        });

        res.status(200).json({
            message: 'successfully update Password',
            data: [updatedUser],
        });
    } catch (error) {
        console.log(error);
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
        console.log(req.body);
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

        const accessToken = jwt.sign(updatedUser.toJSON(), process.env.JWT_SECRET, { expiresIn: '1h' });
        updatedUser.hash = null;

        res.cookie('ato', accessToken, {
            httpOnly: true,
            secure: true,
            signed: true,
            maxAge: 9000000,
        });
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
