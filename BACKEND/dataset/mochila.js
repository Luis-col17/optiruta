// mochila.js

// Importar dataset directamente
const entregas = require("./dataset");

// Vehículos
const vehiculos = [
    { nombre: "Moto", capacidad: 15 },
    { nombre: "Carro", capacidad: 40 },
    { nombre: "Camion", capacidad: 100 }
];

// Algoritmo Mochila 0/1
function mochila(paquetes, capacidad) {

    const n = paquetes.length;

    const dp = Array(n + 1)
        .fill()
        .map(() => Array(capacidad + 1).fill(0));

    for (let i = 1; i <= n; i++) {

        const peso = Math.floor(paquetes[i - 1].peso_kg);

        for (let w = 0; w <= capacidad; w++) {

            if (peso <= w) {

                dp[i][w] = Math.max(
                    peso + dp[i - 1][w - peso],
                    dp[i - 1][w]
                );

            } else {

                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    // Reconstrucción
    let w = capacidad;
    const seleccionados = [];

    for (let i = n; i > 0; i--) {

        if (dp[i][w] !== dp[i -1][w]) {

            seleccionados.push(paquetes[i - 1]);

            w -= Math.floor(paquetes[i - 1].peso_kg);
        }
    }

    return seleccionados;
}

// Ejecutar por vehículo
vehiculos.forEach(vehiculo => {

    console.log("\n=========================");
    console.log(`Vehículo: ${vehiculo.nombre}`);
    console.log(`Capacidad: ${vehiculo.capacidad} kg`);
    console.log("=========================");

    const asignados = mochila(
        entregas,
        vehiculo.capacidad
    );

    let pesoTotal = 0;

    asignados.forEach(paquete => {

        console.log(
            `Entrega #${paquete.id_entrega} | ${paquete.cliente} | ${paquete.peso_kg} kg`
        );

        pesoTotal += paquete.peso_kg;
    });

    console.log("-------------------------");
    console.log(`Peso total: ${pesoTotal.toFixed(2)} kg`);
});