const express = require("express");
const router = express.Router();

const saucesController = require("../controllers/sauces.controller");

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Route pour ajouter une nouvelle sauce
router.post("/", auth, multer, saucesController.createSauce);

// Route pour récupérer une sauce de l'api
router.get("/:id", auth, saucesController.getOneSauce);

// Route pour récupérer toutes les sauces de l'api
router.get("/", auth, saucesController.getAllSauces);

// Route pour mettre à jour une sauce depuis l'api
router.put("/:id", auth, multer, saucesController.modifySauce);

// Route pour supprimer une sauce de l'api
router.delete("/:id", auth, saucesController.deleteSauce);

// Route pour ajouter un like/dislike à la sauce
router.post("/:id/like", auth, saucesController.likeDislikeSauce);

module.exports = router;
