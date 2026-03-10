# Mcdo Backend API

API RESTful développée en **Node.js** permettant de gérer les opérations internes d’un restaurant type fast-food (menus, plats, commandes et ingrédients).

Ce projet est réalisé dans le cadre du **module Projet Backend** et a pour objectif de mettre en pratique la création d’une **API backend sécurisée avec gestion CRUD et authentification**.

---

# Objectifs du projet

* Développer une **API RESTful** structurée et modulable
* Implémenter un **CRUD complet** pour les entités principales
* Mettre en place une **authentification sécurisée avec JWT**
* Gérer les **relations entre menus, plats, commandes et ingrédients**
* Tester les endpoints via **Postman**
* Générer une **documentation automatique avec Swagger**

---

# Technologies utilisées

* **Node.js**
* **Express.js**
* **MySQL**
* **JWT (JSON Web Token)** pour l’authentification
* **Swagger** pour la documentation API
* **Postman** pour les tests
* **GitHub** pour le versioning

---

# Structure des entités

L’API gère les entités suivantes :

### Menus

Représente les menus proposés par le restaurant.

Attributs principaux :

* nom
* description
* taille

---

### Plats

Représente les produits individuels (ex : burger, frites).

Attributs principaux :

* nom
* description
* prix
* disponibilité
* taille

---

### Commandes

Représente les commandes effectuées.

Attributs principaux :

* numéro
* prix
* statut

---

### Ingrédients

Représente les composants utilisés dans les plats.

Attributs principaux :

* nom
* description
* disponibilité

---

# Relations principales

* Un **menu contient plusieurs plats**
* Un **plat peut appartenir à plusieurs menus**
* Une **commande peut contenir des menus et/ou des plats**
* Un **plat est composé de plusieurs ingrédients**

---

# Endpoints principaux

Exemples d’endpoints disponibles :

### Menus

```
GET /api/v1/menus
POST /api/v1/menus
PUT /api/v1/menus/:id
DELETE /api/v1/menus/:id
```

### Plats

```
GET /api/v1/plats
POST /api/v1/plats
PUT /api/v1/plats/:id
DELETE /api/v1/plats/:id
```

### Commandes

```
GET /api/v1/commandes
POST /api/v1/commandes
PUT /api/v1/commandes/:id
DELETE /api/v1/commandes/:id
```

---

# Authentification

L’API utilise **JWT (JSON Web Token)** pour sécuriser l’accès.

Les rôles possibles :

* **Administrateur** : gestion complète de l’API
* **Serveur / Caisse** : création et consultation des commandes
* **Cuisinier** : consultation des commandes à préparer

Les endpoints sensibles nécessitent un **token JWT valide**.

---

# Tests

Les endpoints sont testés avec **Postman**.

Les tests couvrent :

* opérations CRUD
* authentification
* gestion des erreurs
* contrôle des accès selon les rôles

---

# Documentation API

La documentation est générée automatiquement avec **Swagger**.

Elle est accessible via :

```
/api/docs
```

---

# Installation du projet

1. Cloner le repository

```
git clone https://github.com/onfire1003/API_McDo/edit/main/README.md
```

2. Installer les dépendances

```
npm install
```

3. Configurer les variables d’environnement

Créer un fichier `.env` :

```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
```

4. Lancer le serveur

```
npm start
```

---

# Équipe du projet

* **Samuel Theytaz**
* **Jason Edmonds**
* **Joel Cunha Faria**

Projet réalisé dans le cadre du **module Projet Backend**.
