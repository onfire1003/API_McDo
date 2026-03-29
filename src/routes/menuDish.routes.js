/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   menuDish.routes.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   24.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------
*/

const express = require('express');
const router = express.Router();
const menuDishesController = require('../controllers/menuDish.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken, menuDishesController.getAllMenuDishes);
router.get('/:id', authenticateToken, menuDishesController.getMenuDishById);
router.post('/', authenticateToken, menuDishesController.createMenuDish);
router.put('/:id', authenticateToken, menuDishesController.updateMenuDish);
router.delete('/:id', authenticateToken, menuDishesController.deleteMenuDish);

module.exports = router;
