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

// GET /api/v1/order-dishes
router.get('/', orderDishesController.getAllOrderDishes);

// GET /api/v1/order-dishes/:id
router.get('/:id', orderDishesController.getOrderDishById);

// POST /api/v1/order-dishes
router.post('/', orderDishesController.createOrderDish);

// PUT /api/v1/order-dishes/:id
router.put('/:id', orderDishesController.updateOrderDish);

// DELETE /api/v1/order-dishes/:id
router.delete('/:id', orderDishesController.deleteOrderDish);

module.exports = router;