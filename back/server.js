const http = require("http"); // Package http de node
const app = require("./app"); // Importation de l'application créé par Express

// Connexion au port 3000 ou un autre port de libre
app.set("port", process.env.PORT || 3000); // Utilisation de la méthode set sur l'application pour lire l'application sur le port définit
const server = http.createServer(app); // Création du server à partir de l'application express sur le port 3000

server.listen(process.env.PORT || 3000); // port 3000 = port par défaut // Process.env.PORT si jamais le port 3000 est prit

// Require permet d'importer les modules de base de Node très facilement sans spécifier le chemin exact du fichier et en omettant l'extension .js

// utilisation de nodemon pour charger automatiquement à chaque sauvegarde du fichier
