// scripts/geocodificarBarrios.js
// Correr UNA sola vez: node scripts/geocodificarBarrios.js
// este script nos ayudara a geolocalizar los barrios en caso de que la direccion exacta no se haya encontrado
const axios = require('axios');
const fs    = require('fs');
const path  = require('path');

const BARRIOS = [
    'Ambala',
    'Boqueron',
    'Cadiz',
    'El Salado',
    'El Vergel',
    'Jordan',
    'La Pola',
    'Los Alpes',
    'Piedrapintada',
    'Topacio',
    'Varsovia',
    'Carmen'
];

async function esperar(ms) {
    return new Promise(r => setTimeout(r, ms));
}

async function geocodificarBarrio(barrio) {
    try {
        const response = await axios.get(
            'https://nominatim.openstreetmap.org/search',
            {
                params: {
                    q:      `${barrio}, Ibagué, Tolima, Colombia`,
                    format: 'json',
                    limit:  1
                },
                headers: { 'User-Agent': 'OPTIRUTA-Proyecto/1.0' }
            }
        );

        if (response.data.length === 0) {
            console.warn(`⚠️  No encontrado: ${barrio}`);
            return null;
        }

        const { lat, lon } = response.data[0];
        console.log(`✅  ${barrio} → lat: ${lat}, lng: ${lon}`);
        return { lat: parseFloat(lat), lng: parseFloat(lon) };

    } catch (err) {
        console.error(`❌  Error en ${barrio}: ${err.message}`);
        return null;
    }
}

async function main() {
    console.log('🗺️  Geocodificando barrios de Ibagué...\n');

    const resultado = {};

    for (const barrio of BARRIOS) {
        const coords = await geocodificarBarrio(barrio);

        // Si Nominatim no lo encuentra, usar centro de Ibagué como fallback
        resultado[barrio] = coords || { lat: 4.4389, lng: -75.2322 };

        await esperar(1200); // respetar límite de Nominatim
    }

    const contenido =
`// config/barrios.js
// Generado automáticamente — no editar manualmente
// Fuente: Nominatim (OpenStreetMap)

const COORDENADAS_BARRIOS = ${JSON.stringify(resultado, null, 4)};

module.exports = COORDENADAS_BARRIOS;
`;

    const destino = path.join(__dirname, '../src/config/barrios.js');
    fs.writeFileSync(destino, contenido);

    console.log('\n✅  config/barrios.js generado correctamente');
    console.log(`📍  ${Object.keys(resultado).length} barrios procesados`);
}

main();