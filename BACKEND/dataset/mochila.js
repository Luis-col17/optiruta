function mochila(paquetes, capacidad) {
    const n = paquetes.length;
    const capacidadEntera = Math.floor(capacidad);

    const dp = Array(n + 1)
        .fill()
        .map(() => Array(capacidadEntera + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        const peso = Math.floor(Number(paquetes[i - 1].peso_kg));

        for (let w = 0; w <= capacidadEntera; w++) {
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

    let w = capacidadEntera;
    const seleccionados = [];

    for (let i = n; i > 0; i--) {
        const peso = Math.floor(Number(paquetes[i - 1].peso_kg));

        if (dp[i][w] !== dp[i - 1][w]) {
            seleccionados.push(paquetes[i - 1]);
            w -= peso;
        }
    }

    const pesoTotal = seleccionados.reduce(
        (total, paquete) => total + Number(paquete.peso_kg),
        0
    );

    return {
        algoritmo: "mochila",
        seleccionados,
        pesoTotal,
        cantidad: seleccionados.length
    };
}

module.exports = mochila;