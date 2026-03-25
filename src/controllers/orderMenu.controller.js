/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   orderMenu.controller.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   24.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------
*/

const orderMenusService = require('../services/orderMenu.service');

/**
 * GET /api/v1/order-menus
 * Retrieve all order menus
 */
async function getAllOrderMenus(req, res) {
    try {
        const orderMenus = await orderMenusService.getAllOrderMenus();
        return res.status(200).json(orderMenus);
    } catch (error) {
        return res.status(500).json({
            message: 'Error retrieving order menus',
            error: error.message
        });
    }
}

/**
 * GET /api/v1/order-menus/:id
 * Retrieve a specific order menu
 */
async function getOrderMenuById(req, res) {
    try {
        const orderMenu = await orderMenusService.getOrderMenuById(req.params.id);

        if (!orderMenu) {
            return res.status(404).json({ message: 'OrderMenu not found' });
        }

        return res.status(200).json(orderMenu);
    } catch (error) {
        return res.status(500).json({
            message: 'Error retrieving order menu',
            error: error.message
        });
    }
}

/**
 * POST /api/v1/order-menus
 * Create a new order menu
 */
async function createOrderMenu(req, res) {
    try {
        const orderMenu = await orderMenusService.createOrderMenu(req.body);
        return res.status(201).json(orderMenu);
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating order menu',
            error: error.message
        });
    }
}

/**
 * PUT /api/v1/order-menus/:id
 * Update an order menu
 */
async function updateOrderMenu(req, res) {
    try {
        const orderMenu = await orderMenusService.updateOrderMenu(req.params.id, req.body);

        if (!orderMenu) {
            return res.status(404).json({ message: 'OrderMenu not found' });
        }

        return res.status(200).json(orderMenu);
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating order menu',
            error: error.message
        });
    }
}

/**
 * DELETE /api/v1/order-menus/:id
 * Delete an order menu
 */
async function deleteOrderMenu(req, res) {
    try {
        const deleted = await orderMenusService.deleteOrderMenu(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'OrderMenu not found' });
        }

        return res.status(200).json({
            message: 'OrderMenu deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error deleting order menu',
            error: error.message
        });
    }
}

module.exports = {
    getAllOrderMenus,
    getOrderMenuById,
    createOrderMenu,
    updateOrderMenu,
    deleteOrderMenu
};