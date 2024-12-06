const asyncHandler = require('express-async-handler');
const { EmployeeModel } = require('../models/employeeModel');
const { CustomerModel } = require('../models/customerModel');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.authenticateEmployee = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        const employee = await EmployeeModel.findOne({ email: email });

        if (!employee) {
            res.status(401).json({
                message: 'Error',
                data: ['Invalid credentials'],
            });
        }
        if (!(await bcrypt.compare(password, employee.hash))) {
            res.status(401).json({
                message: 'Error',
                data: ['Invalid credentials'],
            });
        }
        const refreshToken = uuidv4();
        employee.refreshToken = refreshToken;

        await employee.save();

        const accessToken = jwt.sign(employee.toJSON(), process.env.JWT_SECRET, { expiresIn: '15m' });
        employee.refreshToken = null;

        res.cookie('ato', refreshToken, {
            httpOnly: true,
            secure: true,
            signed: true,
            sameSite: 'none',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        employee.hash = null;
        return res.status(200).json({
            message: 'successfully logged in',
            data: employee,
        });
    } catch (error) {
        return res.status(400).json({
            message: 'Error',
            data: error.message,
        });
    }
});

exports.registerEmployee = asyncHandler(async (req, res) => {
    try {
        const user = req.body;
        const password = user.password;
        delete user.password;
        if (!user) throw new Error('Invalid request');

        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        if (!password || password.length < 8) {
            return res.status(401).json({
                message: 'Error',
                data: ['Lösenordet måste vara åtminstone 8 karaktärer långt!'],
            });
        }
        if (!passwordRegex.test(password)) {
            return res.status(401).json({
                message: 'Error',
                data: [
                    'Lösenordet måste innehålla minst 1 stor bokstav, 1 liten bokstav, 1 siffra och 1 specialtecken!',
                ],
            });
        }
        user.hash = await bcrypt.hash(password, 10);

        const employee = new EmployeeModel(user);

        const refreshToken = uuidv4();
        employee.refreshToken = refreshToken;

        await employee.save();

        const accessToken = jwt.sign(employee.toJSON(), process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('ato', accessToken, {
            httpOnly: true,
            secure: true,
            signed: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
        });

        employee.hash = null;

        return res.status(201).json({
            message: 'successfully created new employee',
            data: [employee],
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error',
            data: [error.toString()],
        });
    }
});

exports.authenticateCustomer = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw new Error('Invalid request');

        const customer = await CustomerModel.findOne({ email: email });
        if (!customer) throw new Error('Invalid email or password');

        if (!(await bcrypt.compare(password, customer.hash))) {
            return res.status(401).json({
                message: 'Error',
                data: ['Invalid credentials'],
            });
        }
        const refreshToken = uuidv4();
        customer.refreshToken = refreshToken;

        const accessToken = jwt.sign(customer.toJSON(), process.env.JWT_SECRET, { expiresIn: '1d' });

        customer.hash = null;

        res.cookie('ato', accessToken, {
            httpOnly: true,
            secure: true,
            signed: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: 'successfully logged in as customer.',
            data: [customer],
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error',
            data: [error.message],
        });
    }
});

exports.registerCustomer = asyncHandler(async (req, res) => {
    try {
        const user = req.body;
        const { password, verifyPassword } = user;
        delete user.password;
        delete user.verifyPassword;
        if (!user) throw new Error('Invalid request');

        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        if (!password || password.length < 8) {
            return res.status(400).json({
                message: 'Error',
                data: ['Lösenordet måste vara åtminstone 8 karaktärer långt!'],
            });
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: 'Error',
                data: [
                    'Lösenordet måste innehålla minst 1 stor bokstav, 1 liten bokstav, 1 siffra och 1 specialtecken!',
                ],
            });
        }

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
        customer.hash = null;

        const accessToken = jwt.sign(customer.toJSON(), process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('ato', accessToken, {
            httpOnly: true,
            secure: true,
            signed: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(201).json({
            message: 'successfully created new customer',
            data: [customer],
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error',
            data: [error.message],
        });
    }
});

exports.refreshTokenForEmployee = asyncHandler(async (req, res) => {
    try {
        const { rto } = req;
        const { id } = req.params;

        const employee = await EmployeeModel.findById(id);

        if (!employee)
            return res.status(404).json({
                message: 'Error',
                data: `No customer with ID: ${id}.`,
            });
        if (employee.refreshToken !== rto)
            return res.status(401).json({
                message: 'Error',
                data: `Invalid token.`,
            });

        const refreshToken = uuidv4();
        employee.refreshToken = refreshToken;
        await employee.save();
        employee.refreshToken = null;
        employee.hash = null;

        const accessToken = jwt.sign(employee.toJSON(), process.env.JWT_SECRET, { expiresIn: '15m' });

        res.cookie('ato', refreshToken, {
            httpOnly: true,
            secure: true,
            signed: true,
            sameSite: 'none',
            maxAge: 15 * 60 * 1000,
        });

        return res.status(200).json({
            message: 'Refresh token succesfully updated',
            data: accessToken,
        });
    } catch (error) {
        res.status(401).json({
            message: 'Error',
            data: 'There was something wrong with the refresh token.',
        });
    }
});

exports.refreshTokenForCustomer = asyncHandler(async (req, res) => {
    try {
        const { refreshToken, id } = req;
        const customer = await CustomerModel.findById(id);
        console.log(customer);

        if (!customer)
            return res.status(404).json({
                message: 'Error',
                data: `No customer with ID: ${id}.`,
            });
        if (customer.refreshToken !== refreshToken)
            return res.status(400).json({
                message: 'Error',
                data: `Invalid token.`,
            });

        const newRefreshToken = uuidv4();
        customer.refreshToken = newRefreshToken;

        const accessToken = jwt.sign(customer.toJSON(), process.env.JWT_SECRET, { expiresIn: '1d' });
        await customer.save();

        customer.hash = null;
        res.cookie('ato', accessToken, {
            httpOnly: true,
            secure: true,
            signed: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: 'Refresh token succesfully updated',
            data: [customer],
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error',
            data: 'There was something wrong with the refresh token.',
        });
    }
});

exports.signOutCustomer = asyncHandler(async (req, res) => {
    try {
        res.clearCookie('ato');
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
