/*

-----------------------------------------------------------------------------------------------------------------------

file name           :   ingredient.routes.js
author              :   Jason Edmonds
collaborators       :   Joel Cunha Faria, Samuel Theytaz
creation date       :   17.03.2026
modification date   :   17.03.2026
version             :   1.0

-----------------------------------------------------------------------------------------------------------------------

*/

const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredient.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const authorizeRoles = require("../middlewares/role.middleware");

router.get('/', authenticateToken, authorizeRoles('admin', 'cook', 'waiter'), ingredientController.getAllIngredients);
router.get('/:id', authenticateToken, authorizeRoles('admin', 'cook', 'waiter'), ingredientController.getIngredientById);
router.post('/', authenticateToken, authorizeRoles('admin', 'cook'), ingredientController.createIngredient);
router.put('/:id', authenticateToken, authorizeRoles('admin', 'cook'), ingredientController.updateIngredient);
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'cook'), ingredientController.deleteIngredient);

module.exports = router;
