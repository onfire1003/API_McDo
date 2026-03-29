/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   order.service.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   12.03.2026
modification date   :   29.03.2026
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
    const orders = await Order.findAll({
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

    for (const order of orders) {
        let total = 0;

        for (const dish of order.Dishes) {
            const quantity = dish.OrderDish.quantity || 1;
            total += parseFloat(dish.price) * quantity;
        }

        for (const menu of order.Menus) {
            const quantity = menu.OrderMenu.quantity || 1;
            total += parseFloat(menu.price) * quantity;
        }

        order.price = total; // overwrite sans DB
    }

    return orders;
}

/**
 * Retrieve a single order by its ID.
 * @param {number} id - The order ID
 * @returns {Promise<object|null>} The order, or null if not found
 */
async function getOrderById(id) {
    const order = await Order.findByPk(id, {
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

    if (!order) return null;

    let total = 0;

    // Dishes
    for (const dish of order.Dishes) {
        const quantity = dish.OrderDish.quantity || 1;
        total += parseFloat(dish.price) * quantity;
    }

    // Menus
    for (const menu of order.Menus) {
        const quantity = menu.OrderMenu.quantity || 1;
        total += parseFloat(menu.price) * quantity;
    }

    order.price = total;

    return order;
}

async function calculateOrderPrice(orderId) {
    const order = await Order.findByPk(orderId, {
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

    let total = 0;

    // Dishes
    for (const dish of order.Dishes) {
        const quantity = dish.OrderDish.quantity || 1;
        total += parseFloat(dish.price) * quantity;
    }

    // Menus
    for (const menu of order.Menus) {
        const quantity = menu.OrderMenu.quantity || 1;
        total += parseFloat(menu.price) * quantity;
    }

    return total;
}

/**
 * Create a new order.
 * @param {object} data - The order data (number, price, status)
 * @returns {Promise<object>} The newly created order
 */
async function createOrder(data) {
    const order = await Order.create({
        number: data.number,
        price: 0,
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

    // calcul du prix
    const total = await calculateOrderPrice(order.id);
    await order.update({ price: total });

    return await Order.findByPk(order.id, {
        include: [Dish, Menu]
    });
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

    await order.update({
        number: data.number,
        status: data.status
    });

    // Dishes
    if (data.dishes) {
        await order.setDishes([]);

        for (const d of data.dishes) {
            const dish = await Dish.findByPk(d.id);
            if (dish) {
                await order.addDish(dish, {
                    through: { quantity: d.quantity }
                });
            }
        }
    }

    // Menus
    if (data.menus) {
        await order.setMenus([]);

        for (const m of data.menus) {
            const menu = await Menu.findByPk(m.id);
            if (menu) {
                await order.addMenu(menu, {
                    through: { quantity: m.quantity }
                });
            }
        }
    }

    // recalcul
    const total = await calculateOrderPrice(order.id);
    await order.update({ price: total });

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