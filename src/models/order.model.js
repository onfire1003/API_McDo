/*

-----------------------------------------------------------------------------------------------------------------------
file name           :   order.model.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   12.03.2026
modification date   :   18.03.2026
version             :   0.2
-----------------------------------------------------------------------------------------------------------------------
Model for the orders table.

This file handles:
- finding an order by id
- creating an order
- deleting an order
*/

const db = require('../config/database');

/**
 * Retrieve all orders from the database.
 * @returns {Promise<object[]>} List of all orders
 */
async function findAll() {
    const [rows] = await db.query('SELECT * FROM orders');
    return rows;
}

/**
 * Retrieve a single order by its ID.
 * @param {number} id - The order ID
 * @returns {Promise<object|null>} The order, or null if not found
 */
async function findById(id) {
    const [rows] = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
    return rows[0] || null;
}

/**
 * Create a new order.
 * @param {string} number - The order number
 * @param {number} price - The order price
 * @param {string} status - The order status
 * @returns {Promise<object>} The newly created order
 */
async function create(number, price, status = 'en_attente') {
    const [result] = await db.query(
        'INSERT INTO orders (number, price, status) VALUES (?, ?, ?)',
        [number, price, status]
    );
    return findById(result.insertId);
}

/**
 * Update an existing order by its ID.
 * @param {number} id - The order ID
 * @param {string} number - The updated order number
 * @param {number} price - The updated price
 * @param {string} status - The updated status
 * @returns {Promise<object|null>} The updated order, or null if not found
 */
async function update(id, number, price, status) {
    const [result] = await db.query(
        'UPDATE orders SET number = ?, price = ?, status = ? WHERE id = ?',
        [number, price, status, id]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return findById(id);
}

/**
 * Delete an order by its ID.
 * @param {number} id - The order ID
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
async function remove(id) {
    const [result] = await db.query('DELETE FROM orders WHERE id = ?', [id]);
    return result.affectedRows > 0;
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};