/*
-----------------------------------------------------------------------------------------------------------------------

file name           :   dish.routes.js
author              :   Samuel Theytaz
collaborators       :   Joel Cunha Faria, Jason Edmond
creation date       :   12.03.2026
modification date   :   12.03.2026
version             :   1.1

-----------------------------------------------------------------------------------------------------------------------

Routes for dishes.
This file handles:
- checking that the dish route is active
- creating a dish
- deleting a dish
*/

const express = require('express');
const router = express.Router();
const Dish = require('../models/dish.model');

router.get('/', function (req, res) {
    return res.status(200).json({
        message: 'Route dishes active'
    });
});

router.post('/', async function (req, res) {
    try {
        const newDish = await Dish.create(req.body);
        return res.status(201).json(newDish);
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({
                error: error.message
            });
        }

        return res.status(500).json({
            error: 'Erreur lors de la création du plat'
        });
    }
});

router.delete('/:id', async function (req, res) {
    try {
        const deleted = await Dish.remove(req.params.id);
        if (!deleted) {
            return res.status(404).json({
                error: 'Plat introuvable'
            });
        }

        return res.status(200).json({
            message: 'Plat supprimé avec succès'
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Erreur lors de la suppression du plat'
        });
    }
});

module.exports = router;

