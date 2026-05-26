const axios = require("axios");

// ==========================================
// BASE URL
// ==========================================

const OSRM_URL =
    "http://router.project-osrm.org";

// ==========================================
// OBTENER RUTA VISUAL
// ==========================================

async function obtenerRutaOSRM(
    coordenadas
) {

    try {

        // ==========================================
        // VALIDAR
        // ==========================================

        if (
            !coordenadas ||
            coordenadas.length < 2
        ) {

            return {

                distancia: 0,

                duracion: 0,

                geometria: [],
            };
        }

        // ==========================================
        // FORMATO lng,lat
        // ==========================================

        const coords =
            coordenadas
                .map(
                    (c) =>
                        `${c.lng},${c.lat}`
                )
                .join(";");

        // ==========================================
        // URL
        // ==========================================

        const url =
            `${OSRM_URL}/route/v1/driving/${coords}?overview=full&geometries=geojson`;

        // ==========================================
        // REQUEST
        // ==========================================

        const response =
            await axios.get(url);

        const route =
            response.data.routes[0];

        // ==========================================
        // RESPONSE
        // ==========================================

        return {

            distancia:
                route.distance,

            duracion:
                route.duration,

            geometria:
                route.geometry.coordinates,
        };

    } catch (error) {

        console.error(
            "Error OSRM Route:",
            error.message
        );

        return {

            distancia: 0,

            duracion: 0,

            geometria: [],
        };
    }
}

// ==========================================
// MATRIZ DE DISTANCIAS
// ==========================================

async function obtenerMatriz(
    coordenadas
) {

    try {

        // ==========================================
        // VALIDAR
        // ==========================================

        if (
            !coordenadas ||
            coordenadas.length < 2
        ) {

            return [[0]];
        }

        // ==========================================
        // FORMATO lng,lat
        // ==========================================

        const coords =
            coordenadas
                .map(
                    (c) =>
                        `${c.lng},${c.lat}`
                )
                .join(";");

        // ==========================================
        // URL TABLE
        // ==========================================

        const url =
            `${OSRM_URL}/table/v1/driving/${coords}?annotations=distance`;

        // ==========================================
        // REQUEST
        // ==========================================

        const response =
            await axios.get(url);

        // ==========================================
        // MATRIZ
        // ==========================================

        return response.data.distances;

    } catch (error) {

        console.error(
            "Error OSRM Matrix:",
            error.message
        );

        throw error;
    }
}

// ==========================================
// EXPORTS
// ==========================================

module.exports = {

    obtenerRutaOSRM,

    obtenerMatriz,
};