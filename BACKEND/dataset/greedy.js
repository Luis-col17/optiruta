// greedy_rutas.js
// Algoritmo Voraz (Greedy)
// Orden óptimo de visitas por vehículo
// Consumiento directamente el dataset

const entregas = require("./dataset");

// Vehículos del proyecto
const vehiculos = [
    { nombre: "Moto", capacidad: 15 },
    { nombre: "Carro", capacidad: 40 },
    { nombre: "Camion", capacidad: 100 }
];

// ==========================================
// ALGORITMO VORAZ (GREEDY)
// ==========================================
// Estrategia:
// 1. Filtrar entregas por vehículo
// 2. Ordenar de menor peso a mayor peso
// 3. Ir agregando paquetes mientras haya capacidad
// ==========================================

function greedyRutas(paquetes, capacidad) {

    // Ordenar por peso ascendente
    const ordenados = [...paquetes].sort(
        (a, b) => a.peso_kg - b.peso_kg
    );

    const seleccionados = [];
    let pesoTotal = 0;

    for (const paquete of ordenados) {

        // Verificar capacidad
        if (pesoTotal + paquete.peso_kg <= capacidad) {

            seleccionados.push(paquete);

            pesoTotal += paquete.peso_kg;
        }
    }

    return {
        seleccionados,
        pesoTotal
    };
}

// ==========================================
// EJECUCIÓN
// ==========================================

vehiculos.forEach(vehiculo => {

    console.log("\n====================================");
    console.log(`Vehículo: ${vehiculo.nombre}`);
    console.log(`Capacidad máxima: ${vehiculo.capacidad} kg`);
    console.log("====================================");

    // Filtrar entregas según vehículo
    const entregasVehiculo = entregas.filter(
        e =>
            e.vehiculo.toLowerCase() ===
            vehiculo.nombre.toLowerCase()
    );

    const resultado = greedyRutas(
        entregasVehiculo,
        vehiculo.capacidad
    );

    // Mostrar orden óptimo
    resultado.seleccionados.forEach((paquete, index) => {

        console.log(
            `${index + 1}. ` +
            `Entrega #${paquete.id_entrega} | ` +
            `${paquete.cliente} | ` +
            `${paquete.barrio} | ` +
            `${paquete.peso_kg} kg`
        );
    });

    console.log("------------------------------------");
    console.log(
        `Peso total cargado: ${resultado.pesoTotal.toFixed(2)} kg`
    );

    console.log(
        `Entregas asignadas: ${resultado.seleccionados.length}`
    );
});