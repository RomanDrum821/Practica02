const express = require("express");
const router = express.Router();
const userController = require("../controllers/auth.controller");

//Definir las rutas
router.post("/", userController.login);

module.exports = router;
