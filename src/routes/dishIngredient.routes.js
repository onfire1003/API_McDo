/*
-----------------------------------------------------------------------------------------------------------------------

file name           :   dishIngredient.routes.js
author              :   Joel Cunha Faria
creation date       :   24.03.2026
version             :   1.0

-----------------------------------------------------------------------------------------------------------------------
*/

const express = require('express');
const router = express.Router();
const dishIngredientController = require('../controllers/dishIngredient.controller');
const authenticateToken = require('../middlewares/auth.middleware');

// GET /api/v1/dish-ingredients
router.get('/', authenticateToken, dishIngredientController.getAllDishIngredients);

// GET /api/v1/dish-ingredients/:id
router.get('/:id', authenticateToken, dishIngredientController.getDishIngredientById);

// POST /api/v1/dish-ingredients
router.post('/', authenticateToken, dishIngredientController.createDishIngredient);

// PUT /api/v1/dish-ingredients/:id
router.put('/:id', authenticateToken, dishIngredientController.updateDishIngredient);

// DELETE /api/v1/dish-ingredients/:id
router.delete('/:id', authenticateToken, dishIngredientController.deleteDishIngredient);

module.exports = router;