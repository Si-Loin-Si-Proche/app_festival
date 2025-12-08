# 📱 Application Mobile - Si Loin Si Proche

Bienvenue sur le dépôt de l'application mobile officielle du festival **Si Loin Si Proche**, développé dans le cadre du Projet Tuteuré IMAC (2e année) pour la **Ferme du Buisson**.

Ce projet a pour vocation d'être une application : elle est conçue pour être facilement adaptée (couleurs, logos, données) pour d'autres éditions ou d'autres événements culturels.

## 🛠 Stack Technique

Le projet repose sur un écosystème moderne et robuste, privilégiant la maintenabilité et le typage strict.

* **Framework :** [React Native](https://reactnative.dev/) (via [Expo SDK](https://expo.dev/))
* **Langage :** [TypeScript](https://www.typescriptlang.org/) (Typage statique)
* **Navigation :** [React Navigation](https://reactnavigation.org/) (Stack & Bottom Tabs)
* **Données & API :** [Axios](https://axios-http.com/) (Requêtes HTTP)
* **Stockage Local :** `AsyncStorage` (Gestion des favoris hors-ligne)
* **Qualité de code :** ESLint + Prettier

---

## 🚀 Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants sur votre machine :

1. **Node.js** (Version LTS recommandée)
2. **Git**
3. **L'application mobile "Expo Go"** sur votre smartphone (disponible sur [App Store](https://apps.apple.com/app/expo-go/id982107779) et [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)).

---

## 📥 Installation

Suivez ces étapes pour récupérer le projet et installer les dépendances.

### 1. Cloner le projet
Ouvrez votre terminal et exécutez :

```bash
git clone https://github.com/Si-Loin-Si-Proche/app_festival.git
cd SiLoinSiProche
```

2. Installer les dépendances
```bash
npm install
```

3. Configuration de l'environnement
   Le projet utilise des variables d'environnement (URL de l'API, Clés, etc.). Dupliquez le fichier d'exemple pour créer votre fichier de configuration local :

Copiez le fichier .env.example et renommez-le en .env.

Remplissez les variables nécessaires (demander à l'équipe technique pour les clés API).

---
## ▶️ Lancement (Développement)
Pour lancer le serveur de développement local :

```bash
npx expo start
```
Une fois la commande lancée, un QR Code s'affiche dans votre terminal.

1. Ouvrez l'application Expo Go sur votre téléphone.

2. Scannez le QR Code (avec l'appareil photo sur iOS, ou depuis l'app sur Android).

3. L'application se charge instantanément sur votre mobile.

---
## 📂 Architecture du projet
Le code source est organisé dans le dossier src/ pour garantir une séparation claire des responsabilités :
```
src/
├── assets/        # Images et icônes locales
├── components/    # Composants réutilisables (Boutons, Cards...)
├── constants/     # Configuration globale (Thème, Couleurs, API)
├── navigation/    # Configuration du routing (Tabs, Stack)
├── screens/       # Écrans complets (Home, Map, Agenda...)
├── services/      # Logique de connexion à l'API
├── types/         # Définitions des types TypeScript
└── utils/         # Fonctions utilitaires
```
---

## 🎨 Personnalisation (Concept Réutilisable)
L'identité visuelle de l'application est centralisée. Pour adapter l'application à un autre festival, modifiez simplement le fichier :
```
src/constants/theme.ts
```
Vous pouvez y changer les palettes de couleurs (COLORS), les polices (FONTS) et les dimensions globales.

## 👥 Auteurs
**Projet réalisé par l'équipe IMAC :**

- Januel Louise 
- Zafane-Bunel Louiza 
- Cuvillon Arthur

*Dernière mise à jour : Décembre 2025*
