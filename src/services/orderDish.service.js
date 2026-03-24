/*
-----------------------------------------------------------------------------------------------------------------------

file name           :   orderDish.service.js
author              :   Joel Cunha Faria
creation date       :   24.03.2026
version             :   1.0

-----------------------------------------------------------------------------------------------------------------------
*/

const OrderDish = require('../models/orderDish.model');

/**
 * Retrieve all order dishes.
 * @returns {Promise<object[]>} List of all order dishes
 */
async function getAllOrderDishes() {
    return await OrderDish.findAll();
}

/**
 * Retrieve a single order dish by its ID.
 * @param {number} id - The orderDish ID
 * @returns {Promise<object|null>} The orderDish, or null if not found
 */
async function getOrderDishById(id) {
    return await OrderDish.findByPk(id);
}

/**
 * Create a new order dish.
 * @param {object} data - The orderDish data (orderId, dishId, quantity)
 * @returns {Promise<object>} The newly created orderDish
 */
async function createOrderDish(data) {
    return await OrderDish.create({
        orderId: data.orderId,
        dishId: data.dishId,
        quantity: data.quantity
    });
}

/**
 * Update an existing order dish by its ID.
 * @param {number} id - The orderDish ID
 * @param {object} data - The fields to update
 * @returns {Promise<object|null>} The updated orderDish, or null if not found
 */
async function updateOrderDish(id, data) {
    const orderDish = await OrderDish.findByPk(id);

    if (!orderDish) return null;

    await orderDish.update({
        orderId: data.orderId,
        dishId: data.dishId,
        quantity: data.quantity
    });

    return orderDish;
}

/**
 * Delete an order dish by its ID.
 * @param {number} id - The orderDish ID
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
async function deleteOrderDish(id) {
    const orderDish = await OrderDish.findByPk(id);

    if (!orderDish) return false;

    await orderDish.destroy();
    return true;
}

module.exports = {
    getAllOrderDishes,
    getOrderDishById,
    createOrderDish,
    updateOrderDish,
    deleteOrderDish
};