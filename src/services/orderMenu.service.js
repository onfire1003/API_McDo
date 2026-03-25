/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   orderMenu.service.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   24.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------
*/

const OrderMenu = require('../models/orderMenu.model');

/**
 * Retrieve all order-menu relations.
 * @returns {Promise<object[]>} List of all order menus
 */
async function getAllOrderMenus() {
    return await OrderMenu.findAll();
}

/**
 * Retrieve a single order-menu by its ID.
 * @param {number} id - The OrderMenu ID
 * @returns {Promise<object|null>}
 */
async function getOrderMenuById(id) {
    return await OrderMenu.findByPk(id);
}

/**
 * Create a new order-menu relation.
 * @param {object} data - (orderId, menuId, quantity)
 * @returns {Promise<object>}
 */
async function createOrderMenu(data) {
    return await OrderMenu.create({
        orderId: data.orderId,
        menuId: data.menuId,
        quantity: data.quantity
    });
}

/**
 * Update an existing order-menu relation.
 * @param {number} id
 * @param {object} data
 * @returns {Promise<object|null>}
 */
async function updateOrderMenu(id, data) {
    const orderMenu = await OrderMenu.findByPk(id);

    if (!orderMenu) return null;

    await orderMenu.update({
        orderId: data.orderId,
        menuId: data.menuId,
        quantity: data.quantity
    });

    return orderMenu;
}

/**
 * Delete an order-menu relation.
 * @param {number} id
 * @returns {Promise<boolean>}
 */
async function deleteOrderMenu(id) {
    const orderMenu = await OrderMenu.findByPk(id);

    if (!orderMenu) return false;

    await orderMenu.destroy();
    return true;
}

module.exports = {
    getAllOrderMenus,
    getOrderMenuById,
    createOrderMenu,
    updateOrderMenu,
    deleteOrderMenu
};