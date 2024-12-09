const asyncHandler = require('express-async-handler');
const { EmployeeModel } = require('../models/employeeModel');
const { CustomerModel } = require('../models/customerModel');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const errorMessages = require('../responses/responses');
const jwt = require('jsonwebtoken');

const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const generateRefreshToken = async (data) =>
    await jwt.sign({ token: data }, process.env.REFRESH_SECRET, { expiresIn: '30d' });
const generateAccessToken = async (data) =>
    await jwt.sign({ token: data }, process.env.JWT_SECRET, { expiresIn: '15min' });

exports.authenticateEmployee = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json(errorMessages.invalidCredentials.message);

        const employee = await EmployeeModel.findOne({ email: email });

        if (!employee) throw new Error(errorMessages.invalidCredentials.message);
        if (!(await bcrypt.compare(password, employee.hash)))
            return res.status(400).json(errorMessages.invalidCredentials.message);
        employee.refreshToken = uuidv4();
        const refreshToken = await generateRefreshToken(employee.refreshToken);

        await employee.save();

        const accessToken = await generateAccessToken(employee._id);

        const employeeData = {
            _id: employee._id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            role: employee.role,
            address: employee.address,
            zipcode: employee.zipcode,
            city: employee.city,
            socialSecurityNumber: employee.socialSecurityNumber,
            phone: employee.phone,
            createdAt: employee.createdAt,
            updatedAt: employee.updatedAt,
            __v: employee.__v,
        };

        res.cookie('rto', refreshToken, {
            httpOnly: true,
            secure: true,
            signed: true,
            sameSite: 'none',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: 'successfully logged in',
            data: employeeData,
            token: accessToken,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'ERROR',
            data: [error.message],
        });
    }
});

exports.registerEmployee = asyncHandler(async (req, res) => {
    try {
        const user = req.body;
        const password = user.password;
        delete user.password;
        if (!user) throw new Error(errorMessages.invalidCredentials());

        if (!password || password.length < 8) return res.status(400).json(errorMessages.passwordNotLongEnough);
        if (!passwordRegex.test(password)) return res.status(400).json(errorMessages.passwordNotRegexValid);

        user.hash = await bcrypt.hash(password, 10);

        const employee = new EmployeeModel(user);

        const refreshToken = uuidv4();
        employee.refreshToken = refreshToken;

        await employee.save();

        const accessToken = await generateAccessToken(employee._id);

        res.cookie('rto', refreshToken, {
            httpOnly: true,
            secure: true,
            signed: true,
            sameSite: 'none',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        const employeeData = {
            _id: employee._id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            role: employee.role,
            address: employee.address,
            zipcode: employee.zipcode,
            city: employee.city,
            socialSecurityNumber: employee.socialSecurityNumber,
            phone: employee.phone,
            createdAt: employee.createdAt,
            updatedAt: employee.updatedAt,
            __v: employee.__v,
        };
        return res.status(201).json({
            message: 'successfully created new employee',
            data: employeeData,
            token: accessToken,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error',
            data: [error],
        });
    }
});

exports.authenticateCustomer = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) throw new Error(errorMessages.invalidCredentials.message);

        const customer = await CustomerModel.findOne({ email: email }).populate('paymentOptions');

        if (!customer) throw new Error(errorMessages.invalidCredentials.message);

        if (!(await bcrypt.compare(password, customer.hash))) throw new Error(errorMessages.invalidCredentials.message);

        customer.refreshToken = uuidv4();
        const refreshToken = await generateRefreshToken(customer.refreshToken);

        await customer.save();

        const accessToken = await generateAccessToken(customer._id);

        const customerData = {
            _id: customer._id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            address: customer.address,
            zipcode: customer.zipcode,
            city: customer.city,
            socialSecurityNumber: customer.socialSecurityNumber,
            phone: customer.phone,
            createdAt: customer.createdAt,
            updatedAt: customer.updatedAt,
            __v: customer.__v,
            paymentOptions: customer.paymentOptions,
        };
        res.cookie('rto', refreshToken, {
            httpOnly: true,
            secure: true,
            signed: true,
            sameSite: 'none',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
            message: 'successfully logged in as customer.',
            data: customerData,
            token: accessToken,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'ERROR',
            data: [error],
        });
    }
});

