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

router.get('/', menuDishesController.getAllMenuDishes);
router.get('/:id', menuDishesController.getMenuDishById);
router.post('/', menuDishesController.createMenuDish);
router.put('/:id', menuDishesController.updateMenuDish);
router.delete('/:id', menuDishesController.deleteMenuDish);

module.exports = router;
