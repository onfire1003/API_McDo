/*
-----------------------------------------------------------------------------------------------------------------------

file name           :   dishIngredient.service.js
author              :   Joel Cunha Faria
creation date       :   25.03.2026
version             :   1.0

-----------------------------------------------------------------------------------------------------------------------
*/

const DishIngredient = require('../models/dishIngredient.model');

/**
 * Retrieve all dish ingredients.
 * @returns {Promise<object[]>}
 */
async function getAllDishIngredients() {
    return await DishIngredient.findAll();
}

/**
 * Retrieve a single dish ingredient by its ID.
 * @param {number} id
 * @returns {Promise<object|null>}
 */
async function getDishIngredientById(id) {
    return await DishIngredient.findByPk(id);
}

/**
 * Create a new dish ingredient.
 * @param {object} data
 * @returns {Promise<object>}
 */
async function createDishIngredient(data) {
    return await DishIngredient.create({
        dishId: data.dishId,
        ingredientId: data.ingredientId
    });
}

/**
 * Update an existing dish ingredient.
 * @param {number} id
 * @param {object} data
 * @returns {Promise<object|null>}
 */
async function updateDishIngredient(id, data) {
    const dishIngredient = await DishIngredient.findByPk(id);

    if (!dishIngredient) return null;

    await dishIngredient.update({
        dishId: data.dishId,
        ingredientId: data.ingredientId
    });

    return dishIngredient;
}

/**
 * Delete a dish ingredient.
 * @param {number} id
 * @returns {Promise<boolean>}
 */
async function deleteDishIngredient(id) {
    const dishIngredient = await DishIngredient.findByPk(id);

    if (!dishIngredient) return false;

    await dishIngredient.destroy();
    return true;
}

module.exports = {
    getAllDishIngredients,
    getDishIngredientById,
    createDishIngredient,
    updateDishIngredient,
    deleteDishIngredient
};