const asyncHandler = require('express-async-handler');
const { EmployeeModel } = require('../models/employeeModel');
const { CustomerModel } = require('../models/customerModel');

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
        const refreshToken = jwt.sign(employee.toJSON(), process.env.REFRESH_SECRET, { expiresIn: '5d' });
        employee.refreshToken = refreshToken;

        const accessToken = jwt.sign(employee.toJSON(), process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('ato', accessToken, {
            httpOnly: true,
            secure: true,
            signed: true,
            maxAge: 9000000,
        });

        res.cookie('rto', refreshToken, {
            httpOnly: true,
            secure: true,
            signed: true,
            maxAge: 432000000,
        });

        employee.hash = null;
        return res.status(200).json({
            message: 'Succesfully logged in',
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
        const refreshToken = jwt.sign(employee.toJSON(), process.env.REFRESH_SECRET, { expiresIn: '2d' });
        employee.refreshToken = refreshToken;

        await employee.save();

        const accessToken = jwt.sign(employee.toJSON(), process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('ato', accessToken, {
            httpOnly: true,
            secure: true,
            signed: true,
            maxAge: 9000000,
        });

        employee.hash = null;
        return res.status(201).json({
            message: 'Succesfully created new employee',
            data: [employee],
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error',
            data: [error.message],
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
        user.hash = await bcrypt.hash(password, 10);
        const refreshToken = jwt.sign(customer.toJSON(), process.env.REFRESH_SECRET, { expiresIn: '2d' });
        customer.refreshToken = refreshToken;

        await customer.save();

        const accessToken = jwt.sign(customer.toJSON(), process.env.JWT_SECRET, { expiresIn: '1h' });

        const refreshToken = jwt.sign(customer.toJSON(), process.env.REFRESH_SECRET, { expiresIn: '2d' });
        customer.refreshToken = refreshToken;
        await customer.save();

        const accessToken = jwt.sign(customer.toJSON(), process.env.JWT_SECRET, { expiresIn: '1h' });
        customer.hash = null;

        res.cookie('ato', accessToken, {
            httpOnly: true,
            secure: true,
            signed: true,
            maxAge: 9000000,
        });

        return res.status(200).json({
            message: 'Succesfully logged in as customer.',
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
        delete customer.hash;
        const customer = new CustomerModel(user);
        const refreshToken = jwt.sign(customer.toJSON(), process.env.REFRESH_SECRET, { expiresIn: '2d' });
        customer.refreshToken = refreshToken;

        await customer.save();

        const accessToken = jwt.sign(customer.toJSON(), process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('ato', accessToken, {
            httpOnly: true,
            secure: true,
            signed: true,
            maxAge: 9000000,
        });

        return res.status(201).json({
            message: 'Succesfully created new customer',
            data: [customer],
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
        console.log(req.employee);
        return res.status(200).json({ employee: req.employee });
    } catch (error) {
        res.status(401).json({
            message: 'Error',
            data: 'There was something wrong with the refresh token.',
        });
    }
});
