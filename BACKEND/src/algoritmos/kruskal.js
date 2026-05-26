// ==========================================
// KRUSKAL — Árbol de Recubrimiento Mínimo
// Genera ruta inicial óptima que sirve como
// cota superior para el Backtracking
// ==========================================

class UnionFind {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank   = Array(n).fill(0);
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(a, b) {
        const rootA = this.find(a);
        const rootB = this.find(b);
        if (rootA === rootB) return false;

        if      (this.rank[rootA] < this.rank[rootB]) this.parent[rootA] = rootB;
        else if (this.rank[rootA] > this.rank[rootB]) this.parent[rootB] = rootA;
        else { this.parent[rootB] = rootA; this.rank[rootA]++; }

        return true;
    }
}

// ==========================================
// RECORRIDO DFS sobre el MST
// Convierte aristas del árbol en orden de visita
// ==========================================
function dfsOrden(nodos, mst) {
    const n          = nodos.length;
    const adyacencia = Array.from({ length: n }, () => []);

    for (const { from, to } of mst) {
        adyacencia[from].push(to);
        adyacencia[to].push(from);
    }

    const visitados    = new Set();
    const rutaOrdenada = [];

    function dfs(nodo) {
        visitados.add(nodo);
        rutaOrdenada.push(nodos[nodo]);
        for (const vecino of adyacencia[nodo]) {
            if (!visitados.has(vecino)) dfs(vecino);
        }
    }

    dfs(0);
    return rutaOrdenada;
}

// ==========================================
// DISTANCIA TOTAL de una ruta usando matriz
// ==========================================
function calcularDistanciaRuta(ruta, nodos, matriz) {
    let total = 0;
    for (let i = 0; i < ruta.length - 1; i++) {
        const idxA = nodos.indexOf(ruta[i]);
        const idxB = nodos.indexOf(ruta[i + 1]);
        if (idxA !== -1 && idxB !== -1) {
            total += matriz[idxA][idxB];
        }
    }
    return total;
}

// ==========================================
// KRUSKAL PRINCIPAL
// ==========================================
function kruskal(nodos, matriz) {

    if (!nodos || nodos.length === 0) {
        return { rutaOrdenada: [], mst: [], distanciaTotal: 0 };
    }

    if (nodos.length === 1) {
        return { rutaOrdenada: nodos, mst: [], distanciaTotal: 0 };
    }

    if (!Array.isArray(matriz)) {
        throw new Error('Matriz de distancias inválida');
    }

    // ==========================================
    // CONSTRUIR LISTA DE ARISTAS
    // ==========================================
    const aristas = [];
    for (let i = 0; i < matriz.length; i++) {
        for (let j = i + 1; j < matriz[i].length; j++) {
            const peso = matriz[i][j];
            if (peso === undefined || peso === null) continue;
            aristas.push({ from: i, to: j, peso });
        }
    }

    // ==========================================
    // ORDENAR POR PESO
    // ==========================================
    aristas.sort((a, b) => a.peso - b.peso);

    // ==========================================
    // CONSTRUIR MST CON UNION-FIND
    // ==========================================
    const uf  = new UnionFind(nodos.length);
    const mst = [];

    for (const arista of aristas) {
        if (uf.union(arista.from, arista.to)) {
            mst.push(arista);
            if (mst.length === nodos.length - 1) break;
        }
    }

    // ==========================================
    // CONVERTIR MST EN ORDEN DE VISITA
    // ==========================================
    const rutaOrdenada   = dfsOrden(nodos, mst);
    const distanciaTotal = calcularDistanciaRuta(rutaOrdenada, nodos, matriz);

    console.log('==================================');
    console.log('KRUSKAL');
    console.log('Nodos:', nodos.length);
    console.log('Aristas MST:', mst.length);
    console.log('Distancia total:', distanciaTotal.toFixed(2), 'm');

    return {
        algoritmo:     'kruskal_mst',
        rutaOrdenada,
        mst,
        distanciaTotal: Number(distanciaTotal.toFixed(2))
    };
}

module.exports = kruskal;