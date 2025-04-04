const jwt = require('jsonwebtoken');
const UserModal = require('../modals/UserModal');

const JWT_SECRET = 'semalmahajan';

exports.authMiddleware = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            msg: 'No token provided or wrong format',
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = await UserModal.findById(decoded.id);

        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};
