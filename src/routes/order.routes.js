/*
-----------------------------------------------------------------------------------------------------------------------

file name           :   order.routes.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   12.03.2026
modification date   :   18.03.2026
version             :   0.2

-----------------------------------------------------------------------------------------------------------------------

Routes for orders.
This file handles:
- checking that the order route is active
- creating an order
- deleting an order
*/

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const authenticateToken = require('../middlewares/auth.middleware');

// GET /api/v1/orders
router.get('/', authenticateToken, orderController.getAllOrders);

// GET /api/v1/orders/:id
router.get('/:id', authenticateToken, orderController.getOrderById);

// POST /api/v1/orders
router.post('/', authenticateToken, orderController.createOrder);

// PUT /api/v1/orders/:id
router.put('/:id', authenticateToken, orderController.updateOrder);

// DELETE /api/v1/orders/:id
router.delete('/:id', authenticateToken, orderController.deleteOrder);

module.exports = router;
