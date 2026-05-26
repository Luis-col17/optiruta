const Vehiculo = require("../models/vehiculo.model");

const getVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.getAll();
    res.json(vehiculos);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const createVehiculo = async (req, res) => {
  try {
    const {
      tipo,
      placa,
      capacidad_kg,
      capacidad_volumen_m3,
      disponible = 1,
    } = req.body;

    if (!tipo || !placa || !capacidad_kg || !capacidad_volumen_m3) {
      return res.status(400).json({
        error: "Faltan datos obligatorios para crear el vehiculo",
      });
    }

    const nuevoVehiculo = await Vehiculo.create({
      tipo,
      placa,
      capacidad_kg: Number(capacidad_kg),
      capacidad_volumen_m3: Number(capacidad_volumen_m3),
      disponible,
    });

    res.status(201).json({
      mensaje: "Vehiculo creado",
      vehiculo: nuevoVehiculo,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getVehiculos,
  createVehiculo,
};