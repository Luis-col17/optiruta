const fs = require("fs");
const path = require("path");

function escaparXml(valor) {
  return String(valor ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function normalizarCoordenadas(nodos, width, height, padding) {
  const lats = nodos.map((nodo) => Number(nodo.lat));
  const lngs = nodos.map((nodo) => Number(nodo.lng));

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  return nodos.map((nodo) => {
    const lat = Number(nodo.lat);
    const lng = Number(nodo.lng);

    const x =
      padding +
      ((lng - minLng) / (maxLng - minLng || 1)) * (width - padding * 2);

    const y =
      height -
      padding -
      ((lat - minLat) / (maxLat - minLat || 1)) * (height - padding * 2);

    return { x, y };
  });
}

function generarSvgGrafoKruskal(nodos, mst, opciones = {}) {
  const width = opciones.width || 1000;
  const height = opciones.height || 700;
  const padding = opciones.padding || 70;
  const titulo = opciones.titulo || "Grafo MST - Kruskal";

  const posiciones = normalizarCoordenadas(nodos, width, height, padding);

  const aristas = mst
    .map((edge) => {
      const a = posiciones[edge.from];
      const b = posiciones[edge.to];
      const peso = Number(edge.peso || edge.weight || 0);
      const labelX = (a.x + b.x) / 2;
      const labelY = (a.y + b.y) / 2;

      return `
        <line
          x1="${a.x}"
          y1="${a.y}"
          x2="${b.x}"
          y2="${b.y}"
          stroke="#2563eb"
          stroke-width="2.5"
        />

        <text
          x="${labelX}"
          y="${labelY - 5}"
          font-size="11"
          font-family="Arial"
          text-anchor="middle"
          fill="#334155"
        >
          ${peso.toFixed(0)} m
        </text>
      `;
    })
    .join("");

  const nodosSvg = nodos
    .map((nodo, index) => {
      const pos = posiciones[index];
      const cliente = escaparXml(nodo.cliente || `Entrega ${index + 1}`);
      const barrio = escaparXml(nodo.barrio || "");

      return `
        <g>
          <circle
            cx="${pos.x}"
            cy="${pos.y}"
            r="11"
            fill="#f97316"
            stroke="#111827"
            stroke-width="2"
          />

          <text
            x="${pos.x}"
            y="${pos.y + 4}"
            font-size="10"
            font-family="Arial"
            font-weight="700"
            text-anchor="middle"
            fill="#ffffff"
          >
            ${index + 1}
          </text>

          <text
            x="${pos.x + 15}"
            y="${pos.y - 8}"
            font-size="12"
            font-family="Arial"
            fill="#111827"
          >
            ${cliente}
          </text>

          <text
            x="${pos.x + 15}"
            y="${pos.y + 7}"
            font-size="10"
            font-family="Arial"
            fill="#64748b"
          >
            ${barrio}
          </text>
        </g>
      `;
    })
    .join("");

  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${width}"
      height="${height}"
      viewBox="0 0 ${width} ${height}"
    >
      <rect width="100%" height="100%" fill="#f8fafc" />

      <text
        x="32"
        y="42"
        font-size="24"
        font-family="Arial"
        font-weight="700"
        fill="#111827"
      >
        ${escaparXml(titulo)}
      </text>

      <text
        x="32"
        y="66"
        font-size="13"
        font-family="Arial"
        fill="#475569"
      >
        Nodos: ${nodos.length} | Aristas MST: ${mst.length}
      </text>

      ${aristas}
      ${nodosSvg}
    </svg>
  `;
}

function guardarGrafoKruskalSvg({ nodos, mst, vehiculoId, vehiculoTipo }) {
  const carpeta = path.join(__dirname, "../../exports");

  if (!fs.existsSync(carpeta)) {
    fs.mkdirSync(carpeta, { recursive: true });
  }

  const nombreArchivo = `grafo-kruskal-${vehiculoId}.svg`;
  const rutaArchivo = path.join(carpeta, nombreArchivo);

  const svg = generarSvgGrafoKruskal(nodos, mst, {
    titulo: `Grafo MST - Kruskal - ${vehiculoTipo} #${vehiculoId}`,
  });

  fs.writeFileSync(rutaArchivo, svg, "utf8");

  return {
    archivo: rutaArchivo,
    url: `/exports/${nombreArchivo}`,
  };
}

module.exports = {
  generarSvgGrafoKruskal,
  guardarGrafoKruskalSvg,
};