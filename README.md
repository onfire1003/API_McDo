# API_McDo
## Membre du groupe
- Joel Cunha Faria
- Jason Edmonds
- Samuel Theytaz

## Installation
### librairie requise
- sequelize : `npm install sequelize`
- bcrypt : `npm install bcrypt`
- bcryptjs : `npm install bcryptjs`
- cookie-parser : `npm install cookie-parser`
- dotenv : `npm install dotenv`
- express : `npm install express`
- jsonwebtoken : `npm install jsonwebtoken`
- mysql2 : `npm install mysql2`

## Procédure d'exécution

1. **Démarrer la base de données**  
   Assurez-vous que votre serveur MySQL est lancé et que la base de données nécessaire est créée.

2. **Configurer le fichier `.env`**  
   Créez un fichier `.env` dans le dossier src et ajoutez les informations suivantes :
   ```env
    DB_HOST=localhost
    DB_USER=votre_utilisateur
    DB_PASSWORD=votre_mot_de_passe
    DB_NAME=app_macdo
    PORT=3006
    JWT_SECRET=jwt_secret
