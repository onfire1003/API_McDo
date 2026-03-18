/*
-----------------------------------------------------------------------------------------------------------------------

file name           :   order.routes.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   12.03.2026
modification date   :   18.03.2026
version             :   0.2

-----------------------------------------------------------------------------------------------------------------------
*/

const Order = require('../models/order.model');

/**
 * Retrieve all orders.
 * @returns {Promise<object[]>} List of all orders
 */
async function getAllOrders() {
    return await Order.findAll();
}

/**
 * Retrieve a single order by its ID.
 * @param {number} id - The order ID
 * @returns {Promise<object|null>} The order, or null if not found
 */
async function getOrderById(id) {
    return await Order.findById(id);
}

/**
 * Create a new order.
 * @param {object} data - The order data (number, price, status)
 * @returns {Promise<object>} The newly created order
 */
async function createOrder(data) {
    return await Order.create(data.number, data.price, data.status);
}

/**
 * Update an existing order by its ID.
 * @param {number} id - The order ID
 * @param {object} data - The fields to update (number, price, status)
 * @returns {Promise<object|null>} The updated order, or null if not found
 */
async function updateOrder(id, data) {
    return await Order.update(id, data.number, data.price, data.status);
}

/**
 * Delete an order by its ID.
 * @param {number} id - The order ID
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
async function deleteOrder(id) {
    return await Order.remove(id);
}

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};