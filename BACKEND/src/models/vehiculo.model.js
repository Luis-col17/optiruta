const db = require("../config/db");

const Vehiculo = {
  async getAll() {
    const [rows] = await db.query(`
      SELECT id, tipo, placa, capacidad_kg, capacidad_volumen_m3, disponible
      FROM vehiculos
      ORDER BY id
    `);

    return rows;
  },

  async getDisponibles() {
    const [rows] = await db.query(`
      SELECT id, tipo, placa, capacidad_kg, capacidad_volumen_m3, disponible
      FROM vehiculos
      WHERE disponible = 1
      ORDER BY id
    `);

    return rows;
  },

  async getById(id) {
    const [rows] = await db.query(
      `
      SELECT id, tipo, placa, capacidad_kg, capacidad_volumen_m3, disponible
      FROM vehiculos
      WHERE id = ?
      `,
      [id]
    );

    return rows[0];
  },

  async create(vehiculo) {
    const [result] = await db.query(
      `
      INSERT INTO vehiculos
      (
        tipo,
        placa,
        capacidad_kg,
        capacidad_volumen_m3,
        disponible
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        vehiculo.tipo,
        vehiculo.placa,
        vehiculo.capacidad_kg,
        vehiculo.capacidad_volumen_m3,
        vehiculo.disponible ?? 1,
      ]
    );

    return {
      id: result.insertId,
      ...vehiculo,
    };
  },

  async updateDisponible(id, disponible) {
    await db.query(
      `
      UPDATE vehiculos
      SET disponible = ?
      WHERE id = ?
      `,
      [disponible, id]
    );
  },
};

module.exports = Vehiculo;