# API McDo Backend

API REST de gestion des **plats**, **menus**, **ingrédients**, **commandes** et **utilisateurs**.

## Objectif du projet

Ce projet fournit une API backend permettant de gérer :

- l’authentification des utilisateurs
- les plats
- les ingrédients
- les menus
- les commandes

La documentation détaillée des endpoints, des schémas de données et des réponses est disponible via **Swagger UI**.

---

## Auteurs

- Joel Cunha Faria
- Jason Edmonds
- Samuel Theytaz

---

## Branche à utiliser

```bash
git clone https://github.com/onfire1003/API_McDo.git
cd API_McDo
git checkout API-Version-1.0
```

---

## Technologies utilisées

- Node.js
- Express
- Sequelize
- MySQL
- JWT
- Swagger

---

## Dépendances principales

Les dépendances sont installées automatiquement avec :

```bash
npm install
```

Le projet utilise notamment :

- sequelize : `npm install sequelize`
- bcrypt : `npm install bcrypt`
- bcryptjs : `npm install bcryptjs`
- cookie-parser : `npm install cookie-parser`
- dotenv : `npm install dotenv`
- express : `npm install express`
- jsonwebtoken : `npm install jsonwebtoken`
- mysql2 : `npm install mysql2`
- swagger-jsdoc `npm install swagger-jsdoc`
- swagger-ui-express `npm install swagger-ui-express`

---

## Prérequis

Avant de lancer le projet, il faut avoir installé :

- Node.js
- npm
- MySQL

---

## Configuration

Créer un fichier `.env` à la racine du projet :

```env
DB_HOST=localhost
DB_USER=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
DB_NAME=app_macdo
PORT=3000
JWT_SECRET=jwt_secret
```

### Variables d’environnement

- `DB_HOST` : hôte MySQL
- `DB_USER` : utilisateur MySQL
- `DB_PASSWORD` : mot de passe MySQL
- `DB_NAME` : nom de la base de données
- `PORT` : port du serveur
- `JWT_SECRET` : secret pour signer les tokens JWT

---

## Base de données

Le projet utilise une base MySQL nommée :

`app_macdo`

Le script SQL à exécuter se trouve ici :

`src/config/create_database_insert_data.sql`

Ce script permet de :

- recréer la base de données
- créer les tables
- insérer des données de test

---

## Installation

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer le fichier `.env`

Créer le fichier `.env` à la racine du projet.

### 3. Initialiser la base de données

Exécuter le script SQL :

`src/config/create_database_insert_data.sql`

### 4. Lancer le serveur

```bash
node app.js
```

---

## Vérification

Une fois le serveur lancé, tester la route suivante :

```http
GET /
```

Réponse attendue :

```json
{
  "message": "API McDo backend active"
}
```

---

## Documentation API

La documentation complète de l’API est disponible avec **Swagger UI**.

### Accès Swagger

Par défaut, Swagger est accessible ici :

`http://localhost:3000/api-docs`

### Contenu de Swagger

Swagger contient :

- les endpoints disponibles
- les méthodes HTTP
- les paramètres
- les schémas de requête
- les schémas de réponse
- les erreurs possibles
- la sécurité JWT

> Le `README.md` donne une vue d’ensemble du projet.  
> Pour le détail technique des routes, il faut utiliser Swagger.

---

## Authentification

L’API utilise une authentification par **JWT**.

### Routes d’authentification

- `POST /auth/register`
- `POST /auth/login`

Après connexion, un token JWT est retourné.  
Ce token doit être envoyé dans les headers des routes protégées :

```http
Authorization: Bearer <votre_token>
```

---

## Ressources principales

L’API expose les grandes ressources suivantes :

- `/auth`
- `/ingredients`
- `/dishes`
- `/menus`
- `/orders`

> Pour la liste complète des endpoints disponibles et leur fonctionnement exact, consulter Swagger.

---

## Rôles utilisateurs

Le projet gère plusieurs rôles :

- `admin`
- `cook`
- `waiter`
- `customer`

Les autorisations varient selon les routes.  
Le détail des accès par rôle est documenté dans Swagger.

---

## Utilisateurs de test

Le script SQL crée plusieurs utilisateurs de démonstration avec différents rôles :

- `admin@eduvaud.ch`
- `cook@eduvaud.ch`
- `waiter@eduvaud.ch`
- `customer@eduvaud.ch`

> Les mots de passe étant chiffrés, il est recommandé de créer un utilisateur de test via l’endpoint d’inscription afin de connaître le mot de passe utilisé.

---

## Conseils de test

Pour tester rapidement l’API :

1. cloner le projet
2. se placer sur la bonne branche
3. installer les dépendances
4. configurer le fichier `.env`
5. exécuter le script SQL
6. lancer le serveur
7. ouvrir Swagger
8. créer un utilisateur de test
9. se connecter pour récupérer un token JWT
10. tester les routes protégées

---

## Structure utile du projet

Quelques fichiers importants :

- `app.js`
- `src/config/database.js`
- `src/config/env.js`
- `src/config/create_database_insert_data.sql`
- `swagger.js`

---

## Remarque importante

Le port indiqué dans le fichier `.env` peut être différent de celui configuré dans `swagger.js`.

Par exemple :

- API : `PORT=3000`
- Swagger : `http://localhost:3000/api-docs`

Il est conseillé d’uniformiser ces valeurs pour éviter toute confusion.

---

## Résumé

Le `README.md` sert à :

- comprendre rapidement le projet
- installer et lancer l’API
- configurer l’environnement
- accéder facilement à Swagger

La documentation détaillée des routes se trouve dans **Swagger UI**.