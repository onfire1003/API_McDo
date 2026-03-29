/*
-----------------------------------------------------------------------------------------------------------------------

file name           :   orderDish.routes.js
author              :   Joel Cunha Faria
creation date       :   24.03.2026
version             :   1.0

-----------------------------------------------------------------------------------------------------------------------
*/

const express = require('express');
const router = express.Router();
const orderDishesController = require('../controllers/orderDish.controller');
const authenticateToken = require('../middlewares/auth.middleware');

// GET /api/v1/order-dishes
router.get('/', authenticateToken, orderDishesController.getAllOrderDishes);

// GET /api/v1/order-dishes/:id
router.get('/:id', authenticateToken, orderDishesController.getOrderDishById);

// POST /api/v1/order-dishes
router.post('/', authenticateToken, orderDishesController.createOrderDish);

// PUT /api/v1/order-dishes/:id
router.put('/:id', authenticateToken, orderDishesController.updateOrderDish);

// DELETE /api/v1/order-dishes/:id
router.delete('/:id', authenticateToken, orderDishesController.deleteOrderDish);

module.exports = router;