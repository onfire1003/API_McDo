/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   menu.service.js
author              :   Samuel Theytaz
collaborators       :   Jason Edmonds, Joel Cunha Faria
creation date       :   24.03.2026
modification date   :   28.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------
*/

const Menu = require('../models/menu.model');
const Dish = require('../models/dish.model');

/**
 * Retrieve all menus.
 * @returns {Promise<object[]>} List of all menus
 */
async function getAllMenus() {
    return await Menu.findAll({
        include: [
            {
                model: Dish,
                through: { attributes: [] }
            }
        ]
    });
}

/**
 * Retrieve a single menu by its ID.
 * @param {number} id - The menu ID
 * @returns {Promise<object|null>} The menu, or null if not found
 */
async function getMenuById(id) {
    return await Menu.findByPk(id, {
        include: [
            {
                model: Dish,
                through: { attributes: [] }
            }
        ]
    });
}

/**
 * Create a new menu.
 * @param {object} data - The menu data (name, description, size)
 * @returns {Promise<object>} The newly created menu
 */
async function createMenu(data) {
    const menu = await Menu.create({
        name: data.name,
        description: data.description,
        size: data.size
    });

    if (data.dishes) {
        for (const d of data.dishes) {
            const dish = await Dish.findByPk(d.id);
            if (dish) {
                await menu.addDish(dish);
            }
        }
    }

    return await Menu.findByPk(menu.id, {
        include: Dish
    });
}

/**
 * Update an existing menu by its ID.
 * @param {number} id - The menu ID
 * @param {object} data - The fields to update (name, description, size)
 * @returns {Promise<object|null>} The updated menu, or null if not found
 */
async function updateMenu(id, data) {
    const menu = await Menu.findByPk(id);

    if (!menu) return null;

    await menu.update({
        name: data.name,
        description: data.description,
        size: data.size
    });

    if (data.dishes) {
        await menu.setDishes([]); // reset

        for (const d of data.dishes) {
            const dish = await Dish.findByPk(d.id);
            if (dish) {
                await menu.addDish(dish);
            }
        }
    }

    return await Menu.findByPk(id, {
        include: Dish
    });
}

/**
 * Delete a menu by its ID.
 * @param {number} id - The menu ID
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
async function deleteMenu(id) {
    const menu = await Menu.findByPk(id);

    if (!menu) return false;

    await menu.destroy();
    return true;
}

module.exports = {
    getAllMenus,
    getMenuById,
    createMenu,
    updateMenu,
    deleteMenu
};