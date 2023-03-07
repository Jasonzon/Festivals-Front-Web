# Festivals Front - Jason MORET IG4

Ce répertoire contient tous les fichiers nécessaires à la partie Client du projet

## Technos

Le framework ReactJs a été utilisé, avec le template TypeScript
Certains composants sont importés de la librairie MaterialUI pour React

## Organisation des fichiers

Tous les composants se trouvent dans le dossier `/src/components`
Ils sont tous utilisés dans le composant `App.tsx`, qui organise l'application avec le React Routing.

## Fonctionnalités

Les fonctionnalités demandées sont toutes implémentées, et certaines sont en bonus

1. Gestion des jeux, zones, bénévoles et créneaux
2. Gestion des affectations de jeux et bénévoles
3. Login et Register, impossible d'ajouter ou modifier un row de la bd sans être connecté en tant qu'admin
4. Gestion du token dans le localStorage, et reconnexion automatique selon sa validité
5. Gestion des inputs, validation de tous les champs et affichage d'erreurs
6. Spinners / Loaders ajoutés lors des call API pour améliorer l'UX
7. UI efficace et responsive

Les call API sont dirigés vers le port 5000 de localhost

## Lancement du projet

Pour pouvoir espérer lancer le projet, il faut que l'API festivals-back et la base de données soient présents sur votre machine, et démarrés
Il suffit ensuite d'installer toutes les dépendances avec `npm install` et enfin d'éxécuter `npm start`

L'application sera disponible sur le port 3000