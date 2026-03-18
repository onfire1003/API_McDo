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

// GET /api/v1/orders
router.get('/', orderController.getAllOrders);

// GET /api/v1/orders/:id
router.get('/:id', orderController.getOrderById);

// POST /api/v1/orders
router.post('/', orderController.createOrder);

// PUT /api/v1/orders/:id
router.put('/:id', orderController.updateOrder);

// DELETE /api/v1/orders/:id
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
