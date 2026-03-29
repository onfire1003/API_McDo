/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   orderMenu.model.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   24.03.2026
modification date   :   29.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------
*/

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./order.model');
const Menu = require('./menu.model');

const OrderMenu = sequelize.define('OrderMenu', {
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
    menuId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'menu_id',
        references: {
            model: Menu,
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
    tableName: 'orders_has_menus',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['order_id', 'menu_id']
        }
    ]
});

module.exports = OrderMenu;