/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   orderDish.model.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   24.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------
*/

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./order.model');
const Dish = require('./dish.model');

// Modèle pivot orders_has_dishes
const OrderDish = sequelize.define('OrderDish', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'order_id',
        references: {
            model: Order,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    dishId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'dish_id',
        references: {
            model: Dish,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    tableName: 'orders_has_dishes',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['order_Id', 'dish_Id']
        }
    ]
});

module.exports = OrderDish;