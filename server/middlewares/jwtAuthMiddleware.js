const jwt = require('jsonwebtoken');

exports.jwtAuthMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    try {
        const employee = jwt.verify(token, process.env.JWT_SECRET);
        req.employee = employee;
        next();
    } catch (error) {
        res.clearCookie('token');
        return res.status(401).json({ message: 'Invalid Token' });
    }
};
