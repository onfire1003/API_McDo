/*
-----------------------------------------------------------------------------------------------------------------------

file name           :   orderDish.controller.js
author              :   Joel Cunha Faria
creation date       :   24.03.2026
version             :   1.0

-----------------------------------------------------------------------------------------------------------------------
*/

const orderDishesService = require('../services/orderDish.service');

/**
 * GET /api/v1/order-dishes
 * Retrieve all order dishes.
 */
async function getAllOrderDishes(req, res) {
    try {
        const orderDishes = await orderDishesService.getAllOrderDishes();
        return res.status(200).json(orderDishes);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving order dishes', error: error.message });
    }
}

/**
 * GET /api/v1/order-dishes/:id
 * Retrieve a single order dish by ID.
 */
async function getOrderDishById(req, res) {
    try {
        const orderDish = await orderDishesService.getOrderDishById(req.params.id);

        if (!orderDish) {
            return res.status(404).json({ message: 'OrderDish not found' });
        }

        return res.status(200).json(orderDish);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving order dish', error: error.message });
    }
}

/**
 * POST /api/v1/order-dishes
 * Create a new order dish.
 */
async function createOrderDish(req, res) {
    try {
        const orderDish = await orderDishesService.createOrderDish(req.body);
        return res.status(201).json(orderDish);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating order dish', error: error.message });
    }
}

/**
 * PUT /api/v1/order-dishes/:id
 * Update an existing order dish by ID.
 */
async function updateOrderDish(req, res) {
    try {
        const orderDish = await orderDishesService.updateOrderDish(req.params.id, req.body);

        if (!orderDish) {
            return res.status(404).json({ message: 'OrderDish not found' });
        }

        return res.status(200).json(orderDish);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating order dish', error: error.message });
    }
}

/**
 * DELETE /api/v1/order-dishes/:id
 * Delete an order dish by ID.
 */
async function deleteOrderDish(req, res) {
    try {
        const deleted = await orderDishesService.deleteOrderDish(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'OrderDish not found' });
        }

        return res.status(200).json({ message: 'OrderDish deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting order dish', error: error.message });
    }
}

module.exports = {
    getAllOrderDishes,
    getOrderDishById,
    createOrderDish,
    updateOrderDish,
    deleteOrderDish
};