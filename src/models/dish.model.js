/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   dish.model.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   12.03.2026
modification date   :   18.03.2026
version             :   0.2
-----------------------------------------------------------------------------------------------------------------------
*/

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Dish = sequelize.define('Dish', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(300),
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    availability: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    size: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
}, {
    tableName: 'dishes',
    timestamps: false
});

module.exports = Dish;