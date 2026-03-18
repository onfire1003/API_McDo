/*

-----------------------------------------------------------------------------------------------------------------------

file name           :   ingredient.model.js
author              :   Jason Edmonds
collaborators       :   Joel Cunha Faria, Samuel Theytaz
creation date       :   17.03.2026
modification date   :   18.03.2026
version             :   1.2

-----------------------------------------------------------------------------------------------------------------------

*/

const db = require('../config/database');

/**
 * Retrieve all ingredients from the database.
 * @returns {Promise<object[]>} List of all ingredients
 */
async function findAll() {
    const [rows] = await db.query('SELECT * FROM ingredients');
    return rows;
}

/**
 * Retrieve a single ingredient by its ID.
 * @param {number} id - The ingredient ID
 * @returns {Promise<object|null>} The ingredient, or null if not found
 */
async function findById(id) {
    const [rows] = await db.query('SELECT * FROM ingredients WHERE id = ?', [id]);
    return rows[0] || null;
}

/**
 * Create a new ingredient.
 * @param {string} name - The ingredient name
 * @param {string} description - The ingredient description
 * @param {boolean} availability - Whether the ingredient is available
 * @returns {Promise<object>} The newly created ingredient
 */
async function create(name, description, availability) {
    const [result] = await db.query(
        'INSERT INTO ingredients (name, description, availability) VALUES (?, ?, ?)',
        [name, description, availability]
    );
    return findById(result.insertId);
}

/**
 * Update an existing ingredient by its ID.
 * @param {number} id - The ingredient ID
 * @param {string} name - The updated name
 * @param {string} description - The updated description
 * @param {boolean} availability - The updated availability
 * @returns {Promise<object|null>} The updated ingredient, or null if not found
 */
async function update(id, name, description, availability) {
    const [result] = await db.query(
        'UPDATE ingredients SET name = ?, description = ?, availability = ? WHERE id = ?',
        [name, description, availability, id]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return findById(id);
}

/**
 * Delete an ingredient by its ID.
 * @param {number} id - The ingredient ID
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
async function remove(id) {
    const [result] = await db.query('DELETE FROM ingredients WHERE id = ?', [id]);
    return result.affectedRows > 0;
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};