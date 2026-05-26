function matrizToEdges(matriz) {

    const edges = [];

    for (let i = 0; i < matriz.length; i++) {

        for (let j = i + 1; j < matriz.length; j++) {

            edges.push({

                from: i,
                to: j,

                weight:
                    matriz[i][j]
            });
        }
    }

    return edges;
}

module.exports = {
    matrizToEdges
};