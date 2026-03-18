/*

-----------------------------------------------------------------------------------------------------------------------

file name           :   ingredient.service.js
author              :   Jason Edmonds
collaborators       :   Joel Cunha Faria, Samuel Theytaz
creation date       :   17.03.2026
modification date   :   18.03.2026
version             :   1.2

-----------------------------------------------------------------------------------------------------------------------

*/

const Ingredient = require('../models/ingredient.model');

/**
 * Retrieve all ingredients.
 * @returns {Promise<object[]>} List of all ingredients
 */
async function getAllIngredients() {
    return await Ingredient.findAll();
}

/**
 * Retrieve a single ingredient by its ID.
 * @param {number} id - The ingredient ID
 * @returns {Promise<object|null>} The ingredient, or null if not found
 */
async function getIngredientById(id) {
    return await Ingredient.findById(id);
}

/**
 * Create a new ingredient.
 * @param {object} data - The ingredient data (name, description, availability)
 * @returns {Promise<object>} The newly created ingredient
 */
async function createIngredient(data) {
    return await Ingredient.create(data.name, data.description, data.availability);
}

/**
 * Update an existing ingredient by its ID.
 * @param {number} id - The ingredient ID
 * @param {object} data - The fields to update (name, description, availability)
 * @returns {Promise<object|null>} The updated ingredient, or null if not found
 */
async function updateIngredient(id, data) {
    return await Ingredient.update(id, data.name, data.description, data.availability);
}

/**
 * Delete an ingredient by its ID.
 * @param {number} id - The ingredient ID
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
async function deleteIngredient(id) {
    return await Ingredient.remove(id);
}

module.exports = {
    getAllIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient
};