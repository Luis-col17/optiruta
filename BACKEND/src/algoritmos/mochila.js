// ==========================================
// MOCHILA — Programación Dinámica (Best Fit)
// Restricciones: peso_kg Y volumen_m3
// ==========================================

const CAPACIDADES = {
    Moto:   { pesoMax: 10,  volumenMax: 0.10 },
    Carro:  { pesoMax: 50,  volumenMax: 1.50 },
    Camion: { pesoMax: 200, volumenMax: 10.0 }
};

function mochila(paquetes, vehiculos) {

    // ==========================================
    // INICIALIZAR FLOTA
    // ==========================================
    const flota = vehiculos.map((v) => ({
        ...v,
        pesoMax: parseFloat(v.capacidad_kg) || CAPACIDADES[v.tipo]?.pesoMax || 0,
        volumenMax:
            parseFloat(v.capacidad_volumen_m3) ||
            CAPACIDADES[v.tipo]?.volumenMax ||
            1.0,
        pesoUsado: 0,
        volumenUsado: 0,
        paquetes: [],
    }));

    // ==========================================
    // ORDENAR PAQUETES — mayor peso primero
    // ==========================================
    const ordenados = [...paquetes].sort(
        (a, b) => parseFloat(b.peso_kg) - parseFloat(a.peso_kg)
    );

    const sinAsignar = [];

    // ==========================================
    // ASIGNAR CADA PAQUETE
    // ==========================================
    for (const paquete of ordenados) {

        const peso    = parseFloat(paquete.peso_kg)    || 0;
        const volumen = parseFloat(paquete.volumen_m3) || 0;

        // Vehículos con espacio en peso Y volumen
        const disponibles = flota.filter(v =>
            v.pesoUsado    + peso    <= v.pesoMax &&
            v.volumenUsado + volumen <= v.volumenMax
        );

        if (disponibles.length === 0) {
            sinAsignar.push(paquete);
            continue;
        }

        // ==========================================
        // BEST FIT — menor espacio desperdiciado
        // combina peso y volumen disponibles
        // ==========================================
        disponibles.sort((a, b) => {
            const espacioA =
                (a.pesoMax    - a.pesoUsado) +
                (a.volumenMax - a.volumenUsado);
            const espacioB =
                (b.pesoMax    - b.pesoUsado) +
                (b.volumenMax - b.volumenUsado);
            return espacioA - espacioB;
        });

        const elegido = disponibles[0];
        elegido.paquetes.push(paquete);
        elegido.pesoUsado    += peso;
        elegido.volumenUsado += volumen;
    }

    // ==========================================
    // RESULTADO
    // ==========================================
    return {
        algoritmo: 'mochila_best_fit',
        flota,
        sinAsignar,
        resumen: flota.map(v => ({
            id:            v.id,
            tipo:          v.tipo,
            placa:         v.placa,
            totalPaquetes: v.paquetes.length,

            pesoUsado:     Number(v.pesoUsado.toFixed(2)),
            pesoMax:       v.pesoMax,
            pesoDisponible: Number((v.pesoMax - v.pesoUsado).toFixed(2)),
            usoPeso:       ((v.pesoUsado / v.pesoMax) * 100).toFixed(1) + '%',

            volumenUsado:  Number(v.volumenUsado.toFixed(3)),
            volumenMax:    v.volumenMax,
            volumenDisponible: Number((v.volumenMax - v.volumenUsado).toFixed(3)),
            usoVolumen:    ((v.volumenUsado / v.volumenMax) * 100).toFixed(1) + '%'
        }))
    };
}

module.exports = mochila;