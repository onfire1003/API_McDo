/*

-----------------------------------------------------------------------------------------------------------------------

file name           :   ingredient.controller.js
author              :   Jason Edmonds
collaborators       :   Joel Cunha Faria, Samuel Theytaz
creation date       :   17.03.2026
modification date   :   17.03.2026
version             :   1.0

-----------------------------------------------------------------------------------------------------------------------

*/

const ingredientService = require('../services/ingredient.service');

/**
 * GET /api/v1/ingredients
 * Retrieve all ingredients.
 */
async function getAllIngredients(req, res) {
    try {
        const ingredients = await ingredientService.getAllIngredients();
        return res.status(200).json(ingredients);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving ingredients', error: error.message });
    }
}

/**
 * GET /api/v1/ingredients/:id
 * Retrieve a single ingredient by ID.
 */
async function getIngredientById(req, res) {
    try {
        const ingredient = await ingredientService.getIngredientById(req.params.id);

        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        return res.status(200).json(ingredient);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving ingredient', error: error.message });
    }
}

/**
 * POST /api/v1/ingredients
 * Create a new ingredient.
 */
async function createIngredient(req, res) {
    try {
        const ingredient = await ingredientService.createIngredient(req.body);
        return res.status(201).json(ingredient);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating ingredient', error: error.message });
    }
}

/**
 * PUT /api/v1/ingredients/:id
 * Update an existing ingredient by ID.
 */
async function updateIngredient(req, res) {
    try {
        const ingredient = await ingredientService.updateIngredient(req.params.id, req.body);

        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        return res.status(200).json(ingredient);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating ingredient', error: error.message });
    }
}

/**
 * DELETE /api/v1/ingredients/:id
 * Delete an ingredient by ID.
 */
async function deleteIngredient(req, res) {
    try {
        const deleted = await ingredientService.deleteIngredient(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        return res.status(200).json({ message: 'Ingredient deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting ingredient', error: error.message });
    }
}

module.exports = {
    getAllIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient
};
