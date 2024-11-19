const asyncHandler = require('express-async-handler');
const { EmployeeModel } = require('../models/employeeModel');
const bcrypt = require('bcryptjs');

exports.authenticate = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        const employee = await EmployeeModel.findOne({ email: email });

        if (!employee) {
            res.status(401).json({
                message: 'Error',
                data: 'Invalid credentials',
            });
        }

        if (!(await bcrypt.compare(password, employee.password))) {
            res.status(401).json({
                message: 'Error',
                data: 'Invalid credentials',
            });
        }

        res.status(200).json({
            message: 'Succesfully logged in',
            data: employee,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error',
            data: error.message,
        });
    }
});

exports.register = asyncHandler(async (req, res) => {
    try {
        const user = req.body;
        if (!user) throw new Error('Invalid request');

        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        if (!user.password || user.password.length < 8) {
            return res.status(401).json({
                message: 'Error',
                data: 'Lösenordet måste vara åtminstone 6 karaktärer långt!',
            });
        }
        if (!passwordRegex.test(user.password)) {
            return res.status(401).json({
                message: 'Error',
                data: 'Lösenordet måste innehålla minst 1 stor bokstav, 1 liten bokstav, 1 siffra och 1 specialtecken!',
            });
        }

        // const  hash =
        user.password = await bcrypt.hash(req.body.password, 12);

        const employee = new EmployeeModel(user);
        await employee.save();

        const token = jwt.sign(employee.toJSON(), process.env.JWT_SECRET, { expiresIn: '15m' });

        delete employee.password;

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            signed: true,
            maxAge: 1000000,
        });
        res.status(201).json({
            message: 'Succesfully created new employee',
            data: {},
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            data: error.message,
        });
    }
});
