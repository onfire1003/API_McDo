/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   ingredient.service.js
author              :   Jason Edmonds
collaborators       :   Joel Cunha Faria, Samuel Theytaz
creation date       :   11.03.2026
modification date   :   29.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------
*/

const Ingredient = require('../models/ingredient.model');

/**
 * Retrieve all ingredients.
 */
async function getAllIngredients() {
    return await Ingredient.findAll();
}

/**
 * Retrieve a single ingredient by its ID.
 * @param {number} id
 */
async function getIngredientById(id) {
    return await Ingredient.findByPk(id);
}

/**
 * Create a new ingredient.
 * @param {object} data - { name, description, availability }
 */
async function createIngredient(data) {
    return await Ingredient.create({
        name: data.name,
        description: data.description,
        availability: data.availability ?? false // default to false if undefined
    });
}

/**
 * Update an existing ingredient by its ID.
 */
async function updateIngredient(id, data) {
    const ingredient = await Ingredient.findByPk(id);
    if (!ingredient) return null;

    await ingredient.update({
        name: data.name,
        description: data.description,
        availability: data.availability
    });

    return ingredient;
}

/**
 * Delete an ingredient by its ID.
 */
async function deleteIngredient(id) {
    const ingredient = await Ingredient.findByPk(id);
    if (!ingredient) return false;

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