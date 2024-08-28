const { adminId } = require('../api-keys');

function isUser() {
    return function(req, res, next) {
        if (!req.user) {
            res.status(401).json({ code: 401, message: 'Missing credentials. Please login.' });
        } else {
            next();
        }
    };
}

function isGuest() {
    return function(req, res, next) {
        if (req.user) {
            res.redirect('/');
        } else {
            next();
        }
    };
}

function isAdmin() {
    return function(req, res, next) {
        if (req.user && req.user._id == adminId) {
            next();
        } else {
            res.redirect('/');
        }
    };
}

module.exports = {
    isUser,
    isGuest,
    isAdmin
};