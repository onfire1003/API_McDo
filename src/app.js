/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   app.js
author              :   Samuel Theytaz
collaborators       :   Joel Cunha Faria, Jason Edmonds
creation date       :   12.03.2026
modification date   :   29.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------

Main application file.
This file:
- starts Express
- reads JSON bodies
- loads the dish routes
*/

const setupSwagger = require('./config/swagger');
const express = require('express');
const app = express();
const dishRoutes = require('./routes/dish.routes');
const orderRoutes = require('./routes/order.routes');
const ingredientRoutes = require('./routes/ingredient.routes');
const menuRoutes = require('./routes/menu.routes');

const authRoutes = require('./routes/auth.routes');

const setupAssociations = require('./models/associations');

setupSwagger(app);
setupAssociations();
app.use(express.json());

app.use('/api/v1/dishes', dishRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/ingredients', ingredientRoutes);
app.use('/api/v1/menus', menuRoutes);

app.use('/api/v1/auth', authRoutes);

app.get('/', function (req, res) {
    return res.status(200).json({
        message: 'API McDo backend active'
    });
});

const env = require('./config/env');
const PORT = env.port;

app.listen(PORT, function () {
    console.log('Server running on port ' + PORT);
});

module.exports = app;