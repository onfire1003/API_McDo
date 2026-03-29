/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   auth.model.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   25.03.2026
modification date   :   29.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------
*/
const authService = require('../services/auth.service');

async function register(req, res) {
    try {
        const user = await authService.registerUser(req.body);
        return res.status(201).json({ message: 'User registered', user });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const data = await authService.loginUser(email, password);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = { register, login };