// controllers/entregaController.js

const Entrega = require('../models/entregas.model');

const {geocodificar} = require("../services/geocoding.service");


// OBTENER TODAS
async function getAll(req, res) {

    try {

        const { vehiculo, repartidor, barrio } = req.query;

        let entregas;

        if (vehiculo)
            entregas = await Entrega.getByVehiculo(vehiculo);

        else if (repartidor)
            entregas = await Entrega.getByRepartidor(repartidor);

        else if (barrio)
            entregas = await Entrega.getByBarrio(barrio);

        else
            entregas = await Entrega.getAll();

        res.json({
            total: entregas.length,
            entregas
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
}


// OBTENER POR ID
async function getById(req, res) {

    try {

        const entrega = await Entrega.getById(req.params.id);

        if (!entrega) {

            return res.status(404).json({
                error: 'Entrega no encontrada'
            });

        }

        res.json(entrega);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
}


// CREAR ENTREGA
async function create(req, res) {
  try {
    const entrega = req.body;

    if (
      !entrega.cliente ||
      !entrega.barrio ||
      !entrega.direccion ||
      !entrega.tipo_paquete ||
      !entrega.peso_kg ||
      !entrega.volumen_m3
    ) {
      return res.status(400).json({
        error: "Faltan datos obligatorios para crear la entrega",
      });
    }

    const direccionCompleta = `${entrega.direccion}, ${entrega.barrio}, Ibague, Tolima, Colombia`;

    const coordenadas = await geocodificar(direccionCompleta);

    if (!coordenadas) {
      return res.status(400).json({
        error: "No se pudo obtener coordenadas para la direccion",
      });
    }

    entrega.repartidor = entrega.repartidor || "Sin asignar";
    entrega.vehiculo = entrega.vehiculo || "Sin asignar";
    entrega.lat = coordenadas.lat;
    entrega.lng = coordenadas.lng;

    const nuevaEntrega = await Entrega.create(entrega);

    res.status(201).json({
      mensaje: "Entrega creada",
      entrega: nuevaEntrega,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}


module.exports = {
    getAll,
    getById,
    create
};