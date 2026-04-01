/*

-----------------------------------------------------------------------------------------------------------------------

file name           :   swagger.js
author              :   Jason Edmonds
collaborators       :   Joel Cunha Faria, Samuel Theytaz
creation date       :   01.04.2026
modification date   :   01.04.2026
version             :   1.0

-----------------------------------------------------------------------------------------------------------------------

Swagger configuration file.
Generates the OpenAPI documentation for the API McDo.
Accessible at: http://localhost:3000/api-docs

-----------------------------------------------------------------------------------------------------------------------

*/

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API McDo',
            version: '1.0.0',
            description: 'Documentation de l\'API McDo - Gestion des plats, menus, ingrédients et commandes'
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
                description: 'Serveur local'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {

                // -------------------------------------------------------
                // AUTH
                // -------------------------------------------------------

                RegisterRequest: {
                    type: 'object',
                    required: ['username', 'email', 'password'],
                    properties: {
                        username: { type: 'string', example: 'testuser' },
                        email: { type: 'string', format: 'email', example: 'test@test.com' },
                        password: { type: 'string', example: 'test123' },
                        role: { type: 'string', enum: ['admin', 'cook', 'waiter', 'customer'], example: 'customer' }
                    }
                },
                LoginRequest: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: { type: 'string', format: 'email', example: 'test@test.com' },
                        password: { type: 'string', example: 'test123' }
                    }
                },
                LoginResponse: {
                    type: 'object',
                    properties: {
                        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                        user: { $ref: '#/components/schemas/User' }
                    }
                },
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        username: { type: 'string', example: 'testuser' },
                        email: { type: 'string', example: 'test@test.com' },
                        role: { type: 'string', example: 'customer' }
                    }
                },

                // -------------------------------------------------------
                // INGREDIENT
                // -------------------------------------------------------

                Ingredient: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        name: { type: 'string', example: 'Pain burger' },
                        description: { type: 'string', example: 'Pain utilisé pour les burgers' },
                        availability: { type: 'boolean', example: true }
                    }
                },
                IngredientRequest: {
                    type: 'object',
                    required: ['name', 'description', 'availability'],
                    properties: {
                        name: { type: 'string', example: 'Pain burger' },
                        description: { type: 'string', example: 'Pain utilisé pour les burgers' },
                        availability: { type: 'boolean', example: true }
                    }
                },

                // -------------------------------------------------------
                // DISH
                // -------------------------------------------------------

                Dish: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        name: { type: 'string', example: 'Big Mac' },
                        description: { type: 'string', example: 'Burger emblématique avec double steak' },
                        price: { type: 'number', format: 'float', example: 7.50 },
                        availability: { type: 'boolean', example: true },
                        size: { type: 'string', example: 'Standard' },
                        Ingredients: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/Ingredient' }
                        }
                    }
                },
                DishRequest: {
                    type: 'object',
                    required: ['name', 'description', 'price', 'availability', 'size'],
                    properties: {
                        name: { type: 'string', example: 'Big Mac' },
                        description: { type: 'string', example: 'Burger emblématique avec double steak' },
                        price: { type: 'number', format: 'float', example: 7.50 },
                        availability: { type: 'boolean', example: true },
                        size: { type: 'string', example: 'Standard' },
                        ingredients: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: { id: { type: 'integer', example: 1 } }
                            }
                        }
                    }
                },

                // -------------------------------------------------------
                // MENU
                // -------------------------------------------------------

                Menu: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        name: { type: 'string', example: 'Menu Big Mac' },
                        description: { type: 'string', example: 'Inclut un Big Mac, frites et boisson' },
                        size: { type: 'string', example: 'Moyen' },
                        Dishes: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/Dish' }
                        }
                    }
                },
                MenuRequest: {
                    type: 'object',
                    required: ['name', 'description', 'size'],
                    properties: {
                        name: { type: 'string', example: 'Menu Big Mac' },
                        description: { type: 'string', example: 'Inclut un Big Mac, frites et boisson' },
                        size: { type: 'string', example: 'Moyen' }
                    }
                },

                // -------------------------------------------------------
                // ORDER
                // -------------------------------------------------------

                Order: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        number: { type: 'string', example: 'CMD001' },
                        price: { type: 'number', format: 'float', example: 15.00 },
                        status: {
                            type: 'string',
                            enum: ['en_attente', 'en_preparation', 'pret', 'livre'],
                            example: 'en_attente'
                        }
                    }
                },
                OrderRequest: {
                    type: 'object',
                    required: ['number', 'price'],
                    properties: {
                        number: { type: 'string', example: 'CMD003' },
                        price: { type: 'number', format: 'float', example: 15.00 },
                        status: {
                            type: 'string',
                            enum: ['en_attente', 'en_preparation', 'pret', 'livre'],
                            example: 'en_attente'
                        }
                    }
                },

                // -------------------------------------------------------
                // ERRORS
                // -------------------------------------------------------

                Error: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'An error occurred' }
                    }
                }
            }
        },
        security: [{ bearerAuth: [] }],
        paths: {

            // -------------------------------------------------------
            // AUTH
            // -------------------------------------------------------

            '/auth/register': {
                post: {
                    tags: ['Auth'],
                    summary: 'Créer un compte utilisateur',
                    security: [],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': { schema: { $ref: '#/components/schemas/RegisterRequest' } }
                        }
                    },
                    responses: {
                        201: {
                            description: 'Utilisateur créé',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: { type: 'string', example: 'User registered' },
                                            user: { $ref: '#/components/schemas/User' }
                                        }
                                    }
                                }
                            }
                        },
                        400: { description: 'Erreur de validation', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
                    }
                }
            },
            '/auth/login': {
                post: {
                    tags: ['Auth'],
                    summary: 'Se connecter et obtenir un token JWT',
                    security: [],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } }
                        }
                    },
                    responses: {
                        200: {
                            description: 'Connexion réussie, retourne le token JWT',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginResponse' } } }
                        },
                        400: { description: 'Email ou mot de passe invalide', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
                    }
                }
            },

            // -------------------------------------------------------
            // INGREDIENTS
            // -------------------------------------------------------

            '/ingredients': {
                get: {
                    tags: ['Ingredients'],
                    summary: 'Récupérer tous les ingrédients',
                    description: 'Rôles autorisés : admin, cook, waiter',
                    responses: {
                        200: {
                            description: 'Liste des ingrédients',
                            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Ingredient' } } } }
                        },
                        401: { description: 'Token manquant' },
                        403: { description: 'Accès refusé' }
                    }
                },
                post: {
                    tags: ['Ingredients'],
                    summary: 'Créer un ingrédient',
                    description: 'Rôles autorisés : admin, cook',
                    requestBody: {
                        required: true,
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/IngredientRequest' } } }
                    },
                    responses: {
                        201: { description: 'Ingrédient créé', content: { 'application/json': { schema: { $ref: '#/components/schemas/Ingredient' } } } },
                        401: { description: 'Token manquant' },
                        403: { description: 'Accès refusé' },
                        500: { description: 'Erreur serveur' }
                    }
                }
            },
            '/ingredients/{id}': {
                get: {
                    tags: ['Ingredients'],
                    summary: 'Récupérer un ingrédient par ID',
                    description: 'Rôles autorisés : admin, cook, waiter',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: {
                        200: { description: 'Ingrédient trouvé', content: { 'application/json': { schema: { $ref: '#/components/schemas/Ingredient' } } } },
                        404: { description: 'Ingrédient non trouvé' },
                        401: { description: 'Token manquant' },
                        403: { description: 'Accès refusé' }
                    }
                },
                put: {
                    tags: ['Ingredients'],
                    summary: 'Mettre à jour un ingrédient',
                    description: 'Rôles autorisés : admin, cook',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    requestBody: {
                        required: true,
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/IngredientRequest' } } }
                    },
                    responses: {
                        200: { description: 'Ingrédient mis à jour', content: { 'application/json': { schema: { $ref: '#/components/schemas/Ingredient' } } } },
                        404: { description: 'Ingrédient non trouvé' },
                        401: { description: 'Token manquant' },
                        403: { description: 'Accès refusé' }
                    }
                },
                delete: {
                    tags: ['Ingredients'],
                    summary: 'Supprimer un ingrédient',
                    description: 'Rôles autorisés : admin, cook',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: {
                        200: { description: 'Ingrédient supprimé' },
                        404: { description: 'Ingrédient non trouvé' },
                        401: { description: 'Token manquant' },
                        403: { description: 'Accès refusé' }
                    }
                }
            },

            // -------------------------------------------------------
            // DISHES
            // -------------------------------------------------------

            '/dishes': {
                get: {
                    tags: ['Dishes'],
                    summary: 'Récupérer tous les plats',
                    description: 'Rôles autorisés : admin, cook, waiter, customer',
                    responses: {
                        200: {
                            description: 'Liste des plats',
                            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Dish' } } } }
                        },
                        401: { description: 'Token manquant' },
                        403: { description: 'Accès refusé' }
                    }
                },
                post: {
                    tags: ['Dishes'],
                    summary: 'Créer un plat',
                    description: 'Rôles autorisés : admin, cook',
                    requestBody: {
                        required: true,
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/DishRequest' } } }
                    },
                    responses: {
                        201: { description: 'Plat créé', content: { 'application/json': { schema: { $ref: '#/components/schemas/Dish' } } } },
                        401: { description: 'Token manquant' },
                        403: { description: 'Accès refusé' },
                        500: { description: 'Erreur serveur' }
                    }
                }
            },
            '/dishes/{id}': {
                get: {
                    tags: ['Dishes'],
                    summary: 'Récupérer un plat par ID',
                    description: 'Rôles autorisés : admin, cook, waiter, customer',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: {
                        200: { description: 'Plat trouvé', content: { 'application/json': { schema: { $ref: '#/components/schemas/Dish' } } } },
                        404: { description: 'Plat non trouvé' },
                        401: { description: 'Token manquant' },
                        403: { description: 'Accès refusé' }
                    }
                },
                put: {
                    tags: ['Dishes'],
                    summary: 'Mettre à jour un plat',
                    description: 'Rôles autorisés : admin, cook',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    requestBody: {
                        required: true,
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/DishRequest' } } }
                    },
                    responses: {
                        200: { description: 'Plat mis à jour', content: { 'application/json': { schema: { $ref: '#/components/schemas/Dish' } } } },
                        404: { description: 'Plat non trouvé' },
                        401: { description: 'Token manquant' },
                        403: { description: 'Accès refusé' }
                    }
                },
                delete: {
                    tags: ['Dishes'],
                    summary: 'Supprimer un plat',
                    description: 'Rôles autorisés : admin, cook',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: {
                        200: { description: 'Plat supprimé' },
                        404: { description: 'Plat non trouvé' },
                        401: { description: 'Token manquant' },
                        403: { description: 'Accès refusé' }
                    }
                }
            },

            // -------------------------------------------------------
            // MENUS
            // -------------------------------------------------------

            '/menus': {
                get: {
                    tags: ['Menus'],
                    summary: 'Récupérer tous les menus',
                    description: 'Rôles autorisés : admin, cook, waiter, customer',
                    responses: {
                        200: {
                            description: 'Liste des menus',
                            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Menu' } } } }
                        },
                        401: { description: 'Token manquant' },
                        403: { description: 'Accès refusé' }
                    }
                },
                post: {
                    tags: ['Menus'],
                    summary: 'Créer un menu',
                    description: 'Rôles autorisés : admin, cook',
                    requestBody: {
                        required: true,
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/MenuRequest' } } }
                    },
                    responses: {
                        201: { description: 'Menu créé', content: { 'application/json': { schema: { $ref: '#/components/schemas/Menu' } } } },
                        401: { description: 'Token manquant' },
                        403: { description: 'Accès refusé' },
                        500: { description: 'Erreur serveur' }
                    }
                }
            },
            '/menus/{id}': {
                get: {
                    tags: ['Menus'],
                    summary: 'Récupérer un menu par ID',
                    description: 'Rôles autorisés : admin, cook, waiter, customer',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: {
                        200: { description: 'Menu trouvé', content: { 'application/json': { schema: { $ref: '#/components/schemas/Menu' } } } },
                        404: { description: 'Menu non trouvé' },
                        401: { description: 'Token manquant' },
                        403: { description: 'Accès refusé' }
                    }
                },
                put: {
                    tags: ['Menus'],
                    summary: 'Mettre à jour un menu',
                    description: 'Rôles autorisés : admin, cook',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    requestBody: {
                        required: true,
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/MenuRequest' } } }
                    },
                    responses: {
                        200: { description: 'Menu mis à jour', content: { 'application/json': { schema: { $ref: '#/components/schemas/Menu' } } } },
                        404: { description: 'Menu non trouvé' },
                        401: { description: 'Token manquant' },
                        403: { description: 'Accès refusé' }
                    }
                },
                delete: {
                    tags: ['Menus'],
                    summary: 'Supprimer un menu',
                    description: 'Rôles autorisés : admin, cook',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: {
                        200: { description: 'Menu supprimé' },
                        404: { description: 'Menu non trouvé' },
                        401: { description: 'Token manquant' },
                        403: { description: 'Accès refusé' }
                    }
                }
            },

            // -------------------------------------------------------
            // ORDERS
            // -------------------------------------------------------

            '/orders': {
                get: {
                    tags: ['Orders'],
                    summary: 'Récupérer toutes les commandes',
                    description: 'Rôles autorisés : admin, cook, waiter, customer',
                    responses: {
                        200: {
                            description: 'Liste des commandes',
                            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Order' } } } }
                        },
                        401: { description: 'Token manquant' },
                        403: { description: 'Accès refusé' }
                    }
                },
                post: {
                    tags: ['Orders'],
                    summary: 'Créer une commande',
                    description: 'Rôles autorisés : admin, waiter, customer',
                    requestBody: {
                        required: true,
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/OrderRequest' } } }
                    },
                    responses: {
                        201: { description: 'Commande créée', content: { 'application/json': { schema: { $ref: '#/components/schemas/Order' } } } },
                        401: { description: 'Token manquant' },
                        403: { description: 'Accès refusé' },
                        500: { description: 'Erreur serveur' }
                    }
                }
            },
            '/orders/{id}': {
                get: {
                    tags: ['Orders'],
                    summary: 'Récupérer une commande par ID',
                    description: 'Rôles autorisés : admin, cook, waiter, customer',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: {
                        200: { description: 'Commande trouvée', content: { 'application/json': { schema: { $ref: '#/components/schemas/Order' } } } },
                        404: { description: 'Commande non trouvée' },
                        401: { description: 'Token manquant' },
                        403: { description: 'Accès refusé' }
                    }
                },
                put: {
                    tags: ['Orders'],
                    summary: 'Mettre à jour une commande',
                    description: 'Rôles autorisés : admin, waiter',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    requestBody: {
                        required: true,
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/OrderRequest' } } }
                    },
                    responses: {
                        200: { description: 'Commande mise à jour', content: { 'application/json': { schema: { $ref: '#/components/schemas/Order' } } } },
                        404: { description: 'Commande non trouvée' },
                        401: { description: 'Token manquant' },
                        403: { description: 'Accès refusé' }
                    }
                },
                delete: {
                    tags: ['Orders'],
                    summary: 'Supprimer une commande',
                    description: 'Rôles autorisés : admin, waiter',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: {
                        200: { description: 'Commande supprimée' },
                        404: { description: 'Commande non trouvée' },
                        401: { description: 'Token manquant' },
                        403: { description: 'Accès refusé' }
                    }
                }
            }
        }
    },
    apis: []
};

const swaggerSpec = swaggerJsdoc(options);

/**
 * Setup Swagger UI on the Express app.
 * @param {object} app - The Express application instance
 */
function setupSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Swagger UI available at http://localhost:3000/api-docs');
}

module.exports = setupSwagger;