/*

-----------------------------------------------------------------------------------------------------------------------

file name           :   env.js
author              :   Samuel Theytaz
collaborators       :   Joel Cunha Faria, Jason Edmonds
creation date       :   12.03.2026
modification date   :   12.03.2026
version             :   1.0

-----------------------------------------------------------------------------------------------------------------------

Environment variables loader.

*/

require('dotenv').config();

const env = {

    dbHost: process.env.DB_HOST,

    dbUser: process.env.DB_USER,

    dbPassword: process.env.DB_PASSWORD,

    dbName: process.env.DB_NAME,

    port: process.env.PORT || 3000,

    jwtSecret: process.env.JWT_SECRET

};

module.exports = env;
