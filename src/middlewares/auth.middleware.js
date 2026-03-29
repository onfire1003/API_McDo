/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   auth.middleware.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   25.03.2026
modification date   :   29.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------
*/
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