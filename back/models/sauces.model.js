const mongoose = require("mongoose"); // Importation de mongoose pour accéder à la fonction schéma et model

// La méthode  Schema  de Mongoose vous permet de créer un schéma de données pour votre base de données MongoDB.
//La méthode  model  transforme ce modèle en un modèle utilisable.

// Valeur attendu pour créer une sauce
const saucesSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mainPepper: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  heat: {
    type: Number,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  usersLiked: {
    type: [String],
  },
  usersDisliked: {
    type: [String],
  },
});

module.exports = mongoose.model("Sauces", saucesSchema); // Exportation du model créé
