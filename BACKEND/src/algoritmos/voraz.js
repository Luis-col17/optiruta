// ==========================================
// DISTANCIA EUCLIDIANA
// ==========================================

function calcularDistancia(a, b) {

    const dx =
        a.lat - b.lat;

    const dy =
        a.lng - b.lng;

    return Math.sqrt(
        (dx * dx) +
        (dy * dy)
    );
}

// ==========================================
// VORAZ
// Vecino más cercano
// ==========================================

function optimizarRutaVoraz(entregas) {

    // ==========================================
    // VALIDAR
    // ==========================================

    if (
        !entregas ||
        entregas.length === 0
    ) {

        return {
            rutaOptimizada: [],
            distanciaTotal: 0,
            nodosExplorados: 0,
        };
    }

    // ==========================================
    // COPIA
    // ==========================================

    const pendientes =
        [...entregas];

    // ==========================================
    // EMPEZAR DESDE EL PRIMERO
    // ==========================================

    const rutaOptimizada = [
        pendientes.shift()
    ];

    let distanciaTotal = 0;

    let nodosExplorados = 0;

    // ==========================================
    // RECORRER
    // ==========================================

    while (
        pendientes.length > 0
    ) {

        const actual =
            rutaOptimizada[
                rutaOptimizada.length - 1
            ];

        let mejorIndice = 0;

        let mejorDistancia =
            Infinity;

        // ==========================================
        // BUSCAR MÁS CERCANO
        // ==========================================

        for (
            let i = 0;
            i < pendientes.length;
            i++
        ) {

            const distancia =
                calcularDistancia(
                    actual,
                    pendientes[i]
                );

            nodosExplorados++;

            if (
                distancia <
                mejorDistancia
            ) {

                mejorDistancia =
                    distancia;

                mejorIndice = i;
            }
        }

        // ==========================================
        // AGREGAR A RUTA
        // ==========================================

        const siguiente =
            pendientes.splice(
                mejorIndice,
                1
            )[0];

        rutaOptimizada.push(
            siguiente
        );

        distanciaTotal +=
            mejorDistancia;
    }

    return {

        rutaOptimizada,

        distanciaTotal:
            Number(
                distanciaTotal.toFixed(4)
            ),

        nodosExplorados,
    };
}

module.exports = {
    optimizarRutaVoraz
};