const express = require("express");
const { signup, login } = require("../controllers/authControllers");
const router = express.Router();

// Ruta de registro (signup)
router.post("/signup", signup);

// Ruta de login
router.post("/login", login);

module.exports = router;
