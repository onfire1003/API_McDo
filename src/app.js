/*

-----------------------------------------------------------------------------------------------------------------------

file name           :   app.js
author              :   Samuel Theytaz
collaborators       :   Joel Cunha Faria, Jason Edmonds
creation date       :   12.03.2026
modification date   :   18.03.2026
version             :   0.2

-----------------------------------------------------------------------------------------------------------------------

Main application file.
This file:
- starts Express
- reads JSON bodies
- loads the dish routes
*/

const express = require('express');
const app = express();
const dishRoutes = require('./routes/dish.routes');
const orderRoutes = require('./routes/order.routes');


app.use(express.json());

app.use('/api/v1/dishes', dishRoutes);
app.use('/api/v1/orders', orderRoutes);

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
 