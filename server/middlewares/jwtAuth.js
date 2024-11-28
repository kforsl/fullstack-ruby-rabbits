const jwt = require('jsonwebtoken');

exports.validateAccessToken = async (req, res, next) => {
    const { ato } = req.signedCookies;
    try {
        const employee = jwt.verify(ato, process.env.JWT_SECRET);
        req.employee = employee;
        next();
    } catch (error) {
        if (ato) res.clearCookie('ato');
        else res.clearCookie('rto');

        return res.status(401).json({ message: 'Invalid Token' });
    }
};

exports.validateRefreshToken = async (req, res, next) => {
    const { rto } = req.signedCookies;
    try {
        const employee = jwt.verify(rto, process.env.REFRESH_SECRET);
        req.employee = employee;
        next();
    } catch (error) {
        res.clearCookie('rto');
        return res.status(401).json({ message: 'Invalid Refresh token' });
    }
};

exports.validateUserAsAdmin = async (req, res, next) => {
    try {
        const employee = req.employee;
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
        const employee = req.employee;
        if (employee.role === 'employee') next();
        else if (employee.role === 'manager') next();
        else throw new Error('You do not have access to this endpoint');
    } catch (error) {
        return res.status(401).json({
            message: 'Error',
            data: error.message,
        });
    }
};
exports.validateUserAsManager = async (req, res, next) => {
    try {
        const employee = req.employee;
        if (employee.role === 'manager') next();
        else throw new Error('You do not have access to this endpoint');
    } catch (error) {
        return res.status(401).json({
            message: 'Error',
            data: error.message,
        });
    }
};

exports.validateIfUserIsCustomer = async (req, res, next) => {
    const { ato } = req.signedCookies;
    try {
        const customer = jwt.verify(ato, process.env.JWT_SECRET);
        req.customer = customer;
    } catch (error) {}
    next();
};
exports.validateIfUserIsCustomerStrict = async (req, res, next) => {
    const { ato } = req.signedCookies;
    try {
        const customer = jwt.verify(ato, process.env.JWT_SECRET);
        req.customer = customer;
        next();
    } catch (error) {
        if (ato) res.clearCookie('ato');
        else res.clearCookie('rto');

        return res.status(401).json({ message: 'Invalid Token' });
    }
};
