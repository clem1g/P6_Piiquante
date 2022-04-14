const bcrypt = require("bcrypt"); // Package de cryptage du code
const jwt = require("jsonwebtoken"); // Package pour générer des token

const User = require("../models/user.model");

// Inscription d'un nouvel utilisateur
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    // Fonction asynchrone pour hasher le mot de passe ( 10 tours pour crypter)
    .then((hash) => {
      // Création du nouvel utilisateur
      const user = new User({
        email: req.body.email,
        password: hash, // Mot de passe crypté
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error })); // code 500 = Erreur interne du serveur
};

// Connexion d'un utilisateur
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }) // Trouver un utilisateur par rapport à l'adresse mail
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé" });
      }
      bcrypt
        .compare(req.body.password, user.password) // Comparaison des mots de passe.
        .then((valid) => {
          if (!valid) {
            // si mot de passe incorrect
            return res.status(401).json({ error: "Mot de passe incorrect" });
          }
          res.status(200).json({
            // Connexion possible
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }), // Token généré et valide 24 heures (chaîne de caractère encodé, mais simple pour ce projet-là)
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status((500).json(error)));
};
