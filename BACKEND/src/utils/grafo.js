function buildAdjList(mst, n) {
    const grafo = Array.from({ length: n }, () => []);

    for (const edge of mst) {
        grafo[edge.from].push({
            node: edge.to,
            weight: edge.peso
        });

        grafo[edge.to].push({
            node: edge.from,
            weight: edge.peso
        });
    }

    return grafo;
}

module.exports = {
    buildAdjList
};