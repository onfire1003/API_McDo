/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   dish.routes.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   12.03.2026
modification date   :   24.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------

Routes for dishes.
This file handles:
- checking that the dish route is active
- creating, updating, retrieving, and deleting dishes
*/

const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dish.controller');
const authenticateToken = require('../middlewares/auth.middleware');

// GET /api/v1/dishes
router.get('/', authenticateToken, dishController.getAllDishes);

// GET /api/v1/dishes/:id
router.get('/:id', authenticateToken, dishController.getDishById);

// POST /api/v1/dishes
router.post('/', authenticateToken, dishController.createDish);

// PUT /api/v1/dishes/:id
router.put('/:id', authenticateToken, dishController.updateDish);

// DELETE /api/v1/dishes/:id
router.delete('/:id', authenticateToken, dishController.deleteDish);

module.exports = router;