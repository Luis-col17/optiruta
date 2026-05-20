const { obtenerEntregasPorVehiculo } = require("../models/entregas.model");
const greedyRutas = require("../../dataset/greedy");
const mochila = require("../../dataset/mochila");

const capacidades = {
    moto: 15,
    bicicleta: 8,
    van: 40,
    carro: 40,
    camion: 100
};

async function calcularRuta(req, res) {
    try {
        const { algoritmo, vehiculo } = req.params;

        const vehiculoNormalizado = vehiculo.toLowerCase();
        const capacidad = capacidades[vehiculoNormalizado];

        if (!capacidad) {
            return res.status(400).json({
                error: "Vehiculo no valido"
            });
        }

        const paquetes = await obtenerEntregasPorVehiculo(vehiculoNormalizado);

        let resultado;

        if (algoritmo === "greedy") {
            resultado = greedyRutas(paquetes, capacidad);
        } else if (algoritmo === "mochila") {
            resultado = mochila(paquetes, capacidad);
        } else {
            return res.status(400).json({
                error: "Algoritmo no valido. Usa greedy o mochila"
            });
        }

        res.json({
            vehiculo,
            capacidad,
            totalPaquetesDisponibles: paquetes.length,
            ...resultado
        });

    } catch (error) {
        res.status(500).json({
            error: "Error al calcular la ruta",
            detalle: error.message
        });
    }
}

module.exports = {
    calcularRuta
};