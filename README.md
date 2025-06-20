# 💻 TP Angular - Plateforme E-commerce

## 📌 1. Introduction

### 🧭 1.1 Contexte du projet

Ce projet a pour objectif la création d'une application web de type **e-commerce**, dédiée à la vente de produits électroniques.  
Il s'inscrit dans le cadre du module *Développement Front-End et Frameworks* et vise à mettre en pratique les compétences en :

- Développement d’interfaces web interactives
- Intégration de services backend
- Gestion de données et navigation sécurisée

### 🎯 1.2 Objectifs

L'application permet aux utilisateurs de :

- 🛍️ Consulter un catalogue de produits électroniques (smartphones, casques, tablettes...)
- 🔍 Accéder aux détails de chaque produit
- 🛒 Ajouter des articles au panier
- 💳 Simuler un processus de commande et de paiement
- 🔐 Gérer les commandes avec des autorisations selon le rôle de l’utilisateur

### 🛠️ 1.3 Outils et technologies utilisés

| 💡 Côté     | 🔧 Technologie        | 🎯 Rôle                                       |
|------------|-----------------------|-----------------------------------------------|
| Frontend   | Angular               | Framework SPA (Single Page Application)       |
| Backend    | Node.js + Express     | API REST (produits, commandes)                |
| Données    | JavaScript simulé     | Stockage local des produits/commandes         |
| UI         | HTML, CSS             | Construction de l'interface utilisateur       |
| Sécurité   | AuthGuard, Interceptor| Sécurisation des routes et requêtes HTTP      |

---

## 🌐 2. Présentation de l'application

### 📃 2.1 Description générale

Cette application permet aux utilisateurs de :

- Parcourir un catalogue de produits
- Voir les détails de chaque article
- Gérer un panier d’achat
- Effectuer des paiements
- S’inscrire, se connecter, accéder à leur profil
- Les administrateurs peuvent gérer les utilisateurs et surveiller le stock

L’interface repose sur un header fixe pour une navigation fluide entre les pages.

### 🧩 2.2 Fonctionnalités principales

- 🛍️ **Catalogue**  
  Affichage des produits (image, prix, stock, description).  
  Boutons : `Ajouter au panier`, `Détail du produit`.

- 🛒 **Panier**  
  Consultation des articles, montant total, confirmation de commande.

- 💳 **Paiement**  
  Choix entre paiement à la livraison ou carte.  
  Formulaire dynamique selon le mode choisi.

- 📦 **Commandes**  
  Affichage de l’historique, stockage dans une base simulée.

- 👤 **Utilisateur**  
  Inscription, authentification, profil et historique.

- 🛠️ **Admin**  
  Accès restreint aux administrateurs pour gérer les utilisateurs.

- ⚠️ **Gestion automatique des stocks**  
  Mise à jour du stock après chaque commande.  
  Alerte visuelle en jaune si le stock < 10.

### 🎯 2.3 Public cible

- 👥 **Utilisateur** : navigation, commande, consultation du profil
- 👩‍💼 **Administrateur** : gestion des utilisateurs et du stock

---

## 🧱 3. Architecture du projet

### 🗂️ 3.1 Organisation générale

Séparation claire entre :

- 🧩 **Frontend Angular** : modules, services, routes
- 🧩 **Backend Express** : API REST modulaire

### 🔄 3.2 Communication Frontend ↔ Backend

- Requêtes HTTP via `HttpClient`
- Sécurisation avec `AuthGuard` et `Interceptor`
- Format JSON standardisé

### 🧱 3.3 Composants Angular

- `AppComponent` : racine + menu de navigation
- `HomeComponent` : accueil
- `CatalogComponent` : liste de produits
- `ProductDetailsComponent` : détail du produit
- `CartComponent` : panier
- `PaymentComponent` : validation de commande
- `OrderListComponent` : historique des commandes
- `AdminComponent` : interface admin
- `LoginComponent`, `RegisterComponent`, `ProfileComponent` : gestion utilisateur

### 🧩 3.4 Services principaux

- `ProductService` : produits et stock
- `CartService` : gestion locale du panier
- `AuthService` : connexion, JWT, rôles
- `OrderService` : commandes utilisateur
- `AdminService` : gestion utilisateurs/stocks

---

## 🚀 4. Fonctionnement du Frontend

### 📦 Composants clés

- `CatalogComponent` : liste avec état visuel (stock faible, rupture...)
- `ProductDetailsComponent` : image, description, prix, ajout au panier
- `CartComponent` : modification, suppression, validation
- `OrderListComponent` : commandes passées
- `AppComponent` : barre de navigation

### 🌐 Routage Angular

| 📍 URL             | 🔎 Page                            |
|-------------------|------------------------------------|
| `/`               | Accueil                            |
| `/catalog`        | Catalogue                          |
| `/product/:id`    | Détail produit                     |
| `/cart`           | Panier                             |
| `/orders`         | Commandes                          |
| `/login`          | Connexion                          |
| `/register`       | Inscription                        |
| `/profile/:id`    | Profil utilisateur                 |
| `/admin`          | Interface Admin (protégée)         |

### 🔐 Sécurité

- `AuthGuard` : protège les routes sensibles
- `AuthInterceptor` : ajoute le token JWT aux requêtes

### 🎨 Style

- Palette pastel (rose clair, bleu ciel)
- Interface responsive (mobile/tablette)
- Bonne ergonomie avec flexbox et media queries

---

## 🧩 5. Backend (Node.js + Express)

### ⚙️ Fichier `server.js`

- API REST simulée
- Middleware : `cors`, `express.json`, `dotenv`
- Serveur sur `http://localhost:3000`

### 📁 Routes principales

#### Produits
- `GET /api/v1/products`
- `GET /api/v1/products/:id`
- `PATCH /api/v1/products/:id`

#### Utilisateurs
- `POST /api/v1/users/login`
- `POST /api/v1/users/register`
- `GET /api/v1/users/profile/:id`

#### Commandes
- `POST /api/v1/orders`
- `GET /api/v1/orders/user/:userId`
- `PATCH /api/v1/orders/:id/status` (admin)

### 🔐 Authentification

- Middleware vérifiant le JWT
- Contrôle d’accès par rôle (admin ou utilisateur)

### 🧾 Format des données JSON

#### Produit

```json
{
  "id": 1,
  "name": "Samsung Galaxy A53",
  "price": 349.99,
  "quantity": 25,
  "image": "a53.png",
  "category": "smartphones",
  "description": "Smartphone performant milieu de gamme"
}
## ✅ Conclusion

Ce projet e-commerce démontre l'application concrète d’une architecture **web full-stack moderne** :

- 🧩 **Frontend Angular modulaire**
- ⚙️ **Backend Express** simulant une base de données
- 🔐 **API REST sécurisée par JWT**
- 🎨 **Design responsive et ergonomique**

Grâce à ce TP, plusieurs compétences essentielles ont été mobilisées :

- 📦 Structuration de projet Angular  
- 🔁 Communication frontend/backend  
- 🔐 Authentification et autorisations  
- 📱 Design responsive & UI moderne  

✨ Ce projet constitue une base solide pour développer des applications web **professionnelles et évolutives**.

📸 Vous trouverez les images (captures d'écran) de l'application dans le projet, dossier `public/screan-app` 🗂️.
