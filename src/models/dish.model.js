/*

-----------------------------------------------------------------------------------------------------------------------
file name           :   dish.model.js
author              :   Samuel Theytaz
collaborators       :   Joel Cunha Faria, Jason Edmonds
creation date       :   12.03.2026
modification date   :   12.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------
Model for the dishes table.

This file handles:
- finding a dish by id
- creating a dish
- deleting a dish
*/

const db = require('../config/database');

const Dish = {
    allowedFields: [
        'name',
        'description',
        'price',
        'availability',
        'size'
    ],

    async create(data) {
        if (!data.name || data.name.trim() === '') {
            const error = new Error('Le nom du plat est obligatoire');
            error.statusCode = 400;
            throw error;
        }

        if (data.price === undefined || data.price === null || Number(data.price) <= 0) {
            const error = new Error('Le prix doit être strictement supérieur à zéro');
            error.statusCode = 400;
            throw error;
        }

        const [result] = await db.query(
            'INSERT INTO dishes (name, description, price, availability, size) VALUES (?, ?, ?, ?, ?)',
            [
                data.name,
                data.description || '',
                data.price,
                data.availability !== undefined ? data.availability : true,
                data.size || 'Standard'
            ]
        );
        return await this.findById(result.insertId);
    },

    async findById(id) {
        const [rows] = await db.query(
            'SELECT * FROM dishes WHERE id = ?',
            [id]
        );
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    },

    primaryKey: 'id',

    remove: async function (id) {
        const existingDish = await this.findById(id);
        if (!existingDish) {
            return false;
        }

        const [result] = await db.query(
            'DELETE FROM dishes WHERE id = ?',
            [id]
        );
        return result.affectedRows !== 0;
    }
};

module.exports = Dish;