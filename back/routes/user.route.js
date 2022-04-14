const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

// Route pour s'inscrire
router.post("/signup", userController.signup);

//Route pour se connecter
router.post("/login", userController.login);

module.exports = router;
