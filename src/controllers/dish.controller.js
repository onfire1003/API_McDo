/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   dish.controller.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   12.03.2026
modification date   :   29.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------
*/

const dishService = require('../services/dish.service');

/**
 * GET /api/v1/dishes
 * Retrieve all dishes.
 */
async function getAllDishes(req, res) {
    try {
        const dishes = await dishService.getAllDishes();
        return res.status(200).json(dishes);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving dishes', error: error.message });
    }
}

/**
 * GET /api/v1/dishes/:id
 * Retrieve a single dish by ID.
 */
async function getDishById(req, res) {
    try {
        const dish = await dishService.getDishById(req.params.id);

        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        return res.status(200).json(dish);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving dish', error: error.message });
    }
}

/**
 * POST /api/v1/dishes
 * Create a new dish.
 */
async function createDish(req, res) {
    try {
        const dish = await dishService.createDish(req.body);
        return res.status(201).json(dish);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating dish', error: error.message });
    }
}

/**
 * PUT /api/v1/dishes/:id
 * Update an existing dish by ID.
 */
async function updateDish(req, res) {
    try {
        const dish = await dishService.updateDish(req.params.id, req.body);

        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        return res.status(200).json(dish);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating dish', error: error.message });
    }
}

/**
 * DELETE /api/v1/dishes/:id
 * Delete a dish by ID.
 */
async function deleteDish(req, res) {
    try {
        const deleted = await dishService.deleteDish(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        return res.status(200).json({ message: 'Dish deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting dish', error: error.message });
    }
}

module.exports = {
    getAllDishes,
    getDishById,
    createDish,
    updateDish,
    deleteDish
};