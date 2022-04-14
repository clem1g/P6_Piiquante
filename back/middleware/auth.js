const jwt = require("jsonwebtoken");

// Permet de vérifier le token de l'utilisateur
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // récupération du token
    req.token = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // Décodage du token et vérification du token

    if (req.body.userId && req.body.userId !== req.token.userId) {
      throw "Cet ID de l'utilisateur ne correspond pas"; // renvoyé l'erreur
    } else {
      next(); // Permet d'aller au prochain middleware
    }
  } catch (error) {
    res.status(403).json({ error: error | "Requête non autorisée" }); // Code 403 = Ne permet pas d'éxecuter la fonction car mauvaise authentification
  }
};
