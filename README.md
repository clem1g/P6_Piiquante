# PIIQUANTE
En tant que nouveau developeur backend de la société, l'objectif est de réaliser le back-end de la nouvelle application PIIQUANTE sur laquelle les amateurs de sauces piquantes pourront enregistrer des sauces , liker ou disliker les sauces des autres utilisateurs.

## Contexte : 
Piiquante souhaite lancer une application permettant à l’utilisateur d’ajouter leur sauce préférée et de générer de l’interaction en likant ou dislikant les sauces des autres utilisateurs.

Pour cela, l’utilisateur devra : 
Créer un compte personnel via une adresse mail valide et la création d’un mot de passe
Pouvoir se logger par la suite avec son identifiant et mot de passe 
Une fois connecté, l’utilisateur pourra : 
1.Ajouter sa sauce en y intégrant :
    - Le nom
    - le fabricant
    - une description
    - L’ingrédient épicée spécifique à la sauce
    - une image 
    - une note

2. Modifier une sauce qu’il a lui même créé

3. Supprimer sa sauce

4. Voir les likes et dislikes des autres utilisateurs

5. Avoir accès aux sauces créés par les autres utilisateurs (sans possibilité de modification)

6. Avoir la possibilité de liker ou disliker la sauce d’un autre utilisateur 


Pour pouvoir assurer une utilisation efficace et sécurisé de l’application, celle ci devra être constitué autour d’un back-end spécifique: 
- Mise en place d’une API sécurisé et structuré pour faire le lien entre l’interface et la base de données 
- Mise en place des packages nécessaire à l’utilisation et sécurisation (OWASP) de l’API
- Mise en place d’une base de données MongoDB adapté
- Codage des modeles, parcours, controleurs Users & Sauces et de middlewares d'authentification et de configuration du multer


## Technologies, logiciels,langages,frameworks, plugins utilisés
- Visual Studio Code
- Git, GitHubDesktop &Github
- NodeJs
- Express
- Mongoose
- bcrypt
- multer /JsonwebToken 
