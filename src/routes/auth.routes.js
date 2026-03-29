/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   auth.routes.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   25.03.2026
modification date   :   29.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------
*/
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;