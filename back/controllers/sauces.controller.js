const Sauces = require("../models/sauces.model");
const fs = require("fs"); // Package File system pour la gestion des fichiers

// Ajouter une nouvelle sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id; // enlève le champ _id de la requête
  const sauces = new Sauces({
    ...sauceObject, // ... = spread operator (simplifie la notation pour modifier un tableau avec les valeurs à y ajouter.)
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`, // URL dynamique de l'image récupéré
  });
  sauces
    .save() // Fonction pour sauvegarder l'objet créé
    .then(() => {
      res.status(201).json({
        // Code 201 = Objet créé avec succès
        message: "Sauce ajoutée avec succès !",
      });
    })
    .catch((error) => {
      res.status(400).json({
        // Code 400 = La syntaxe de la requête est erronée
        error: error,
      });
    });
};

// Obtenir une sauce de l'api
exports.getOneSauce = (req, res, next) => {
  Sauces.findOne({
    // Affiche l'objet qui a pour paramètre l'id correspond à l'id de l'url
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce); // Code 200 = demande réussi
    })
    .catch((error) => {
      res.status(404).json({
        // Code 404 = page non trouvée
        error: error,
      });
    });
};

// Obtenir toutes les sauces de l'api
exports.getAllSauces = (req, res, next) => {
  Sauces.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Mettre à jour une sauce
exports.modifySauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id }).then((sauce) => {
    const sauceObject = req.file
      ? {
          // ? = Simplification de If avec ':' pour l'équivalent du else
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`, // Génération de l'url de la nouvelle image
        }
      : { ...req.body }; // Si la photo n'est pas modifié
    if (sauce.userId === req.token.userId) {
      Sauces.updateOne(
        { _id: req.params.id },
        { ...sauceObject, _id: req.params.id }
      )
        .then(() => {
          res.status(200).json({
            message: "Sauce modifiée avec succès !",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    }
  });
};

// Supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId === req.token.userId) {
        // Vérification si l'utilisateur est le propriétaire de la sauce
        const filename = sauce.imageUrl.split("/images/")[1]; // Récupération du nom de l'image
        fs.unlink(`images/${filename}`, () => {
          // Fonction pour supprimer un fichier
          Sauces.deleteOne({
            _id: req.params.id,
          })
            .then(() => {
              res.status(200).json({
                message: "Sauce supprimée avec succès !",
              });
            })
            .catch((error) => {
              res.status(400).json({
                error: error,
              });
            });
        });
      } else {
        res.status(401).json({
          error: "Vous n'êtes pas autorisé à supprimer cette sauce",
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// Afficher et contrôler les likes et dislikes des sauces
exports.likeDislikeSauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then((sauce) => {
      const userId = req.body.userId;
      const like = req.body.like;

      // Vérification si l'utilisateur n'a pas déjà liker ou disliker
      sauce.usersLiked = sauce.usersLiked.filter((user) => user !== userId);
      sauce.usersDisliked = sauce.usersDisliked.filter(
        (user) => user !== userId
      );

      if (like === 1) {
        // Si l'utilisateur a liker on met son id dans le tableau des likes
        sauce.usersLiked.push(userId);
      }
      if (like === -1) {
        // Si l'utilisateur a disliker on met son id dans le tableau des dislikes
        sauce.usersDisliked.push(userId);
      }
      // On affiche le nombre d'userID présent dans les deux tableaux
      sauce.likes = sauce.usersLiked.length;
      sauce.dislikes = sauce.usersDisliked.length;

      sauce
        .save() // Sauvegarde des likes et dislikes dans la base de données
        .then(() => res.status(200).json({ message: "Avis modifié" }))
        .catch((error) => res.status(400).json({ error }));
    })

    .catch((error) => res.status(500).json({ error }));
};
