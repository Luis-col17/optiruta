const pool = require("../config/db");

async function obtenerEntregasPorVehiculo(vehiculo) {
    const [rows] = await pool.query(
        "SELECT * FROM entregas WHERE LOWER(vehiculo) = LOWER(?)",
        [vehiculo]
    );

    return rows;
}

module.exports = {
    obtenerEntregasPorVehiculo
};