// Récupération des extensions
const dotenv = require("dotenv").config(); // Mettre l'url de connexion de mongoDB dans un fichier à part
const express = require("express"); // Framework JS
const bodyParser = require("body-parser"); // Analyse les requêtes envoyées pour éviter les erreurs inattendues
const mongoose = require("mongoose"); // Connexion à mongoDB
const path = require("path"); // Pour récupérer la bonne route du fichier "images"

// Déclaration des routes pour les sauces et les utilisateurs
const userRoutes = require("./routes/user.route");
const saucesRoutes = require("./routes/sauces.route");

const app = express(); // Création de l'application Express

// Récupération de la base de données MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Middleware général pour géré le CORS (Cross origin ressource sharing) de l'application
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Tout le monde peut accéder à l'application depuis n'importe quelle origine
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); // Accepte certains en-têtes pour accéder à l'application
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  ); // Autorise ces méthodes
  // GET : permet de placer des paramètres directement dans une url
  // POST : prends en paramètre un chemin qui lorsqu’il sera appelé, exécutera la fonction placée en second paramètre
  // PATCH : applique des modifications partielles à une ressource
  // PUT : crée une nouvelle ressource ou remplace une représentation de la ressource ciblée par le contenu de la requête
  // DELETE : supprime la ressource indiquée
  // OPTIONS :utilisée pour décrire les options de communication pour la ressource ciblée. Le client peut renseigner un URL spécifique pour la méthode OPTIONS, ou un astérisque (*) pour interroger le serveur dans sa globalité
  next(); // Fonction pour passer au middleware suivant
});

app.use(bodyParser.json());
// Routes pour accéder aux sauces et aux utilisateurs
app.use("/api/auth", userRoutes);
app.use("/api/sauces", saucesRoutes);

app.use("/images", express.static(path.join(__dirname, "images"))); // Récupération du dossier statique où se trouvent les images

module.exports = app; // Exportation de l'application créé
