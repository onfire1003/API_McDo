/*
-----------------------------------------------------------------------------------------------------------------------

file name           :   order.routes.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   12.03.2026
modification date   :   18.03.2026
version             :   0.2

-----------------------------------------------------------------------------------------------------------------------
*/

const orderService = require('../services/order.service');

/**
 * GET /api/v1/orders
 * Retrieve all orders.
 */
async function getAllOrders(req, res) {
    try {
        const orders = await orderService.getAllOrders();
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving orders', error: error.message });
    }
}

/**
 * GET /api/v1/orders/:id
 * Retrieve a single order by ID.
 */
async function getOrderById(req, res) {
    try {
        const order = await orderService.getOrderById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving order', error: error.message });
    }
}

/**
 * POST /api/v1/orders
 * Create a new order.
 */
async function createOrder(req, res) {
    try {
        const order = await orderService.createOrder(req.body);
        return res.status(201).json(order);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating order', error: error.message });
    }
}

/**
 * PUT /api/v1/orders/:id
 * Update an existing order by ID.
 */
async function updateOrder(req, res) {
    try {
        const order = await orderService.updateOrder(req.params.id, req.body);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating order', error: error.message });
    }
}

/**
 * DELETE /api/v1/orders/:id
 * Delete an order by ID.
 */
async function deleteOrder(req, res) {
    try {
        const deleted = await orderService.deleteOrder(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
}

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};
