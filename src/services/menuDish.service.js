/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   menuDish.service.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   24.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------
*/

const MenuDish = require('../models/menuDish.model');

async function getAllMenuDishes() {
    return await MenuDish.findAll();
}

async function getMenuDishById(id) {
    return await MenuDish.findByPk(id);
}

async function createMenuDish(data) {
    return await MenuDish.create({
        menuId: data.menuId,
        dishId: data.dishId
    });
}

async function updateMenuDish(id, data) {
    const menuDish = await MenuDish.findByPk(id);

    if (!menuDish) return null;

    await menuDish.update({
        menuId: data.menuId,
        dishId: data.dishId
    });

    return menuDish;
}

async function deleteMenuDish(id) {
    const menuDish = await MenuDish.findByPk(id);

    if (!menuDish) return false;

    await menuDish.destroy();
    return true;
}

module.exports = {
    getAllMenuDishes,
    getMenuDishById,
    createMenuDish,
    updateMenuDish,
    deleteMenuDish
};
