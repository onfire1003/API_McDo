/*

-----------------------------------------------------------------------------------------------------------------------

file name           :   ingredient.service.js
author              :   Jason Edmonds
collaborators       :   Joel Cunha Faria, Samuel Theytaz
creation date       :   17.03.2026
modification date   :   17.03.2026
version             :   1.0

-----------------------------------------------------------------------------------------------------------------------

*/

const Ingredient = require('../models/ingredient.model');

/**
 * Retrieve all ingredients from the database.
 * @returns {Promise<Ingredient[]>} List of all ingredients
 */
async function getAllIngredients() {
    return await Ingredient.findAll();
}

/**
 * Retrieve a single ingredient by its ID.
 * @param {number} id - The ingredient ID
 * @returns {Promise<Ingredient|null>} The ingredient, or null if not found
 */
async function getIngredientById(id) {
    return await Ingredient.findByPk(id);
}

/**
 * Create a new ingredient.
 * @param {object} data - The ingredient data (name, description, inStock)
 * @returns {Promise<Ingredient>} The newly created ingredient
 */
async function createIngredient(data) {
    return await Ingredient.create(data);
}

/**
 * Update an existing ingredient by its ID.
 * @param {number} id - The ingredient ID
 * @param {object} data - The fields to update
 * @returns {Promise<Ingredient|null>} The updated ingredient, or null if not found
 */
async function updateIngredient(id, data) {
    const ingredient = await Ingredient.findByPk(id);

    if (!ingredient) {
        return null;
    }

    return await ingredient.update(data);
}

/**
 * Delete an ingredient by its ID.
 * @param {number} id - The ingredient ID
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
async function deleteIngredient(id) {
    const ingredient = await Ingredient.findByPk(id);

    if (!ingredient) {
        return false;
    }

    await ingredient.destroy();
    return true;
}

module.exports = {
    getAllIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient
};