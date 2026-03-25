/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   orderMenu.routes.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   24.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------
*/

const express = require('express');
const router = express.Router();
const orderMenusController = require('../controllers/orderMenu.controller');

// GET all order-menu relations
router.get('/', orderMenusController.getAllOrderMenus);

// GET one order-menu by ID
router.get('/:id', orderMenusController.getOrderMenuById);

// CREATE a new order-menu
router.post('/', orderMenusController.createOrderMenu);

// UPDATE an existing order-menu
router.put('/:id', orderMenusController.updateOrderMenu);

// DELETE an order-menu
router.delete('/:id', orderMenusController.deleteOrderMenu);

module.exports = router;