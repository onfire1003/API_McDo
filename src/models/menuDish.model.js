/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   menuDish.model.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   24.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------
*/
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Menu = require('./menu.model');
const Dish = require('./dish.model');

const MenuDish = sequelize.define('MenuDish', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    dishId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'dish_id',
        references: {
            model: Dish,
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {
    tableName: 'menus_has_dishes',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['menu_Id', 'dish_Id']
        }
    ]
});

module.exports = MenuDish;