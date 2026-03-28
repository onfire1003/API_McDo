/*
-----------------------------------------------------------------------------------------------------------------------

file name           :   order.service.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   12.03.2026
modification date   :   28.03.2026
version             :   1.0

-----------------------------------------------------------------------------------------------------------------------
*/

const Order = require('../models/order.model');
const Dish = require('../models/dish.model');
const Menu = require('../models/menu.model');

/**
 * Retrieve all orders.
 * @returns {Promise<object[]>} List of all orders
 */
async function getAllOrders() {
    return await Order.findAll({
        include: [
            {
                model: Dish,
                through: { attributes: ['quantity'] }
            },
            {
                model: Menu,
                through: { attributes: ['quantity'] }
            }
        ]
    });
}

/**
 * Retrieve a single order by its ID.
 * @param {number} id - The order ID
 * @returns {Promise<object|null>} The order, or null if not found
 */
async function getOrderById(id) {
    return await Order.findByPk(id, {
        include: [
            {
                model: Dish,
                through: { attributes: ['quantity'] }
            },
            {
                model: Menu,
                through: { attributes: ['quantity'] }
            }
        ]
    });
}

/**
 * Create a new order.
 * @param {object} data - The order data (number, price, status)
 * @returns {Promise<object>} The newly created order
 */
async function createOrder(data) {
    const order = await Order.create({
        number: data.number,
        price: data.price,
        status: data.status
    });

    // Ajouter les plats
    if (data.dishes) {
        for (const d of data.dishes) {
            const dish = await Dish.findByPk(d.id);
            if (dish) {
                await order.addDish(dish, {
                    through: { quantity: d.quantity }
                });
            }
        }
    }

    // Ajouter les menus
    if (data.menus) {
        for (const m of data.menus) {
            const menu = await Menu.findByPk(m.id);
            if (menu) {
                await order.addMenu(menu, {
                    through: { quantity: m.quantity }
                });
            }
        }
    }

    return order;
}

/**
 * Update an existing order by its ID.
 * @param {number} id - The order ID
 * @param {object} data - The fields to update (number, price, status)
 * @returns {Promise<object|null>} The updated order, or null if not found
 */
async function updateOrder(id, data) {
    const order = await Order.findByPk(id);

    if (!order) return null;

    // 1. update des champs simples
    await order.update({
        number: data.number,
        price: data.price,
        status: data.status
    });

    // 2. update des plats (REMPLACE tout)
    if (data.dishes) {
        await order.setDishes([]); // reset

        for (const d of data.dishes) {
            const dish = await Dish.findByPk(d.id);
            if (dish) {
                await order.addDish(dish, {
                    through: { quantity: d.quantity }
                });
            }
        }
    }

    // 3. update des menus (REMPLACE tout)
    if (data.menus) {
        await order.setMenus([]); // reset

        for (const m of data.menus) {
            const menu = await Menu.findByPk(m.id);
            if (menu) {
                await order.addMenu(menu, {
                    through: { quantity: m.quantity }
                });
            }
        }
    }

    // 4. retourner avec relations
    return await Order.findByPk(id, {
        include: [Dish, Menu]
    });
}

/**
 * Delete an order by its ID.
 * @param {number} id - The order ID
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
async function deleteOrder(id) {
    const order = await Order.findByPk(id);

    if (!order) return false;

    await order.destroy();
    return true;
}

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};