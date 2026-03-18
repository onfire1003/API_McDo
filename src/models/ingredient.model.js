/*

-----------------------------------------------------------------------------------------------------------------------

file name           :   ingredient.model.js
author              :   Jason Edmonds
collaborators       :   Joel Cunha Faria, Samuel Theytaz
creation date       :   17.03.2026
modification date   :   17.03.2026
version             :   1.0

-----------------------------------------------------------------------------------------------------------------------

*/

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ingredient = sequelize.define('Ingredient', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    inStock: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'ingredients',
    timestamps: false
});

module.exports = Ingredient;