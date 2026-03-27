/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   menuDish.controller.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   24.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------
*/

const menuDishesService = require('../services/menuDish.service');

async function getAllMenuDishes(req, res) {
    try {
        const menuDishes = await menuDishesService.getAllMenuDishes();
        return res.status(200).json(menuDishes);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving menu dishes', error: error.message });
    }
}

async function getMenuDishById(req, res) {
    try {
        const menuDish = await menuDishesService.getMenuDishById(req.params.id);

        if (!menuDish) {
            return res.status(404).json({ message: 'MenuDish not found' });
        }

        return res.status(200).json(menuDish);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving menu dish', error: error.message });
    }
}

async function createMenuDish(req, res) {
    try {
        const menuDish = await menuDishesService.createMenuDish(req.body);
        return res.status(201).json(menuDish);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating menu dish', error: error.message });
    }
}

async function updateMenuDish(req, res) {
    try {
        const menuDish = await menuDishesService.updateMenuDish(req.params.id, req.body);

        if (!menuDish) {
            return res.status(404).json({ message: 'MenuDish not found' });
        }

        return res.status(200).json(menuDish);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating menu dish', error: error.message });
    }
}

async function deleteMenuDish(req, res) {
    try {
        const deleted = await menuDishesService.deleteMenuDish(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'MenuDish not found' });
        }

        return res.status(200).json({ message: 'MenuDish deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting menu dish', error: error.message });
    }
}

module.exports = {
    getAllMenuDishes,
    getMenuDishById,
    createMenuDish,
    updateMenuDish,
    deleteMenuDish
};
