// ==========================================
// BACKTRACKING — Optimización de rutas
// Usa la cota de Kruskal para podar agresivamente
// Restricciones: peso_kg Y volumen_m3
// ==========================================

// ==========================================
// DISTANCIA ENTRE DOS NODOS usando matriz OSRM
// Si no hay matriz usa euclidiana como fallback
// ==========================================
function obtenerDistancia(a, b, idxA, idxB, matriz) {
    if (matriz && matriz[idxA] && matriz[idxA][idxB] !== undefined) {
        return matriz[idxA][idxB];
    }
    // Fallback euclidiano
    const dx = a.lat - b.lat;
    const dy = a.lng - b.lng;
    return Math.sqrt(dx * dx + dy * dy);
}

// ==========================================
// DISTANCIA TOTAL DE UNA RUTA
// ==========================================
function calcularDistanciaRuta(ruta, matriz) {
    let total = 0;
    for (let i = 0; i < ruta.length - 1; i++) {
        total += obtenerDistancia(
            ruta[i], ruta[i + 1],
            ruta[i].__idx, ruta[i + 1].__idx,
            matriz
        );
    }
    return total;
}

// ==========================================
// BACKTRACKING PRINCIPAL
// ==========================================
function optimizarRutaBacktracking(
    entregas,
    matriz        = null,
    capacidadMax  = Infinity,
    volumenMax    = Infinity,
    cotaInicial   = Infinity   // ← recibe distancia de Kruskal
) {

    // ==========================================
    // VALIDAR
    // ==========================================
    if (!entregas || entregas.length === 0) {
        return {
            mejorRuta:       [],
            mejorDistancia:  0,
            nodosExplorados: 0,
            podasCapacidad:  0,
            podasDistancia:  0,
            podasVolumen:    0,
            mejoroKruskal:   false
        };
    }

    // Agregar índice a cada entrega para usar la matriz
    const entregasIndexadas = entregas.map((e, i) => ({ ...e, __idx: i }));

    // ==========================================
    // VARIABLES DE CONTROL
    // ==========================================
    let mejorRuta        = [];
    let mejorDistancia   = cotaInicial; // ← poda desde la cota de Kruskal
    let nodosExplorados  = 0;
    let podasCapacidad   = 0;
    let podasDistancia   = 0;
    let podasVolumen     = 0;

    const visitados = new Array(entregas.length).fill(false);

    // ==========================================
    // BACKTRACKING RECURSIVO
    // ==========================================
    function backtrack(rutaActual, distanciaActual, pesoActual, volumenActual) {

        nodosExplorados++;

        // ==========================================
        // PODA 1 — distancia ya supera la mejor
        // ==========================================
        if (distanciaActual >= mejorDistancia) {
            podasDistancia++;
            return;
        }

        // ==========================================
        // RUTA COMPLETA — actualizar mejor
        // ==========================================
        if (rutaActual.length === entregasIndexadas.length) {
            if (distanciaActual < mejorDistancia) {
                mejorDistancia = distanciaActual;
                mejorRuta      = rutaActual.map(({ __idx, ...e }) => e);
            }
            return;
        }

        // ==========================================
        // PROBAR CADA NODO NO VISITADO
        // ==========================================
        for (let i = 0; i < entregasIndexadas.length; i++) {

            if (visitados[i]) continue;

            const entrega      = entregasIndexadas[i];
            const pesoEntrega  = parseFloat(entrega.peso_kg    || 0);
            const volEntrega   = parseFloat(entrega.volumen_m3 || 0);

            // ==========================================
            // PODA 2 — excede capacidad de peso
            // ==========================================
            if (pesoActual + pesoEntrega > capacidadMax) {
                podasCapacidad++;
                continue;
            }

            // ==========================================
            // PODA 3 — excede capacidad de volumen
            // ==========================================
            if (volumenActual + volEntrega > volumenMax) {
                podasVolumen++;
                continue;
            }

            // ==========================================
            // CALCULAR DISTANCIA PARCIAL
            // ==========================================
            let nuevaDistancia = distanciaActual;

            if (rutaActual.length > 0) {
                const ultimo = rutaActual[rutaActual.length - 1];
                nuevaDistancia += obtenerDistancia(
                    ultimo, entrega,
                    ultimo.__idx, i,
                    matriz
                );
            }

            // ==========================================
            // PODA 4 — distancia parcial ya supera mejor
            // ==========================================
            if (nuevaDistancia >= mejorDistancia) {
                podasDistancia++;
                continue;
            }

            // ==========================================
            // EXPLORAR
            // ==========================================
            visitados[i] = true;
            rutaActual.push(entrega);

            backtrack(
                rutaActual,
                nuevaDistancia,
                pesoActual  + pesoEntrega,
                volumenActual + volEntrega
            );

            // ==========================================
            // RETROCEDER
            // ==========================================
            rutaActual.pop();
            visitados[i] = false;
        }
    }

    // ==========================================
    // INICIAR
    // ==========================================
    backtrack([], 0, 0, 0);

    // ==========================================
    // LOGS
    // ==========================================
    console.log('==================================');
    console.log('BACKTRACKING');
    console.log('Cota inicial (Kruskal):', cotaInicial.toFixed(2), 'm');
    console.log('Mejor distancia:', mejorDistancia.toFixed(2), 'm');
    console.log('Nodos explorados:', nodosExplorados);
    console.log('Podas por distancia:', podasDistancia);
    console.log('Podas por capacidad:', podasCapacidad);
    console.log('Podas por volumen:', podasVolumen);
    console.log('¿Mejoró Kruskal?:', mejorDistancia < cotaInicial ? 'Sí' : 'No');

    // ==========================================
    // RESPUESTA
    // ==========================================
    return {
        algoritmo:       'backtracking',
        mejorRuta:       mejorRuta.length > 0 ? mejorRuta : entregas,
        mejorDistancia:  Number(mejorDistancia.toFixed(2)),
        nodosExplorados,
        podasCapacidad,
        podasDistancia,
        podasVolumen,
        mejoroKruskal:   mejorDistancia < cotaInicial
    };
}

module.exports = { optimizarRutaBacktracking };