/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   menu.controller.js
author              :   Samuel Theytaz
collaborators       :   Jason Edmonds, Joel Cunha Faria
creation date       :   24.03.2026
modification date   :   29.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------
*/

const menuService = require('../services/menu.service');

/**
 * GET /api/v1/menus
 * Retrieve all menus.
 */
async function getAllMenus(req, res) {
    try {
        const menus = await menuService.getAllMenus();
        return res.status(200).json(menus);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving menus', error: error.message });
    }
}

/**
 * GET /api/v1/menus/:id
 * Retrieve a single menu by ID.
 */
async function getMenuById(req, res) {
    try {
        const menu = await menuService.getMenuById(req.params.id);

        if (!menu) {
            return res.status(404).json({ message: 'Menu not found' });
        }

        return res.status(200).json(menu);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving menu', error: error.message });
    }
}

/**
 * POST /api/v1/menus
 * Create a new menu.
 */
async function createMenu(req, res) {
    try {
        const menu = await menuService.createMenu(req.body);
        return res.status(201).json(menu);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating menu', error: error.message });
    }
}

/**
 * PUT /api/v1/menus/:id
 * Update an existing menu by ID.
 */
async function updateMenu(req, res) {
    try {
        const menu = await menuService.updateMenu(req.params.id, req.body);

        if (!menu) {
            return res.status(404).json({ message: 'Menu not found' });
        }

        return res.status(200).json(menu);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating menu', error: error.message });
    }
}

/**
 * DELETE /api/v1/menus/:id
 * Delete a menu by ID.
 */
async function deleteMenu(req, res) {
    try {
        const deleted = await menuService.deleteMenu(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Menu not found' });
        }

        return res.status(200).json({ message: 'Menu deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting menu', error: error.message });
    }
}

module.exports = {
    getAllMenus,
    getMenuById,
    createMenu,
    updateMenu,
    deleteMenu
};