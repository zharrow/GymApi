# Enterprise API

## Description

L'API Enterprise est une plateforme backend permettant de gérer des entreprises, des gyms, des abonnements et des statistiques associées. Elle inclut des fonctionnalités robustes pour l'administration des entités, le suivi des performances et l'intégration avec des systèmes tiers.

## Features

### Entreprises

CRUD complet pour les entreprises.

Gestion des gyms associés.

Calcul du chiffre d'affaires et des statistiques globales.

### Gyms

CRUD pour les gyms associés à une entreprise.

Gestion des abonnements des utilisateurs dans chaque gym.

Suivi des statistiques d'entrée/sortie.

### Abonnements

Création et gestion des abonnements des utilisateurs.

Assignation et mise à jour des abonnements.

Suivi des abonnements actifs.

### Statistiques

Chiffre d'affaires global et par entreprise.

Statistiques de fréquentation par gym.

Vue globale des entreprises (gyms, abonnements, revenus).

# Installation

Prérequis

Node.js (version 14+)

PostgreSQL

Prisma CLI

# Étapes

Clonez le dépôt :
```
git clone https://github.com/username/enterprise-api.git
```
Accédez au répertoire :
```
cd enterprise-api
```
Installez les dépendances :
```
npm install
```
Configurez les variables d'environnement :
Créez un fichier .env à la racine avec les paramètres suivants :
```
DATABASE_URL=postgresql://user:password@localhost:5432/enterprise_db
JWT_SECRET=your_jwt_secret
PORT=3000
```
Configurez la base de données :
```
npx prisma migrate dev --name init
```
Démarrez le serveur :
```
npm start
```
Le serveur sera accessible sur http://localhost:3000.

# Endpoints

## Entreprises

GET /api/enterprises : Récupère toutes les entreprises.

GET /api/enterprises/:id : Récupère une entreprise par ID.

POST /api/enterprises : Crée une nouvelle entreprise.

PUT /api/enterprises/:id : Met à jour une entreprise.

DELETE /api/enterprises/:id : Supprime une entreprise.

GET /api/enterprises/global-stats : Récupère les statistiques globales.

GET /api/enterprises/:enterpriseId/turnover : Récupère le chiffre d'affaires d'une entreprise.

GET /api/enterprises/:gymId/attendance : Récupère les statistiques d'entrée/sortie d'un gym.

## Gyms

GET /api/gyms : Récupère tous les gyms.

POST /api/gyms : Crée un gym associé à une entreprise.

## Abonnements

POST /api/users/subscriptions : Assigne un abonnement à un utilisateur.

PUT /api/users/subscriptions/:userSubscriptionId : Met à jour un abonnement.

DELETE /api/users/subscriptions/:userSubscriptionId : Supprime un abonnement.

# Technologies Utilisées

**Node.js :** Plateforme backend.

**Express.js :** Framework pour la création d'API.

**Prisma :** ORM pour la gestion des bases de données.

**PostgreSQL :** Base de données relationnelle.

**JWT :** Authentification sécurisée.

