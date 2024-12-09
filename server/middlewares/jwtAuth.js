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
        next();
    } catch {}
    next();
};

exports.validateAccessTokenStrict = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const accessToken = jwt.verify(token, process.env.JWT_SECRET);
        if (accessToken) {
            req.userId = accessToken.token;
        }
        next();
    } catch {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

exports.validateRefreshTokenStrict = async (req, res, next) => {
    const { rto } = req.signedCookies;
    try {
        const verifiedRefreshToken = jwt.verify(rto, process.env.REFRESH_SECRET);

        req.refreshToken = verifiedRefreshToken.token;

        next();
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
    } catch {}
    next();
};

exports.validateUserAsAdmin = async (req, res, next) => {
    try {
        const { userId } = req;
        const employee = await EmployeeModel.findById(userId);
        if (!employee) throw new Error('No employer with this ID found');
        if (employee.role === 'admin') next();
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

        if (employee.role === 'employee') next();
        else if (employee.role === 'manager') next();
        else if (employee.role === 'admin') next();
        else throw new Error('You do not have access to this endpoint');
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

exports.validateIfUserIsCustomer = async (req, res, next) => {
    const { userId } = req;

    try {
        const customer = await CustomerModel.findById(userId);
        if (!customer) throw new Error('You do not have access to this endpoint');
        req.customer = customer;
    } catch (error) {}
    next();
};
exports.validateIfUserIsCustomerStrict = async (req, res, next) => {
    const { userId } = req;
    try {
        const customer = await CustomerModel.findById(userId);
        console.log(customer);
        req.customer = customer;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
};
