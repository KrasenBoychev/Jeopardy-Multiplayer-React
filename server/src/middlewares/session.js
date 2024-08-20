const { verifyToken } = require('../services/jwt');

function session() {
    return function(req, res, next) {
        const accessToken = req.headers['x-authorization'];

        if (accessToken) {
            try {
                const sessionData = verifyToken(accessToken);
                req.user = {
                    email: sessionData.email,
                    _id: sessionData._id
                };
                res.locals.hasUser = true;
            } catch(err) {
                res.status(401).json({code: 401, message: 'Invalid or expired token' });
                return;
            }
        }
        next();
    };
}

module.exports = {
    session
};