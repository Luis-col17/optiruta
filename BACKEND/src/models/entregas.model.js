// ==========================================
// MODEL — Entrega
// ==========================================
const db = require('../config/db');

const Entrega = {

    // ==========================================
    // OBTENER TODAS
    // ==========================================
    async getAll() {
        const [rows] = await db.query(
            `SELECT id_entrega, cliente, barrio, direccion,
                    repartidor, vehiculo, tipo_paquete,
                    peso_kg, volumen_m3, lat, lng
             FROM entregas
             ORDER BY id_entrega`
        );
        return rows;
    },

    // ==========================================
    // OBTENER POR ID
    // ==========================================
    async getById(id) {
        const [rows] = await db.query(
            `SELECT id_entrega, cliente, barrio, direccion,
                    repartidor, vehiculo, tipo_paquete,
                    peso_kg, volumen_m3, lat, lng
             FROM entregas
             WHERE id_entrega = ?`,
            [id]
        );
        return rows[0] || null;
    },

    // ==========================================
    // FILTRAR POR VEHÍCULO
    // ==========================================
    async getByVehiculo(vehiculo) {
        const [rows] = await db.query(
            `SELECT id_entrega, cliente, barrio, direccion,
                    repartidor, vehiculo, tipo_paquete,
                    peso_kg, volumen_m3, lat, lng
             FROM entregas
             WHERE vehiculo = ?
             ORDER BY id_entrega`,
            [vehiculo]
        );
        return rows;
    },

    // ==========================================
    // FILTRAR POR REPARTIDOR
    // ==========================================
    async getByRepartidor(repartidor) {
        const [rows] = await db.query(
            `SELECT id_entrega, cliente, barrio, direccion,
                    repartidor, vehiculo, tipo_paquete,
                    peso_kg, volumen_m3, lat, lng
             FROM entregas
             WHERE repartidor = ?
             ORDER BY id_entrega`,
            [repartidor]
        );
        return rows;
    },

    // ==========================================
    // FILTRAR POR BARRIO
    // ==========================================
    async getByBarrio(barrio) {
        const [rows] = await db.query(
            `SELECT id_entrega, cliente, barrio, direccion,
                    repartidor, vehiculo, tipo_paquete,
                    peso_kg, volumen_m3, lat, lng
             FROM entregas
             WHERE barrio = ?
             ORDER BY id_entrega`,
            [barrio]
        );
        return rows;
    },

    // ==========================================
    // CREAR ENTREGA
    // ==========================================
    async create(entrega) {
        const [result] = await db.query(
            `INSERT INTO entregas
             (cliente, barrio, direccion, repartidor,
              vehiculo, tipo_paquete, peso_kg, volumen_m3, lat, lng)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                entrega.cliente,
                entrega.barrio,
                entrega.direccion,
                entrega.repartidor,
                entrega.vehiculo,
                entrega.tipo_paquete,
                entrega.peso_kg,
                entrega.volumen_m3 || null,
                entrega.lat        || null,
                entrega.lng        || null
            ]
        );
        return { id: result.insertId, ...entrega };
    },

    // ==========================================
    // SOLO ENTREGAS CON COORDENADAS
    // ==========================================
    async obtenerEntregasConCoordenadas() {
        const [rows] = await db.query(
            `SELECT id_entrega, cliente, barrio, direccion,
                    repartidor, vehiculo, tipo_paquete,
                    peso_kg, volumen_m3, lat, lng
             FROM entregas
             WHERE lat IS NOT NULL
               AND lng IS NOT NULL
             ORDER BY id_entrega`
        );
        return rows;
    },

    // ==========================================
    // ACTUALIZAR COORDENADAS
    // ==========================================
    async actualizarCoordenadas(id, lat, lng) {
        await db.query(
            `UPDATE entregas
             SET lat = ?, lng = ?
             WHERE id_entrega = ?`,
            [lat, lng, id]
        );
    },

    // ==========================================
    // ACTUALIZAR VOLUMEN
    // ==========================================
    async actualizarVolumen(id, volumen_m3) {
        await db.query(
            `UPDATE entregas
             SET volumen_m3 = ?
             WHERE id_entrega = ?`,
            [volumen_m3, id]
        );
    },

    // ==========================================
    // ESTADÍSTICAS GENERALES
    // ==========================================
    async getEstadisticas() {
        const [rows] = await db.query(
            `SELECT
                COUNT(*)                        AS total,
                SUM(peso_kg)                    AS peso_total,
                SUM(volumen_m3)                 AS volumen_total,
                AVG(peso_kg)                    AS peso_promedio,
                COUNT(DISTINCT vehiculo)        AS tipos_vehiculo,
                COUNT(DISTINCT barrio)          AS total_barrios,
                COUNT(DISTINCT repartidor)      AS total_repartidores,
                SUM(lat IS NOT NULL)            AS con_coordenadas,
                SUM(volumen_m3 IS NOT NULL)     AS con_volumen
                FROM entregas`
        );
        return rows[0];
    }
};

module.exports = Entrega;