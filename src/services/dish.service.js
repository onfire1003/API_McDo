/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   dish.service.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   12.03.2026
modification date   :   24.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------
*/

const Dish = require('../models/dish.model');

/**
 * Retrieve all dishes.
 * @returns {Promise<object[]>} List of all dishes
 */
async function getAllDishes() {
    return await Dish.findAll();
}

/**
 * Retrieve a single dish by its ID.
 * @param {number} id - The dish ID
 * @returns {Promise<object|null>} The dish, or null if not found
 */
async function getDishById(id) {
    return await Dish.findByPk(id);
}

/**
 * Create a new dish.
 * @param {object} data - The dish data (name, description, price, availability, size)
 * @returns {Promise<object>} The newly created dish
 */
async function createDish(data) {
    return await Dish.create({
        name: data.name,
        description: data.description,
        price: data.price,
        availability: data.availability,
        size: data.size
    });
}

/**
 * Update an existing dish by its ID.
 * @param {number} id - The dish ID
 * @param {object} data - The fields to update (name, description, price, availability, size)
 * @returns {Promise<object|null>} The updated dish, or null if not found
 */
async function updateDish(id, data) {
    const dish = await Dish.findByPk(id);

    if (!dish) return null;

    await dish.update({
        name: data.name,
        description: data.description,
        price: data.price,
        availability: data.availability,
        size: data.size
    });

    return dish;
}

/**
 * Delete a dish by its ID.
 * @param {number} id - The dish ID
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
async function deleteDish(id) {
    const dish = await Dish.findByPk(id);

    if (!dish) return false;

    await dish.destroy();
    return true;
}

module.exports = {
    getAllDishes,
    getDishById,
    createDish,
    updateDish,
    deleteDish
};