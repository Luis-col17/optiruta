function greedyRutas(paquetes, capacidad) {
    const ordenados = [...paquetes].sort((a, b) => a.peso_kg - b.peso_kg);

    const seleccionados = [];
    let pesoTotal = 0;

    for (const paquete of ordenados) {
        if (pesoTotal + Number(paquete.peso_kg) <= capacidad) {
            seleccionados.push(paquete);
            pesoTotal += Number(paquete.peso_kg);
        }
    }

    return {
        algoritmo: "greedy",
        seleccionados,
        pesoTotal,
        cantidad: seleccionados.length
    };
}

module.exports = greedyRutas;