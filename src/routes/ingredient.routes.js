/*

-----------------------------------------------------------------------------------------------------------------------

file name           :   ingredient.routes.js
author              :   Jason Edmonds
collaborators       :   Joel Cunha Faria, Samuel Theytaz
creation date       :   17.03.2026
modification date   :   17.03.2026
version             :   1.0

-----------------------------------------------------------------------------------------------------------------------

*/

const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredient.controller');

router.get('/', ingredientController.getAllIngredients);
router.get('/:id', ingredientController.getIngredientById);
router.post('/', ingredientController.createIngredient);
router.put('/:id', ingredientController.updateIngredient);
router.delete('/:id', ingredientController.deleteIngredient);

module.exports = router;