exports.registerCustomer = asyncHandler(async (req, res) => {
    try {
        const user = req.body;
        const { password, verifyPassword } = user;
        delete user.password;
        delete user.verifyPassword;

        if (!user) throw new Error(errorMessages.invalidCredentials);

        if (!password || password.length < 8) throw new Error(errorMessages.passwordNotLongEnough);

        if (!passwordRegex.test(password)) throw new Error(errorMessages.passwordNotRegexValid);

        if (password !== verifyPassword) {
            return res.status(400).json({
                message: 'Error',
                data: ['Lösenorden stämmer inte överens!'],
            });
        }
        user.hash = await bcrypt.hash(password, 10);
        const customer = new CustomerModel(user);

        const refreshToken = uuidv4();
        customer.refreshToken = refreshToken;

        await customer.save();

        const accessToken = await generateAccessToken(customer._id);

        res.cookie('rto', refreshToken, {
            httpOnly: true,
            secure: true,
            signed: true,
            sameSite: 'none',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return res.status(201).json({
            message: 'successfully created new customer',
            data: customerData,
            token: accessToken,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error',
            data: [error.message],
        });
    }
});

exports.refreshToken = asyncHandler(async (req, res) => {
    try {
        const { refreshToken } = req;
        const customer = await CustomerModel.findOne({ refreshToken: refreshToken });
        const employee = await EmployeeModel.findOne({ refreshToken: refreshToken });
        if (!customer && !employee) throw new Error('User data is not valid.');
        if (customer) {
            customer.refreshToken = uuidv4();

            await customer.save();
            const newRefreshToken = await generateRefreshToken(customer.refreshToken);

            const accessToken = await generateAccessToken(customer._id);

            res.cookie('rto', newRefreshToken, {
                httpOnly: true,
                secure: true,
                signed: true,
                sameSite: 'none',
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });
            const customerData = {
                _id: customer._id,
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email,
                address: customer.address,
                zipcode: customer.zipcode,
                city: customer.city,
                socialSecurityNumber: customer.socialSecurityNumber,
                phone: customer.phone,
                createdAt: customer.createdAt,
                updatedAt: customer.updatedAt,
                __v: customer.__v,
                paymentOptions: customer.paymentOptions,
            };
            return res.status(200).json({
                message: 'Refresh token succesfully updated',
                data: customerData,
                token: accessToken,
            });
        } else {
            employee.refreshToken = uuidv4();

            await employee.save();
            const newRefreshToken = await generateRefreshToken(employee.refreshToken);

            const accessToken = await generateAccessToken(employee._id);
            res.cookie('rto', newRefreshToken, {
                httpOnly: true,
                secure: true,
                signed: true,
                sameSite: 'none',
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });

            const employeeData = {
                _id: employee._id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                role: employee.role,
                address: employee.address,
                zipcode: employee.zipcode,
                city: employee.city,
                socialSecurityNumber: employee.socialSecurityNumber,
                phone: employee.phone,
                createdAt: employee.createdAt,
                updatedAt: employee.updatedAt,
                __v: employee.__v,
            };
            return res.status(200).json({
                message: 'Refresh token succesfully updated',
                data: employeeData,
                token: accessToken,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'ERROR',
            data: error.message,
        });
    }
});

exports.signOut = asyncHandler(async (req, res) => {
    const { userId } = req;
    const customer = await CustomerModel.findById(userId);
    const employee = await EmployeeModel.findById(userId);

    if (!employee && !customer) return res.status(404).json({ message: 'no user found.', data: [] });
    if (employee) {
        employee.refreshToken = '';
        await employee.save();
    }
    if (customer) {
        customer.refreshToken = '';
        await customer.save();
    }
    try {
        res.clearCookie('rto');

        return res.status(200).json({
            message: 'Logged out succesfully',
            data: [],
        });
    } catch (e) {
        return res.status(400).json({
            message: 'Logging out was unsuccessfull',
            data: [],
        });
    }
});

exports.verifyAccessToken = asyncHandler(async (req, res) => {
    if (req.accessToken) {
        return res.status(200).json({
            message: 'Access token verified',
            data: req.body.accessToken,
        });
    } else {
        return res.status(401).json({
            message: 'Unauthorized',
            data: '',
        });
    }
});
