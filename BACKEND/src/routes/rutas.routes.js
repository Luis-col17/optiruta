const express = require("express");
const router = express.Router();

const { calcularRuta } = require("../controllers/rutasController");

router.get("/rutas/:algoritmo/:vehiculo", calcularRuta);

module.exports = router;