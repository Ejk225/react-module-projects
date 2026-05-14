# React Module Projects

Ce dépôt regroupe les projets réalisés durant le module React à l'ESTIAM.  
Chaque projet est une application complète avec frontend React et backend Node.js.

---

## Projets

### 1. Todo App
Application de gestion de tâches avec authentification complète.

**Fonctionnalités :**
- Inscription et connexion avec JWT
- Ajout, suppression et complétion de tâches
- Chaque utilisateur voit uniquement ses propres tâches
- Routes protégées (accès refusé si non connecté)
- Déconnexion avec suppression du token

**Technologies :** React, Vite, Node.js, Express, JWT

**Lancement :**
```bash
# Backend (port 3001)
cd Todo-App/backend
npm install
node server.js

# Frontend (port 5173)
cd Todo-App
npm install
npm run dev
```

**Compte de test :** `test@test.com` / `1234`

---

### 2. Gestionnaire de Contacts
Application CRUD de gestion de contacts avec authentification.

**Fonctionnalités :**
- Inscription et connexion avec JWT
- Chaque utilisateur gère uniquement ses propres contacts
- Ajout d'un contact (prénom, nom, email, téléphone)
- Modification et suppression
- Recherche en temps réel
- Tri automatique par nom
- Validation des champs (format email, champs obligatoires)
- Déconnexion avec suppression du token

**Technologies :** React, Vite, Node.js, Express, JWT

**Lancement :**
```bash
# Backend (port 3000)
cd Gestionnaire-contacts
npm install
node server.js

# Frontend (port 5173)
cd Gestionnaire-contacts/frontend
npm install
npm run dev
```

**Compte de test :** `test@test.com` / `1234`

---

### 3. Mini Blog / Espace Membre
Application multi-pages de blog avec espace membre complet.

**Fonctionnalités :**
- Inscription et connexion avec JWT
- Liste publique de tous les articles
- Page de détail d'un article (auteur, date, contenu)
- Création, modification et suppression d'articles
- Modification et suppression réservées à l'auteur uniquement
- Barre de navigation dynamique selon l'état de connexion
- Routes protégées avec React Router v6
- Page 404 pour les routes inexistantes

**Technologies :** React, Vite, React Router v6, Node.js, Express, JWT

**Lancement :**
```bash
# Backend (port 3002)
cd Mini-Blog/backend
npm install
node server.js

# Frontend (port 5173)
cd Mini-Blog/frontend
npm install
npm run dev
```

**Compte de test :** `test@test.com` / `1234`

---

## Structure du dépôt

```
react-module-projects/
├── Todo-App/
│   ├── backend/
│   │   ├── server.js
│   │   └── package.json
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       └── Components/
│           ├── Login.jsx
│           ├── TodoForm.jsx
│           ├── TodoItem.jsx
│           └── TodoList.jsx
├── Gestionnaire-contacts/
│   ├── server.js
│   ├── package.json
│   └── frontend/
│       └── src/
│           ├── App.jsx
│           └── Components/
│               ├── Login.jsx
│               ├── ContactForm.jsx
│               ├── ContactList.jsx
│               └── ContactItem.jsx
└── Mini-Blog/
    ├── backend/
    │   ├── server.js
    │   └── package.json
    └── frontend/
        └── src/
            ├── App.jsx
            ├── context/
            │   └── AuthContext.jsx
            ├── lib/
            │   └── api.js
            ├── components/
            │   ├── Navbar.jsx
            │   ├── ProtectedRoute.jsx
            │   ├── ArticleCard.jsx
            │   └── ArticleForm.jsx
            └── pages/
                ├── Home.jsx
                ├── Login.jsx
                ├── Register.jsx
                ├── ArticleDetail.jsx
                ├── CreateArticle.jsx
                ├── EditArticle.jsx
                ├── MyArticles.jsx
                └── NotFound.jsx
```

---

## Technologies utilisées

| Technologie | Utilisation |
|---|---|
| React + Vite | Frontend de tous les projets |
| React Router v6 | Navigation multi-pages (Mini Blog) |
| Node.js + Express | Backend API REST |
| JWT | Authentification sécurisée |
| CSS | Styles personnalisés |
