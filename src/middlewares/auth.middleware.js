// middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');
const env = require('../config/env');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, env.jwtSecret, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user; // Ajouter les infos utilisateur à la requête
        next();
    });
}

module.exports = authenticateToken;