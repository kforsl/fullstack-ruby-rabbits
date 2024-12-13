const jwt = require('jsonwebtoken');
const { CustomerModel } = require('../models/customerModel');
const { EmployeeModel } = require('../models/employeeModel');

exports.validateAccessToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const accessToken = jwt.verify(token, process.env.JWT_SECRET);
        if (accessToken) {
            req.userId = accessToken.token;
        }
        return next();
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.validateAccessTokenStrict = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const accessToken = jwt.verify(token, process.env.JWT_SECRET);
        if (accessToken) {
            req.userId = accessToken.token;
        }
        return next();
    } catch {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

exports.validateRefreshTokenStrict = async (req, res, next) => {
    const { rto } = req.signedCookies;
    try {
        const verifiedRefreshToken = jwt.verify(rto, process.env.REFRESH_SECRET);

        req.refreshToken = verifiedRefreshToken.token;

        return next();
    } catch {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

exports.validateRefreshToken = async (req, res, next) => {
    const { rto } = req.signedCookies;
    const { id } = req.params;
    try {
        const verifiedRefreshToken = jwt.verify(rto, process.env.REFRESH_SECRET);
        req.id = id;
        req.refreshToken = verifiedRefreshToken.token;

        return next();
    } catch {
        next();
    }
};

exports.validateUserAsAdmin = async (req, res, next) => {
    try {
        const { userId } = req;
        const employee = await EmployeeModel.findById(userId);
        if (!employee) throw new Error('No employer with this ID found');
        if (employee.role === 'admin') return next();
        else throw new Error('You do not have access to this endpoint');
    } catch (error) {
        return res.status(401).json({
            message: 'Error',
            data: error.message,
        });
    }
};

exports.validateUserAsEmployee = async (req, res, next) => {
    try {
        const { userId } = req;

        const employee = await EmployeeModel.findById(userId);
        if (!employee) throw new Error('No employer with this ID found');

        if (employee.role === 'employee') return next();
        if (employee.role === 'manager') return next();
        if (employee.role === 'admin') return next();
        throw new Error('You do not have access to this endpoint');
    } catch (error) {
        return res.status(403).json({
            message: 'Error',
            data: error.message,
        });
    }
};
exports.validateUserAsManager = async (req, res, next) => {
    try {
        const { userId } = req;

        const employee = await EmployeeModel.findById(userId);
        if (!employee) throw new Error('No employer with this ID found');
        if (employee.role === 'manager') next();
        if (employee.role === 'admin') next();
        else throw new Error('You do not have access to this endpoint');
    } catch (error) {
        return res.status(401).json({
            message: 'Error',
            data: error.message,
        });
    }
};

exports.validateUserAsCustomer = async (req, res, next) => {
    const { userId } = req;
    try {
        const customer = await CustomerModel.findById(userId);
        console.log('INNE I VALIDATEASCUSTOMER', customer);
        req.customer = customer;
        return next();
    } catch {
        next();
    }
};
exports.validateUserAsCustomerStrict = async (req, res, next) => {
    const { userId } = req;
    try {
        const customer = await CustomerModel.findById(userId);
        if (!customer) return res.status(400).json({ message: 'You have no access to this section' });
        req.customer = customer;
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
};
exports.validateUserAsCustomerOrEmployeeStrict = async (req, res, next) => {
    const { userId } = req;
    try {
        const customer = await CustomerModel.findById(userId);
        if (!customer) {
            const employee = await EmployeeModel.findById(userId);
            if (!employee) return res.status(400).json({ message: 'You have no access to this section' });
            req.employee = employee;
            return next();
        }
        req.customer = customer;
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
};
