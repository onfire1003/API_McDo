/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   menu.routes.js
author              :   Samuel Theytaz
collaborators       :   Jason Edmonds, Joel Cunha Faria
creation date       :   24.03.2026
modification date   :   25.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------

Routes for menus.
This file handles:
- checking that the menu route is active
- creating, updating, retrieving, and deleting menus
*/

const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');
const authenticateToken = require('../middlewares/auth.middleware');

// GET /api/v1/menus
router.get('/', authenticateToken, menuController.getAllMenus);

// GET /api/v1/menus/:id
router.get('/:id', authenticateToken, menuController.getMenuById);

// POST /api/v1/menus
router.post('/', authenticateToken, menuController.createMenu);

// PUT /api/v1/menus/:id
router.put('/:id', authenticateToken, menuController.updateMenu);

// DELETE /api/v1/menus/:id
router.delete('/:id', authenticateToken, menuController.deleteMenu);

module.exports = router;