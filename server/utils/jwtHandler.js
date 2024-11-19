const jwt = require('jsonwebtoken');

exports.signCookie = () => {
    const token = jwt.sign(employee.toJSON(), process.env.JWT_SECRET, { expiresIn: '15m' });
};
