/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   order.model.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   12.03.2026
modification date   :   29.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------
*/
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    number: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('en_attente', 'en_preparation', 'pret', 'livre'),
        allowNull: false,
        defaultValue: 'en_attente'
    }
}, {
    tableName: 'orders',
    timestamps: false
});

module.exports = Order;
