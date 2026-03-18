/*

-----------------------------------------------------------------------------------------------------------------------

file name           :   dishIngredient.model.js
author              :   Jason Edmonds
collaborators       :   Joel Cunha Faria, Samuel Theytaz
creation date       :   17.03.2026
modification date   :   18.03.2026
version             :   1.2

-----------------------------------------------------------------------------------------------------------------------

*/

const db = require('../config/database');

/**
 * Retrieve all ingredients linked to a specific dish.
 * @param {number} dishId - The dish ID
 * @returns {Promise<object[]>} List of ingredients for the dish
 */
async function findIngredientsByDish(dishId) {
    const [rows] = await db.query(
        `SELECT i.*
         FROM ingredients i
                  INNER JOIN dishes_has_ingredients dhi ON dhi.ingredient_id = i.id
         WHERE dhi.dish_id = ?`,
        [dishId]
    );
    return rows;
}

/**
 * Link an ingredient to a dish.
 * @param {number} dishId - The dish ID
 * @param {number} ingredientId - The ingredient ID
 * @returns {Promise<object>} The created relation
 */
async function addIngredientToDish(dishId, ingredientId) {
    const [result] = await db.query(
        'INSERT INTO dishes_has_ingredients (dish_id, ingredient_id) VALUES (?, ?)',
        [dishId, ingredientId]
    );
    return { id: result.insertId, dish_id: dishId, ingredient_id: ingredientId };
}

/**
 * Remove a link between a dish and an ingredient.
 * @param {number} dishId - The dish ID
 * @param {number} ingredientId - The ingredient ID
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
async function removeIngredientFromDish(dishId, ingredientId) {
    const [result] = await db.query(
        'DELETE FROM dishes_has_ingredients WHERE dish_id = ? AND ingredient_id = ?',
        [dishId, ingredientId]
    );
    return result.affectedRows > 0;
}

module.exports = {
    findIngredientsByDish,
    addIngredientToDish,
    removeIngredientFromDish
};
