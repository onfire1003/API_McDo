/*
-----------------------------------------------------------------------------------------------------------------------

file name           :   dishIngredient.controller.js
author              :   Joel Cunha Faria
creation date       :   25.03.2026
version             :   1.0

-----------------------------------------------------------------------------------------------------------------------
*/

const dishIngredientService = require('../services/dishIngredient.service');

/**
 * GET /api/v1/dish-ingredients
 * Retrieve all dish ingredients.
 */
async function getAllDishIngredients(req, res) {
    try {
        const dishIngredients = await dishIngredientService.getAllDishIngredients();
        return res.status(200).json(dishIngredients);
    } catch (error) {
        return res.status(500).json({
            message: 'Error retrieving dish ingredients',
            error: error.message
        });
    }
}

/**
 * GET /api/v1/dish-ingredients/:id
 * Retrieve a single dish ingredient by ID.
 */
async function getDishIngredientById(req, res) {
    try {
        const dishIngredient = await dishIngredientService.getDishIngredientById(req.params.id);

        if (!dishIngredient) {
            return res.status(404).json({ message: 'DishIngredient not found' });
        }

        return res.status(200).json(dishIngredient);
    } catch (error) {
        return res.status(500).json({
            message: 'Error retrieving dish ingredient',
            error: error.message
        });
    }
}

/**
 * POST /api/v1/dish-ingredients
 * Create a new dish ingredient.
 */
async function createDishIngredient(req, res) {
    try {
        const dishIngredient = await dishIngredientService.createDishIngredient(req.body);
        return res.status(201).json(dishIngredient);
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating dish ingredient',
            error: error.message
        });
    }
}

/**
 * PUT /api/v1/dish-ingredients/:id
 * Update an existing dish ingredient by ID.
 */
async function updateDishIngredient(req, res) {
    try {
        const dishIngredient = await dishIngredientService.updateDishIngredient(req.params.id, req.body);

        if (!dishIngredient) {
            return res.status(404).json({ message: 'DishIngredient not found' });
        }

        return res.status(200).json(dishIngredient);
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating dish ingredient',
            error: error.message
        });
    }
}

/**
 * DELETE /api/v1/dish-ingredients/:id
 * Delete a dish ingredient by ID.
 */
async function deleteDishIngredient(req, res) {
    try {
        const deleted = await dishIngredientService.deleteDishIngredient(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'DishIngredient not found' });
        }

        return res.status(200).json({ message: 'DishIngredient deleted successfully' });
    } catch (error) {
        return res.status(500).json({
            message: 'Error deleting dish ingredient',
            error: error.message
        });
    }
}

module.exports = {
    getAllDishIngredients,
    getDishIngredientById,
    createDishIngredient,
    updateDishIngredient,
    deleteDishIngredient
};