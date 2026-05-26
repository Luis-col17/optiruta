const express = require("express");
const router = express.Router();

const {
  getVehiculos,
  createVehiculo,
} = require("../controllers/vehiculos.controller");

router.get("/", getVehiculos);
router.post("/", createVehiculo);

module.exports = router;