/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   crud.js
Author              :   Samuel Theytaz
Collaborators       :   Joel Cunha Faria, Jason Edmonds
Creation date       :   11.03.2026
Modification date   :   12.03.2026
Version             :   0.2
-----------------------------------------------------------------------------------------------------------------------

Generic CRUD service for models.

This file provides basic functions to interact with a model
(create, read, update, delete).

A model must contain:
- primaryKey (string)
- allowedFields (array)
- findAll()
- findById(id)
- findOneBy(field, value)
- searchBy(field, value)
- create(data)
- update(id, data)
- remove(id)
*/


// ------------------------------------------------------------
// Check if the model has everything required
// ------------------------------------------------------------

function checkModel(model) {

    // Check if the model exists
    if (!model) {
        throw new Error('Model manquant');
    }

    // List of required functions the model must implement8
    const requiredFunctions = [
        'findAll',
        'findById',
        'findOneBy',
        'searchBy',
        'create',
        'update',
        'remove'
    ];

    // Loop through required functions and verify they exist
    for (const fn of requiredFunctions) {
        if (typeof model[fn] !== 'function') {
            throw new Error(`Le model doit contenir la fonction ${fn}()`);
        }
    }

    // allowedFields must be an array
    if (!Array.isArray(model.allowedFields)) {
        throw new Error('Le model doit contenir allowedFields sous forme de tableau');
    }

    // primaryKey must be a non empty string
    if (typeof model.primaryKey !== 'string' || model.primaryKey.trim() === '') {
        throw new Error('Le model doit contenir une primaryKey valide');
    }
}


// ------------------------------------------------------------
// Keep only the allowed fields from the input data
// ------------------------------------------------------------

function filterAllowedFields(data, allowedFields = []) {

    // If data is invalid, return an empty object
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        return {};
    }

    const filteredData = {};

    // Loop through allowed fields and keep them if present
    for (const field of allowedFields) {
        if (Object.prototype.hasOwnProperty.call(data, field)) {
            filteredData[field] = data[field];
        }
    }

    return filteredData;
}


// ------------------------------------------------------------
// Check if a field is allowed to be used
// ------------------------------------------------------------

function isAllowedField(model, field) {

    // Field must exist
    if (!field) return false;

    // The field is valid if it is the primary key
    // or one of the allowed fields
    return (
        field === model.primaryKey ||
        model.allowedFields.includes(field)
    );
}


// ------------------------------------------------------------
// CREATE
// Insert a new record in the model
// ------------------------------------------------------------

async function create(model, data) {

    // Verify model structure
    checkModel(model);

    // Keep only allowed fields
    const filteredData = filterAllowedFields(data, model.allowedFields);

    // Prevent empty insert
    if (Object.keys(filteredData).length === 0) {
        throw new Error('Aucune donnée valide à insérer');
    }

    try {

        // Call model create method
        return await model.create(filteredData);

    } catch (err) {

        // Catch database errors
        throw new Error(`Erreur lors de la création : ${err.message}`);
    }
}


// ------------------------------------------------------------
// READ ALL
// Get all records from the model
// ------------------------------------------------------------

async function getAll(model) {

    checkModel(model);

    try {

        // Return all records
        return await model.findAll();

    } catch (err) {

        throw new Error(`Erreur lors de la récupération des données : ${err.message}`);
    }
}


// ------------------------------------------------------------
// READ BY ID
// Get one record using the primary key
// ------------------------------------------------------------

async function getById(model, id) {

    checkModel(model);

    // Validate id
    if (id === undefined || id === null || id === '') {
        throw new Error('Identifiant manquant');
    }

    try {

        // Call model method
        return await model.findById(id);

    } catch (err) {

        throw new Error(`Erreur lors de la récupération par ID : ${err.message}`);
    }
}


// ------------------------------------------------------------
// READ ONE BY FIELD
// Find one record using a specific field
// ------------------------------------------------------------

async function getOneBy(model, field, value) {

    checkModel(model);

    // Verify the field is allowed
    if (!isAllowedField(model, field)) {
        throw new Error(`Champ non autorisé : ${field}`);
    }

    try {

        // Call model search function
        return await model.findOneBy(field, value);

    } catch (err) {

        throw new Error(`Erreur lors de la recherche : ${err.message}`);
    }
}


// ------------------------------------------------------------
// SEARCH BY FIELD
// Similar to SQL LIKE search
// ------------------------------------------------------------

async function searchBy(model, field, value) {

    checkModel(model);

    // Verify field is allowed
    if (!isAllowedField(model, field)) {
        throw new Error(`Champ non autorisé : ${field}`);
    }

    try {

        // Call model search
        return await model.searchBy(field, value);

    } catch (err) {

        throw new Error(`Erreur lors de la recherche : ${err.message}`);
    }
}


// ------------------------------------------------------------
// UPDATE
// Modify an existing record
// ------------------------------------------------------------

async function update(model, id, data) {

    checkModel(model);

    // Validate id
    if (id === undefined || id === null || id === '') {
        throw new Error('Identifiant manquant');
    }

    // Keep only allowed fields
    const filteredData = filterAllowedFields(data, model.allowedFields);

    // Prevent empty update
    if (Object.keys(filteredData).length === 0) {
        throw new Error('Aucune donnée valide à mettre à jour');
    }

    try {

        // Check if the object exists
        const existingObject = await model.findById(id);

        if (!existingObject) {
            return null;
        }

        // Update the object
        return await model.update(id, filteredData);

    } catch (err) {

        throw new Error(`Erreur lors de la mise à jour : ${err.message}`);
    }
}


// ------------------------------------------------------------
// DELETE
// Remove a record by id
// ------------------------------------------------------------

async function remove(model, id) {

    checkModel(model);

    // Validate id
    if (id === undefined || id === null || id === '') {
        throw new Error('Identifiant manquant');
    }

    try {

        // Check if object exists before deleting
        const existingObject = await model.findById(id);

        if (!existingObject) {
            return false;
        }

        // Delete the object
        return await model.remove(id);

    } catch (err) {

        throw new Error(`Erreur lors de la suppression : ${err.message}`);
    }
}


// ------------------------------------------------------------
// Export all CRUD functions
// ------------------------------------------------------------

module.exports = {
    create,
    getAll,
    getById,
    getOneBy,
    searchBy,
    update,
    remove
};