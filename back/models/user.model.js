const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Valeur attendu pour la création d'un utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Méthode pour avoir un seul mail par utilisateur
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
