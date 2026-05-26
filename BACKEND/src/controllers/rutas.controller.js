// ==========================================
// RUTA CONTROLLER
// Orquesta:
// Mochila → Kruskal → Backtracking → OSRM
// ==========================================

const Entrega = require("../models/entregas.model");

const mochila = require("../algoritmos/mochila");

const kruskal = require("../algoritmos/kruskal");

const {
    optimizarRutaBacktracking,
} = require("../algoritmos/backtracking");

const osrm = require("../services/osrm");

const Vehiculo = require("../models/vehiculo.model");

const {
  guardarGrafoKruskalSvg,
} = require("../utils/grafoKruskalSvg");
// ==========================================
// LÍMITE BACKTRACKING
// ==========================================

const MAX_BT = 10;

// ==========================================
// CONTROLADOR PRINCIPAL
// ==========================================

async function calcularRutas(req, res) {

    try {

        // ==========================================
        // 1 — LEER ENTREGAS
        // ==========================================

        const entregas =
            await Entrega.obtenerEntregasConCoordenadas();

        // ==========================================
        // VALIDAR
        // ==========================================

        if (entregas.length === 0) {

            return res.status(400).json({

                error:
                    "No hay entregas con coordenadas registradas",
            });
        }

        // ==========================================
        // 2 — VEHÍCULOS
        // ==========================================

        const vehiculos = await Vehiculo.getDisponibles();
          if (vehiculos.length === 0) {
            return res.status(400).json({
              error: "No hay vehiculos disponibles registrados",
            });
          }
        // ==========================================
        // 3 — MOCHILA
        // ==========================================

        const asignacion =
            mochila(
                entregas,
                vehiculos
            );

        // ==========================================
        // 4 — RUTAS POR VEHÍCULO
        // ==========================================

        const rutasPorVehiculo = [];

        // ==========================================
        // RECORRER FLOTA
        // ==========================================

        for (const vehiculo of asignacion.flota) {

            // ==========================================
            // SIN PAQUETES
            // ==========================================

            if (
                vehiculo.paquetes.length === 0
            ) {
                continue;
            }

            // ==========================================
            // PAQUETES
            // ==========================================

            const paquetes =
                vehiculo.paquetes;

            // ==========================================
            // 5 — MATRIZ OSRM
            // ==========================================

            const coords =
                paquetes.map((p) => ({

                    lat: parseFloat(p.lat),

                    lng: parseFloat(p.lng),
                }));

            let matriz = null;

            try {

                matriz =
                    await osrm.obtenerMatriz(coords);

            } catch (err) {

                console.warn(
                    `OSRM falló para ${vehiculo.tipo}`
                );

                matriz = null;
            }

            // ==========================================
            // 6 — KRUSKAL
            // ==========================================

            const resultadoKruskal =
                kruskal(
                    paquetes,
                    matriz ||
                    generarMatrizEuclidiana(paquetes)
                );
            
            const grafoKruskal =
                guardarGrafoKruskalSvg({
                    nodos: paquetes,
                    mst: resultadoKruskal.mst,
                    vehiculoId: vehiculo.id,
                    vehiculoTipo: vehiculo.tipo,
                });


            // ==========================================
            // 7 — BACKTRACKING
            // ==========================================

            let rutaFinal;

            let algoritmoUsado;

            // IMPORTANTE
            let resultadoBT = null;

            // ==========================================
            // SI SON POCOS NODOS
            // ==========================================

            if (
                paquetes.length <= MAX_BT
            ) {

                resultadoBT =
                    optimizarRutaBacktracking(

                        paquetes,

                        matriz,

                        vehiculo.pesoMax,

                        vehiculo.volumenMax,

                        resultadoKruskal.distanciaTotal
                    );

                // ==========================================
                // COMPARAR
                // ==========================================

                if (
                    resultadoBT.mejoroKruskal
                ) {

                    rutaFinal =
                        resultadoBT.mejorRuta;

                    algoritmoUsado =
                        "backtracking";

                } else {

                    rutaFinal =
                        resultadoKruskal.rutaOrdenada;

                    algoritmoUsado =
                        "kruskal";
                }

            } else {

                // ==========================================
                // MUCHOS NODOS
                // ==========================================

                rutaFinal =
                    resultadoKruskal.rutaOrdenada;

                algoritmoUsado =
                    "kruskal";
            }

            // ==========================================
            // 8 — GEOMETRÍA VISUAL
            // ==========================================

            let rutaVisual = null;

            try {

                rutaVisual =
                    await osrm.obtenerRutaOSRM(

                        rutaFinal.map((p) => ({

                            lat: parseFloat(p.lat),

                            lng: parseFloat(p.lng),
                        }))
                    );

            } catch (err) {

                console.warn(
                    "OSRM visual falló:",
                    err.message
                );
            }

            // ==========================================
            // PUSH RESULTADO
            // ==========================================

            rutasPorVehiculo.push({

                // ==========================================
                // VEHÍCULO
                // ==========================================

                vehiculo: {

                    id:
                        vehiculo.id,

                    tipo:
                        vehiculo.tipo,

                    placa:
                        vehiculo.placa,
                },

                // ==========================================
                // ALGORITMO
                // ==========================================

                algoritmoUsado,

                // ==========================================
                // DATOS
                // ==========================================

                totalPaquetes:
                    paquetes.length,

                pesoTotal:
                    vehiculo.pesoUsado,

                volumenTotal:
                    vehiculo.volumenUsado,

                // ==========================================
                // ESTADÍSTICAS
                // ==========================================

                estadisticas:

                    paquetes.length <= MAX_BT

                        ? {

                            nodosExplorados:
                                resultadoBT?.nodosExplorados || 0,

                            podasDistancia:
                                resultadoBT?.podasDistancia || 0,

                            podasCapacidad:
                                resultadoBT?.podasCapacidad || 0,

                            podasVolumen:
                                resultadoBT?.podasVolumen || 0,

                            mejoroKruskal:
                                resultadoBT?.mejoroKruskal || false,
                        }

                        : null,

                // ==========================================
                // RUTA
                // ==========================================

                ruta:
                    rutaFinal,

                // ==========================================
                // MÉTRICAS
                // ==========================================

                distanciaM:
                    rutaVisual?.distancia || 0,

                distanciaKm:
                    (
                        (rutaVisual?.distancia || 0) / 1000
                    ).toFixed(2),

                duracionMin:
                    rutaVisual
                        ? Math.round(
                            rutaVisual.duracion / 60
                        )
                        : null,

                // ==========================================
                // GEOMETRÍA
                // ==========================================

                geometria:
                    rutaVisual?.geometria || [],
                    grafoKruskal
            });
        }

        // ==========================================
        // RESPONSE
        // ==========================================

        return res.json({

            algoritmo:
                "mochila + kruskal + backtracking + osrm",

            totalEntregas:
                entregas.length,

            asignacion:
                asignacion.resumen,

            rutas:
                rutasPorVehiculo,

            sinAsignar:
                asignacion.sinAsignar,
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({

            error:
                "Error calculando rutas",

            detalle:
                err.message,
        });
    }
}

// ==========================================
// MATRIZ EUCLIDIANA
// FALLBACK SI OSRM FALLA
// ==========================================

function generarMatrizEuclidiana(paquetes) {

    const n = paquetes.length;

    return Array.from(

        { length: n },

        (_, i) =>

            Array.from(

                { length: n },

                (_, j) => {

                    if (i === j) {
                        return 0;
                    }

                    const dx =
                        paquetes[i].lat -
                        paquetes[j].lat;

                    const dy =
                        paquetes[i].lng -
                        paquetes[j].lng;

                    return Math.sqrt(
                        dx * dx +
                        dy * dy
                    );
                }
            )
    );
}

// ==========================================
// EXPORT
// ==========================================

module.exports = {
    calcularRutas,
};